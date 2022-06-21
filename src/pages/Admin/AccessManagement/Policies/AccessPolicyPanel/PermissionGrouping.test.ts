import { PermissionGroups, groupPermissions } from './PermissionGrouping';
import testData from 'src/pages/Admin/AccessManagement/Policies/AccessPolicyPanel/testData.json';

const testUIOptions = testData.uiOptions;

describe('Permissions Grouping Test', () => {
  const expectEmpty = (groupings: PermissionGroups) => {
    expect(groupings.exchange.label).toEqual('Exchange Status');
    expect(groupings.exchange.subGroup).toHaveLength(0);
    expect(groupings.accessManagement.label).toEqual('Access Management');
    expect(groupings.accessManagement.subGroup).toHaveLength(0);
    expect(groupings.orgAdmin.label).toEqual('Organization Admin');
    expect(groupings.orgAdmin.subGroup).toHaveLength(0);
    expect(groupings.tools.label).toEqual('Tools');
    expect(groupings.tools.subGroup).toHaveLength(0);
    expect(groupings.other.label).toEqual('Other');
    expect(groupings.other.subGroup).toHaveLength(0);
  };

  it('Test Null', () => {
    expectEmpty(groupPermissions(null));
  });

  it('Test Undefined', () => {
    expectEmpty(groupPermissions(undefined));
  });

  it('Test Empty', () => {
    expectEmpty(groupPermissions([]));
  });

  it('Test Full', () => {
    const expected = testData.expectedGroupings;

    const actual = groupPermissions(testUIOptions);
    console.log(JSON.stringify(actual));

    expect(actual).toEqual(expected);
  });
});
