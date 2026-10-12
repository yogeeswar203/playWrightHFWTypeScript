import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator, expect} from "@playwright/test";

let cuf:commonFunction;

export class skSearchPagePO{
    private readonly page;
    private readonly cheapest_btn;
    private readonly fastest_btn;
    private readonly earliest_btn;
    private readonly show_price_btn;
    private readonly basic_price_btn;
    private readonly flex_price_btn;

    constructor(page:Page)
    {
        this.page= pf.page;
        this.cheapest_btn = pf.page.locator('button',{hasText:'cheapest'});
        this.fastest_btn = pf.page.locator('button',{hasText:'fastest'});
        this.earliest_btn = pf.page.locator('button',{hasText:'earliest'});
        this.show_price_btn = pf.page.locator("button[data-testid='select-flight']").first();
        this.basic_price_btn = pf.page.locator("button[data-testid='fare-basic']");
        this.flex_price_btn = pf.page.locator("button[data-testid='fare-flex']");

        
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

    }


   

    
}