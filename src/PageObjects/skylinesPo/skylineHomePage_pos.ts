import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator, expect} from "@playwright/test";

let cuf:commonFunction;


const url = "https://www.practiceqaautomation.com/apps/flights";

export class dempapplogin{
    private readonly page;
    private readonly oneway_btn;
    private readonly from_btn;
    private readonly from_select_drp;
    private readonly to_btn;
    private readonly to_select_drp;
    private readonly depatureDate_btn;
    private readonly passanger_btn;
    private readonly cabin_drp;
    private readonly searchFlight_btn;
    private readonly no_of_flights_loc;
    private readonly no_of_flightsExp_loc;
    private readonly swap_btn;
   

    constructor(page:Page)
    {
        this.page= pf.page;
        this.oneway_btn = pf.page.locator("button[data-testid='trip-oneway']");

        this.from_btn = pf.page.locator("input[id='from-city']");
        this.from_select_drp = pf.page.locator("ul[data-testid='from-suggestions']>li")

        this.to_btn = pf.page.locator("input[id='to-city']");
        this.to_select_drp = pf.page.locator("ul[data-testid='to-suggestions']>li");

        this.depatureDate_btn = pf.page.locator("button[data-testid='depart-day']");
        this.passanger_btn = pf.page.locator("");

        this.cabin_drp = pf.page.locator("select[id='cabin-class']");
        this.searchFlight_btn = pf.page.locator("button[data-testid='search-flights']");
 
        this.no_of_flights_loc = pf.page.locator("ul[data-testid='flight-list']>li");
        this.no_of_flightsExp_loc =pf.page.locator("p[data-testid='flight-count']");

        this.swap_btn = pf.page.locator("button[aria-label='Swap cities']");

        
    };


    async navigateToDemoPage(){
        cuf = new commonFunction(pf.page);
        await cuf.navigatingToURL(url);

    };


    // Selecting the from and to city from the auto selective dropdown

    async selectCities(fromCity:string, toCity:string){
        await cuf.enterText(this.from_btn,fromCity)
        await cuf.user_click(this.from_select_drp.first());

        await cuf.enterText(this.to_btn, toCity)
        await cuf.user_click(this.to_select_drp.first());
    }

    // Selecting depature date

    async selectDepatureDate()
    {
        await cuf.user_click(this.depatureDate_btn.first());
    }

    async selectCabin(label:string)
    {   
        await cuf.selectValueFromDropdown(this.cabin_drp, label);
    }

    async clickOnFlighSearch(){
        await cuf.user_click(this.searchFlight_btn);
    }

    async noOfFlightValidation(){
        const no_ofFlights_act1 = await cuf.getText(this.no_of_flightsExp_loc);
        const noOfFlightExp = await cuf.getNoOfElements(this.no_of_flights_loc)

        const no_ofFlights_act = no_ofFlights_act1.split(" ");
        const result = parseInt(no_ofFlights_act1);
        //console.log(no_ofFlights_act[0]);
        expect(noOfFlightExp).toBe(result);
        console.log(`The Acutal flight count is ${result} and expected flight count is ${noOfFlightExp}`);
       
    };

    async getFromToCityValue(){
        const from_city = await cuf.getAttributeValue(this.from_btn,'value');
        const to_city = await cuf.getAttributeValue(this.to_btn,'value');
        console.log(`From City: ${from_city} and ${to_city}`);
    }

    async ValidateSwappedCities(){
        const from_city = await cuf.getAttributeValue(this.from_btn,'value');
        const to_city = await cuf.getAttributeValue(this.to_btn,'value');
        console.log(`From City: ${from_city} and ${to_city}`);
        await cuf.user_click(this.swap_btn);
        const from_city_asp = await cuf.getAttributeValue(this.from_btn,'value');
        const to_city_asp = await cuf.getAttributeValue(this.to_btn,'value');
        console.log(`From City: ${from_city} and ${to_city}`);
        expect(from_city).toBe(to_city_asp);
        expect(to_city).toBe(from_city_asp);

    };

    
}