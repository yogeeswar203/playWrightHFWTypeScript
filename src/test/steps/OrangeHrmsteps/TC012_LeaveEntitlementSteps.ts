import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";


import{leavePo} from "../../../PageObjects/OrangeHrmPO/org_leave_po"

let lpo:leavePo;



Then('User click on Entitlements and Add Entitlements', async function(){
    lpo = new leavePo(pf.page);
    await lpo.clickOnEntitlement();
    
});

Then('User fills the require data while adding Entitlement {string}',async function(value:string){
    await lpo.fillAddEntitltiment(value);
})

Then('User click on save button', async function(){
   await lpo.submitCancel();
});

Then('User accept the message and added new entitlement details are displayed',async function(){
    await lpo.confirmTheChanges();
})

