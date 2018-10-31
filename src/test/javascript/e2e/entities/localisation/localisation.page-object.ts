import { element, by, ElementFinder } from 'protractor';

export class LocalisationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-localisation div table .btn-danger'));
    title = element.all(by.css('jhi-localisation div h2#page-heading span')).first();

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

export class LocalisationUpdatePage {
    pageTitle = element(by.id('jhi-localisation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    adresseInput = element(by.id('field_adresse'));
    codePostalInput = element(by.id('field_codePostal'));
    villeInput = element(by.id('field_ville'));
    provinceInput = element(by.id('field_province'));
    paysSelect = element(by.id('field_pays'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAdresseInput(adresse) {
        await this.adresseInput.sendKeys(adresse);
    }

    async getAdresseInput() {
        return this.adresseInput.getAttribute('value');
    }

    async setCodePostalInput(codePostal) {
        await this.codePostalInput.sendKeys(codePostal);
    }

    async getCodePostalInput() {
        return this.codePostalInput.getAttribute('value');
    }

    async setVilleInput(ville) {
        await this.villeInput.sendKeys(ville);
    }

    async getVilleInput() {
        return this.villeInput.getAttribute('value');
    }

    async setProvinceInput(province) {
        await this.provinceInput.sendKeys(province);
    }

    async getProvinceInput() {
        return this.provinceInput.getAttribute('value');
    }

    async paysSelectLastOption() {
        await this.paysSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async paysSelectOption(option) {
        await this.paysSelect.sendKeys(option);
    }

    getPaysSelect(): ElementFinder {
        return this.paysSelect;
    }

    async getPaysSelectedOption() {
        return this.paysSelect.element(by.css('option:checked')).getText();
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

export class LocalisationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-localisation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-localisation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
