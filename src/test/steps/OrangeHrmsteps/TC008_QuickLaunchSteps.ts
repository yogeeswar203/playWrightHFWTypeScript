import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import {dashboard_po } from "../../../PageObjects/OrangeHrmPO/orgDashboard_po";
import { expect } from "@playwright/test";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let dashboard_Steps: dashboard_po
let adminsteps: adminpo;


Then('I click on the {string} option in the Quick Launch widget', async function(quickPage:string){
    dashboard_Steps = new dashboard_po(pf.page);
    await dashboard_Steps.clickOnQuickLaunchMenu(quickPage);
});

Then('I should be redirected to the {string} page', async function(exp:string){
    await dashboard_Steps.getQuickLauncTitle(exp);

})
