import { ElementHandle } from 'puppeteer';
import PuppetBasePage from './PuppetBasePage';

// represents the left hand admin menu
export default class PuppetAdminMenu extends PuppetBasePage {
  menuParent = '#__AdminNav';

  menuTrigger = '#__AdminNavBtn';

  async openMenu(...menuItems: string[]) {
    // Should first check if the menu is open before clicking on the menu button
    // const menuOpen = await this.page.$eval(this.menuParent)
    // await this.page.click(this.menuTrigger);
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
    // await this.page.waitForSelector(this.menuParent, { visible: false });
    await this.page.waitForTimeout(1000);
  }

  async navigateToOrg(orgName) {
    await this.openMenu('Navigate To...', orgName);
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
      const button = await menuItm?.$('button');
      await button?.click();    }
  }

  private async getMenuItem(name: string): Promise<ElementHandle | null> {
    const selector = `${this.menuParent} div[data-name='${name}']`;
    return await this.waitForSelector(selector);
  }
}
