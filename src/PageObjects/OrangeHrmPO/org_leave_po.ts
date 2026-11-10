import { expect, Locator, Page } from "@playwright/test";
import { pageFixture as pf } from "../../hooks/pageFixers";
import { commonFunction } from "../../commonUtilies/commonFunctions";
import{directory_po} from "../OrangeHrmPO/orgDirectry_po"

let cuf:commonFunction
let username;

const JsonPath = "D:/PlayWright Projects/playwrightCucumber/playWrightHFWTypeScript/src/TestData/passangerData.json"

export class leavePo{

    private readonly page;
    private readonly cuf;
    private readonly orgDirctory;


    // Declaring the locators
    private readonly apply_btn;
    private readonly apply_header;
    private readonly leaveBalance_txt;
    private readonly leaveType_txt;
    private readonly valufromAnyDrp_loc;
    private readonly entit_loc;
    private readonly emp_name_drp;
    private readonly save_btn;
    private readonly cancel_btn;
    private readonly confirm_btn;
    private readonly fromDate_loc;
    private readonly toDate_loc



    // Add user in admin page
    


    constructor(page:Page)
    {
        // calling the another methods
        this.page = page;
        this.cuf = new commonFunction(pf.page);
        this.orgDirctory = new directory_po(pf.page);

        // Defining the actual elements with proper id
        this.apply_btn = pf.page.getByRole('link',{name:'Apply'});
        this.entit_loc = pf.page.getByRole('link',{name:'Entitlements '});
        this.apply_header = pf.page.getByRole('heading',{name:'Apply Leave'});
        this.leaveBalance_txt = pf.page.locator('h6+hr+p');
        this.leaveType_txt = pf.page.locator('.oxd-input-group__label-wrapper>label').first();
        // this.jobTitle_loc = pf.page.locator("[role='option'] span");
        this.valufromAnyDrp_loc = pf.page.locator("[role='option'] span");
        this.emp_name_drp = pf.page.locator("div[role='option']>span").first()
        this.save_btn =   pf.page.locator("button[type='submit']");
        this.cancel_btn = pf.page.locator("button[type='button']").filter({hasText:'Cancel'});
        this.confirm_btn = pf.page.locator("button[type='button']").filter({hasText:'Confirm'});
        this.fromDate_loc = pf.page.locator('.oxd-date-input>input').first();
        this.toDate_loc = pf.page.locator('toDate_loc')


    };

    // Resubale dynamic locator for top menu in the leave tab
        dynamicLocForTopMenu(value:string):Locator{
        const top_menuLeavePage_loc = pf.page.getByRole('link',{name:value});
        return top_menuLeavePage_loc;
    };

    // Dynamic loc for the top menu drp downs

    dynamicLocFordrops(value:string){
        const loc = pf.page.locator("span.oxd-topbar-body-nav-tab-item").filter({hasText:value});
        return loc;
    };

    dynamicLocForMenuItem(value:string){
        const menuItem = pf.page.getByRole('menuitem',{name:value})
        return menuItem;
    }

    // Dynamic locator for emp filling data
    dynamicLocforAddEntit(value:string){
        const exactMatchRegex = new RegExp(`^${value}$`);
        const matching_locator = this.page.locator('.oxd-input-group')
                                .filter({has:this.page.locator('label',{hasText:exactMatchRegex})})
                                .locator('input');

        return matching_locator;
    }


    async clickOnApplyBtn(){
        await this.cuf.user_click(this.apply_btn);
    };

    async verifyleaveBalance(expValue:string){
        if(await this.leaveBalance_txt.isVisible())
        {
            let act_leave_bal = await this.cuf.getText(this.leaveBalance_txt)
            expect(act_leave_bal).toBe(expValue);
        }else
        {

            await expect(this.leaveType_txt).toBeVisible();
            let leaveTypeText = await this.cuf.getText(this.leaveType_txt);
            console.log('Apply leave page is displayed hence continuing the execution',leaveTypeText);
            await this.selectLeaveTypedrp();
        }
        
    };

    async selectLeaveTypedrp(value?:string){
        const loc = this.orgDirctory.dynamicLocFromDropDowns('Leave Type');
        await this.cuf.user_click(loc);
        
        await this.cuf.selectOptionFromDrp(this.valufromAnyDrp_loc, 'CAN - Vacation');
        await this.page.waitForTimeout(3000);
    };

    async selectLeaveTypeFromdrp(value:string){
        const loc = this.orgDirctory.dynamicLocFromDropDowns('Leave Type');
        await this.cuf.user_click(loc);
        
        await this.cuf.selectOptionFromDrp(this.valufromAnyDrp_loc, value);
        await this.page.waitForTimeout(3000);
    };




    async clickOnEntitlement()
    {
        const entitle_loc = this.dynamicLocFordrops('Entitlements');
        
        await this.cuf.user_click(entitle_loc);
        await this.page.waitForTimeout(1000);
        const menuItem = this.dynamicLocForMenuItem('Add Entitlements');
        await this.cuf.user_click(menuItem)
        await this.page.waitForTimeout(1000);
    
    }

    async fillAddEntitltiment(value:string){
        const empName_loc = this.dynamicLocforAddEntit('Employee Name');
        
        await this.cuf.enterText(empName_loc,'test');
        await this.cuf.user_click(this.emp_name_drp);
        await pf.page.waitForTimeout(1000);
        const leaveType_drp = await this.cuf.readDataFromJson(JsonPath,"deletionUser");
        console.log(leaveType_drp.username);
        await this.selectLeaveTypeFromdrp(leaveType_drp.username);
        const Entitlement_loc = this.dynamicLocforAddEntit('Entitlement');
        this.cuf.enterText(Entitlement_loc,value);
        await pf.page.waitForTimeout(1000);

        

    };

    async submitCancel(){
        // After clicking on save button dailog box will come that we need to register first and click on save
        
        
        await pf.page.waitForTimeout(2000);
      
        await this.cuf.user_click(this.save_btn);
        await pf.page.waitForTimeout(2000);
            
    };

    async confirmTheChanges(){
        await this.cuf.user_click(this.confirm_btn);
        await pf.page.waitForTimeout(2000);
        await pf.page.locator('.loading-spinner').waitFor({ state: 'detached' });
        const loc = pf.page.locator('span.oxd-text--span').filter({hasText:'Total'});
        await expect(loc).toBeVisible();
        let msg = await loc.innerText();
        console.log(msg)

    }

    async selectdates(FromDate:string, ToDate:string)
    {
        // fromdate_loc = pf.page.locator('.oxd-date-input>input')
        
        const fromDate = this.page.locator('.oxd-input-group')
        // 2. Filter to find the specific group containing the "From Date" label
        .filter({ has: this.page.locator('label', { hasText: 'From Date' }) })
        // 3. Locate the actual input field inside that group
        .locator('input');
        await this.cuf.enterText(fromDate,FromDate);
        await pf.page.waitForTimeout(2000);
        const ToDate_loc = this.page.locator('.oxd-input-group')
        // 2. Filter to find the specific group containing the "From Date" label
        .filter({ has: this.page.locator('label', { hasText: 'To Date' }) })
        // 3. Locate the actual input field inside that group
        .locator('input');
        await this.cuf.enterText(ToDate_loc,ToDate);
        await pf.page.waitForTimeout(2000);

        await this.cuf.user_click(this.save_btn);


        

    }


   
   

    
}
