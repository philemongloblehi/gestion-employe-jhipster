/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepartementComponentsPage, DepartementDeleteDialog, DepartementUpdatePage } from './departement.page-object';

const expect = chai.expect;

describe('Departement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let departementUpdatePage: DepartementUpdatePage;
    let departementComponentsPage: DepartementComponentsPage;
    let departementDeleteDialog: DepartementDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Departements', async () => {
        await navBarPage.goToEntity('departement');
        departementComponentsPage = new DepartementComponentsPage();
        expect(await departementComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.departement.home.title');
    });

    it('should load create Departement page', async () => {
        await departementComponentsPage.clickOnCreateButton();
        departementUpdatePage = new DepartementUpdatePage();
        expect(await departementUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.departement.home.createOrEditLabel');
        await departementUpdatePage.cancel();
    });

    it('should create and save Departements', async () => {
        const nbButtonsBeforeCreate = await departementComponentsPage.countDeleteButtons();

        await departementComponentsPage.clickOnCreateButton();
        await promise.all([
            departementUpdatePage.setDepartementLibelleInput('departementLibelle'),
            departementUpdatePage.localisationSelectLastOption()
        ]);
        expect(await departementUpdatePage.getDepartementLibelleInput()).to.eq('departementLibelle');
        await departementUpdatePage.save();
        expect(await departementUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await departementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Departement', async () => {
        const nbButtonsBeforeDelete = await departementComponentsPage.countDeleteButtons();
        await departementComponentsPage.clickOnLastDeleteButton();

        departementDeleteDialog = new DepartementDeleteDialog();
        expect(await departementDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.departement.delete.question');
        await departementDeleteDialog.clickOnConfirmButton();

        expect(await departementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
