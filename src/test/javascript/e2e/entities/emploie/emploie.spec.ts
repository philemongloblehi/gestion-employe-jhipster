/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmploieComponentsPage, EmploieDeleteDialog, EmploieUpdatePage } from './emploie.page-object';

const expect = chai.expect;

describe('Emploie e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let emploieUpdatePage: EmploieUpdatePage;
    let emploieComponentsPage: EmploieComponentsPage;
    let emploieDeleteDialog: EmploieDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Emploies', async () => {
        await navBarPage.goToEntity('emploie');
        emploieComponentsPage = new EmploieComponentsPage();
        expect(await emploieComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.emploie.home.title');
    });

    it('should load create Emploie page', async () => {
        await emploieComponentsPage.clickOnCreateButton();
        emploieUpdatePage = new EmploieUpdatePage();
        expect(await emploieUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.emploie.home.createOrEditLabel');
        await emploieUpdatePage.cancel();
    });

    it('should create and save Emploies', async () => {
        const nbButtonsBeforeCreate = await emploieComponentsPage.countDeleteButtons();

        await emploieComponentsPage.clickOnCreateButton();
        await promise.all([
            emploieUpdatePage.setLibelleInput('libelle'),
            emploieUpdatePage.setMinSalaireInput('5'),
            emploieUpdatePage.setMaxSalaireInput('5'),
            emploieUpdatePage.employeSelectLastOption()
            // emploieUpdatePage.tacheSelectLastOption(),
        ]);
        expect(await emploieUpdatePage.getLibelleInput()).to.eq('libelle');
        expect(await emploieUpdatePage.getMinSalaireInput()).to.eq('5');
        expect(await emploieUpdatePage.getMaxSalaireInput()).to.eq('5');
        await emploieUpdatePage.save();
        expect(await emploieUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await emploieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Emploie', async () => {
        const nbButtonsBeforeDelete = await emploieComponentsPage.countDeleteButtons();
        await emploieComponentsPage.clickOnLastDeleteButton();

        emploieDeleteDialog = new EmploieDeleteDialog();
        expect(await emploieDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.emploie.delete.question');
        await emploieDeleteDialog.clickOnConfirmButton();

        expect(await emploieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
