import { Then, When, DataTable} from "@cucumber/cucumber";
import { commonFunction } from "../../../commonUtilies/commonFunctions";
import { pageFixture as pf} from "../../../hooks/pageFixers";

import { adminpo } from "../../../PageObjects/OrangeHrmPO/org_admin_po";
import { directory_po } from "../../../PageObjects/OrangeHrmPO/orgDirectry_po";
import{leavePo} from "../../../PageObjects/OrangeHrmPO/org_leave_po"

let lpo:leavePo;



Then('I click on the Apply button from the top menu', async function(){
    lpo = new leavePo(pf.page);
    await lpo.clickOnApplyBtn();
    
});

Then('verify that {string} text has been displayed', async function(validationMsg:string)
{
        await lpo.verifyleaveBalance(validationMsg);
        await lpo.selectLeaveTypedrp();

});