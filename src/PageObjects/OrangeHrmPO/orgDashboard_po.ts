import { commonFunction } from "../../commonUtilies/commonFunctions";
import { pageFixture as pf } from "../../hooks/pageFixers";
import {Page} from "@playwright/test";

let cuf:commonFunction;




export class dashboard_po{
    private readonly page;
    private readonly searchBox_loc;
    private readonly allLeftPanel_loc;


    constructor(page:Page){
        this.page = pf.page;
        this.searchBox_loc = pf.page.locator("input[placeholder='Search']");
        this.allLeftPanel_loc = pf.page.locator('a>span');
    }

    async entertextSearchBox(value:string){
        cuf = new commonFunction(pf.page)
        await cuf.enterText(this.searchBox_loc, value)
    }

    async leftPanelText(){
    //    const leftPaneldata = await cuf.getNoOfElements(this.allLeftPanel_loc);
    //    console.log(leftPaneldata);
        cuf = new commonFunction(pf.page)
       const data = await cuf.getTextFromAllElements(this.allLeftPanel_loc);
       return data;
    }
}