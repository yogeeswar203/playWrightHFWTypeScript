import { Then, When } from "@cucumber/cucumber";
import { OrgLoginPagePO } from "../../../PageObjects/OrangeHrmPO/orgLoginPagePO";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";
import { pageFixture as pf } from "../../../hooks/pageFixers";


let adminsteps: adminpo
When('Click on {string} in the left menu', async function(moduleName:string){
    adminsteps = new adminpo(pf.page)
    await adminsteps.clickonAdmin(moduleName);
    
});

Then('Select User Role {string}', async function(drpvalue:string){
   await adminsteps.useroleDrp(drpvalue);
});

Then('Click on Search button', async function(){
    await adminsteps.clickOnSerch();
    
});

Then('Verify that all the users with {string} role and matching', async function(role:string){
    await adminsteps.searchresults(role);
    
});