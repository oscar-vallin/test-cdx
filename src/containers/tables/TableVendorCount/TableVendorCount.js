import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { Box } from './TableVendorCount.styles';
import { useTable } from './TableVendorCount.service';

const ORG_SID = 1;
const WORK_ORDER_ID = '2';

const TableVendorCount = ({ id = 'TableVendorCountStats' }) => {
  const { tableProps, tableTotals } = useTable(ORG_SID, WORK_ORDER_ID);

  return (
    <Box id={id}>
      <Table onOption={() => console.log('Table click')} {...tableProps} />
      <Table onOption={() => console.log('Table click')} {...tableTotals} />
    </Box>
  );
};

TableVendorCount.propTypes = {
  id: PropTypes.string,
};

export { TableVendorCount };
