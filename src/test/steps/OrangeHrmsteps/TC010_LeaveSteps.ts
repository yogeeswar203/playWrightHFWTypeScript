import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";

import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";
import { directory_po } from "../../../PageObjects/OrangeHrmPO/orgDirectry_po";

let cuf:commonFunction
let directory_Steps: directory_po
let adminsteps: adminpo;



Then('I should see the search results for the leave details with default search criteria', async function(){
    directory_Steps = new directory_po(pf.page);
    await directory_Steps.validateSearchResults();
})