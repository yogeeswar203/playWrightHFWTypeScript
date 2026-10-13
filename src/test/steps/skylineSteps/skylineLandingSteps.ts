import {Given, Then} from "@cucumber/cucumber";
import {test,expect} from "@playwright/test";
import { pageFixture as pf } from "../../../hooks/pageFixers";
import {dempapplogin} from "../../../PageObjects/skylinesPo/skylineHomePage_pos";

import {skSearchPagePO} from "../../../PageObjects/skylinesPo/skylineSearchPage_pos"
import { sklinePaymentPO } from "../../../PageObjects/skylinesPo/skylinePaymentPage_pos";


let skylineHomepage:dempapplogin;
let skylineSearchPage:skSearchPagePO;
let sklinePaymentPage:sklinePaymentPO

Given('User is able to navigate to skyline flight search page', async function () {
        skylineHomepage = new dempapplogin(pf.page);
        await skylineHomepage.navigateToDemoPage();
        
});

Then('Select from city as {string} and to City as {string}', async function(fromCity:string, toCity:string){
        await skylineHomepage.selectCities(fromCity,toCity);
   
});

Then('select Depature date as first displayed data', async function(){
        await skylineHomepage.selectDepatureDate();
   

});

Then('Select Cabin as {string}', async function(label:string){
        await skylineHomepage.selectCabin(label);

        
});

Then('Click on search flight button', async function(){
        await skylineHomepage.clickOnFlighSearch();
        await pf.page.waitForTimeout(2000);
        skylineSearchPage = new skSearchPagePO(pf.page);
        await skylineSearchPage.getAllfares();
        
        
});

Then('Validate the flight counts are matching', async function(){
    await skylineHomepage.noOfFlightValidation();
   
});

Then('select fastest flight and fare', async function(){
        skylineSearchPage = new skSearchPagePO(pf.page);
        await skylineSearchPage.selectFastest();
        await skylineSearchPage.clickOnBasicPrice();
});

Then('fill the traveller details', async function(){
        //await skylineSearchPage.fillTravellerDetails("test","test2","data@tes.com","879289292");
        await skylineSearchPage.getPassengerData();
});

Then('Select seat for passenger and clikon continue button', async function(){
        await skylineSearchPage.selectSeat();
});

Then('Fill the payment details and Pay', async function(){
        sklinePaymentPage = new sklinePaymentPO(pf.page);
        await sklinePaymentPage.enterCardDetailsAndPay();
})

Then('Validate the booking pnr is generated',async function(){
        sklinePaymentPage.bookingStatus();
});



