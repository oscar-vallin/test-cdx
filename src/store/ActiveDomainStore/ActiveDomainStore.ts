import { action, thunkOn } from 'easy-peasy';
import { ActiveDomainModel } from './ActiveDomainTypes';

export const INITIAL_NAV_STATE = {
  dashboard: [],
  admin: [],
};

export const INITIAL_ORG_STATE = {
  type: 'DASHBOARD',
  orgSid: null,
  destination: '',
  label: '',
  subNavItems: [],
};

const setNavigation = (type) => (state, payload) => {
  state.nav[type] = payload;
};

const setOrgInfo = (orgType) => (state, payload) => {
  state.domainOrg[orgType] = { ...state.domainOrg[orgType], ...payload };
};

const resetState = (state) => {
  state.nav = { ...INITIAL_NAV_STATE };
  state.domainOrg = {
    origin: { ...INITIAL_ORG_STATE },
    current: { ...INITIAL_ORG_STATE },
  };
};

const updateOrgSidParam = async (actions, target, { getStoreActions }) => {
  await getStoreActions().QueryParamStore.setGlobalParam({ orgSid: target.payload.orgSid });
};

export const INITIAL_ACTIVE_DOMAIN_STATE: ActiveDomainModel = {
  nav: { ...INITIAL_NAV_STATE },
  domainOrg: {
    origin: { ...INITIAL_ORG_STATE },
    current: { ...INITIAL_ORG_STATE },
  },
  setDashboardNav: action(setNavigation('dashboard')),
  setAdminNav: action(setNavigation('admin')),
  setOriginOrg: action(setOrgInfo('origin')),
  setCurrentOrg: action(setOrgInfo('current')),
  reset: action(resetState),
  onCurrentOrgUpdate: thunkOn((actions) => actions.setCurrentOrg, updateOrgSidParam),
};

export default INITIAL_ACTIVE_DOMAIN_STATE;
