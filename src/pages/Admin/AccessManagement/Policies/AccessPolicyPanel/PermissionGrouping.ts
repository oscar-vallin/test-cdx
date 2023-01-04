import { UiOption, UiOptions } from 'src/data/services/graphql';

export type PermissionSubGroup = {
  id: string;
  label: string;
  options: UiOption[];
};

export type PermissionGroup = {
  id: string;
  label: string;
  subGroup: PermissionSubGroup[];
};

export type PermissionGroups = {
  exchange: PermissionGroup;
  accessManagement: PermissionGroup;
  orgAdmin: PermissionGroup;
  xchange: PermissionGroup;
  tools: PermissionGroup;
  other: PermissionGroup;
};

const permissionGroupingDef = {
  exchange: {
    k2u: {
      id: 'K2U_Exchanges',
      label: 'K2U Exchanges',
      regex: 'K2U_.+',
    },
    uat: {
      id: 'UAT_Exchanges',
      label: 'UAT Exchanges',
      regex: 'UAT_.+',
    },
    test: {
      id: 'TEST_Exchanges',
      label: 'Test Exchanges',
      regex: 'TEST_.+',
    },
    prod: {
      id: 'PROD_Exchanges',
      label: 'Production Exchanges',
      regex: 'PROD_.+',
    },
  },
  accessManagement: {
    users: {
      id: 'UserAdmin',
      label: '',
      regex: 'USER_.+',
    },
    policies: {
      id: 'AccessPolicies',
      label: '',
      regex: 'ACCESS_POLICY_(?!GROUP_).+',
    },
    groups: {
      id: 'AccessGroups',
      label: '',
      regex: 'ACCESS_POLICY_GROUP_.+',
    },
    specs: {
      id: 'AccessSpecs',
      label: '',
      regex: 'ACCESS_SPEC_.+',
    },
  },
  orgAdmin: {
    orgs: {
      id: 'OrgAdmin',
      label: '',
      regex: 'ORG_.+',
    },
    palettes: {
      id: 'ColorPalettes',
      label: '',
      regex: 'COLORPALETTE_.+',
    },
    themes: {
      id: 'Themes',
      label: '',
      regex: 'THEME_.+',
    },
    security: {
      id: 'Security',
      label: '',
      regex: '(PASSWORD_.+)|(SSOIDP_.+)',
    },
  },
  xchange: {
    xprofile: {
      id: 'XchangeProfile',
      label: '',
      regex: '(XCHANGE_PROFILE_.+)|(XCHANGE_FILE_UPLOAD)',
    },
    xalert: {
      id: 'XchangeAlert',
      label: '',
      regex: 'XCHANGE_ALERT_.+',
    },
    platforms: {
      id: 'SuppPlatform',
      label: '',
      regex: 'SUPPORTED_PLATFORM_.+',
    },
    specs: {
      id: 'VendorSpec',
      label: '',
      regex: 'VENDOR_SPEC_.+',
    },
  },
  tools: {
    ftp: {
      id: 'FTP',
      label: '',
      regex: 'FTP_.+',
    },
    deploy: {
      id: 'Implementation',
      label: '',
      regex: 'IMPLEMENTATION_.+',
    },
  },
};

export const groupPermissions = (opts?: UiOptions[] | null): PermissionGroups => {
  const permissionGroups: PermissionGroups = {
    exchange: {
      id: 'ExchangeStatus',
      label: 'Exchange Status',
      subGroup: [],
    },
    accessManagement: {
      id: 'AccessManagement',
      label: 'Access Management',
      subGroup: [],
    },
    orgAdmin: {
      id: 'OrgAdmin',
      label: 'Organization Admin',
      subGroup: [],
    },
    xchange: {
      id: 'XchangeConfig',
      label: 'Xchange Configuration',
      subGroup: [],
    },
    tools: {
      id: 'Tools',
      label: 'Tools',
      subGroup: [],
    },
    other: {
      id: 'Other',
      label: 'Other',
      subGroup: [],
    },
  };
  const uiOptions = opts?.find((opt) => opt.key === 'Permission');
  if (!uiOptions) {
    return permissionGroups;
  }

  // Create a clone of the permissions
  const permissionOptions: UiOption[] = uiOptions.values?.map((x) => x) ?? [];

  for (const groupName in permissionGroupingDef) {
    for (const subGroupName in permissionGroupingDef[groupName]) {
      const subGroup: PermissionSubGroup = {
        id: `Permissions_${permissionGroupingDef[groupName][subGroupName].id}`,
        label: permissionGroupingDef[groupName][subGroupName].label,
        options: [],
      };
      permissionGroups[groupName].subGroup.push(subGroup);
      const expr = new RegExp(permissionGroupingDef[groupName][subGroupName].regex);
      // find any matching permissions
      const matchingOptions: UiOption[] = permissionOptions
        .filter((permissionOption) => expr.test(permissionOption?.value));
      subGroup.options = matchingOptions;

      // Remove these permissions from the remaining options
      matchingOptions.forEach((opt) => permissionOptions.splice(permissionOptions.indexOf(opt), 1));
    }
  }

  // Any remaining permissions we can put in the 'other' grouping
  if (permissionOptions.length > 0) {
    permissionGroups.other.subGroup.push({
      id: 'Misc',
      label: '',
      options: permissionOptions,
    });
  }

  return permissionGroups;
};
