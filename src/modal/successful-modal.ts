import { Page, Locator, expect } from '@playwright/test';

const SELECTORS = {
    SUCCESS_MESSAGE: '.snackbar.success',
};

export class SuccessfulModal {
    private readonly page: Page;
    private readonly successText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successText = page.locator(SELECTORS.SUCCESS_MESSAGE);
    }

    async waitForVisible(): Promise<void> {
        await expect(this.successText).toBeVisible();
    }

    async getMessageText(): Promise<string> {
        await this.waitForVisible();
        return await this.successText.textContent() ?? '';
    }

}
