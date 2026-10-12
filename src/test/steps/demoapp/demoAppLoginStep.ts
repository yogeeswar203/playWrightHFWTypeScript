import {Given, Then} from "@cucumber/cucumber";
import {test,expect} from "@playwright/test";
import { pageFixture as pf } from "../../../hooks/pageFixers";
import {dempapplogin} from "../../../PageObjects/demoapp/demoappLoginPagePO";

let dorgLogin:dempapplogin;

Given('User is able to navigate to demo app', async function () {
    dorgLogin = new dempapplogin(pf.page);
    await dorgLogin.navigateToDemoPage();
    await pf.page.waitForTimeout(5000);
    console.log("This is demo app execution");
});

