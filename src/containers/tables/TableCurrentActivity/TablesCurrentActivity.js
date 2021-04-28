import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { TableActivity } from './TableActivity';
import { Container, TableContainer, Row, Column, RightColumn } from './TableActivity.style';

// import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity', data, filter }) => {
  const { localInput, startDate, endDate } = useTableFilters('Name, Id, Last Activity');

  const items = [
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
    { id: 'id1', name: 'John Smith', activity: '2020/11/04 09:14 AM' },
  ];
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
        <TableActivity tableName="In Process" data={items} />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        <TableActivity tableName="Completed" data={items} color="complete" />
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        <TableActivity tableName="Errored" data={items} color="error" />
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
