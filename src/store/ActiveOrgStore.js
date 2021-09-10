import { action, thunkOn } from 'easy-peasy';

const CURRENT_NAV = {};

const updateCurrentNav = (state, payload) => {
  state.currentNav = { ...state.currentNav, ...payload };
};

const updateOrgSid = (state, payload) => {
  state.orgSid = payload;
};

const updateOrgSidParam = async (actions, target, { getStoreActions }) => {
  await getStoreActions().QueryParamStore.setGlobalParam({ orgSid: target.payload });
};

const ActiveOrgStore = {
  orgSid: null,
  currentNav: { ...CURRENT_NAV },
  updateOrgSid: action(updateOrgSid),
  updateCurrentNav: action(updateCurrentNav),
  onUpdateOrgSid: thunkOn((actions) => actions.updateOrgSid, updateOrgSidParam),
};

export default ActiveOrgStore;
