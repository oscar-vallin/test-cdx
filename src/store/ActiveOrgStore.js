import { action } from 'easy-peasy';

const CURRENT_NAV = {};

const updateCurrentNav = (state, payload) => {
  state.currentNav = { ...state.currentNav, ...payload };
};

const updateOrgSid = (state, payload) => {
  state.orgSid = payload;
};

const ActiveOrgStore = {
  orgSid: 1,
  currentNav: { ...CURRENT_NAV },
  updateOrgSid: action(updateOrgSid),
  updateCurrentNav: action(updateCurrentNav),
};

export default ActiveOrgStore;
