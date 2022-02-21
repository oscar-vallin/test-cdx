import { createStore } from 'easy-peasy';

import ActiveDomainStore, { INITIAL_NAV_STATE, INITIAL_ORG_STATE } from './ActiveDomainStore';
import { DomainNavItem } from 'src/store/ActiveDomainStore/ActiveDomainTypes';

describe('Unit::ActiveDomainStore', () => {
  const store = createStore(ActiveDomainStore);
  const nav: DomainNavItem = {
    label: '',
    destination: ''
  };

  it('Should update the dashboard navigation', async () => {
    store.getActions().setDashboardNav(nav);

    expect(store.getState().nav.dashboard).toEqual(nav);
  });

  it('Should update the admin navigation', async () => {
    store.getActions().setAdminNav(nav);

    expect(store.getState().nav.admin).toEqual(nav);
  });

  it("Should store the user's original organization info", async () => {
    const org = { ...INITIAL_ORG_STATE, orgSid: '1' };

    store.getActions().setOriginOrg(org);

    expect(store.getState().domainOrg.origin).toEqual(org);
  });

  // it('Should store the current organization info', async () => {
  //   const org = { ...INITIAL_ORG_STATE, orgSid: '2' };

  //   store.getActions().setCurrentOrg(org);

  //   expect(store.getState().domainOrg.current).toEqual(org);
  // });

  it('Should reset its state', async () => {
    store.getActions().reset();

    expect(store.getState()).toEqual({
      nav: { ...INITIAL_NAV_STATE },
      domainOrg: {
        origin: { ...INITIAL_ORG_STATE },
        current: { ...INITIAL_ORG_STATE },
      },
    });
  });
});
