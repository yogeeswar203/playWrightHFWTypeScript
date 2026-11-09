import { expect, Page } from "@playwright/test";
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


    // Add user in admin page
    


    constructor(page:Page)
    {
        // calling the another methods
        this.page = page;
        this.cuf = new commonFunction(pf.page);
        this.orgDirctory = new directory_po(pf.page);

        // Defining the actual elements with proper id
        this.apply_btn = pf.page.getByRole('link',{name:'Apply'});
        this.apply_header = pf.page.getByRole('heading',{name:'Apply Leave'});
        this.leaveBalance_txt = pf.page.locator('h6+hr+p');
        this.leaveType_txt = pf.page.locator('.oxd-input-group__label-wrapper>label').first();
        // this.jobTitle_loc = pf.page.locator("[role='option'] span");
        this.valufromAnyDrp_loc = pf.page.locator("[role='option'] span");

    };


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
            console.log(leaveTypeText);
        }
        
    };

    async selectLeaveTypedrp(){
        const loc = this.orgDirctory.dynamicLocFromDropDowns('Leave Type');
        await this.cuf.user_click(loc);
        
        await this.cuf.selectOptionFromDrp(this.valufromAnyDrp_loc, 'US - Personal');
        await this.page.waitForTimeout(3000);
    }


   
   

    
}
