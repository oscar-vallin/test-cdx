import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

const TableAccessManagementGroups = ({ id = 'TableAccessManagementGroups', ...props }) => {
  return (
    <Table id={`${id}`} onOption={() => console.log('Table click')} {...props} />
  );
};

TableAccessManagementGroups.propTypes = {
  id: PropTypes.string,
};

export { TableAccessManagementGroups };
