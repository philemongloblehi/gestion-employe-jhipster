/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmploieHistoryComponentsPage, EmploieHistoryDeleteDialog, EmploieHistoryUpdatePage } from './emploie-history.page-object';

const expect = chai.expect;

describe('EmploieHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let emploieHistoryUpdatePage: EmploieHistoryUpdatePage;
    let emploieHistoryComponentsPage: EmploieHistoryComponentsPage;
    let emploieHistoryDeleteDialog: EmploieHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EmploieHistories', async () => {
        await navBarPage.goToEntity('emploie-history');
        emploieHistoryComponentsPage = new EmploieHistoryComponentsPage();
        expect(await emploieHistoryComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.emploieHistory.home.title');
    });

    it('should load create EmploieHistory page', async () => {
        await emploieHistoryComponentsPage.clickOnCreateButton();
        emploieHistoryUpdatePage = new EmploieHistoryUpdatePage();
        expect(await emploieHistoryUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.emploieHistory.home.createOrEditLabel');
        await emploieHistoryUpdatePage.cancel();
    });

    it('should create and save EmploieHistories', async () => {
        const nbButtonsBeforeCreate = await emploieHistoryComponentsPage.countDeleteButtons();

        await emploieHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            emploieHistoryUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            emploieHistoryUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            emploieHistoryUpdatePage.langueSelectLastOption(),
            emploieHistoryUpdatePage.emploieSelectLastOption(),
            emploieHistoryUpdatePage.departementSelectLastOption(),
            emploieHistoryUpdatePage.employeSelectLastOption()
        ]);
        expect(await emploieHistoryUpdatePage.getDateDebutInput()).to.contain('2001-01-01T02:30');
        expect(await emploieHistoryUpdatePage.getDateFinInput()).to.contain('2001-01-01T02:30');
        await emploieHistoryUpdatePage.save();
        expect(await emploieHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await emploieHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EmploieHistory', async () => {
        const nbButtonsBeforeDelete = await emploieHistoryComponentsPage.countDeleteButtons();
        await emploieHistoryComponentsPage.clickOnLastDeleteButton();

        emploieHistoryDeleteDialog = new EmploieHistoryDeleteDialog();
        expect(await emploieHistoryDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.emploieHistory.delete.question');
        await emploieHistoryDeleteDialog.clickOnConfirmButton();

        expect(await emploieHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
