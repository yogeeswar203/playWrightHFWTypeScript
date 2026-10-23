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
    private readonly cuf:commonFunction


    // Add user in admin page
    private readonly admin_add;
    private readonly username_admin_txt;
    private readonly emp_nameauto_drp;
    private readonly save_btn;
    private readonly system_user_txt;
    private readonly adminPageSearchResultUser_loc;
    private  text;
    private readonly deleteIcon;
    private readonly deleteIcon2;


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
        this.records_txt = pf.page.locator(".oxd-text--span").filter({hasText:'Found'});

        // Add admin user page
        this.admin_add = pf.page.locator(".oxd-button").filter({hasText:'Add'});
        this.username_admin_txt = pf.page.locator(".oxd-input-group"); // it will locate all the fields 
        this.emp_nameauto_drp = pf.page.locator("div[role='option']>span").first();
        this.save_btn = pf.page.locator("[type='submit']");
        this.system_user_txt = pf.page.locator("h5:has-text('System Users')");
        this.text = "";
        this.deleteIcon = pf.page.locator('.bi-trash');
        this.deleteIcon2 = pf.page.locator('.orangehrm-modal-footer button i');

        // calling the another methods
        this.cuf = new commonFunction(pf.page);


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
        await this.cuf.user_click(this.search_btn);
        await pf.page.waitForTimeout(2000);
        await pf.page.locator('.loading-spinner').waitFor({ state: 'detached' });
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
        console.log(data);
        for(let op of data)
        {
            if(op === searchdata)
            {
                console.log(`Record found ${op}`);
                break;
            }else{
                console.log(`Data not found ${op}`)
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
        //username = await cuf.generateRandomString(7);
        this.text = await cuf.generateRandomString(7);
        //console.log(username);
        await cuf.enterText(username_loc, this.text);
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
        await this.searchData(this.text);

    };

    async newUserSearch(){
        //const userrole_drp = this.systemUser_drps.filter({hasText:'User Role'}).locator('.oxd-select-wrapper');
        console.log("This is entered text:",this.text);
        const searchUsername = this.systemUser_drps.filter({hasText:'Username'}).locator('input');
        await cuf.enterText(searchUsername,this.text);
        await cuf.user_click(this.search_btn);
        await pf.page.waitForTimeout(3000);
        await this.searchData(this.text);
    }

    async clickOnSaveButton(){
        await cuf.user_click(this.save_btn);
        await pf.page.locator('.loading-spinner').waitFor({ state: 'detached' });
    }
    async errorValidation(){
       
        let dataValidation:string[] = [];
        // Locators for all the required fields
        const userrole_req_loc = this.username_admin_txt.filter({hasText:'User Role'}).locator('span');
        const emp_req_loc = this.username_admin_txt.filter({hasText:'Employee Name'}).locator('span');
        const status_req_loc = this.username_admin_txt.filter({hasText:'Status'}).locator('span');
        const username_req_loc = this.username_admin_txt.filter({hasText:'Username'}).locator('span');
        const pwd_req_loc = this.username_admin_txt.filter({hasText:/^Password$/}).locator('.oxd-input-field-error-message');
        //const password_loc = this.username_admin_txt.filter({hasText:/^Password$/}).locator('input');
        const cnfPwd_req_loc = this.username_admin_txt.filter({hasText:/^Confirm Password$/}).locator('.oxd-input-field-error-message');

        const passwordError = this.username_admin_txt
    .filter({ has: pf.page.locator('label', { hasText: /^Password$/ }) }) // Exact match to avoid "Confirm Password"
    .locator('.oxd-input-field-error-message'); 
    const cnfpasswordError = this.username_admin_txt
    .filter({ has: pf.page.locator('label', { hasText: 'Confirm Password'}) }) // Exact match to avoid "Confirm Password"
    .locator('.oxd-input-field-error-message');

        const userRoleText = await cuf.getText(userrole_req_loc);
        const empReqText = await cuf.getText(emp_req_loc);
        const statusText = await cuf.getText(status_req_loc);
        const usernameText = await cuf.getText(username_req_loc);
        const pwdText = await cuf.getText(passwordError);
        const cnfPwdText = await cuf.getText(cnfpasswordError);

        
        dataValidation.push(userRoleText,empReqText,statusText,usernameText, pwdText,cnfPwdText);
        

        for(let op of dataValidation)
        {
            if(op === 'Required')
            {
                //console.log('All the elements are showing as required')
            }else if( op = 'Passwords do not match')
            {
                //console.log('Confirm validation also showing required')
            }else
            {
                console.log("some of the fields are not matching ", dataValidation)
            }
        }
        //console.log(dataValidation);
        
    };

    async searchUser(){
        const searchUserName = await cuf.readDataFromJson(JsonPath,'deletionUser');
        const searchUsername_loc = this.systemUser_drps.filter({hasText:'Username'}).locator('input');
        await cuf.enterText(searchUsername_loc, searchUserName.username);
        await this.clickOnSerch();
        await pf.page.waitForTimeout(4000);
        
        


        
    };

    async deleteIconClick(){
        await cuf.user_click(this.deleteIcon);
        await pf.page.waitForTimeout(4000);
        
    }

    async deleteConfirmation(){
        await cuf.user_click(this.deleteIcon2);
        await pf.page.waitForTimeout(4000);
    }


    async recordsFound(){
        const record_txt = await this.cuf.getText(this.records_txt);
        const record_txt2 = record_txt.match(/\d+/);
        const no_ofrecords_final = record_txt2 ? parseInt(record_txt2[0],10):0;
        console.log("Total records found:",no_ofrecords_final);

        //const match = records_text.match(/\d+/); // Here it will check any digits are present \d+ ==> this is reg ex
        //const no_ofexprecords = match ? parseInt(match[0],10):0; 
        return no_ofrecords_final;
    }
   

    
}
