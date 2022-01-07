import { defaultForm, updateForm } from './UserAccountFormUtil';
import { UserAccount } from "src/data/services/graphql";

const userAccount: UserAccount = {
  sid: '1',
  email: 'shem.phillips@garphill.com',
  person: {
    sid: '1',
    firstNm: 'Shem',
    lastNm: 'Phillips'
  }
};

describe('User Account Form Utils testing', () => {
  const updated = updateForm(defaultForm, userAccount, ['10', '12']);

  it('Test Update Form updates values', () => {
    // Make sure the values are updated
    expect(updated?.email?.value).toEqual('shem.phillips@garphill.com');
    expect(updated?.person?.firstNm?.value).toEqual('Shem');
    expect(updated?.person?.lastNm?.value).toEqual('Phillips');
    expect(updated?.accessPolicyGroups?.value).toContainEqual({name: '', value: '10'});
    expect(updated?.accessPolicyGroups?.value).toContainEqual({name: '', value: '12'});
  });

  it('Test Update Form Retains Labels', () => {
    // Make sure the values are updated
    expect(updated?.email?.label).toEqual('Email');
    expect(updated?.person?.firstNm?.label).toEqual('First Name');
    expect(updated?.person?.lastNm?.label).toEqual('Last Name');
    expect(updated?.accessPolicyGroups?.label).toEqual('Access Policy Groups');
  });

});