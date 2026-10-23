import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";

import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";
import { directory_po } from "../../../PageObjects/OrangeHrmPO/orgDirectry_po";

let cuf:commonFunction
let directory_Steps: directory_po
let adminsteps: adminpo;

When('I click on the {string} from the left panel', async function(ModuleName:string){
    directory_Steps = new directory_po(pf.page);
    await directory_Steps.clickOnDirectory(ModuleName);
    
});

Then('I type an existing {string} in the search field and select from autocomplete', async function(emp_search:string){
    await directory_Steps.enterTextEmp(emp_search);
    //await directory_Steps.selectJobTitle();
    //await directory_Steps.selectLocation();
});

Then('I click on the Search button',async function(){
    await directory_Steps.clickOnSearch();
});

Then('I should see the search results for the specified employee', async function(){
    await directory_Steps.validateSearchResults();
})