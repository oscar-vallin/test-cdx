import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/_Table';

const TableAccessManagementGroups = ({ id = 'TableAccessManagementGroups', ...props }) => {
  return <Table id={`${id}`} onOption={() => null} {...props} />;
};

TableAccessManagementGroups.propTypes = {
  id: PropTypes.string,
};

export { TableAccessManagementGroups };
