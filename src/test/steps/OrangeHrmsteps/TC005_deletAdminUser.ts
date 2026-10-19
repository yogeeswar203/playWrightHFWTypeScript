import { Then, When } from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let adminsteps: adminpo

When('Search for the user created earlier', async function() {
    adminsteps = new adminpo(pf.page);
    await adminsteps.searchUser();
});

Then("Click the Delete trash icon", async function(){
    await adminsteps.deleteIconClick();
});

Then("Click 'Yes, Delete' in confirmation dialog", async function(){
    await adminsteps.deleteConfirmation();
});
