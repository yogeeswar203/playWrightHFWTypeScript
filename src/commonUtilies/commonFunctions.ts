import {pageFixture as pf} from "../hooks/pageFixers";
import {test, expect, Page, Locator} from "@playwright/test";
import {setDefaultTimeout} from "@cucumber/cucumber";


//Setting the default time out to 60 sec
setDefaultTimeout(60*1000);

export class commonFunction{
    private readonly page:Page;

    // initiating the constructor
    constructor(page:Page){
        this.page = pf.page;
    }

    // setting the network ideal reusable method

    async networkIdle(){
        await pf.page.waitForLoadState("networkidle");
    }

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

    async userClick(locator:Locator, forceClick=false)
    {
        // This will make playwright will automatically wait for enabled and visible
        await locator.click({force:forceClick});
        await this.networkIdle();
        // try{
        //     await this.networkIdle();
        // }catch
        // {
        //     console.warn('Network wait skipped: Page likely navigated away after click.');
        // }
    };

    async user_click(locator:Locator)
    {
        await locator.click();
        await this.networkIdle();
    }

    // getting the text from the browser
    async getText(locator:Locator){
        const text = (await locator.innerText()).trim();
        return text;
    }

    async selectValueFromDropdown(locator:Locator,optionLabel:string)
    {
        await locator.selectOption({label:optionLabel});
        //await this.networkIdle();
    }

    async staticWait(timeOut:number)
    {
        pf.page.waitForTimeout(timeOut);
    };

    async getNoOfElements(locator:Locator)
    {
        const no_elements = (await locator.all()).length;
        return no_elements;
    }

}