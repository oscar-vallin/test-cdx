import { PermissionGroups, groupPermissions } from './PermissionGrouping';
import { UiOptions } from 'src/data/services/graphql';

const testUIOptions: UiOptions[] = [
  {
    key: 'OrgType',
    values: [
      {
        label: 'Employer / Plan Sponsor',
        value: 'INTEGRATION_SPONSOR',
        info: null,
      },
      {
        label: 'Benefit Admin - Segregated',
        value: 'INTEGRATION_ADMIN_SEGREGATED',
        info: 'Benefit Admin that treats plan sponsors independently',
      },
      {
        label: 'Xchange Platform',
        value: 'INTEGRATION_PLATFORM',
        info: 'Provides the platform to their clients',
      },
      {
        label: 'Benefit Admin - Combined',
        value: 'INTEGRATION_ADMIN_COMBINED',
        info: 'Benefit Admin that uses per vendor implementations instead of per sponsor',
      },
      {
        label: 'Vendor',
        value: 'VENDOR',
        info: null,
      },
      {
        label: 'System Integrator',
        value: 'SYSTEM_INTEGRATOR',
        info: null,
      },
      {
        label: 'Independent Consultant',
        value: 'INDEPENDENT_CONSULTANT',
        info: null,
      },
      {
        label: 'CDX',
        value: 'CDX',
        info: null,
      },
      {
        label: 'Template',
        value: 'TEMPLATE',
        info: null,
      },
      {
        label: 'Outside Promoter',
        value: 'OUTSIDE_PROMOTER',
        info: null,
      },
      {
        label: 'Sales Prospect',
        value: 'SALES_PROSPECT',
        info: null,
      },
      {
        label: 'Global Vendors',
        value: 'GLOBAL_VENDOR',
        info: null,
      },
    ],
  },
  {
    key: 'Permission',
    values: [
      {
        label: 'Exchange - List',
        value: 'K2U_EXCHANGE_LIST',
        info: null,
      },
      {
        label: 'Exchange - Read',
        value: 'K2U_EXCHANGE_READ',
        info: null,
      },
      {
        label: 'Exchange - Update',
        value: 'K2U_EXCHANGE_UPDATE',
        info: null,
      },
      {
        label: 'Exchange - Process',
        value: 'K2U_EXCHANGE_EXECUTE',
        info: 'Grants ability to Resume and Restart any K2U Exchanges',
      },
      {
        label: 'Exchange - Cancel',
        value: 'K2U_EXCHANGE_CANCEL',
        info: null,
      },
      {
        label: 'Archive - Read',
        value: 'K2U_EXCHANGE_ARCHIVE_READ',
        info: null,
      },
      {
        label: 'Archive Steps - Read',
        value: 'K2U_EXCHANGE_ARCHIVE_STEPS_READ',
        info: 'Download any internal archives from steps in the transformation process',
      },
      {
        label: 'Exchange - Delete',
        value: 'K2U_EXCHANGE_DELETE',
        info: null,
      },
      {
        label: 'Exchange - List',
        value: 'TEST_EXCHANGE_LIST',
        info: null,
      },
      {
        label: 'Exchange - Read',
        value: 'TEST_EXCHANGE_READ',
        info: null,
      },
      {
        label: 'Exchange - Update',
        value: 'TEST_EXCHANGE_UPDATE',
        info: null,
      },
      {
        label: 'Exchange - Process',
        value: 'TEST_EXCHANGE_EXECUTE',
        info: 'Grants ability to Resume and Restart any Test Exchanges',
      },
      {
        label: 'Exchange - Cancel',
        value: 'TEST_EXCHANGE_CANCEL',
        info: null,
      },
      {
        label: 'Archive - Read',
        value: 'TEST_EXCHANGE_ARCHIVE_READ',
        info: null,
      },
      {
        label: 'Archive Steps - Read',
        value: 'TEST_EXCHANGE_ARCHIVE_STEPS_READ',
        info: 'Download any internal archives from steps in the transformation process',
      },
      {
        label: 'Exchange - Delete',
        value: 'TEST_EXCHANGE_DELETE',
        info: null,
      },
      {
        label: 'Exchange - List',
        value: 'UAT_EXCHANGE_LIST',
        info: null,
      },
      {
        label: 'Exchange - Read',
        value: 'UAT_EXCHANGE_READ',
        info: null,
      },
      {
        label: 'Exchange - Update',
        value: 'UAT_EXCHANGE_UPDATE',
        info: null,
      },
      {
        label: 'Exchange - Process',
        value: 'UAT_EXCHANGE_EXECUTE',
        info: 'Grants ability to Resume and Restart any UAT Exchanges',
      },
      {
        label: 'Exchange - Cancel',
        value: 'UAT_EXCHANGE_CANCEL',
        info: null,
      },
      {
        label: 'Archive - Read',
        value: 'UAT_EXCHANGE_ARCHIVE_READ',
        info: null,
      },
      {
        label: 'Archive Steps - Read',
        value: 'UAT_EXCHANGE_ARCHIVE_STEPS_READ',
        info: 'Download any internal archives from steps in the transformation process',
      },
      {
        label: 'Exchange - Delete',
        value: 'UAT_EXCHANGE_DELETE',
        info: null,
      },
      {
        label: 'Exchange - List',
        value: 'PROD_EXCHANGE_LIST',
        info: null,
      },
      {
        label: 'Exchange - Read',
        value: 'PROD_EXCHANGE_READ',
        info: null,
      },
      {
        label: 'Exchange - Update',
        value: 'PROD_EXCHANGE_UPDATE',
        info: null,
      },
      {
        label: 'Exchange - Process',
        value: 'PROD_EXCHANGE_EXECUTE',
        info: 'Grants ability to Resume and Restart any Production Exchanges',
      },
      {
        label: 'Exchange - Cancel',
        value: 'PROD_EXCHANGE_CANCEL',
        info: null,
      },
      {
        label: 'Archive - Read',
        value: 'PROD_EXCHANGE_ARCHIVE_READ',
        info: null,
      },
      {
        label: 'Archive Steps - Read',
        value: 'PROD_EXCHANGE_ARCHIVE_STEPS_READ',
        info: 'Download any internal archives from steps in the transformation process',
      },
      {
        label: 'Exchange - Delete',
        value: 'PROD_EXCHANGE_DELETE',
        info: null,
      },
      {
        label: 'Users - Read',
        value: 'USER_READ',
        info: null,
      },
      {
        label: 'Users - Create',
        value: 'USER_CREATE',
        info: null,
      },
      {
        label: 'Users - Update',
        value: 'USER_UPDATE',
        info: null,
      },
      {
        label: 'Users - Deactivate',
        value: 'USER_DELETE',
        info: null,
      },
      {
        label: 'Users - Assign',
        value: 'USER_ASSIGN',
        info: null,
      },
      {
        label: 'Users - Audit Logs',
        value: 'USER_AUDIT',
        info: null,
      },
      {
        label: 'Access Policy - Read',
        value: 'ACCESS_POLICY_READ',
        info: null,
      },
      {
        label: 'Access Policy - Create',
        value: 'ACCESS_POLICY_CREATE',
        info: null,
      },
      {
        label: 'Access Policy - Update',
        value: 'ACCESS_POLICY_UPDATE',
        info: null,
      },
      {
        label: 'Access Policy - Delete',
        value: 'ACCESS_POLICY_DELETE',
        info: null,
      },
      {
        label: 'Access Specialization - Read',
        value: 'ACCESS_SPEC_READ',
        info: null,
      },
      {
        label: 'Access Specialization - Create',
        value: 'ACCESS_SPEC_CREATE',
        info: null,
      },
      {
        label: 'Access Specialization - Update',
        value: 'ACCESS_SPEC_UPDATE',
        info: null,
      },
      {
        label: 'Access Specialization - Delete',
        value: 'ACCESS_SPEC_DELETE',
        info: null,
      },
      {
        label: 'Access Policy Group - Read',
        value: 'ACCESS_POLICY_GROUP_READ',
        info: null,
      },
      {
        label: 'Access Policy Group - Create',
        value: 'ACCESS_POLICY_GROUP_CREATE',
        info: null,
      },
      {
        label: 'Unrecognized Permission',
        value: 'UNRECOGNIZED',
        info: null,
      },
      {
        label: 'Access Policy Group - Update',
        value: 'ACCESS_POLICY_GROUP_UPDATE',
        info: null,
      },
      {
        label: 'Access Policy Group - Delete',
        value: 'ACCESS_POLICY_GROUP_DELETE',
        info: null,
      },
      {
        label: 'Organization - Read',
        value: 'ORG_READ',
        info: null,
      },
      {
        label: 'Organization - Create',
        value: 'ORG_CREATE',
        info: null,
      },
      {
        label: 'Organization - Update',
        value: 'ORG_UPDATE',
        info: null,
      },
      {
        label: 'Organization - Deactivate',
        value: 'ORG_DELETE',
        info: null,
      },
      {
        label: 'Password Rules - Update',
        value: 'PASSWORD_RULES_UPDATE',
        info: null,
      },
      {
        label: 'SSO Identity Provider - Read',
        value: 'SSOIDP_READ',
        info: null,
      },
      {
        label: 'SSO Identity Provider - Create',
        value: 'SSOIDP_CREATE',
        info: null,
      },
      {
        label: 'SSO Identity Provider - Update',
        value: 'SSOIDP_UPDATE',
        info: null,
      },
      {
        label: 'SSO Identity Provider - Delete',
        value: 'SSOIDP_DELETE',
        info: null,
      },
      {
        label: 'Color Palette - Read',
        value: 'COLORPALETTE_READ',
        info: null,
      },
      {
        label: 'Color Palette - Create',
        value: 'COLORPALETTE_CREATE',
        info: null,
      },
      {
        label: 'Color Palette - Update',
        value: 'COLORPALETTE_UPDATE',
        info: null,
      },
      {
        label: 'Color Palette - Delete',
        value: 'COLORPALETTE_DELETE',
        info: null,
      },
      {
        label: 'Theme - Read',
        value: 'THEME_READ',
        info: null,
      },
      {
        label: 'Theme - Create',
        value: 'THEME_CREATE',
        info: null,
      },
      {
        label: 'Theme - Update',
        value: 'THEME_UPDATE',
        info: null,
      },
      {
        label: 'Theme - Delete',
        value: 'THEME_DELETE',
        info: null,
      },
      {
        label: 'FTP Testing',
        value: 'FTP_TEST',
        info: 'Allows access to the FTP Testing utility to test connectivity between CDX and a remote FTP server',
      },
      {
        label: 'Implementation Deploy',
        value: 'IMPLEMENTATION_DEPLOY',
        info: 'Allows access to deploy compiled implementations for Exchange Processing',
      },
    ],
  },
];

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
    const expected = {
      exchange: {
        label: 'Exchange Status',
        subGroup: [
          {
            label: 'K2U Exchanges',
            options: [
              {
                label: 'Exchange - List',
                value: 'K2U_EXCHANGE_LIST',
                info: null,
              },
              { label: 'Exchange - Read', value: 'K2U_EXCHANGE_READ', info: null },
              {
                label: 'Exchange - Update',
                value: 'K2U_EXCHANGE_UPDATE',
                info: null,
              },
              {
                label: 'Exchange - Process',
                value: 'K2U_EXCHANGE_EXECUTE',
                info: 'Grants ability to Resume and Restart any K2U Exchanges',
              },
              { label: 'Exchange - Cancel', value: 'K2U_EXCHANGE_CANCEL', info: null },
              {
                label: 'Archive - Read',
                value: 'K2U_EXCHANGE_ARCHIVE_READ',
                info: null,
              },
              {
                label: 'Archive Steps - Read',
                value: 'K2U_EXCHANGE_ARCHIVE_STEPS_READ',
                info: 'Download any internal archives from steps in the transformation process',
              },
              { label: 'Exchange - Delete', value: 'K2U_EXCHANGE_DELETE', info: null },
            ],
          },
          {
            label: 'Test Exchanges',
            options: [
              {
                label: 'Exchange - List',
                value: 'TEST_EXCHANGE_LIST',
                info: null,
              },
              { label: 'Exchange - Read', value: 'TEST_EXCHANGE_READ', info: null },
              {
                label: 'Exchange - Update',
                value: 'TEST_EXCHANGE_UPDATE',
                info: null,
              },
              {
                label: 'Exchange - Process',
                value: 'TEST_EXCHANGE_EXECUTE',
                info: 'Grants ability to Resume and Restart any Test Exchanges',
              },
              { label: 'Exchange - Cancel', value: 'TEST_EXCHANGE_CANCEL', info: null },
              {
                label: 'Archive - Read',
                value: 'TEST_EXCHANGE_ARCHIVE_READ',
                info: null,
              },
              {
                label: 'Archive Steps - Read',
                value: 'TEST_EXCHANGE_ARCHIVE_STEPS_READ',
                info: 'Download any internal archives from steps in the transformation process',
              },
              { label: 'Exchange - Delete', value: 'TEST_EXCHANGE_DELETE', info: null },
            ],
          },
          {
            label: 'UAT Exchanges',
            options: [
              {
                label: 'Exchange - List',
                value: 'UAT_EXCHANGE_LIST',
                info: null,
              },
              { label: 'Exchange - Read', value: 'UAT_EXCHANGE_READ', info: null },
              {
                label: 'Exchange - Update',
                value: 'UAT_EXCHANGE_UPDATE',
                info: null,
              },
              {
                label: 'Exchange - Process',
                value: 'UAT_EXCHANGE_EXECUTE',
                info: 'Grants ability to Resume and Restart any UAT Exchanges',
              },
              { label: 'Exchange - Cancel', value: 'UAT_EXCHANGE_CANCEL', info: null },
              {
                label: 'Archive - Read',
                value: 'UAT_EXCHANGE_ARCHIVE_READ',
                info: null,
              },
              {
                label: 'Archive Steps - Read',
                value: 'UAT_EXCHANGE_ARCHIVE_STEPS_READ',
                info: 'Download any internal archives from steps in the transformation process',
              },
              { label: 'Exchange - Delete', value: 'UAT_EXCHANGE_DELETE', info: null },
            ],
          },
          {
            label: 'Production Exchanges',
            options: [
              {
                label: 'Exchange - List',
                value: 'PROD_EXCHANGE_LIST',
                info: null,
              },
              { label: 'Exchange - Read', value: 'PROD_EXCHANGE_READ', info: null },
              {
                label: 'Exchange - Update',
                value: 'PROD_EXCHANGE_UPDATE',
                info: null,
              },
              {
                label: 'Exchange - Process',
                value: 'PROD_EXCHANGE_EXECUTE',
                info: 'Grants ability to Resume and Restart any Production Exchanges',
              },
              { label: 'Exchange - Cancel', value: 'PROD_EXCHANGE_CANCEL', info: null },
              {
                label: 'Archive - Read',
                value: 'PROD_EXCHANGE_ARCHIVE_READ',
                info: null,
              },
              {
                label: 'Archive Steps - Read',
                value: 'PROD_EXCHANGE_ARCHIVE_STEPS_READ',
                info: 'Download any internal archives from steps in the transformation process',
              },
              { label: 'Exchange - Delete', value: 'PROD_EXCHANGE_DELETE', info: null },
            ],
          },
        ],
      },
      accessManagement: {
        label: 'Access Management',
        subGroup: [
          {
            label: '',
            options: [
              { label: 'Users - Read', value: 'USER_READ', info: null },
              {
                label: 'Users - Create',
                value: 'USER_CREATE',
                info: null,
              },
              { label: 'Users - Update', value: 'USER_UPDATE', info: null },
              {
                label: 'Users - Deactivate',
                value: 'USER_DELETE',
                info: null,
              },
              { label: 'Users - Assign', value: 'USER_ASSIGN', info: null },
              {
                label: 'Users - Audit Logs',
                value: 'USER_AUDIT',
                info: null,
              },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Access Policy - Read',
                value: 'ACCESS_POLICY_READ',
                info: null,
              },
              {
                label: 'Access Policy - Create',
                value: 'ACCESS_POLICY_CREATE',
                info: null,
              },
              {
                label: 'Access Policy - Update',
                value: 'ACCESS_POLICY_UPDATE',
                info: null,
              },
              { label: 'Access Policy - Delete', value: 'ACCESS_POLICY_DELETE', info: null },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Access Policy Group - Read',
                value: 'ACCESS_POLICY_GROUP_READ',
                info: null,
              },
              {
                label: 'Access Policy Group - Create',
                value: 'ACCESS_POLICY_GROUP_CREATE',
                info: null,
              },
              {
                label: 'Access Policy Group - Update',
                value: 'ACCESS_POLICY_GROUP_UPDATE',
                info: null,
              },
              { label: 'Access Policy Group - Delete', value: 'ACCESS_POLICY_GROUP_DELETE', info: null },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Access Specialization - Read',
                value: 'ACCESS_SPEC_READ',
                info: null,
              },
              {
                label: 'Access Specialization - Create',
                value: 'ACCESS_SPEC_CREATE',
                info: null,
              },
              {
                label: 'Access Specialization - Update',
                value: 'ACCESS_SPEC_UPDATE',
                info: null,
              },
              { label: 'Access Specialization - Delete', value: 'ACCESS_SPEC_DELETE', info: null },
            ],
          },
        ],
      },
      orgAdmin: {
        label: 'Organization Admin',
        subGroup: [
          {
            label: '',
            options: [
              {
                label: 'Organization - Read',
                value: 'ORG_READ',
                info: null,
              },
              { label: 'Organization - Create', value: 'ORG_CREATE', info: null },
              {
                label: 'Organization - Update',
                value: 'ORG_UPDATE',
                info: null,
              },
              { label: 'Organization - Deactivate', value: 'ORG_DELETE', info: null },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Color Palette - Read',
                value: 'COLORPALETTE_READ',
                info: null,
              },
              {
                label: 'Color Palette - Create',
                value: 'COLORPALETTE_CREATE',
                info: null,
              },
              {
                label: 'Color Palette - Update',
                value: 'COLORPALETTE_UPDATE',
                info: null,
              },
              { label: 'Color Palette - Delete', value: 'COLORPALETTE_DELETE', info: null },
            ],
          },
          {
            label: '',
            options: [
              { label: 'Theme - Read', value: 'THEME_READ', info: null },
              {
                label: 'Theme - Create',
                value: 'THEME_CREATE',
                info: null,
              },
              { label: 'Theme - Update', value: 'THEME_UPDATE', info: null },
              {
                label: 'Theme - Delete',
                value: 'THEME_DELETE',
                info: null,
              },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Password Rules - Update',
                value: 'PASSWORD_RULES_UPDATE',
                info: null,
              },
              {
                label: 'SSO Identity Provider - Read',
                value: 'SSOIDP_READ',
                info: null,
              },
              {
                label: 'SSO Identity Provider - Create',
                value: 'SSOIDP_CREATE',
                info: null,
              },
              {
                label: 'SSO Identity Provider - Update',
                value: 'SSOIDP_UPDATE',
                info: null,
              },
              { label: 'SSO Identity Provider - Delete', value: 'SSOIDP_DELETE', info: null },
            ],
          },
        ],
      },
      tools: {
        label: 'Tools',
        subGroup: [
          {
            label: '',
            options: [
              {
                label: 'FTP Testing',
                value: 'FTP_TEST',
                info: 'Allows access to the FTP Testing utility to test connectivity between CDX and a remote FTP server',
              },
            ],
          },
          {
            label: '',
            options: [
              {
                label: 'Implementation Deploy',
                value: 'IMPLEMENTATION_DEPLOY',
                info: 'Allows access to deploy compiled implementations for Exchange Processing',
              },
            ],
          },
        ],
      },
      other: {
        label: 'Other',
        subGroup: [
          {
            label: '',
            options: [
              {
                label: 'Unrecognized Permission',
                value: 'UNRECOGNIZED',
                info: null,
              },
            ],
          },
        ],
      },
    };

    const actual = groupPermissions(testUIOptions);
    console.log(JSON.stringify(actual));

    expect(actual).toEqual(expected);
  });
});
