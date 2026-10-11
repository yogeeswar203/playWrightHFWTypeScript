import {BeforeAll, AfterAll, AfterStep, BeforeStep, After, Before} from "@cucumber/cucumber";
import {chromium, Browser, BrowserContext, Page} from "@playwright/test";
import {pageFixture as pf} from "./pageFixers"
import fs from "fs";

let browser:Browser;
let context:BrowserContext;
let page:Page;

// Launching the chrome browser before all the steps

BeforeAll(async function () {
    browser = await chromium.launch({headless:false});
    
});

// Closing the browser after executing all the steps

AfterAll(async function(){
    await browser.close();
})


// Creating the browser context before the steps

Before(async function(){
    context = await browser.newContext();
    const page = await browser.newPage();
    pf.page = page;
});

// After all the stepsin the given scenario closing the context and browser added some details realted to the Allure report
After(async function () {
    
    const envDetails = `
    
Browser=Chrome
Project=Yogeeswar 
Environment=Staging
Execution_Time=${new Date().toLocaleString()}
  `;
  
  // Write this file into the allure-results folder
  fs.writeFileSync('allure-results/environment.properties', envDetails.trim());
    

  await pf.page.close();
  await context.close();
});

// Explicitly added to take the screenshot after every step

AfterStep(async function(){
    if(pf.page && !pf.page.isClosed())
    {
        const screenshot = await pf.page.screenshot({fullPage:true});
        this.attach(screenshot,'image/png');
    }else{
        console.error("Skipping screenshot: Page object is not defined or is already closed.");
    }
})
