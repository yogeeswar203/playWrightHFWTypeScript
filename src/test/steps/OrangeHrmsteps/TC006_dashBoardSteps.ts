import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import {dashboard_po } from "../../../PageObjects/OrangeHrmPO/orgDashboard_po";
import { expect } from "@playwright/test";

let cuf:commonFunction
let dashboard_Steps: dashboard_po

When('I should see the left side menu with the following options:', async function(dataTable:DataTable){
    dashboard_Steps = new dashboard_po(pf.page);
    //await dashboard_Steps.entertextSearchBox(value);
    const expData = await dashboard_Steps.leftPanelText();
    const expectedOptions = dataTable.raw().map(row => row[0]);
    console.log(expData);
    console.log(expectedOptions);
    const exp_op = expectedOptions.map(text=>text.trim());

    expect(expData).toEqual(exp_op);
});
