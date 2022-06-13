// noinspection SpellCheckingInspection

import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import { mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store';
import { DashboardTable } from './DashboardTable';
import { DashboardPeriodCount } from 'src/data/services/graphql';

const renderTotal = (item: DashboardPeriodCount) => {
  return <span className="cdx-item-total">{`${item.count}/${item.total}`}</span>;
};

const renderCount = (item: DashboardPeriodCount) => {
  return <span className="cdx-item-count">{item.count}</span>;
};

describe('Dashboard Table', () => {
  it('Empty Table', () => {
    const table = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <DashboardTable
            id="__TransTable"
            title="Transmissions"
            linkTo="transmissions"
            orgSid="3"
            startDate={new Date(2021, 8, 1)}
            endDate={new Date(2021, 8, 28)}
            items={[]}
            renderTotal={renderTotal}
          />
        </Router>
      </StoreProvider>
    );
    expect(table.find('a.dash-table-title')).toHaveLength(1);
    expect(table.find('a.dash-table-title').text()).toEqual('Transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('orgSid=3');
    expect(table.find('Text').text()).toEqual('None');
  });

  it('Empty Table null values', () => {
    const table = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <DashboardTable
            id="__TransTable"
            title="Transmissions"
            linkTo="transmissions"
            orgSid="3"
            startDate={new Date(2021, 8, 1)}
            endDate={new Date(2021, 8, 28)}
            renderTotal={renderTotal}
          />
        </Router>
      </StoreProvider>
    );
    expect(table.find('a.dash-table-title')).toHaveLength(1);
    expect(table.find('a.dash-table-title').text()).toEqual('Transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('orgSid=3');
    expect(table.find('Text').text()).toEqual('None');
  });

  it('Filled Table', () => {
    const items: DashboardPeriodCount[] = [
      {
        name: 'ANTHEM',
        secondaryDescr: null,
        count: 3,
        total: 207,
      },
      {
        name: 'CARECENTRAL',
        secondaryDescr: null,
        count: 3,
        total: 325,
      },
      {
        name: 'HEALTHADVOCATE',
        secondaryDescr: null,
        count: 1,
        total: 123,
      },
      {
        name: 'MERCER',
        secondaryDescr: null,
        count: 2,
        total: 284,
      },
      {
        name: 'NAVIGATE',
        secondaryDescr: null,
        count: 1,
        total: 54,
      },
      {
        name: 'VIRGINPULSE',
        secondaryDescr: null,
        count: 6,
        total: 619,
      },
    ];

    const table = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <DashboardTable
            id="__TransTable"
            title="Transmissions"
            linkTo="transmissions"
            orgSid="3"
            startDate={new Date(2021, 8, 1)}
            endDate={new Date(2021, 8, 28)}
            items={items}
            renderTotal={renderTotal}
          />
        </Router>
      </StoreProvider>
    );
    expect(table.find('a.dash-table-title')).toHaveLength(1);
    expect(table.find('a.dash-table-title').text()).toEqual('Transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('orgSid=3');
    expect(table.find('a.dash-table-title').props().href).toContain('startDate=2021-09-01');
    expect(table.find('a.dash-table-title').props().href).toContain('endDate=2021-09-28');
    expect(table.find('DetailsListBase')).toHaveLength(1);
    expect(table.find('StyledDetailsHeaderBase')).toHaveLength(0);
    expect(table.find('StyledDetailsRowBase')).toHaveLength(6);
    const firstRow = table.find('StyledDetailsRowBase').first();
    expect(firstRow.find('DetailsRowFields div.ms-DetailsRow-cell')).toHaveLength(2);
    const cells = firstRow.find('DetailsRowFields div.ms-DetailsRow-cell');
    expect(cells).toHaveLength(2);
    expect(cells.first().text()).toEqual('ANTHEM');
    expect(cells.at(1).text()).toEqual('3/207');

    expect(cells.first().find('a.vendor-name')).toHaveLength(1);
    expect(cells.first().find('a.vendor-name').props().href).toContain('transmissions');
    expect(cells.first().find('a.vendor-name').props().href).toContain('orgSid=3');
    expect(cells.first().find('a.vendor-name').props().href).toContain('startDate=2021-09-01');
    expect(cells.first().find('a.vendor-name').props().href).toContain('endDate=2021-09-28');

    expect(table.find('.cdx-item-total')).toHaveLength(6);
    expect(table.find('.cdx-item-total').first().text()).toEqual('3/207');
  });

  it('Filled Table with Specs', () => {
    const items: DashboardPeriodCount[] = [
      {
        name: 'ANTHEM',
        secondaryDescr: '1000Byte',
        count: 1,
        total: 87,
      },
      {
        name: 'ANTHEM',
        secondaryDescr: '600Byte',
        count: 1,
        total: 93,
      },
      {
        name: 'ANTHEM',
        secondaryDescr: '834x5010',
        count: 1,
        total: 27,
      },
      {
        name: 'CARECENTRAL',
        secondaryDescr: 'Eligibility',
        count: 1,
        total: 22,
      },
      {
        name: 'CARECENTRAL',
        secondaryDescr: '834x5010',
        count: 1,
        total: 152,
      },
    ];

    const table = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <DashboardTable
            id="__TransTable"
            title="Transmissions"
            linkTo="transmissions"
            orgSid="3"
            startDate={new Date(2021, 8, 1)}
            endDate={new Date(2021, 8, 28)}
            items={items}
            renderTotal={renderCount}
          />
        </Router>
      </StoreProvider>
    );
    expect(table.find('a.dash-table-title')).toHaveLength(1);
    expect(table.find('a.dash-table-title').text()).toEqual('Transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('transmissions');
    expect(table.find('a.dash-table-title').props().href).toContain('orgSid=3');
    expect(table.find('a.dash-table-title').props().href).toContain('startDate=2021-09-01');
    expect(table.find('a.dash-table-title').props().href).toContain('endDate=2021-09-28');
    expect(table.find('DetailsListBase')).toHaveLength(1);
    expect(table.find('StyledDetailsHeaderBase')).toHaveLength(0);
    expect(table.find('StyledDetailsRowBase')).toHaveLength(5);
    const firstRow = table.find('StyledDetailsRowBase').first();
    expect(firstRow.find('DetailsRowFields div.ms-DetailsRow-cell')).toHaveLength(2);
    const cells = firstRow.find('DetailsRowFields div.ms-DetailsRow-cell');
    expect(cells).toHaveLength(2);
    expect(cells.first().text()).toEqual('ANTHEMspec: 1000Byte');
    expect(cells.at(1).text()).toEqual('1');

    expect(cells.first().find('a.vendor-name')).toHaveLength(1);
    expect(cells.first().find('a.vendor-name').text()).toEqual('ANTHEM');
    expect(cells.first().find('a.vendor-name').props().href).toContain('transmissions');
    expect(cells.first().find('a.vendor-name').props().href).toContain('orgSid=3');
    expect(cells.first().find('a.vendor-name').props().href).toContain('startDate=2021-09-01');
    expect(cells.first().find('a.vendor-name').props().href).toContain('endDate=2021-09-28');

    expect(cells.first().find('Text.spec-name').text()).toEqual('spec: 1000Byte');

    expect(table.find('.cdx-item-count')).toHaveLength(5);
    expect(table.find('.cdx-item-count').first().text()).toEqual('1');
  });
});
