/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocalisationComponentsPage, LocalisationDeleteDialog, LocalisationUpdatePage } from './localisation.page-object';

const expect = chai.expect;

describe('Localisation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let localisationUpdatePage: LocalisationUpdatePage;
    let localisationComponentsPage: LocalisationComponentsPage;
    let localisationDeleteDialog: LocalisationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Localisations', async () => {
        await navBarPage.goToEntity('localisation');
        localisationComponentsPage = new LocalisationComponentsPage();
        expect(await localisationComponentsPage.getTitle()).to.eq('gestionEmployeAkilApp.localisation.home.title');
    });

    it('should load create Localisation page', async () => {
        await localisationComponentsPage.clickOnCreateButton();
        localisationUpdatePage = new LocalisationUpdatePage();
        expect(await localisationUpdatePage.getPageTitle()).to.eq('gestionEmployeAkilApp.localisation.home.createOrEditLabel');
        await localisationUpdatePage.cancel();
    });

    it('should create and save Localisations', async () => {
        const nbButtonsBeforeCreate = await localisationComponentsPage.countDeleteButtons();

        await localisationComponentsPage.clickOnCreateButton();
        await promise.all([
            localisationUpdatePage.setAdresseInput('adresse'),
            localisationUpdatePage.setCodePostalInput('codePostal'),
            localisationUpdatePage.setVilleInput('ville'),
            localisationUpdatePage.setProvinceInput('province'),
            localisationUpdatePage.paysSelectLastOption()
        ]);
        expect(await localisationUpdatePage.getAdresseInput()).to.eq('adresse');
        expect(await localisationUpdatePage.getCodePostalInput()).to.eq('codePostal');
        expect(await localisationUpdatePage.getVilleInput()).to.eq('ville');
        expect(await localisationUpdatePage.getProvinceInput()).to.eq('province');
        await localisationUpdatePage.save();
        expect(await localisationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await localisationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Localisation', async () => {
        const nbButtonsBeforeDelete = await localisationComponentsPage.countDeleteButtons();
        await localisationComponentsPage.clickOnLastDeleteButton();

        localisationDeleteDialog = new LocalisationDeleteDialog();
        expect(await localisationDeleteDialog.getDialogTitle()).to.eq('gestionEmployeAkilApp.localisation.delete.question');
        await localisationDeleteDialog.clickOnConfirmButton();

        expect(await localisationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
