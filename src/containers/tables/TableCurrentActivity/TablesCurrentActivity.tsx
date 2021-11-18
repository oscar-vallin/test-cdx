import { Label } from '@fluentui/react/lib/Label';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { TableActivity } from './TableActivity';
import { Column, Container, RightColumn, Row, TableContainer } from './TableActivity.style';

// import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { useTable } from './TableCurrentActivity.service';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity', argOrgSid = 1, argDateRange, argFilter }) => {
  const { searchText, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const { tableProc, tableComp, tableError } = useTable();

  return (
    <Container id={id}>
      <Row id={`${id}-filters`} around>
        <Column center>
          <Label>Search</Label>
          <InputText id={`${id}__Card__Row__Input-Email`} autoFocus disabled={false} {...searchText} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
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
