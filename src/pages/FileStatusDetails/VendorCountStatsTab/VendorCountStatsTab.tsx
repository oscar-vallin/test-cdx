import { ReactElement } from 'react';
import { IColumn, DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import { StatsRow, StyledVendorHeaderRow, StatsFooter } from '../FileStatusDetails.styles';

const COLUMNS: IColumn[] = [
  { key: 'name', name: 'Record Name', fieldName: 'name' },
  { key: 'count', name: 'Count', fieldName: 'count' },
].map((col) => ({ ...col, data: 'string', isPadded: true, minWidth: 100 }));

const onRenderRow = (props) => {
  return <StatsRow {...props} />;
};

const onRenderDetailsHeader = (props) => {
  return (
    <StyledVendorHeaderRow>
      {props.columns.map((column, index) => (
        <div key={`col_${index}`}>{column.name}</div>
      ))}
    </StyledVendorHeaderRow>
  );
};

const onRenderDetailsFooter: any = (count) => {
  return (
    <StatsFooter>
      <div>Total</div>
      <div>{count || '0'}</div>
    </StatsFooter>
  );
};

const defaultProps = {
  items: '',
};

type VendorCountStatsTabProps = {
  items?: any;
} & typeof defaultProps;

const VendorCountStatsTab = ({ items }: VendorCountStatsTabProps): ReactElement => {
  return (
    <Spacing padding="normal">
      <DetailsList
        compact
        items={items?.recordCount || []}
        columns={COLUMNS}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={onRenderRow}
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderDetailsFooter={(args) => onRenderDetailsFooter(items?.totalCount, args)}
        isHeaderVisible
      />
    </Spacing>
  );
};

VendorCountStatsTab.defaultProps = defaultProps;

export default VendorCountStatsTab;
