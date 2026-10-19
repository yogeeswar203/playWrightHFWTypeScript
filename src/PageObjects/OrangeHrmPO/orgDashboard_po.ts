import { commonFunction } from "../../commonUtilies/commonFunctions";
import { pageFixture as pf } from "../../hooks/pageFixers";
import {expect, Page} from "@playwright/test";

let cuf:commonFunction;




export class dashboard_po{
    private readonly page;
    private readonly searchBox_loc;
    private readonly allLeftPanel_loc;
    private readonly userIcon_loc;
    private readonly userMenu_loc


    constructor(page:Page){
        this.page = pf.page;
        this.searchBox_loc = pf.page.locator("input[placeholder='Search']");
        this.allLeftPanel_loc = pf.page.locator('a>span');
        this.userIcon_loc = pf.page.locator('.oxd-userdropdown-name');
        this.userMenu_loc = pf.page.locator('.oxd-dropdown-menu>li>a');
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
        const exp_op = data.map(text=>text.trim());
        return exp_op;
    }

    async searchValueInLeftpanel(exp_value:string){
        const exp= await cuf.getText(this.allLeftPanel_loc);
        expect(exp).toEqual(exp_value);
        
    };

    async validateUserOptions()
    {
        cuf = new commonFunction(pf.page)
        await cuf.user_click(this.userIcon_loc);
        await pf.page.waitForTimeout(2000);
        const act_data = await cuf.getTextFromAllElements(this.userMenu_loc);
        //console.log(act_data);
        await pf.page.waitForTimeout(2000);
        await cuf.user_click(this.userIcon_loc);
        return act_data;
    }
}