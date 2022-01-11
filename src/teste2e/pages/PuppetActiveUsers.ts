import PuppetBasePage from './PuppetBasePage';
import PuppetCreateUserPanel from "src/teste2e/pages/PuppetCreateUserPanel";
import PuppetUpdateUserPanel from "src/teste2e/pages/PuppetUpdateUserPanel";

export default class PuppetActiveUsers extends PuppetBasePage {
  pageTitle = '#__Page_Title-Text';

  createUserButton = '#__Create-User';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Active Users');
  }

  async clickOnUser(email: string): Promise<PuppetUpdateUserPanel> {
    await this.waitForSelector('.ms-DetailsRow-fields');
    const [button] = await this.page.$x(`//button[contains(., '${email}')]`);
    if (button) {
      await button.click();
      return new PuppetUpdateUserPanel(this.page);
    }

    throw Error(`Did not find "${email} on the Active Users Page`);
  }

  async createUser(): Promise<PuppetCreateUserPanel> {
    await this.click(this.createUserButton);
    const panel = new PuppetCreateUserPanel(this.page);
    await panel.expectPanelShows('', '', '');
    return panel;
  }

  async expectUser(firstName: string, lastName: string, email: string) {
    const result = await this.page
      .$$eval('.ms-DetailsRow-fields', (rows) => {
        return Array.from(rows, (row: any) => {
          const columns = row.querySelectorAll('.ms-DetailsRow-cell');
          return Array.from(columns, (column: any) => column.innerText);
        });
      })
      .catch(() => {
        throw Error(`Did not find "${firstName} ${lastName} on the Active Users Page`);
      });

    let found = false;
    for (let i = 0; i < result.length; i++) {
      if (result[i][0] === firstName
          && result[i][1] === lastName
          && result[i][2] === email) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw Error(`Did not find "${firstName} ${lastName} on the Active Users Page`);
    }
  }
}
