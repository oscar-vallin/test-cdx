import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { TableActivity } from './TableActivity';
import { Container, TableContainer } from './TableActivity.style';

// import { useTable } from './TableFileStatus.service';
import { useTable } from './TableCurrentActivity.service';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TableFilters } from '../TableFilters';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity' }) => {
  const { searchText, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const { tableProc, tableComp, tableError } = useTable();

  return (
    <Container id={id}>
      <TableFilters id={id} searchText={searchText} startDate={startDate} endDate={endDate} />
      <TableContainer>
        <TableActivity id="__Table__In__Process" tableName="In Process" {...tableProc} />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <TableActivity id="__Table__Completed" tableName="Completed" color="complete" {...tableComp} />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <TableActivity id="__Table__Errored" tableName="Errored" color="error" {...tableError} />
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
