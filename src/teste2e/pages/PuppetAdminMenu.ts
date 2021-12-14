import { ElementHandle } from 'puppeteer';
import PuppetBasePage from './PuppetBasePage';

// represents the left hand admin menu
export default class PuppetAdminMenu extends PuppetBasePage {
  menuParent = '#__AdminNav';

  menuTrigger = '#__AdminNavBtn';

  async openMenu(...menuItems: string[]) {
    await this.page.click(this.menuTrigger);
    await this.page.waitForSelector(this.menuParent, { visible: true });
    await this.page.waitForTimeout(1000);

    if (menuItems.length > 1) {
      // expand all of the top level menus first
      for (let i = 0; i < menuItems.length - 1; i++) {
        await this.expandMenu(menuItems[i]);
      }
    }
    const lastMenuItem = await this.getMenuItem(menuItems[menuItems.length - 1]);
    await lastMenuItem?.click();
    await this.page.waitForSelector(this.menuParent, { visible: false });
    await this.page.waitForTimeout(1000);
  }

  async navigateToOrg(orgName) {
    const button = await this.page.$x(`//div[@class='ms-Nav-navItem']/button[contains(., '${orgName}')]`);

    await this.page.click(this.menuTrigger);

    button[0].click();

    await this.page.waitForTimeout(1000);
  }

  async returnToMyOrg() {
    await this.navigateToOrg('Return to my organization');
  }

  private async expandMenu(name: string) {
    const menuItm = await this.getMenuItem(name);
    const cssClasses = await menuItm?.getProperty('className');
    if (cssClasses == null) {
      // assume element not found
      return;
    }
    const isExpanded = cssClasses?.toString().indexOf('is-expanded') > -1;
    if (!isExpanded) {
      await menuItm?.click();
    }
  }

  private async getMenuItem(name: string): Promise<ElementHandle | null> {
    const selector = `${this.menuParent} div[name='${name}']`;
    return await this.waitForSelector(selector);
  }
}
