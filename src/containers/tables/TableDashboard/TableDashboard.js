import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

const TableDashboard = ({ id = '__TableDashboard', data = [] }) => {
  return <Table items={data} />;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
};

export { TableDashboard };
