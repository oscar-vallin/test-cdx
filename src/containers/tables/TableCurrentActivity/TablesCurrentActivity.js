import { useEffect } from 'react';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { TableActivity } from './TableActivity';
import { Container, TableContainer, Row, Column, RightColumn } from './TableActivity.style';

// import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { useTable } from './TableCurrentActivity.service';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { tokenToString } from 'typescript';

import { useAuthContext } from '../../../contexts/AuthContext';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity', argOrgSid = 1, argDateRange, argFilter }) => {
  const { orgSid } = useAuthContext();
  const { localInput, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const { tableProc, tableComp, tableError } = useTable(orgSid || argOrgSid, argDateRange, argFilter);

  useEffect(() => {}, []);

  return (
    <Container id={id}>
      <Row id={`${id}-filters`} around>
        <Column center>
          <InputText id={`${id}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      <TableContainer>
        {!tableProc.loading && <TableActivity tableName="In Process" {...tableProc} />}
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        {!tableComp.loading && <TableActivity tableName="Completed" color="complete" {...tableComp} />}
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        {!tableError.loading && <TableActivity tableName="Errored" color="error" {...tableError} />}
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
