import {expect, test} from '@playwright/test';
import { MenuPage } from '@pages/menu-page';
import { CartPage } from '@pages/cart-page';
import { PaymentModal } from '@modal/payment-detail-modal';
import { SuccessfulModal } from '@modal/successful-modal';
import {ClearTheCartTestData as Data} from './data/successful-payment-clear-the-cart-data'

test.describe('Verify successful payment clear the cart', ()=>{
    let menuPage : MenuPage;
    let cartPage : CartPage;
    let paymentModal : PaymentModal;
    let successfulModal : SuccessfulModal;

    test.beforeEach(({page})=>{
        menuPage = new MenuPage(page);
        cartPage = new CartPage(page);
        paymentModal = new PaymentModal(page);
        successfulModal = new SuccessfulModal(page);
    })

    test.afterEach(async()=>{
        expect(await menuPage.isPaymentModalHidden()).toBe(true);
        expect(await menuPage.getCartLinkText()).toEqual(Data.navLinkToCartText);
        expect(await menuPage.getTotalButtonText()).toEqual(Data.buttonTitle);
        expect(await menuPage.isSuccessfulPopuppVisible()).toBe(true);
        expect(await successfulModal.getMessageText()).toEqual(Data.successfulMessage); 
    });

    test('After successful payment the cart should be empty (one item in the cart)', async()=>{
        await menuPage.visit();
        await menuPage.clickOnDrink(Data.drinks[0]);
        await menuPage.goToCartPage();
        await cartPage.clickOnTotalButton();
        await paymentModal.enterName(Data.validNames[0]);
        await paymentModal.enterEmail(Data.validEmails[0]);
        await paymentModal.clickSubmit();       
    });

     test('After successful payment the cart should be empty (three items in the cart)', async()=>{
        await menuPage.visit();
        await menuPage.clickOnDrink(Data.drinks[1]);
        await menuPage.clickOnDrink(Data.drinks[2]);
        await menuPage.clickOnDrink(Data.drinks[3]);
        await menuPage.goToCartPage();
        await cartPage.clickOnTotalButton();
        await paymentModal.enterName(Data.validNames[1]);
        await paymentModal.enterEmail(Data.validEmails[1]);
        await paymentModal.clickSubmit();      
    });
});
