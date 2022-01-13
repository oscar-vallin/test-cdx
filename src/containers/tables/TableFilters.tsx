import React from 'react';
import { Card } from 'src/components/cards';
import { InputText } from 'src/components/inputs/InputText';
import { InputDateRange } from 'src/components/inputs/InputDateRange';
import { Column, Container, FilterSection, StyledRow } from './WorkPacketTable.styles';

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
              <InputText
                id={`${id}__Card__Row__Input-Search`}
                autofocus
                disabled={false}
                {...searchText}
                label="Search"
              />
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
