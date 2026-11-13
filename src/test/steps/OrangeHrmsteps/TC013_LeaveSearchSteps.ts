import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";


import{leavePo} from "../../../PageObjects/OrangeHrmPO/org_leave_po"

let lpo:leavePo;

Then('user enters the from date as {string} to date as {string}', async function(fromDate:string, Todate:string){
    lpo = new leavePo(pf.page);
    await lpo.selectdates(fromDate,Todate);
});

Then('select the from date and To Date', async function(){
    lpo = new leavePo(pf.page);
    // FromAndToDates value given because the data wil featch based on the this given value
    await lpo.leavePageDateSelector('FromAndToDates');
    await lpo.validateResults();
});

Then('select the from date and To Date is later', async function(){
    lpo = new leavePo(pf.page);
    // DateValidations value given because the data wil featch based on the this given value
    await lpo.leavePageDateSelector('DateValidations');
});

Then('User is able the see the validation message {string}', async function(errorValidationMsg:string){
    await lpo.dateValidation(errorValidationMsg);
})
