/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PaysComponentsPage, PaysDeleteDialog, PaysUpdatePage } from './pays.page-object';

const expect = chai.expect;

describe('Pays e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let paysUpdatePage: PaysUpdatePage;
    let paysComponentsPage: PaysComponentsPage;
    let paysDeleteDialog: PaysDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Pays', async () => {
        await navBarPage.goToEntity('pays');
        paysComponentsPage = new PaysComponentsPage();
        expect(await paysComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.pays.home.title');
    });

    it('should load create Pays page', async () => {
        await paysComponentsPage.clickOnCreateButton();
        paysUpdatePage = new PaysUpdatePage();
        expect(await paysUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.pays.home.createOrEditLabel');
        await paysUpdatePage.cancel();
    });

    it('should create and save Pays', async () => {
        const nbButtonsBeforeCreate = await paysComponentsPage.countDeleteButtons();

        await paysComponentsPage.clickOnCreateButton();
        await promise.all([paysUpdatePage.setPaysLibelleInput('paysLibelle'), paysUpdatePage.regionSelectLastOption()]);
        expect(await paysUpdatePage.getPaysLibelleInput()).to.eq('paysLibelle');
        await paysUpdatePage.save();
        expect(await paysUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await paysComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Pays', async () => {
        const nbButtonsBeforeDelete = await paysComponentsPage.countDeleteButtons();
        await paysComponentsPage.clickOnLastDeleteButton();

        paysDeleteDialog = new PaysDeleteDialog();
        expect(await paysDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.pays.delete.question');
        await paysDeleteDialog.clickOnConfirmButton();

        expect(await paysComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
