import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Container } from './TableOrganizations.styles';
import { useTable } from './TableOrganizations.service';

const TableOrganizations = ({ id = 'TableOrganizations', data }) => {
  const { tableProps } = useTable(data);

  return (
    <Container>
      {!tableProps.loading && (
        <Box id={`${id}`}>
          <Table id={`${id}`} onOption={() => null} {...tableProps} />
        </Box>
      )}
    </Container>
  );
};

TableOrganizations.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableOrganizations };
