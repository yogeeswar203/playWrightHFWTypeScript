import {Given, Then} from "@cucumber/cucumber";
import {test,expect} from "@playwright/test";
import { pageFixture as pf } from "../../../hooks/pageFixers";
import {OrgLoginPagePO} from "../../../PageObjects/OrangeHrmPO/orgLoginPagePO";

let orgLogin:OrgLoginPagePO;

Given('User is able to navigate to login paege', async function () {
    orgLogin = new OrgLoginPagePO(pf.page);
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

Then('Enter Username as {string} and Password as {string} and Click on login button', async function(username:string, password:string){
  orgLogin = new OrgLoginPagePO(pf.page);
  await orgLogin.navigateToLoginPage();
  await orgLogin.enter_username(username);
  await orgLogin.enter_password(password);
  await orgLogin.clickOnLoginbtn();
  await pf.page.waitForTimeout(2000);
  await orgLogin.getDashboardText();


});