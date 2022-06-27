import { mountWithTheme } from 'src/utils/testUtils';
import { ROUTE_ACTIVE_USERS } from 'src/data/constants/RouteConstants';
import { LeftNav } from './LeftNav';

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 8,
  }),
}));
const mockPush = jest.fn();
jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));
jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: () => ({
    domainOrg: {
      origin: {
        type: 'ORGANIZATION',
        orgSid: '1',
        orgId: 'CDX',
        destination: 'ACTIVE_ORGS',
        label: 'Cloud Data Xchange',
        subNavItems: [],
      },
      current: {
        type: 'ORGANIZATION',
        orgSid: '8',
        orgId: 'FMHP',
        destination: null,
        label: 'Farm Hop',
        subNavItems: [
          {
            label: 'Farm Hop',
            destination: 'FILE_STATUS',
            orgSid: '8',
          },
          {
            label: 'Known2U Implementation Services',
            destination: 'ORG_ACTIVITY',
            orgSid: '4',
          },
          {
            label: 'Cloud Data Xchange',
            destination: 'ACTIVE_ORGS',
            orgSid: '1',
          },
        ],
      },
    },
    nav: {
      dashboard: [
        {
          label: 'Dashboard',
          destination: 'DASHBOARD',
          orgSid: '8',
        },
        {
          label: 'File Status',
          destination: 'FILE_STATUS',
          orgSid: '8',
        },
        {
          label: 'Archives',
          destination: 'ARCHIVES',
          orgSid: '8',
        },
        {
          label: 'Schedule',
          destination: 'SCHEDULE',
          orgSid: '8',
        },
        {
          label: 'Transmissions',
          destination: 'TRANSMISSIONS',
          orgSid: '8',
        },
        {
          label: 'Errors',
          destination: 'ERRORS',
          orgSid: '8',
        },
      ],
      admin: [
        {
          label: 'Users',
          destination: null,
          orgSid: null,
          subNavItems: [
            {
              label: 'Active Users',
              destination: 'ACTIVE_USERS',
              orgSid: '8',
            },
            {
              label: 'External Users',
              destination: 'EXTERNAL_USERS',
              orgSid: '8',
            },
            {
              label: 'Inactive Users',
              destination: 'DELETED_USERS',
              orgSid: '8',
            },
            {
              label: 'User Audit Logs',
              destination: 'USER_AUDIT_LOGS',
              orgSid: '8',
            },
          ],
        },
        {
          label: 'Access Management',
          destination: null,
          orgSid: null,
          subNavItems: [
            {
              label: 'Policies',
              destination: 'AM_POLICIES',
              orgSid: '8',
            },
            {
              label: 'Specializations',
              destination: 'AM_SPECIALIZATION',
              orgSid: '8',
            },
            {
              label: 'Groups',
              destination: 'AM_GROUPS',
              orgSid: '8',
            },
          ],
        },
        {
          label: '-',
          destination: null,
          orgSid: null,
        },
        {
          label: 'Tools',
          destination: null,
          orgSid: null,
          subNavItems: [
            {
              label: 'FTP Test',
              destination: 'FTP_TEST',
              orgSid: '8',
            },
            {
              label: 'Implementation Deploy',
              destination: 'IMPL_DEPLOY',
              orgSid: '8',
            },
          ],
        },
      ],
    },
    setCurrentOrg: jest.fn(),
  }),
}));

describe('Left Navigation menu', () => {
  it('Rendering the menu', () => {
    const wrapper = mountWithTheme(<LeftNav isOpen={true} menuOptionSelected={ROUTE_ACTIVE_USERS.API_ID} />);

    // Expect the Mobile Navigation to render
    expect(wrapper.find('button[id="__NavTo_DASHBOARD"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_FILE_STATUS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_ARCHIVES"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_SCHEDULE"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_TRANSMISSIONS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_ERRORS"]')).toHaveLength(1);

    // Top Level Menus should be rendered
    expect(wrapper.find('button[id="__Nav_Users"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_Access_Management"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_Tools"]')).toHaveLength(1);

    // User Menu should be expanded
    expect(wrapper.find('button[id="__Nav_ACTIVE_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_EXTERNAL_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_DELETED_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_USER_AUDIT_LOGS"]')).toHaveLength(1);

    // Click on one of the top nav items
    wrapper.find('button[id="__NavTo_DASHBOARD"]').simulate('click');
    expect(mockPush).toHaveBeenCalled();

    // Click a menu option
    wrapper.find('button[id="__Nav_EXTERNAL_USERS"]').simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(2);

    // Collapse the Users menu
    wrapper.find('button[id="__Nav_Users"]').simulate('click');
    expect(wrapper.find('button[id="__Nav_ACTIVE_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_EXTERNAL_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_DELETED_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_USER_AUDIT_LOGS"]')).toHaveLength(0);

    // Expand the Access Management menu
    wrapper.find('button[id="__Nav_Access_Management"]').simulate('click');
    expect(wrapper.find('button[id="__Nav_AM_GROUPS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_AM_POLICIES"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_AM_SPECIALIZATION"]')).toHaveLength(1);
  });
});
