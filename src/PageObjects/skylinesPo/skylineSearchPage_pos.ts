import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator, expect} from "@playwright/test";

let cuf:commonFunction;
const passengerData = "D:/PlayWright Projects/playwrightCucumber/playWrightHFWTypeScript/src/TestData/passangerData.json"
export class skSearchPagePO{
    private readonly page;
    private readonly cheapest_btn;
    private readonly fastest_btn;
    private readonly earliest_btn;
    private readonly show_price_btn;
    private readonly basic_price_btn;
    private readonly flex_price_btn;
    private readonly nonStop_chk;


    // Passenger data fill page
    private readonly title_drp;
    private readonly firstname_txt;
    private readonly lastname_txt;
    private readonly email_txt;
    private readonly phone_txt;
    private readonly continueToSeats_btn;

    // Seat seletion page
    private readonly avaliable_seat_btn;
    private readonly continue_payment_btn;
    private readonly act_name_txt;
    private readonly bookedSeatNum_txt;
    private readonly allFlightFares_loc;


    


    constructor(page:Page)
    {
        // Search result page
        this.page= pf.page;
        this.cheapest_btn = pf.page.locator('button',{hasText:'cheapest'});
        this.fastest_btn = pf.page.locator('button',{hasText:'fastest'});
        this.earliest_btn = pf.page.locator('button',{hasText:'earliest'});
        this.show_price_btn = pf.page.locator("button[data-testid='select-flight']").first();
        this.basic_price_btn = pf.page.locator("button[data-testid='fare-basic']");
        this.flex_price_btn = pf.page.locator("button[data-testid='fare-flex']");
        this.nonStop_chk = pf.page.locator("input[type='checkbox'] + span");
        this.allFlightFares_loc = pf.page.locator("p[data-testid='flight-price']");


        
        // Passenger data fill page locators
        this.title_drp = pf.page.locator("select[id='pax-0-title']");
        this.firstname_txt = pf.page.locator("input[id='pax-0-first']");
        this.lastname_txt = pf.page.locator("input[id='pax-0-last']");
        this.email_txt = pf.page.locator("input[data-testid='contact-email']");
        this.phone_txt = pf.page.locator("input[data-testid='contact-phone']");
        this.continueToSeats_btn = pf.page.locator("button[data-testid='continue-to-seats']");

        // Seat selection page

        this.avaliable_seat_btn = pf.page.locator("button[data-status='available']").first();
        this.continue_payment_btn = pf.page.locator("button[data-testid='continue-to-payment']");
        this.act_name_txt = pf.page.locator("[data-testid='seat-pax-0']>span").first();
        this.bookedSeatNum_txt = pf.page.locator("[data-testid='seat-pax-0']>span").last();

        

        
    };


    async selectFastest(){
        cuf = new commonFunction(pf.page);
        await cuf.user_click(this.fastest_btn);

    }

    async clickOnBasicPrice()
    {
        cuf = new commonFunction(pf.page);
        await cuf.user_click(this.show_price_btn);
        await pf.page.waitForTimeout(2000);
        await cuf.user_click(this.basic_price_btn);
        await pf.page.waitForTimeout(2000);

    };

    async fillTravellerDetails(fname:string, lname:string, email:string, phone:string){
        await cuf.selectValuefromdrpIndex(this.title_drp,2);
        await cuf.enterText(this.firstname_txt,fname);
        await cuf.enterText(this.lastname_txt, lname);
        await cuf.enterText(this.email_txt, email);
        await cuf.enterText(this.phone_txt, phone);
        pf.page.waitForTimeout(5000);
        await cuf.user_click(this.continueToSeats_btn);
        pf.page.waitForTimeout(5000);

   }

   async getPassengerData(){
    await cuf.selectValuefromdrpIndex(this.title_drp,3);
    const passData = await cuf.readDataFromJson(passengerData,"passanger1");
    await cuf.enterText(this.firstname_txt,passData.firstname);
    await cuf.enterText(this.lastname_txt, passData.lastname);
    await cuf.enterText(this.email_txt,passData.email);
    await cuf.enterText(this.phone_txt,passData.phone);
    await pf.page.waitForTimeout(4000);
    await cuf.user_click(this.continueToSeats_btn);
    await pf.page.waitForTimeout(4000);
   }

   async selectSeat(){
    await cuf.user_click(this.avaliable_seat_btn);
    await pf.page.waitForTimeout(2000);
    await cuf.user_click(this.continue_payment_btn);
    await pf.page.waitForTimeout(2000);
   };

   async selectValueFromSidePanel(value:string){
    await this.nonStop_chk.filter({hasText:value}).click();
    await pf.page.waitForTimeout(2000);
   }

   async getAllfares(){
    let allflightFares = await this.allFlightFares_loc.all();
    for(let fare of allflightFares)
    {
        console.log(await fare.innerText());
    }

    let arrayFare = await this.allFlightFares_loc.allInnerTexts();
    console.log(arrayFare);

   }

    
}