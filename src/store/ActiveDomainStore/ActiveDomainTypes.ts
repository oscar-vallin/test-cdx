import { Action } from 'easy-peasy';

export type DomainNavItem = {
  orgSid?: string | null;
  destination: string;
  label: string;
  type?: string;
  subNavItems?: DomainNavItem[];
};

export type DomainNav = {
  dashboard: DomainNavItem[];
  admin: DomainNavItem[];
};

export interface ActiveDomainModel {
  nav: DomainNav;
  domainOrg: {
    origin: DomainNavItem;
    current: DomainNavItem;
  };
  setDashboardNav: Action<ActiveDomainModel, DomainNavItem>;
  setAdminNav: Action<ActiveDomainModel, DomainNavItem>;
  setOriginOrg: Action<ActiveDomainModel, DomainNavItem>;
  setCurrentOrg: Action<ActiveDomainModel, DomainNavItem>;
  reset: Action<ActiveDomainModel>;
}
