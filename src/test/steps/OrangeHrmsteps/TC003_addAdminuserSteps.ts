import { Then } from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";
import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";

let cuf:commonFunction
let adminsteps: adminpo

Then('Click on Add button', async function(){
    adminsteps = new adminpo(pf.page);
    await adminsteps.addAdminUser();
})
