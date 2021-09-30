import P_BasePage from './P_BasePage';

// represents the left hand admin menu
export default class P_MainMenu extends P_BasePage {
  dashboard = '#__MainMenu__MainMenu__Row-dashboard-0';

  fileStatus = '#__MainMenu__MainMenu__Row-file-status-1';

  archives = '#__MainMenu__MainMenu__Row-archives-2';

  schedule = '#__MainMenu__MainMenu__Row-schedule-3';

  transmissions = '#__MainMenu__MainMenu__Row-transmissions-4';

  errors = '#__MainMenu__MainMenu__Row-errors-5';

  admin = '#__MainMenu__MainMenu__Row-admin-6';

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
