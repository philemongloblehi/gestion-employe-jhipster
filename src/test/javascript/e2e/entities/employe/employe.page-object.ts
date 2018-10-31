import { element, by, ElementFinder } from 'protractor';

export class EmployeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employe div table .btn-danger'));
    title = element.all(by.css('jhi-employe div h2#page-heading span')).first();

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

export class EmployeUpdatePage {
    pageTitle = element(by.id('jhi-employe-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    prenomInput = element(by.id('field_prenom'));
    emailInput = element(by.id('field_email'));
    contactInput = element(by.id('field_contact'));
    dateCreationInput = element(by.id('field_dateCreation'));
    salaireInput = element(by.id('field_salaire'));
    commissionInput = element(by.id('field_commission'));
    departementSelect = element(by.id('field_departement'));
    managerSelect = element(by.id('field_manager'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setContactInput(contact) {
        await this.contactInput.sendKeys(contact);
    }

    async getContactInput() {
        return this.contactInput.getAttribute('value');
    }

    async setDateCreationInput(dateCreation) {
        await this.dateCreationInput.sendKeys(dateCreation);
    }

    async getDateCreationInput() {
        return this.dateCreationInput.getAttribute('value');
    }

    async setSalaireInput(salaire) {
        await this.salaireInput.sendKeys(salaire);
    }

    async getSalaireInput() {
        return this.salaireInput.getAttribute('value');
    }

    async setCommissionInput(commission) {
        await this.commissionInput.sendKeys(commission);
    }

    async getCommissionInput() {
        return this.commissionInput.getAttribute('value');
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

    async managerSelectLastOption() {
        await this.managerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async managerSelectOption(option) {
        await this.managerSelect.sendKeys(option);
    }

    getManagerSelect(): ElementFinder {
        return this.managerSelect;
    }

    async getManagerSelectedOption() {
        return this.managerSelect.element(by.css('option:checked')).getText();
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

export class EmployeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employe-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employe'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
