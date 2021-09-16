import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

const TableActiveOrgs = ({ id = 'TableActiveOrgs', ...props }) => {
  return <Table id={`${id}`} onOption={() => null} {...props} />;
};

TableActiveOrgs.propTypes = {
  id: PropTypes.string,
};

export { TableActiveOrgs };
