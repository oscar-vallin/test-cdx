import { Label } from '@fluentui/react/lib/Label';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { TableActivity } from './TableActivity';
import { Container, TableContainer, Row, Column, RightColumn } from './TableActivity.style';

// import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { useTable } from './TableCurrentActivity.service';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useOrgSid } from '../../../hooks/useOrgSid';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity', argOrgSid = 1, argDateRange, argFilter }) => {
  const { orgSid } = useOrgSid();
  const { localInput, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const { tableProc, tableComp, tableError } = useTable(orgSid || argOrgSid, argDateRange, argFilter);

  return (
    <Container id={id}>
      <Row id={`${id}-filters`} around>
        <Column center>
          <Label>Search</Label>
          <InputText id={`${id}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      <TableContainer>
        <TableActivity id="__Table__In__Proccess" tableName="In Process" loading={tableProc.loading} {...tableProc} />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <TableActivity
          id="__Table__Completed"
          tableName="Completed"
          color="complete"
          loading={tableComp.loading}
          {...tableComp}
        />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <TableActivity
          id="__Table__Errored"
          tableName="Errored"
          color="error"
          loading={tableError.loading}
          {...tableError}
        />
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
