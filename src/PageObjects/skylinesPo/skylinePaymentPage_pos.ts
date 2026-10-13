import { Page, Locator } from "@playwright/test";
import { commonFunction } from "../../commonUtilies/commonFunctions";
import { pageFixture as pf } from "../../hooks/pageFixers"; 


let cuf:commonFunction;
const filePath = "D:/PlayWright Projects/playwrightCucumber/playWrightHFWTypeScript/src/TestData/passangerData.json"
export class sklinePaymentPO{
    private readonly page;
    private readonly cardnum_txt;
    private readonly exp_date_txt;
    private readonly cvv_txt;
    private readonly payAmount_btn;

    private readonly pnr_num_txt;

    constructor(page:Page)
    { 
        this.page  = pf.page;
        this.cardnum_txt = pf.page.locator("input[data-testid='card-number']");
        this.exp_date_txt = pf.page.locator("input[data-testid='card-expiry']");
        this.cvv_txt = pf.page.locator("input[data-testid='card-cvv']");
        this.pnr_num_txt = pf.page.locator("p[data-testid='booking-pnr']");
        this.payAmount_btn = pf.page.locator("button[data-testid='pay-flight']");


    }

    async enterCardDetailsAndPay()
    {
        cuf = new commonFunction(pf.page);
        const cardData = await cuf.readDataFromJson(filePath,"cardDetails");
        await cuf.enterText(this.cardnum_txt,cardData.cardNumber);
        await cuf.enterText(this.exp_date_txt, cardData.expiryDate);
        await cuf.enterText(this.cvv_txt,cardData.cvv);
        await cuf.user_click(this.payAmount_btn);
        await pf.page.waitForTimeout(4000);
    }

    async bookingStatus(){
    
        const pnr_number = await cuf.getText(this.pnr_num_txt);
        console.log(`Booking confirmed PNR Number is: ${pnr_number}`);
    }
}