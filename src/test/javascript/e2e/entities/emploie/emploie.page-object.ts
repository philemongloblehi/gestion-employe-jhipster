import { element, by, ElementFinder } from 'protractor';

export class EmploieComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-emploie div table .btn-danger'));
    title = element.all(by.css('jhi-emploie div h2#page-heading span')).first();

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

export class EmploieUpdatePage {
    pageTitle = element(by.id('jhi-emploie-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    libelleInput = element(by.id('field_libelle'));
    minSalaireInput = element(by.id('field_minSalaire'));
    maxSalaireInput = element(by.id('field_maxSalaire'));
    employeSelect = element(by.id('field_employe'));
    tacheSelect = element(by.id('field_tache'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLibelleInput(libelle) {
        await this.libelleInput.sendKeys(libelle);
    }

    async getLibelleInput() {
        return this.libelleInput.getAttribute('value');
    }

    async setMinSalaireInput(minSalaire) {
        await this.minSalaireInput.sendKeys(minSalaire);
    }

    async getMinSalaireInput() {
        return this.minSalaireInput.getAttribute('value');
    }

    async setMaxSalaireInput(maxSalaire) {
        await this.maxSalaireInput.sendKeys(maxSalaire);
    }

    async getMaxSalaireInput() {
        return this.maxSalaireInput.getAttribute('value');
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

    async tacheSelectLastOption() {
        await this.tacheSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async tacheSelectOption(option) {
        await this.tacheSelect.sendKeys(option);
    }

    getTacheSelect(): ElementFinder {
        return this.tacheSelect;
    }

    async getTacheSelectedOption() {
        return this.tacheSelect.element(by.css('option:checked')).getText();
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

export class EmploieDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-emploie-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-emploie'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
