import { commonFunction } from "../../commonUtilies/commonFunctions";
import { pageFixture as pf } from "../../hooks/pageFixers";
import {expect, Locator, Page} from "@playwright/test";
import { OrgLoginPagePO } from "./orgLoginPagePO";
import { adminpo } from "./org_admin_po";



const JsonPath = "D:/PlayWright Projects/playwrightCucumber/playWrightHFWTypeScript/src/TestData/passangerData.json"



export class directory_po{
    private readonly page;
    private readonly cuf:commonFunction;
    private readonly orglp_po: OrgLoginPagePO;
    private readonly orgAdmin_po:adminpo
    private readonly emp_name_drp;
    private readonly jobTitle_loc;
    private selectedEmp;
    private readonly emp_name_drp_all;

    


    constructor(page:Page){
        this.page = pf.page;

        // Below are the pages calling here so we can re-use the methods
        this.cuf = new commonFunction(pf.page);
        this.orglp_po = new OrgLoginPagePO(pf.page);
        this.orgAdmin_po = new adminpo(pf.page);

        // Below are the elements
        this.emp_name_drp = pf.page.locator("div[role='option']>span").first()
        this.emp_name_drp_all = pf.page.locator("div[role='option']");
        this.jobTitle_loc = pf.page.locator("[role='option'] span");
        this.selectedEmp = pf.page.locator("div[class='orangehrm-directory-card-top']+p");
        
    
       
    };

    async clickOnDirectory(moduleName:string){
        let module_locator = this.orglp_po.dynamicLocforLeftpanel(moduleName);
        await this.cuf.user_click(module_locator);
        await pf.page.waitForTimeout(2000);


    };
   
        dynamicLocForDirectorySearch(searchFieldName:string)
    {
        //const nameMatch = new RegExp(`^${searchFieldName}`);
        //const exactMatchRegex = new RegExp(`^${searchFieldName}$`);
        //return this.page.locator('label',{hasText:exactMatchRegex}).locator('input')

        const exactMatchRegex = new RegExp(`^${searchFieldName}$`);
        const matching_locator = this.page.locator('.oxd-input-group')
                                .filter({has:this.page.locator('label',{hasText:exactMatchRegex})})
                                .locator('input')
        //return this.page.locator('.oxd-input-group').filter({ has: this.page.locator('label', { hasText: exactMatchRegex }) }).locator('input');

        return matching_locator;
    };

    dynamicLocFromDropDowns(value:string)
    {
        // pf.page.locator(".oxd-input-group");
        // const userrole_drp = this.systemUser_drps.filter({hasText:'Status'}).locator('.oxd-select-wrapper');

    
        const matchingLoc = pf.page.locator('.oxd-input-group')
                            .filter({hasText:value})
                            .locator('.oxd-select-wrapper');

        
        
        return matchingLoc;

    }


    async enterTextEmp(EmployeeName:string){
        let empName = this.dynamicLocForDirectorySearch(EmployeeName)

        // if yoou want get the data from the JSON file below is the method
        let empSearchName = await this.cuf.readDataFromJson(JsonPath,"adminUser");
        await pf.page.waitForTimeout(2000);
        await this.cuf.enterText(empName,'test');

        // if you want select the 1st search result
        await this.cuf.user_click(this.emp_name_drp);
        await pf.page.locator('.loading-spinner').waitFor({ state: 'detached' });
        const data = await this.cuf.getTextFromAllElements(this.emp_name_drp_all);
        
        for(let op of data)
        {
            if(op ==="No Records Found")
            {
                console.log("No Records Found");
                break;
            }else
            {
                this.cuf.user_click(this.emp_name_drp);
                break;
            }
        }
        
        
    };

    async selectJobTitle(){
        const jbTitle = this.dynamicLocFromDropDowns('Job Title');
        await this.cuf.user_click(jbTitle);
        await this.page.waitForTimeout(2000);
        await this.cuf.selectOptionFromDrp(this.jobTitle_loc,'Content Specialist');
    };

    async selectLocation()
    {
        const location = this.dynamicLocFromDropDowns('Location');
        await this.cuf.user_click(location);
        await this.cuf.selectOptionFromDrp(this.jobTitle_loc,'Texas R&D');
    }

    async clickOnSearch(){
        await this.orgAdmin_po.clickOnSerch();
        //console.log("Selected employee",await this.cuf.getText(this.selectedEmp));
 
    };

    async validateSearchResults(){
        const no_ofRec = await this.orgAdmin_po.recordsFound();
        expect(no_ofRec).toEqual(1);
        //console.log("Expected 2")
    }

}