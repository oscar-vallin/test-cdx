import PuppetBasePage from './PuppetBasePage';

// represents the left hand admin menu
export default class PuppetMainMenu extends PuppetBasePage {
  dashboard = '[data-e2e="DASHBOARD"]';

  fileStatus = '[data-e2e="FILE_STATUS"]';

  archives = '[data-e2e="ARCHIVES"]';

  schedule = '[data-e2e="SCHEDULE"]';

  transmissions = '[data-e2e="TRANSMISSIONS"]';

  errors = '[data-e2e="ERRORS"]';

  admin = '[data-e2e="ADMIN"]';

  async clickDashboard() {
    const itm = await this.waitForSelector(this.dashboard);
    itm?.click();
  }

  async clickFileStatus() {
    const itm = await this.waitForSelector(this.fileStatus);
    itm?.click();
  }

  async clickArchives() {
    const itm = await this.waitForSelector(this.archives);
    itm?.click();
  }

  async clickSchedule() {
    const itm = await this.waitForSelector(this.schedule);
    itm?.click();
  }

  async clickTransmissions() {
    const itm = await this.waitForSelector(this.transmissions);
    itm?.click();
  }

  async clickErrors() {
    const itm = await this.waitForSelector(this.errors);
    itm?.click();
  }

  async clickAdmin() {
    const itm = await this.waitForSelector(this.admin);
    itm?.click();
  }
}
