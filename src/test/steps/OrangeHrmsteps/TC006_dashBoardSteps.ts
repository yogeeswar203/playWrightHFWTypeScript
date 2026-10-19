import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import {dashboard_po } from "../../../PageObjects/OrangeHrmPO/orgDashboard_po";
import { expect } from "@playwright/test";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let dashboard_Steps: dashboard_po
let adminsteps: adminpo;
When('I should see the left side menu with the following options:', async function(dataTable:DataTable){
    dashboard_Steps = new dashboard_po(pf.page);
   
    const expData = await dashboard_Steps.leftPanelText();
    const expectedOptions = dataTable.raw().map(row => row[0]);
    //console.log(expData);
    //console.log(expectedOptions);
    expect(expData).toEqual(expectedOptions);
});

Then("User types {string} in the side panel Search box and user is able to see the {string} option in the left side menu", async function(value:string, exp_value:string){
    await dashboard_Steps.entertextSearchBox(value);
    await dashboard_Steps.searchValueInLeftpanel(exp_value);
})
