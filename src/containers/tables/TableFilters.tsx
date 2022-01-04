import React from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { Column, Container, FilterSection, StyledRow } from './WorkPacketTable.styles';
import { Card } from '../../components/cards';
import { InputText } from '../../components/inputs/InputText';
import { InputDateRange } from '../../components/inputs/InputDateRange';

type TableFilterParams = {
  id: string;
  searchText: any;
  startDate: any;
  endDate: any;
};

export const TableFilters = ({ id, searchText, startDate, endDate }: TableFilterParams) => {
  return (
    <FilterSection id={`${id}-filters`}>
      <Container>
        <Card id={`${id}__SearchCard`} elevation="smallest" onClick="">
          <StyledRow>
            <Column lg="6">
              <Label>Search</Label>
              <InputText id={`${id}__Card__Row__Input-Search`} autofocus disabled={false} {...searchText} />
            </Column>
            <Column lg="6">
              <InputDateRange startDate={startDate} endDate={endDate} />
            </Column>
          </StyledRow>
        </Card>
      </Container>
    </FilterSection>
  );
};

export default TableFilters;
