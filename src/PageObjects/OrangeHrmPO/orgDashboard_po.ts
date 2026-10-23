import { commonFunction } from "../../commonUtilies/commonFunctions";
import { pageFixture as pf } from "../../hooks/pageFixers";
import {expect, Locator, Page} from "@playwright/test";






export class dashboard_po{
    private readonly page;
    private readonly searchBox_loc;
    private readonly allLeftPanel_loc;
    private readonly userIcon_loc;
    private readonly userMenu_loc;
    private readonly qc_launchTitle;

    private readonly cuf:commonFunction;
    


    constructor(page:Page){
        this.page = pf.page;
        this.searchBox_loc = pf.page.locator("input[placeholder='Search']");
        this.allLeftPanel_loc = pf.page.locator('a>span');
        this.userIcon_loc = pf.page.locator('.oxd-userdropdown-name');
        this.userMenu_loc = pf.page.locator('.oxd-dropdown-menu>li>a');
        this.cuf = new commonFunction(pf.page);
        this.qc_launchTitle = pf.page.locator('.orangehrm-main-title');

        
    }

    async entertextSearchBox(value:string){
       
        await this.cuf.enterText(this.searchBox_loc, value)
    }

    async leftPanelText(){
    //    const leftPaneldata = await cuf.getNoOfElements(this.allLeftPanel_loc);
    //    console.log(leftPaneldata);
       
        const data = await this.cuf.getTextFromAllElements(this.allLeftPanel_loc);
        const exp_op = data.map(text=>text.trim());
        return exp_op;
    }

    async searchValueInLeftpanel(exp_value:string){
        const exp= await this.cuf.getText(this.allLeftPanel_loc);
        expect(exp).toEqual(exp_value);
        
    };

    async validateUserOptions()
    {
        
        await this.cuf.user_click(this.userIcon_loc);
        await pf.page.waitForTimeout(2000);
        const act_data = await this.cuf.getTextFromAllElements(this.userMenu_loc);
        //console.log(act_data);
        await pf.page.waitForTimeout(2000);
        await this.cuf.user_click(this.userIcon_loc);
        return act_data;
    };

    // Dynamic locator for the Quick launch menu
    dynamicLocQuickLaunch(menuItem:string){

        return this.page.locator(`button[title='${menuItem}']`)
    };

    async clickOnQuickLaunchMenu(me:string){
        
        await this.cuf.user_click(this.dynamicLocQuickLaunch(me))
    };

    async getQuickLauncTitle(expTitle:string){

        const title = await this.cuf.getText(this.qc_launchTitle);
        expect(title).toEqual(expTitle);
        console.log("This is actual title",title);
        console.log("This is expected title:",expTitle)
    }



}