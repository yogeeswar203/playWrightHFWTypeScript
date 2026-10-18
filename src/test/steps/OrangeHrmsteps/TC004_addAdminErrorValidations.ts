import { Then, When } from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let adminsteps: adminpo

When('Click on save button without entering any data', async function(){
    adminsteps = new adminpo(pf.page);
    adminsteps.clickOnSaveButton();
    
});

Then('Verify that the error messages are displayed for mandatory fields', async function(){
    await adminsteps.errorValidation(); 
})
