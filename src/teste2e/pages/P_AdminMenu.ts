import { ElementHandle } from 'puppeteer';
import P_BasePage from './P_BasePage';

// represents the left hand admin menu
export default class P_AdminMenu extends P_BasePage {
  menuParent = 'div.ms-Nav-group';

  async openMenu(...menuItems: string[]) {
    if (menuItems.length > 1) {
      // expand all of the top level menus first
      for (let i = 0; i < menuItems.length - 1; i++) {
        await this.expandMenu(menuItems[i]);
      }
    }
    const lastMenuItem = await this.getMenuItem(menuItems[menuItems.length - 1]);
    await lastMenuItem?.click();
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
