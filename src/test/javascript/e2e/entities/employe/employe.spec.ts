/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeComponentsPage, EmployeDeleteDialog, EmployeUpdatePage } from './employe.page-object';

const expect = chai.expect;

describe('Employe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeUpdatePage: EmployeUpdatePage;
    let employeComponentsPage: EmployeComponentsPage;
    let employeDeleteDialog: EmployeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employes', async () => {
        await navBarPage.goToEntity('employe');
        employeComponentsPage = new EmployeComponentsPage();
        expect(await employeComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.employe.home.title');
    });

    it('should load create Employe page', async () => {
        await employeComponentsPage.clickOnCreateButton();
        employeUpdatePage = new EmployeUpdatePage();
        expect(await employeUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.employe.home.createOrEditLabel');
        await employeUpdatePage.cancel();
    });

    it('should create and save Employes', async () => {
        const nbButtonsBeforeCreate = await employeComponentsPage.countDeleteButtons();

        await employeComponentsPage.clickOnCreateButton();
        await promise.all([
            employeUpdatePage.setNomInput('nom'),
            employeUpdatePage.setPrenomInput('prenom'),
            employeUpdatePage.setEmailInput('email'),
            employeUpdatePage.setContactInput('contact'),
            employeUpdatePage.setDateCreationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            employeUpdatePage.setSalaireInput('5'),
            employeUpdatePage.setCommissionInput('5'),
            employeUpdatePage.departementSelectLastOption(),
            employeUpdatePage.managerSelectLastOption()
        ]);
        expect(await employeUpdatePage.getNomInput()).to.eq('nom');
        expect(await employeUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await employeUpdatePage.getEmailInput()).to.eq('email');
        expect(await employeUpdatePage.getContactInput()).to.eq('contact');
        expect(await employeUpdatePage.getDateCreationInput()).to.contain('2001-01-01T02:30');
        expect(await employeUpdatePage.getSalaireInput()).to.eq('5');
        expect(await employeUpdatePage.getCommissionInput()).to.eq('5');
        await employeUpdatePage.save();
        expect(await employeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Employe', async () => {
        const nbButtonsBeforeDelete = await employeComponentsPage.countDeleteButtons();
        await employeComponentsPage.clickOnLastDeleteButton();

        employeDeleteDialog = new EmployeDeleteDialog();
        expect(await employeDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.employe.delete.question');
        await employeDeleteDialog.clickOnConfirmButton();

        expect(await employeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
