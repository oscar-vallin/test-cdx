import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { getTableStructure } from '../../../data/constants/TableConstants';
// const TABLES = {
//   TRANSMISSIONS_BY_VENDOR: {
//     title: 'Transmissions / BUS by Vendor',
//   },

//   ERRORS_BY_VENDOR: 'Failed Files by Vendor',
//   TRANSMISSIONS_BY_FILES: 'Transmissions / BUs by File',
//   ERRORS_BY_FILES: 'Failed Files by Files',
// };

const TableDashboard = ({ id = '__TableDashboard', tableID = 'default', data = [] }) => {
  return <Table items={data} structure={getTableStructure(tableID)} />;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
};

export { TableDashboard };
