import { Then } from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let adminsteps: adminpo

Then('Click on Add button', async function(){
    adminsteps = new adminpo(pf.page);
    await adminsteps.addAdminUser();
});

Then('Fill all the required fields with valid data and click on save button', async function(){
    await adminsteps.fillAdminNewUser();
});

Then('Verify that the user is added successsfully in the user management', async function(){
    await adminsteps.newUserSearch();
})

