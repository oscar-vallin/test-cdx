import { mountWithTheme } from 'src/utils/testUtils';
import { ColumnHeader, DataColumn } from 'src/containers/tables/ColumnHeader';
import { WorkStatus } from 'src/data/services/graphql';

describe('Column Header Testing', () => {
  it('Default Render', () => {
    const col: DataColumn = {
      key: 'firstName',
      name: 'First Name',
      fieldName: 'firstName',
      dataType: 'string',
      minWidth: 0,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} />);
    // Not sortable or filterable so no menu
    const button = wrapper.find('button[id="ColHeader"]');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('First Name');

    button.simulate('click');

    // Menu should not show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(0);
  });

  it('Sortable Text Column', () => {
    const col: DataColumn = {
      key: 'firstName',
      name: 'First Name',
      fieldName: 'firstName',
      dataType: 'string',
      minWidth: 0,
      sortable: true,
      isSorted: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);
    expect(wrapper.find('li.sort-asc-firstName button').text()).toEqual('A to Z');
    expect(wrapper.find('li.sort-desc-firstName button').text()).toEqual('Z to A');

    // Ascending option should be checked off because isSorted is true
    expect(wrapper.find('li.sort-asc-firstName StyledIconBase[iconName="CheckMark"]')).toHaveLength(1);
    expect(wrapper.find('li.sort-desc-firstName StyledIconBase[iconName="CheckMark"]')).toHaveLength(0);
  });

  it('Sortable Number Column', () => {
    const col: DataColumn = {
      key: 'totalCount',
      name: 'Total',
      fieldName: 'totalCount',
      dataType: 'number',
      minWidth: 0,
      sortable: true,
      isSorted: true,
      isSortedDescending: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);
    expect(wrapper.find('li.sort-asc-totalCount button').text()).toEqual('Smaller to larger');
    expect(wrapper.find('li.sort-desc-totalCount button').text()).toEqual('Larger to smaller');

    // Descending option should be checked off because isSorted is true and isSortedDescending is true
    expect(wrapper.find('li.sort-asc-totalCount StyledIconBase[iconName="CheckMark"]')).toHaveLength(0);
    expect(wrapper.find('li.sort-desc-totalCount StyledIconBase[iconName="CheckMark"]')).toHaveLength(1);
  });

  it('Sortable Date Column', () => {
    const col: DataColumn = {
      key: 'timestamp',
      name: 'Timestamp',
      fieldName: 'timestamp',
      dataType: 'date',
      minWidth: 0,
      sortable: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);
    expect(wrapper.find('li.sort-asc-timestamp button').text()).toEqual('Older to newer');
    expect(wrapper.find('li.sort-desc-timestamp button').text()).toEqual('Newer to older');

    // Neither menu option should be checked off because isSorted is not set
    expect(wrapper.find('li.sort-asc-timestamp StyledIconBase[iconName="CheckMark"]')).toHaveLength(0);
    expect(wrapper.find('li.sort-desc-timestamp StyledIconBase[iconName="CheckMark"]')).toHaveLength(0);
  });

  it('Filterable Text Column', async () => {
    const onFilter = jest.fn();
    const col: DataColumn = {
      key: 'firstName',
      name: 'First Name',
      fieldName: 'firstName',
      dataType: 'string',
      minWidth: 0,
      sortable: true,
      filterable: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} onFilter={onFilter} />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);

    // Filter should show
    const inputFilter = wrapper.find('input[id="ColHeader_filter"]');
    expect(inputFilter).toHaveLength(1);
    inputFilter.simulate('change', {
      target: { value: 'abc' },
    });
    await new Promise((r) => setTimeout(r, 1000));
    expect(onFilter).toHaveBeenCalledWith('abc');

    onFilter.mockReset();

    // Now clear the filter
    wrapper.find('div.ms-SearchBox-clearButton button').simulate('click');
    await new Promise((r) => setTimeout(r, 1000));

    expect(onFilter).toHaveBeenCalledWith('');
  });

  it('Filterable Enum Column Check', async () => {
    const onFilter = jest.fn();
    const col: DataColumn = {
      key: 'packetStatus',
      name: 'Status',
      fieldName: 'packetStatus',
      dataType: 'enum',
      enumType: WorkStatus,
      minWidth: 0,
      sortable: true,
      filterable: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} onFilter={onFilter} />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);

    // options should show
    expect(wrapper.find('li.filter-enum-Queued')).toHaveLength(1);
    expect(wrapper.find('li.filter-enum-Processing')).toHaveLength(1);
    expect(wrapper.find('li.filter-enum-QualityCheckFailed')).toHaveLength(1);
    expect(wrapper.find('li.filter-enum-TechMigrationCheckFailed')).toHaveLength(1);
    wrapper.find('li.filter-enum-Hold button').simulate('click');

    expect(onFilter).toHaveBeenCalledWith('HOLD');
  });

  it('Filterable Enum Column Uncheck', async () => {
    const onFilter = jest.fn();
    const col: DataColumn = {
      key: 'packetStatus',
      name: 'Status',
      fieldName: 'packetStatus',
      dataType: 'enum',
      enumType: WorkStatus,
      isFiltered: true,
      minWidth: 0,
      sortable: true,
      filterable: true,
    };
    const wrapper = mountWithTheme(<ColumnHeader id="ColHeader" col={col} onFilter={onFilter} filterValue="HOLD" />);
    const button = wrapper.find('button[id="ColHeader"]');
    button.simulate('click');
    // Menu should show
    expect(wrapper.find('CalloutContentBase')).toHaveLength(1);

    // options should show
    const holdOption = wrapper.find('li.filter-enum-Hold button');
    expect(holdOption).toHaveLength(1);
    expect(holdOption.find('StyledIconBase').props()['iconName']).toEqual('CheckMark');
    holdOption.simulate('click');

    expect(onFilter).toHaveBeenCalledWith(undefined);
  });
});
