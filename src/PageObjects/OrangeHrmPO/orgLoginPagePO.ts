import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator, expect} from "@playwright/test";

let cuf:commonFunction;


const orgLoginURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

export class OrgLoginPagePO{
    private readonly page;
    private readonly username_ip;
    private readonly password_ip;
    private readonly login_btn;
    private readonly dashboard_txt;
    private readonly admin_lnk;
    private readonly adpr_lnk;

   

    constructor(page:Page)
    {
        this.page= pf.page;
        this.username_ip = pf.page.locator("input[name='username']");
        this.password_ip = pf.page.locator("input[name='password']");
        this.login_btn = pf.page.locator("button[type='submit']");
        this.dashboard_txt = pf.page.locator("h6:has-text('Dashboard')");
        this.admin_lnk = pf.page.locator("a span:has-text('Admin')");
        this.adpr_lnk = pf.page.locator("a span");

    };


    async navigateToLoginPage(){
        cuf = new commonFunction(pf.page);
        await cuf.navigatingToURL(orgLoginURL);
    }

    async enter_username(username:string){
        await cuf.enterText(this.username_ip, username)
    }

    async enter_password(pwd:string)
    {
        await cuf.enterText(this.password_ip,pwd);
    }

    async clickOnLoginbtn()
    {
        await cuf.user_click(this.login_btn);
    }

    async getDashboardText()
    {
        const dashboard_exp = await cuf.getText(this.dashboard_txt);
        expect(dashboard_exp).toBe('Dashboard')
        console.log('User is successfully loginto Application')
        //await pf.page.waitForTimeout(4000);

    }

    async navigateToModule(moduleName:string)
    {
        const module_loc = this.admin_lnk.filter({hasText:moduleName});
        await cuf.user_click(module_loc);
    }
}