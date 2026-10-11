import {Given, Then} from "@cucumber/cucumber";
import {test,expect} from "@playwright/test";
import { pageFixture as pf } from "../../../hooks/pageFixers";
import {dempapplogin} from "../../../PageObjects/demoapp/demoappLoginPagePO";

let orgLogin:dempapplogin;

Given('User is able to navigate to login page', async function () {
    orgLogin = new dempapplogin(pf.page);
    await orgLogin.navigateToLoginPage();
    console.log("This is 1st method for the Orange HRM Login");
});

Given('User enter the user name as {string}', async function (username:string) {
    await orgLogin.enter_username(username);
  
});

Given('user enter the password as {string}', async function (pwd:string) {
 
  await orgLogin.enter_password(pwd);
});

Given('user click on the login button', async function () {
 
 await orgLogin.clickOnLoginbtn();
});

Then('user is able to see the admin home Page', async function () {
  
  console.log("User is able to login successfully to the Orange HRM admin page")
});