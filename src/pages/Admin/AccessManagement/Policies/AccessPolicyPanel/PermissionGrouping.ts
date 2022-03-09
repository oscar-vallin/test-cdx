import { UiOption, UiOptions } from 'src/data/services/graphql';

export type PermissionSubGroup = {
  label: string;
  options: UiOption[];
};

export type PermissionGroup = {
  label: string;
  subGroup: PermissionSubGroup[];
};

export type PermissionGroups = {
  exchange: PermissionGroup;
  accessManagement: PermissionGroup;
  orgAdmin: PermissionGroup;
  tools: PermissionGroup;
  other: PermissionGroup;
}

const permissionGroupingDef = {
  exchange: {
    k2u: {
      label: 'K2U Exchanges',
      regex: 'K2U_.+',
    },
    test: {
      label: 'Test Exchanges',
      regex: 'TEST_.+',
    },
    uat: {
      label: 'UAT Exchanges',
      regex: 'UAT_.+',
    },
    prod: {
      label: 'Production Exchanges',
      regex: 'PROD_.+',
    },
  },
  accessManagement: {
    users: {
      label: '',
      regex: 'USER_.+',
    },
    policies: {
      label: '',
      regex: 'ACCESS_POLICY_(?!GROUP_).+',
    },
    groups: {
      label: '',
      regex: 'ACCESS_POLICY_GROUP_.+',
    },
    specs: {
      label: '',
      regex: 'ACCESS_SPEC_.+',
    },
  },
  orgAdmin: {
    orgs: {
      label: '',
      regex: 'ORG_.+',
    },
    palettes: {
      label: '',
      regex: 'COLORPALETTE_.+',
    },
    themes: {
      label: '',
      regex: 'THEME_.+',
    },
    security: {
      label: '',
      regex: '(PASSWORD_.+)|(SSOIDP_.+)',
    }
  },
  tools: {
    ftp: {
      label: '',
      regex: 'FTP_.+',
    },
    deploy: {
      label: '',
      regex: 'IMPLEMENTATION_.+'
    },
  },
};

export const groupPermissions = (opts?: UiOptions[] | null): PermissionGroups => {
  const permissionGroups: PermissionGroups = {
    exchange: {
      label: 'Exchange Status',
      subGroup: []
    },
    accessManagement: {
      label: 'Access Management',
      subGroup: []
    },
    orgAdmin: {
      label: 'Organization Admin',
      subGroup: []
    },
    tools: {
      label: 'Tools',
      subGroup: []
    },
    other: {
      label: 'Other',
      subGroup: []
    }
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
        label: permissionGroupingDef[groupName][subGroupName].label,
        options: [],
      };
      permissionGroups[groupName].subGroup.push(subGroup);
      const expr = new RegExp(permissionGroupingDef[groupName][subGroupName].regex);
      // find any matching permissions
      const matchingOptions: UiOption[] = permissionOptions.filter((permissionOption) => expr.test(permissionOption?.value));
      subGroup.options = matchingOptions;

      // Remove these permissions from the remaining options
      matchingOptions.forEach((opt) => permissionOptions.splice(permissionOptions.indexOf(opt), 1));
    }
  }

  // Any remaining permissions we can put in the 'other' grouping
  if (permissionOptions.length > 0) {
    permissionGroups.other.subGroup.push(
      {
        label: '',
        options: permissionOptions,
      }
    );
  }

  return permissionGroups;
};