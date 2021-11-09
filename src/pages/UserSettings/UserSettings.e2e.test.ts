import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetUserSettings from '../../teste2e/pages/PuppetUserSettings';

describe('E2E - User Settings Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - User Settings Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Click on Archives', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.clickOnSettings();
  });

  it('Click item Setting', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.clickOnSettingItem();
  });

  it('check the text Dashboard', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.expectOnPage('#__UserSetingsId', 'Dashboard');
  });

  it('check the text Change password', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.expectOnPage('#__userSettings_Change_Password', 'Change password');
  });

  it('check the text Password rules', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.expectOnPage('#__userSettings_Password_rules', 'Password rules');
  });

  it('check the text Theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.expectOnPage('#__userSettings_Theme', 'Theme');
  });

  it('Click option Dark Theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.clickOnElement('#__userSetting_Dark_Theme');
  });

  it('background color validation with dark theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.validateBackgroundColor('rgb(31, 31, 31)');
  });

  it('Click option Light Theme)', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.clickOnElement('#__userSetting_Light_Theme');
  });

  it('background color validation with light theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.validateBackgroundColor('rgb(254, 254, 254)');
  });

  it('check the text Save Theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.expectOnPage('#__userSetting_Save_Theme', 'Save theme');
  });

  it('Click button Save Theme', async () => {
    const userSettingsPage = new PuppetUserSettings(cdxApp.page);
    await userSettingsPage.clickOnElement('#__userSetting_Save_Theme');
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
