import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";


import{leavePo} from "../../../PageObjects/OrangeHrmPO/org_leave_po"

let lpo:leavePo;

Then('user enters the from date as {string} to date as {string}', async function(fromDate:string, Todate:string){
    lpo = new leavePo(pf.page);
    await lpo.selectdates(fromDate,Todate);
})
