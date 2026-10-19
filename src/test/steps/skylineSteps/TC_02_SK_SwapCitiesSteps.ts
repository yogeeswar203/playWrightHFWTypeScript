import { When } from "@cucumber/cucumber";
import { dempapplogin } from "../../../PageObjects/skylinesPo/skylineHomePage_pos";
import { pageFixture as pf } from "../../../hooks/pageFixers";

let skylineHomepage:dempapplogin;

When('Click on Swap button and Validate cities are swapped', async function(){
    skylineHomepage = new dempapplogin(pf.page);
    await skylineHomepage.ValidateSwappedCities();;

    
})