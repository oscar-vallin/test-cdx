import React, { useEffect, useState } from 'react';
import { ButtonAction } from 'src/components/buttons';
import { DashboardPeriodCount } from 'src/data/services/graphql';
import { DashboardTable } from './DashboardTable';
import { ButtonWrapper, CellTotal } from './DashboardPage.styles';

type TransmissionsByVendorTableType = {
  id: string;
  title: string;
  items?: DashboardPeriodCount[];
  itemsBySpec?: DashboardPeriodCount[];
  orgSid: string;
  startDate: Date;
  endDate: Date;
};

export const TransmissionsByVendorTable = ({id, title, items, itemsBySpec, orgSid, startDate, endDate}: TransmissionsByVendorTableType) => {

  const [sortMode, setSortMode] = useState<"Vendors" | "Transmissions">("Vendors");
  const [showSpecs, setShowSpecs] = useState(false);
  const [controlledItems, setControlledItems] = useState<DashboardPeriodCount[]>(items ?? []);

  const renderTotal = (item: DashboardPeriodCount) => (
    <CellTotal>
      {item.count}/{item.total}
    </CellTotal>
  );

  const toggleSort = (_sortMode: string) => {
    if (_sortMode === "Vendors") {
      setSortMode("Transmissions");
    } else {
      setSortMode("Vendors");
    }
  };

  const toggleSpecs = (_showSpecs: boolean) => {
    setShowSpecs(!_showSpecs);
  }

  const renderButtons = () => {
    if (controlledItems.length === 0) {
      return undefined;
    }
    return (
      <ButtonWrapper>
        <ButtonAction
          id={`${id}_sortBtn`}
          iconName={(sortMode === 'Vendors') ? 'SortUp' : 'SortDown'}
          onClick={() => toggleSort(sortMode)}
          title={(sortMode === 'Vendors') ? 'Sorted by Vendor Name ascending' : 'Sorted by Transmissions descending'}
        >
          {sortMode}
        </ButtonAction>
        <ButtonAction
          id={`${id}_specsBtn`}
          iconName={showSpecs ? 'RedEye' : 'Hide'}
          onClick={() => toggleSpecs(showSpecs)}
          title={showSpecs ? 'Click to hide specs' : 'Click to show specs'}
        >
          Specs
        </ButtonAction>
      </ButtonWrapper>
    )
  }

  const sortByName = ((a: DashboardPeriodCount, b: DashboardPeriodCount) => {
    const nameA = a.name?.toUpperCase() ?? '';
    const nameB = b.name?.toUpperCase() ?? '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    let visibleItems: DashboardPeriodCount[] = [];
    if (showSpecs && itemsBySpec) {
      visibleItems = [...itemsBySpec];
      setControlledItems(itemsBySpec);
    } else if (items) {
      visibleItems = [...items];
    }
    if (sortMode === "Transmissions") {
      visibleItems.sort((a: DashboardPeriodCount, b: DashboardPeriodCount) => {
        let c = (b.count ?? 0) - (a.count ?? 0);
        if (c != 0) {
          return c;
        }
        return sortByName(a, b);
      });
    } else {
      visibleItems.sort(sortByName);
    }
    setControlledItems(visibleItems);
  }, [showSpecs, sortMode, items, itemsBySpec]);

  return (
    <DashboardTable
      id={id}
      title={title}
      linkTo="transmissions"
      orgSid={orgSid}
      startDate={startDate}
      endDate={endDate}
      items={controlledItems}
      buttons={renderButtons()}
      renderTotal={renderTotal}
    />
  );
};