import {
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  mergeStyleSets,
  ScrollablePane,
  ScrollbarVisibility,
  SelectionMode,
} from '@fluentui/react';
import React from 'react';
import { ApolloError } from '@apollo/client';
import { EmptyState } from 'src/containers/states';

type ScrollableTableType = {
  id: string;
  columns: IColumn[];
  items?: any[];
  error?: ApolloError;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const ScrollableTable = (
  {
    id,
    columns,
    items,
    error,
    emptyTitle = 'No data',
    emptyDescription,
  }: ScrollableTableType) => {
  const classNames = mergeStyleSets({
    root: {
      width: '100%',
    },

    headerDivider: {
      display: 'inline-block',
      height: '100%',
    },
  });

  const renderItem = (item, index, column) => {
    const key = column?.fieldName ?? 'orgId';
    return <span title={item[key]}>{item[key]}</span>;
  };

  const renderError = () => {
    if (error) {
      return <span id={`${id}_Error`}>Error: {error?.message || 'An unexpected error occurred'}</span>;
    }
    return null;
  }

  const renderEmpty = () => {
    if (!items || items.length === 0) {
      return <EmptyState id={`${id}_EmptyState`} title={emptyTitle} description={emptyDescription} filled={false}/>;
    }
    return null;
  }

  return (
    <ScrollablePane id={id} scrollbarVisibility={ScrollbarVisibility.auto}>
      <DetailsList
        className={classNames.root}
        items={items ?? []}
        columns={columns}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
        constrainMode={ConstrainMode.unconstrained}
        onRenderItemColumn={renderItem}
      />
      {renderError()}
      {renderEmpty()}
    </ScrollablePane>
  );
}

