import { Action } from 'easy-peasy';

export interface ActiveDomainModel {
  nav: {
    dashboard: DomainNav[];
    admin: DomainNav[];
  };
  domainOrg: {
    origin: DomainNav;
    current: DomainNav;
  };
  setDashboardNav: Action<ActiveDomainModel, DomainNav>;
  setAdminNav: Action<ActiveDomainModel, DomainNav>;
  setOriginOrg: Action<ActiveDomainModel, DomainNav>;
  setCurrentOrg: Action<ActiveDomainModel, DomainNav>;
  reset: Action<ActiveDomainModel>;
}

export type DomainNav = {
  orgSid?: string | null;
  destination: string;
  label: string;
  type?: string;
  subNavItems?: DomainNav[];
};
