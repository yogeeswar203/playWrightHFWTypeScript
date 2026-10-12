import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator} from "@playwright/test";

let cuf:commonFunction;


const url = "https://sauce-demo.myshopify.com/";

export class dempapplogin{
    private readonly page;

   

    constructor(page:Page)
    {
        this.page= pf.page;
       
        
    };


    async navigateToDemoPage(){
        cuf = new commonFunction(pf.page);
        await cuf.navigatingToURL(url);
    };

    
}