import {pageFixture as pf} from "../hooks/pageFixers";
import {test, expect, Page, Locator} from "@playwright/test";
import {setDefaultTimeout} from "@cucumber/cucumber";
import * as fs from "fs";


//Setting the default time out to 60 sec
setDefaultTimeout(60*1000);


export class commonFunction{
    private readonly page:Page;

    // initiating the constructor
    constructor(page:Page){
        this.page = pf.page;
    }; 

    // setting the network ideal reusable method

    async networkIdle(){
        await pf.page.waitForLoadState("networkidle");
    };

    // Navigating any given URL
    async navigatingToURL(url:string) {
        await pf.page.goto(url);
        await pf.page.waitForTimeout(2000);
        await this.networkIdle();
    };

    async enterText(locator:Locator, data:string){
        await expect(locator).toBeEnabled();
        await locator.fill(data);
        await this.networkIdle();
    };



    async user_click(locator:Locator)
    {
        await locator.click();
        await this.networkIdle();
    };

    // getting the text from the browser
    async getText(locator:Locator){
        const text = (await locator.innerText()).trim();
        return text;
    };

    // getting the attribute value

    async getAttributeValue(locator:Locator, attributeName:string){
        const attributeValue = locator.getAttribute(attributeName);
        return attributeValue;
    }

    async selectValueFromDropdown(locator:Locator,optionLabel:string)
    {
        await locator.selectOption({label:optionLabel});
        //await this.networkIdle();
    };

    async staticWait(timeOut:number)
    {
        pf.page.waitForTimeout(timeOut);
    };

    async getNoOfElements(locator:Locator)
    {
        const no_elements = (await locator.all()).length;
        return no_elements;
    };

    async selectValuefromdrpIndex(locator:Locator, indexval:number)
    {
        await locator.selectOption({index:indexval});
        this.networkIdle();

    }

    async readDataFromJson(filePath:string, passangerno:string){
        const rawData = JSON.parse(fs.readFileSync(filePath,'utf-8'));
        const fieldData = rawData[passangerno];
        return fieldData;

    }

    async selectOptionFromDrp(locator:Locator, value:string)
    {
        const data = await locator.all();
       for(let op of data)
       {
        if((await op.innerText()) === value)
        {
            await op.click();
            break;
        }
       }
    };

}