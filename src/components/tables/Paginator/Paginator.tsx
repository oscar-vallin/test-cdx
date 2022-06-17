import React from 'react';
import { IconButton } from '@fluentui/react';
import { PaginationInfo } from 'src/data/services/graphql';
import { PaginatorWrapper, PagingInfo } from './Paginator.styles';

type PaginatorParams = {
  pagingInfo: PaginationInfo;
  onPageChange: (pageNumber: number) => void;
};

export const Paginator = ({ pagingInfo, onPageChange }: PaginatorParams) => {
  const pNum = pagingInfo?.pageNumber ?? 0;
  const pSize = pagingInfo?.pageSize ?? 100;
  const total = pagingInfo?.totalElements ?? 0;
  const totalPages = pagingInfo?.totalPages ?? 0;

  const firstRow = pNum * pSize + 1;
  let lastRow = firstRow + pSize - 1;
  if (lastRow > total) {
    lastRow = total;
  }

  if (total < pSize) {
    return null;
  }

  return (
    <PaginatorWrapper>
      <div>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          title="Previous Page"
          disabled={pNum <= 0}
          onClick={() => {
            onPageChange(pNum - 1);
            return null;
          }}
        />
        <PagingInfo id="__PagingInfo">
          {firstRow}-{lastRow} of {total}
        </PagingInfo>
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          title="Next Page"
          disabled={pNum === totalPages - 1}
          onClick={() => {
            onPageChange(pNum + 1);
            return null;
          }}
        />
      </div>
    </PaginatorWrapper>
  );
};
