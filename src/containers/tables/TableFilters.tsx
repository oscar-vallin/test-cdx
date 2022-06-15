import React from 'react';
import { ComboBox, IComboBoxOption } from '@fluentui/react';
import { Card } from 'src/components/cards';
import { InputText } from 'src/components/inputs/InputText';
import { InputDateRange } from 'src/components/inputs/InputDateRange';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Column, Container, FilterSection, StyledRow } from './WorkPacketTable.styles';

type TableFilterParams = {
  id: string;
  searchText?: any;
  startDate?: any;
  endDate: any;
  eventType?: any;
  evenTypesDropdownItems?: IComboBoxOption[];
};

export const TableFilters = ({
  id,
  searchText,
  startDate,
  endDate,
  evenTypesDropdownItems,
  eventType,
}: TableFilterParams) => {
  const renderLabel = () => <FormLabel id={`${id}__Event_Label`} label="Event" />;

  return (
    <FilterSection id={`${id}-filters`}>
      <Container>
        <Card id={`${id}__SearchCard`} elevation="smallest" onClick="">
          <StyledRow>
            {searchText && (
              <Column lg="6">
                <InputText
                  id={`${id}__Card__Row__Input-Search`}
                  autofocus
                  disabled={false}
                  {...searchText}
                  label="Search"
                />
              </Column>
            )}
            {evenTypesDropdownItems?.length && (
              <Column lg="6">
                <ComboBox
                  id={`${id}__Card__Row__Dropdown`}
                  label="Event"
                  defaultSelectedKey="All"
                  options={evenTypesDropdownItems}
                  onRenderLabel={renderLabel}
                  {...eventType}
                />
              </Column>
            )}
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
