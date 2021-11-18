import { Spacing } from '../../../components/spacings/Spacing';
import { TableActivity } from './TableActivity';
import { Container, TableContainer } from './TableActivity.style';

import { useTable } from './TableCurrentActivity.service';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TableFilters } from '../TableFilters';
import { Row, Column } from '../../../components/layouts';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity' }) => {
  const { searchText, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const { tableProc, tableComp, tableError } = useTable();

  return (
    <Container id={id}>
      <TableFilters id={id} searchText={searchText} startDate={startDate} endDate={endDate} />
      <TableContainer>
        <Row>
          <Column lg="6">
            <TableActivity id="__Table__In__Process" tableName="In Process" {...tableProc} />
          </Column>
          <Column lg="6">
            <TableActivity id="__Table__Completed" tableName="Completed" color="complete" {...tableComp} />
          </Column>
        </Row>
        <Spacing margin={{ top: 'normal', bottom: 'normal' }} />
        <Row>
          <Column lg="12">
            <TableActivity id="__Table__Errored" tableName="Errored" color="error" {...tableError} />
          </Column>
        </Row>
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
