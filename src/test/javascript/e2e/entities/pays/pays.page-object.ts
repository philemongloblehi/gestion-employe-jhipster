import { element, by, ElementFinder } from 'protractor';

export class PaysComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-pays div table .btn-danger'));
    title = element.all(by.css('jhi-pays div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PaysUpdatePage {
    pageTitle = element(by.id('jhi-pays-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    paysLibelleInput = element(by.id('field_paysLibelle'));
    regionSelect = element(by.id('field_region'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPaysLibelleInput(paysLibelle) {
        await this.paysLibelleInput.sendKeys(paysLibelle);
    }

    async getPaysLibelleInput() {
        return this.paysLibelleInput.getAttribute('value');
    }

    async regionSelectLastOption() {
        await this.regionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async regionSelectOption(option) {
        await this.regionSelect.sendKeys(option);
    }

    getRegionSelect(): ElementFinder {
        return this.regionSelect;
    }

    async getRegionSelectedOption() {
        return this.regionSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PaysDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-pays-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-pays'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
