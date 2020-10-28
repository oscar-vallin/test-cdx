export const TABLE_NAMES = {
  DASHBOARD_TRANSMISSIONS_VENDOR: 'TRANSMISSIONS_VENDOR',
  DASHBOARD_ERRORS_VENDOR: 'ERRORS_VENDOR',
  DASHBOARD_TRANSMISSIONS_FILES: 'TRANSMISSIONS_FILES',
  DASHBOARD_ERRORS_FILES: 'ERRORS_FILES',
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
};

export const getTableStructure = (name) => {
  const tableStructure = TABLES[name];

  return tableStructure ?? TABLES.DEFAULT;
};
