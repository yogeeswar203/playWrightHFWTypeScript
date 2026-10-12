import {pageFixture as pf} from "../../hooks/pageFixers";
import {commonFunction} from "../../commonUtilies/commonFunctions";
import {test, Page, Locator} from "@playwright/test";

let cuf:commonFunction;


const orgLoginURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

export class OrgLoginPagePO{
    private readonly page;
    private readonly username_ip;
    private readonly password_ip;
    private readonly login_btn;
   

    constructor(page:Page)
    {
        this.page= pf.page;
        this.username_ip = pf.page.locator("input[name='username']");
        this.password_ip = pf.page.locator("input[name='password']");
        this.login_btn = pf.page.locator("button[type='submit']");
        
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

}