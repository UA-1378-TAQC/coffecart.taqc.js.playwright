import {Locator, Page} from '@playwright/test';

const SELECTORS = {
    drinkElement: (drinkName: string) => `//*[@id='app']/div[2]/ul/li/h4[normalize-space(text())='${drinkName}']/following-sibling::*`,
    cartPageLink: "//a[@aria-label='Cart page']",
    totalButton: "//button[@class='pay']",
    plusButtonCartModal: "//*[@id='app']/div[2]/div[1]/ul/li/div[2]/button[1]",
    minusButtonCartModal: "//*[@id='app']/div[2]/div[1]/ul/li/div[2]/button[2]",
    paymentModal: "//div[@class='modal']",
    successfulPopup: "//div[contains(@class,'snackbar success')]",
    popup: "//*[@class='promo']",
    getDrinkSibling: (drinkName: string): string =>
        `//h4[normalize-space(text())='${drinkName}']/following-sibling::*[1]`,
};

export class MenuPage {
    private readonly page: Page;
    private readonly drinkElement: (drinkName: string) => Locator;
    private readonly cartPageLink: Locator;
    private readonly totalButton: Locator;
    private readonly plusButtonCartModal: Locator;
    private readonly minusButtonCartModal: Locator;
    private readonly paymentModal: Locator;
    private readonly successfulPopup: Locator;
    private readonly popup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.drinkElement = (drinkName: string) => page.locator(SELECTORS.drinkElement(drinkName));
        this.cartPageLink = page.locator(SELECTORS.cartPageLink);
        this.totalButton = page.locator(SELECTORS.totalButton);
        this.plusButtonCartModal = page.locator(SELECTORS.plusButtonCartModal);
        this.minusButtonCartModal = page.locator(SELECTORS.minusButtonCartModal);
        this.paymentModal = page.locator(SELECTORS.paymentModal);
        this.successfulPopup = page.locator(SELECTORS.successfulPopup);
        this.popup = page.locator(SELECTORS.popup);
    }

    async visit(): Promise<void> {
        await this.page.goto('/');
    }

    async clickOnDrink(drinkName: string): Promise<void> {
        const drinkLocator = this.page.locator(SELECTORS.getDrinkSibling(drinkName));
        await drinkLocator.first().click();
    }

    async clickTotalButton(): Promise<void> {
        await this.totalButton.click();
    }

    async getTotalButtonText(): Promise<string> {
        return await this.totalButton.textContent() ?? '';
    }

    async goToCartPage() {
        await this.cartPageLink.click();
    }

    async isPaymentModalHidden(): Promise<boolean>{
        return await this.paymentModal.isHidden();
    }

    async isSuccessfulPopuppVisible(): Promise<boolean>{
        return await this.successfulPopup.isVisible();
    }

    async getCartLinkText() : Promise<string>{
        return await this.cartPageLink.innerText();
    }

}
