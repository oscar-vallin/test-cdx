import { GqOperationResponse, UserAccount, UserAccountForm } from 'src/data/services/graphql';
import {
  defaultForm,
  getAccessGroupOptions, getOrganizationSpecificGroups,
  getSelectedAccessGroupSids, getSystemManagedGroups,
  renderSelectedGroupsReadOnly,
  updateForm
} from './UserAccountFormUtil';

const userAccount: UserAccount = {
  sid: '1',
  email: 'shem.phillips@garphill.com',
  person: {
    sid: '1',
    firstNm: 'Shem',
    lastNm: 'Phillips',
  },
};

const fullForm: UserAccountForm = {
  sid: '1',
  email: {
    label: 'Email',
    value: 'shem.phillips@garphill.com',
    required: true,
    visible: true,
    min: 0,
    max: 255,
  },
  person: {
    firstNm: {
      label: 'First Name',
      value: 'Shem',
      required: true,
      visible: true,
      min: 0,
      max: 255,
    },
    lastNm: {
      label: 'email',
      value: 'Phillips',
      required: true,
      visible: true,
      min: 0,
      max: 255,
    },
  },
  accessPolicyGroups: {
    label: 'Groups',
    value: [
      { value: '92', name: '' },
      { value: '95', name: '' }
    ],
    required: false,
    visible: true,
    options: 'AccessPolicyGroup'
  },
  organization: {
    label: 'Organization',
    value: '1',
    required: true,
    visible: true
  },
  options: [
    {
      key: 'AccessPolicyGroup',
      values: [
        { value: '91', label: 'Super Users', category: 'System managed groups'},
        { value: '92', label: 'Org Admin', category: 'System managed groups'},
        { value: '93', label: 'Plan Sponsor User', category: 'Organization specific groups'},
        { value: '94', label: 'Auditor', category: 'Organization specific groups'},
        { value: '95', label: 'User Admin', category: 'Organization specific groups'},
      ]
    }
  ],
  response: GqOperationResponse.Success
}

describe('User Account Form Utils testing', () => {
  const updated = updateForm(defaultForm, userAccount, ['10', '12']);

  it('Test Update Form updates values', () => {
    // Make sure the values are updated
    expect(updated?.email?.value).toEqual('shem.phillips@garphill.com');
    expect(updated?.person?.firstNm?.value).toEqual('Shem');
    expect(updated?.person?.lastNm?.value).toEqual('Phillips');
    expect(updated?.accessPolicyGroups?.value).toContainEqual({ name: '', value: '10' });
    expect(updated?.accessPolicyGroups?.value).toContainEqual({ name: '', value: '12' });
  });

  it('Test Update Form Retains Labels', () => {
    // Make sure the values are updated
    expect(updated?.email?.label).toEqual('Email');
    expect(updated?.person?.firstNm?.label).toEqual('First Name');
    expect(updated?.person?.lastNm?.label).toEqual('Last Name');
    expect(updated?.accessPolicyGroups?.label).toEqual('Access Policy Groups');
  });

  it ('Render Selected Groups null', () => {
    const groupsRO = renderSelectedGroupsReadOnly(undefined);
    expect(groupsRO).toEqual('No Access Groups Assigned');
  });

  it ('Render Selected Groups empty', () => {
    const formEmptied: UserAccountForm = {
      ...fullForm,
      accessPolicyGroups: {
        label: 'Groups',
        value: [],
        required: false,
        visible: true,
        options: 'AccessPolicyGroup'
      },
    }
    const groupsRO = renderSelectedGroupsReadOnly(formEmptied);
    expect(groupsRO).toEqual('No Access Groups Assigned');
  });

  it ('Render Selected Groups', () => {
    const groupsRO = renderSelectedGroupsReadOnly(fullForm);
    expect(groupsRO).toEqual('Org Admin, User Admin');
  });

  it ('getAccessGroupOptions null', () => {
    const options = getAccessGroupOptions(undefined);
    expect(options).toHaveLength(0);
  });

  it ('getAccessGroupOptions', () => {
    const options = getAccessGroupOptions(fullForm);
    expect(options).toHaveLength(5);
    expect(options).toContainEqual({ value: '94', label: 'Auditor', category: 'Organization specific groups' });
  });

  it ('getSelectedAccessGroupSids null', () => {
    const sids = getSelectedAccessGroupSids(undefined);
    expect(sids).toHaveLength(0);
  });

  it ('getSelectedAccessGroupSids', () => {
    const sids = getSelectedAccessGroupSids(fullForm);
    expect(sids).toHaveLength(2);
    expect(sids).toContain('92');
    expect(sids).toContain('95');
  });

  it('getSystemManagedGroups', () => {
    const options = getSystemManagedGroups(getAccessGroupOptions(fullForm));
    expect(options).toHaveLength(2);
    expect(options).toContainEqual({ value: '91', label: 'Super Users', category: 'System managed groups'})
  });

  it('getOrganizationSpecificGroups', () => {
    const options = getOrganizationSpecificGroups(getAccessGroupOptions(fullForm));
    expect(options).toHaveLength(3);
    expect(options).toContainEqual({ value: '94', label: 'Auditor', category: 'Organization specific groups'})
  });

});
