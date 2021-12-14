import PuppetBasePage from './PuppetBasePage';

// represents the left hand admin menu
export default class PuppetMainMenu extends PuppetBasePage {
  dashboard = '#__DASHBOARD_Tab';

  fileStatus = '#__FILE_STATUS_Tab';

  archives = '#__ARCHIVES_Tab';

  schedule = '#__SCHEDULE_Tab';

  transmissions = '#__TRANSMISSIONS_Tab';

  errors = '#__ERRORS_Tab';

  admin = '#__ADMIN_Tab';

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
