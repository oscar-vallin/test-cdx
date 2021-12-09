import PuppetBasePage from './PuppetBasePage';

export default class PuppetUserSettings extends PuppetBasePage {
  settingsButton = '#__ButtonContext';

  itemSettingButton = '#__ProfileMenu_UserSettingsId';

  async clickOnSettings() {
    await this.page.waitForTimeout(5000);
    await this.page.click(this.settingsButton);
  }

  async clickOnSettingItem() {
    await this.page.waitForTimeout(1000);
    await this.page.click(this.itemSettingButton);
  }

  async expectOnPage(id: string, text: string) {
    await this.expectTextOnPage(id, text);
  }

  async clickOnElement(selector: string) {
    await this.page.waitForTimeout(1000);
    await this.page.click(selector);
  }

  async validateBackgroundColor(color: string) {
    await this.page.waitForTimeout(1000);

    const attr = await this.page.$eval('#USER_SETTINGS__Box', (e) => {
      const styleObj = getComputedStyle(e);
      const styles = { background: '' };
      for (const prop in styleObj) {
        if (styleObj.hasOwnProperty(prop)) styles[prop] = styleObj[prop];
      }
      return styles;
    });

    expect(attr.background).toContain(color);
  }
}
