import { expect, Page } from "@playwright/test";
import { pageFixture as pf } from "../../hooks/pageFixers";
import { commonFunction } from "../../commonUtilies/commonFunctions";
let cuf:commonFunction
let username;

const JsonPath = "D:/PlayWright Projects/playwrightCucumber/playWrightHFWTypeScript/src/TestData/passangerData.json"

export class adminpo{

    private readonly page;
    private readonly module_lnk;
    private readonly systemUser_drps;
    private readonly options_loc;
    private readonly search_btn;
    private readonly adminPageSearchResult_loc;
    private readonly records_txt;


    // Add user in admin page
    private readonly admin_add;
    private readonly username_admin_txt;
    private readonly emp_nameauto_drp;
    private readonly save_btn;
    private readonly system_user_txt;
    private readonly adminPageSearchResultUser_loc;


    constructor(page:Page)
    {
        this.page = page;
        this.module_lnk = pf.page.locator("a span");
        this.systemUser_drps = pf.page.locator(".oxd-input-group");
        this.options_loc = pf.page.locator("[role='option'] span");
        this.search_btn = pf.page.locator("button:has-text('search')");
        // a span:has-text('Admin')
        //this.adminPageSearchResult_loc = pf.page.locator(".oxd-table-body .oxd-table-row--with-border > .oxd-table-cell:nth-child(3)");
        this.adminPageSearchResult_loc = pf.page.locator(".oxd-table-cell:nth-child(3)");
        this.adminPageSearchResultUser_loc = pf.page.locator(".oxd-table-cell:nth-child(2)");
        this.records_txt = pf.page.locator(".oxd-text--span").filter({hasText:'Records Found'});

        // Add admin user page
        this.admin_add = pf.page.locator(".oxd-button").filter({hasText:'Add'});
        this.username_admin_txt = pf.page.locator(".oxd-input-group"); // it will locate all the fields 
        this.emp_nameauto_drp = pf.page.locator("div[role='option']>span").first();
        this.save_btn = pf.page.locator("[type='submit']");
        this.system_user_txt = pf.page.locator("h5:has-text('System Users')");



    }

    async clickonAdmin(moduleName:string)
    {
        cuf = new commonFunction(pf.page)
        const adminlink = this.module_lnk.filter({hasText:moduleName});
        await cuf.user_click(adminlink);
    };

    async useroleDrp(value:string)
    {
        const userrole_drp = this.systemUser_drps.filter({hasText:'User Role'}).locator('.oxd-select-wrapper');
        await cuf.user_click(userrole_drp);
        await cuf.selectOptionFromDrp(this.options_loc, value);
        //await pf.page.waitForTimeout(4000);
    };

     async userStatuDrp(value:string)
    {
        const userrole_drp = this.systemUser_drps.filter({hasText:'Status'}).locator('.oxd-select-wrapper');
        await cuf.user_click(userrole_drp);
        await cuf.selectOptionFromDrp(this.options_loc, value);
        //await pf.page.waitForTimeout(4000);
    };

    async clickOnSerch()
    {
        await cuf.user_click(this.search_btn);
        await pf.page.waitForTimeout(2000);
    };

    async searchresults(role:string)
    {
        const data = await this.adminPageSearchResult_loc.allTextContents();
        data.forEach(role1=>{expect(role1.trim()).toBe(role)});

        let records_text= await cuf.getText(this.records_txt); // This will give the text of how many records found (32) Records Found
        const match = records_text.match(/\d+/); // Here it will check any digits are present \d+ ==> this is reg ex
        const no_ofexprecords = match ? parseInt(match[0],10):0; // if any number is found then it will extract that number
        //console.log(`Total search results found ${no_ofrecords}`);
        //console.log(await this.adminPageSearchResult_loc.count(),"Actual reports found");

        let no_actrecords = await this.adminPageSearchResult_loc.count();

        expect(no_actrecords).toBe(no_ofexprecords);
        console.log(`The Acutal repords found by filter ${no_actrecords} and displayed records ${no_ofexprecords}`);
        
        
    };


    async addAdminUser(){
        await cuf.user_click(this.admin_add);
        
    }

    async searchData(searchdata:string){
        const data = await this.adminPageSearchResultUser_loc.allInnerTexts();
        for(let op of data)
        {
            if(op === searchdata)
            {
                console.log(`Record found ${op}`);
                break;
            }
        }
    }
   

    async fillAdminNewUser(){
        const adminData = await cuf.readDataFromJson(JsonPath,"adminUser");
        await pf.page.waitForTimeout(2000);
        await this.useroleDrp(adminData.role);
        await this.userStatuDrp(adminData.status);
         await pf.page.waitForTimeout(2000);
        // const userrole_drp = this.systemUser_drps.filter({hasText:'User Role'}).locator('.oxd-select-wrapper');
        const username_loc = this.username_admin_txt.filter({hasText:'Username'}).locator('input');
        const password_loc = this.username_admin_txt.filter({hasText:/^Password$/}).locator('input');
        const cnf_password_loc = this.username_admin_txt.filter({hasText:/^Confirm Password$/}).locator('input');
        const emp_name = this.username_admin_txt.filter({hasText:/^Employee Name$/}).locator('input');

        // Generating the random username
        username = await cuf.generateRandomString(7);
        console.log(username);
        await cuf.enterText(username_loc, username);
        await pf.page.waitForTimeout(1000);
        await cuf.enterText(password_loc,adminData.password);
        await pf.page.waitForTimeout(1000);
        await cuf.enterText(cnf_password_loc,adminData.password);
        await cuf.enterText(emp_name,adminData.empName);
        await cuf.user_click(this.emp_nameauto_drp);
        await pf.page.waitForTimeout(3000);
        await cuf.user_click(this.save_btn);
        await pf.page.waitForTimeout(4000);
        await cuf.waitForElement(this.records_txt);
        const data = await cuf.getText(this.records_txt);
        console.log(data);
        await this.searchData(username);

    };




    
}
