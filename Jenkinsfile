pipeline {
    agent any

    // Uses the Node.js installation configured in Jenkins Global Tool Configuration
    // (Optional: If you haven't set this up, you can remove the tools block if Node is installed globally on the Jenkins agent)
    tools {
        nodejs 'NodeJS' // Ensure this matches the name in Jenkins Global Tool Configuration
    }

    options { 
        timestamps() 
        timeout(time: 1, unit: 'HOURS')
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['test:e2e', 'test:master', 'test:sanity', 'test:regression', 'test:api', 'test:web', 'test:datadriven'],
            description: 'Select the test suite to run'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium'],
            description: 'Select the browser for tests'
        )
        choice(
            name: 'MODE',
            choices: ['headed'],
            description: 'Run tests in headless or headed mode'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                // Checks out the code from the branch configured in Jenkins UI
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing NPM dependencies..."
                // Using npm ci for reliable, clean builds based on package-lock.json
                bat 'npm ci' 
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers and dependencies..."
                // Installs the browsers required by Playwright
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Test Suite: ${params.TEST_SUITE} on ${params.BROWSER} in ${params.MODE} mode"
                script {
                    // Set environment variables to be picked up by your framework (e.g., cucumber.js or playwright.config.ts)
                    env.BROWSER = "${params.BROWSER}"
                    env.HEADLESS = "${params.MODE == 'headless' ? 'true' : 'false'}"
                }
                
                // Execute the npm script selected in the parameters
                // Using catchError so the pipeline continues to the Post Actions even if tests fail
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    bat "npm run ${params.TEST_SUITE}"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Executing Post Actions..."
            
            // Generate and publish Allure Report (Requires Allure Jenkins Plugin)
            // Ensure your framework outputs allure results to the 'allure-results' folder
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
            // Clean up the workspace to save disk space
            cleanWs()
        }
        success {
            echo "All tests passed successfully!"
            // Add email notification logic here if needed
        }
        failure {
            echo "Tests failed or pipeline encountered an error."
            // Add email notification logic here if needed
        }
    }
}