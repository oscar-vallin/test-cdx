import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { Box } from './TableQualityChecks.styles';
import { useTable } from './TableQualityChecks.service';

const ORG_SID = 1;
const WORK_ORDER_ID = '2';

const TableQualityChecks = ({ id }) => {
  const { tableProps } = useTable(ORG_SID, WORK_ORDER_ID);

  return (
    <Box id={`${id}-VendorCountStats`}>
      <Table onOption={() => null} {...tableProps} />
    </Box>
  );
};

TableQualityChecks.propTypes = {
  id: PropTypes.string,
};

export { TableQualityChecks };
export default TableQualityChecks;
