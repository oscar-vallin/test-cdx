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
  },
  ERRORS_VENDOR: {
    header: {
      type: 'dashboard',
      title: 'Failed Files by Vendor',
      url: './transmissions',
    },
  },
  TRANSMISSIONS_FILES: {
    header: {
      type: 'dashboard',
      title: 'Transmissions / BUS by Vendor',
      url: './errors',
    },
  },
  ERRORS_FILES: {
    header: {
      type: 'dashboard',
      title: 'Failed Files by Files',
      url: './errors',
    },
  },
  DETAIL_ENROLLMENT: {
    header: {
      type: 'enrollment',
      title: 'Enrollment Status',
      url: null,
    },
  },
  DETAIL_VENDOR_COUNT: {
    header: {
      type: 'vendor_count',
      title: 'Vendor Count Status',
      url: null,
    },
  },
  DETAIL_QUALITY_CHECKS: {
    header: {
      type: 'quality_checks',
      title: 'Quality Checks',
      url: null,
    },
  },
  FILE_STATUS: {
    header: {
      type: 'file_status',
      title: 'File Status',
      url: null,
    },
  },
  ARCHIVES: {
    header: {
      type: 'archives',
      title: 'Archives',
      url: null,
    },
  },
  ERRORS: {
    header: {
      type: 'errors',
      title: 'Errors',
      url: null,
    },
  },
};

export const getTableStructure = (name) => {
  const tableStructure = TABLES[name];

  return tableStructure ?? TABLES.DEFAULT;
};
