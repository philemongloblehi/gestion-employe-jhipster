/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TacheComponentsPage, TacheDeleteDialog, TacheUpdatePage } from './tache.page-object';

const expect = chai.expect;

describe('Tache e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tacheUpdatePage: TacheUpdatePage;
    let tacheComponentsPage: TacheComponentsPage;
    let tacheDeleteDialog: TacheDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Taches', async () => {
        await navBarPage.goToEntity('tache');
        tacheComponentsPage = new TacheComponentsPage();
        expect(await tacheComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.tache.home.title');
    });

    it('should load create Tache page', async () => {
        await tacheComponentsPage.clickOnCreateButton();
        tacheUpdatePage = new TacheUpdatePage();
        expect(await tacheUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.tache.home.createOrEditLabel');
        await tacheUpdatePage.cancel();
    });

    it('should create and save Taches', async () => {
        const nbButtonsBeforeCreate = await tacheComponentsPage.countDeleteButtons();

        await tacheComponentsPage.clickOnCreateButton();
        await promise.all([tacheUpdatePage.setTitreInput('titre'), tacheUpdatePage.setDescriptionInput('description')]);
        expect(await tacheUpdatePage.getTitreInput()).to.eq('titre');
        expect(await tacheUpdatePage.getDescriptionInput()).to.eq('description');
        await tacheUpdatePage.save();
        expect(await tacheUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tacheComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Tache', async () => {
        const nbButtonsBeforeDelete = await tacheComponentsPage.countDeleteButtons();
        await tacheComponentsPage.clickOnLastDeleteButton();

        tacheDeleteDialog = new TacheDeleteDialog();
        expect(await tacheDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.tache.delete.question');
        await tacheDeleteDialog.clickOnConfirmButton();

        expect(await tacheComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
