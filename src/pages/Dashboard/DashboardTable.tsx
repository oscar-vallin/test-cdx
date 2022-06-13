import React, { ReactElement } from 'react';
import { DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';
import { DashboardPeriodCount } from 'src/data/services/graphql';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { DarkSeparator } from 'src/components/separators/Separator';
import { Column, Row } from 'src/components/layouts';
import { ThemedDetailsList } from 'src/containers/tables/ThemedDetailsList.style';
import { CellLink, DashboardTableWrapper, EmptyTable, HeaderLink, SpecText } from './DashboardPage.styles';

type DashboardTableType = {
  id: string;
  title: string;
  items?: DashboardPeriodCount[];
  linkTo: 'transmissions' | 'errors';
  orgSid: string;
  startDate: Date;
  endDate: Date;
  buttons?: ReactElement;
  renderTotal: (item: DashboardPeriodCount) => ReactElement;
};

export const DashboardTable = ({
  id,
  title,
  items,
  linkTo,
  orgSid,
  startDate,
  endDate,
  buttons,
  renderTotal,
}: DashboardTableType) => {
  const destinationUrl = () =>
    `/${linkTo}?&orgSid=${orgSid}&startDate=${yyyyMMdd(startDate)}&endDate=${yyyyMMdd(endDate)}`;

  const renderName = (item: DashboardPeriodCount) => (
    <>
      <CellLink className="vendor-name" to={`${destinationUrl()}&filter=${item.name}`}>
        {item.name}
      </CellLink>
      {item.secondaryDescr && <SpecText className="spec-name">spec: {item.secondaryDescr}</SpecText>}
    </>
  );

  const columns: IColumn[] = [
    {
      key: 'name',
      name: 'name',
      fieldName: 'name',
      flexGrow: 3,
      minWidth: 300,
      targetWidthProportion: 3,
      onRender: renderName,
    },
    {
      key: 'total',
      name: 'total',
      fieldName: 'total',
      flexGrow: 1,
      minWidth: 100,
      targetWidthProportion: 3,
      onRender: renderTotal,
    },
  ];

  const renderTable = () => {
    if (items == null || items.length < 1) {
      return <EmptyTable variant="muted">None</EmptyTable>;
    }

    return (
      <ThemedDetailsList
        items={items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={false}
        selectionMode={SelectionMode.none}
      />
    );
  };

  return (
    <DashboardTableWrapper id={id}>
      <Row>
        <Column lg="6">
          <HeaderLink id={`${id}_header`} to={destinationUrl()} className="dash-table-title">
            {title}
          </HeaderLink>
        </Column>
        <Column lg="6" right>
          {buttons}
        </Column>
      </Row>
      <DarkSeparator />
      {renderTable()}
    </DashboardTableWrapper>
  );
};
