import { element, by, ElementFinder } from 'protractor';

export class DepartementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-departement div table .btn-danger'));
    title = element.all(by.css('jhi-departement div h2#page-heading span')).first();

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

export class DepartementUpdatePage {
    pageTitle = element(by.id('jhi-departement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    departementLibelleInput = element(by.id('field_departementLibelle'));
    localisationSelect = element(by.id('field_localisation'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDepartementLibelleInput(departementLibelle) {
        await this.departementLibelleInput.sendKeys(departementLibelle);
    }

    async getDepartementLibelleInput() {
        return this.departementLibelleInput.getAttribute('value');
    }

    async localisationSelectLastOption() {
        await this.localisationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async localisationSelectOption(option) {
        await this.localisationSelect.sendKeys(option);
    }

    getLocalisationSelect(): ElementFinder {
        return this.localisationSelect;
    }

    async getLocalisationSelectedOption() {
        return this.localisationSelect.element(by.css('option:checked')).getText();
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

export class DepartementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-departement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-departement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
