import { element, by, ElementFinder } from 'protractor';

export class EmploieHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-emploie-history div table .btn-danger'));
    title = element.all(by.css('jhi-emploie-history div h2#page-heading span')).first();

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

export class EmploieHistoryUpdatePage {
    pageTitle = element(by.id('jhi-emploie-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateDebutInput = element(by.id('field_dateDebut'));
    dateFinInput = element(by.id('field_dateFin'));
    langueSelect = element(by.id('field_langue'));
    emploieSelect = element(by.id('field_emploie'));
    departementSelect = element(by.id('field_departement'));
    employeSelect = element(by.id('field_employe'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateDebutInput(dateDebut) {
        await this.dateDebutInput.sendKeys(dateDebut);
    }

    async getDateDebutInput() {
        return this.dateDebutInput.getAttribute('value');
    }

    async setDateFinInput(dateFin) {
        await this.dateFinInput.sendKeys(dateFin);
    }

    async getDateFinInput() {
        return this.dateFinInput.getAttribute('value');
    }

    async setLangueSelect(langue) {
        await this.langueSelect.sendKeys(langue);
    }

    async getLangueSelect() {
        return this.langueSelect.element(by.css('option:checked')).getText();
    }

    async langueSelectLastOption() {
        await this.langueSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async emploieSelectLastOption() {
        await this.emploieSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async emploieSelectOption(option) {
        await this.emploieSelect.sendKeys(option);
    }

    getEmploieSelect(): ElementFinder {
        return this.emploieSelect;
    }

    async getEmploieSelectedOption() {
        return this.emploieSelect.element(by.css('option:checked')).getText();
    }

    async departementSelectLastOption() {
        await this.departementSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async departementSelectOption(option) {
        await this.departementSelect.sendKeys(option);
    }

    getDepartementSelect(): ElementFinder {
        return this.departementSelect;
    }

    async getDepartementSelectedOption() {
        return this.departementSelect.element(by.css('option:checked')).getText();
    }

    async employeSelectLastOption() {
        await this.employeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeSelectOption(option) {
        await this.employeSelect.sendKeys(option);
    }

    getEmployeSelect(): ElementFinder {
        return this.employeSelect;
    }

    async getEmployeSelectedOption() {
        return this.employeSelect.element(by.css('option:checked')).getText();
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

export class EmploieHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-emploieHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-emploieHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
