import { ReactElement } from 'react';
import { IColumn, DetailsListLayoutMode, SelectionMode } from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import { RecordCounts } from 'src/data/services/graphql';
import { EmptyState } from 'src/containers/states';
import { ThemedDetailsList } from 'src/containers/tables/ThemedDetailsList.style';
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

type VendorCountStatsTabProps = {
  items?: RecordCounts | null;
};

const VendorCountStatsTab = ({ items }: VendorCountStatsTabProps): ReactElement => {
  if ((items?.recordCount?.length ?? 0) > 0) {
    return (
      <Spacing padding="normal">
        <ThemedDetailsList
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
  }

  return <EmptyState title="No Vendor Count Stats for this exchange" />;
};

export default VendorCountStatsTab;
