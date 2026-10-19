import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import {dashboard_po } from "../../../PageObjects/OrangeHrmPO/orgDashboard_po";
import { expect } from "@playwright/test";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let dashboard_Steps: dashboard_po
let adminsteps: adminpo;


When('I should see the user dropdown with the following options:', async function(dataTable:DataTable){
    const expectedOptions = dataTable.raw().map(row => row[0]);
    dashboard_Steps = new dashboard_po(pf.page);
    const act_data = await dashboard_Steps.validateUserOptions();
    expect(expectedOptions).toEqual(act_data);
    console.log(`Expected data from given:${expectedOptions}`);
    console.log(act_data);
});
