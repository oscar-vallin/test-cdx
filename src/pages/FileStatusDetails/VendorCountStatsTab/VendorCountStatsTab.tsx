import { ReactElement } from 'react';
import {
  IColumn,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledRow, StyledVendorHeaderRow, StyledFooter } from '../FileStatusDetails.styles';

const COLUMNS: IColumn[] = [
  { key: 'name', name: 'Record Name', fieldName: 'name' },
  { key: 'count', name: 'Count', fieldName: 'count' },
].map((col) => ({ ...col, data: 'string', isPadded: true, minWidth: 100 }));

const onRenderRow = (props) => {
  return <StyledRow {...props} />;
};

const onRenderDetailsHeader = (props) => {
  return (
    <StyledVendorHeaderRow>
      {props.columns.map((column) => (
        <div>{column.name}</div>
      ))}
    </StyledVendorHeaderRow>
  );
};

const onRenderDetailsFooter: any = (count) => {
  return (
    <StyledFooter>
      <div>Total</div>
      <div>{count || '0'}</div>
    </StyledFooter>
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
