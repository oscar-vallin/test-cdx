import { useWorkPacketStatusesLazyQuery } from '../services/graphql';
import { columns as tableArchivesColumns, getItems as tableArchivesGetItems } from './tables/ArchiveTableConstants';

export const TABLE_NAMES = {
  DASHBOARD_TRANSMISSIONS_VENDOR: 'TRANSMISSIONS_VENDOR',
  DASHBOARD_ERRORS_VENDOR: 'ERRORS_VENDOR',
  DASHBOARD_TRANSMISSIONS_FILES: 'TRANSMISSIONS_FILES',
  DASHBOARD_ERRORS_FILES: 'ERRORS_FILES',
  FILE_STATUS: 'FILE_STATUS',
  FILE_STATUS_DETAIL_ENROLLMENT: 'DETAIL_ENROLLMENT',
  FILE_STATUS_DETAIL_VENDOR_COUNT: 'DETAIL_VENDOR_COUNT',
  FILE_STATUS_DETAIL_QUALITY_CHECKS: 'DETAIL_QUALITY_CHECKS',
  ARCHIVES: 'ARCHIVES',
  ERRORS: 'ERRORS',
  TRANSMISSIONS: 'TRANSMISSIONS',
  ORG_ACTIVITY: 'ORG_ACTIVITY',
};

export const TABLES = {
  DEFAULT: {
    header: {},
  },
  TRANSMISSIONS_VENDOR: {
    header: {
      type: 'dashboard',
      title: 'Transmissions / BUS by Vendor',
      url: './transmissions',
      buttons: ['Sort', 'Specs'],
    },
    polling: 1 / 3,
  },
  ERRORS_VENDOR: {
    header: {
      type: 'dashboard',
      title: 'Failed Files by Vendor',
      url: './transmissions',
    },
    polling: 1 / 3,
  },
  TRANSMISSIONS_FILES: {
    header: {
      type: 'dashboard',
      title: 'Transmissions / BUS by Vendor',
      url: './errors',
    },
    polling: 1 / 3,
  },
  ERRORS_FILES: {
    header: {
      type: 'dashboard',
      title: 'Failed Files by Files',
      url: './errors',
    },
    polling: 1 / 3,
  },
  DETAIL_ENROLLMENT: {
    header: {
      type: 'enrollment',
      title: 'Enrollment Status',
      url: null,
    },
    polling: 1 / 3,
  },
  DETAIL_VENDOR_COUNT: {
    header: {
      type: 'vendor_count',
      title: 'Vendor Count Status',
      url: null,
    },
    polling: 1 / 3,
  },
  DETAIL_QUALITY_CHECKS: {
    header: {
      type: 'quality_checks',
      title: 'Quality Checks',
      url: null,
    },
    polling: 1 / 3,
  },
  FILE_STATUS: {
    header: {
      type: 'file_status',
      title: 'File Status',
      url: null,
    },
    polling: 1,
  },
  ARCHIVES: {
    header: {
      type: 'archives',
      title: 'Archives',
      url: null,
    },
    polling: 1 / 3,
    columns: tableArchivesColumns,
    items: tableArchivesGetItems,
  },
  ERRORS: {
    header: {
      type: 'errors',
      title: 'Errors',
      url: null,
    },
    polling: 1 / 3,
  },
  TRANSMISSIONS: {
    header: {
      type: 'transmissions',
      title: 'Transmissions',
      url: null,
    },
    polling: 1 / 3,
  },
  TRANSMISSIONS: {
    header: {
      type: 'org_activity',
      title: 'Org Activity',
      url: null,
    },
    polling: 1 / 3,
  },
};

export const getTableStructure = (name) => {
  const tableStructure = TABLES[name];

  return tableStructure ?? TABLES.DEFAULT;
};

export const useQueryTable = (tableID, tableArguments) => {
  if (tableID === TABLE_NAMES.ARCHIVES) {
    return useWorkPacketStatusesLazyQuery({
      variables: {
        orgSid: tableArguments.orgId ?? 1,
        dateRange: tableArguments.dateRange,
        filter: tableArguments.filter,
      },
    });
  }
};
