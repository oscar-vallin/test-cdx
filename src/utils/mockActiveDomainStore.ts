export const mockUseActiveDomainStore = () => ({
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentOrg: () => {},
});
