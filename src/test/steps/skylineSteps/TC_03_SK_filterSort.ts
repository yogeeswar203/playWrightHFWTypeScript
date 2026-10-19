import { When } from "@cucumber/cucumber";
import { dempapplogin } from "../../../PageObjects/skylinesPo/skylineHomePage_pos";
import { pageFixture as pf } from "../../../hooks/pageFixers";
import { skSearchPagePO } from "../../../PageObjects/skylinesPo/skylineSearchPage_pos";

let skylineSearchPage:skSearchPagePO;

When('Click on {string} and airline as {string} and Depature time {string}checkbox', async function(stop:string, airline:string, depTime:string){
    skylineSearchPage = new skSearchPagePO(pf.page);
    await skylineSearchPage.selectValueFromSidePanel(stop)
    await skylineSearchPage.selectValueFromSidePanel(airline);
    await skylineSearchPage.selectValueFromSidePanel(depTime);
    
})