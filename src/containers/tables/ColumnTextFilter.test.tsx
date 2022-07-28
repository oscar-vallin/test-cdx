import { mountWithTheme } from 'src/utils/testUtils';
import { ColumnTextFilter } from 'src/containers/tables/ColumnTextFilter';

describe('Column Text Filter Test', () => {
  it('Column Text Filtering', () => {
    const onFilter = jest.fn();

    const wrapper = mountWithTheme(<ColumnTextFilter id="CTF" filteredValue={''} onFilter={onFilter} />);

    const filterIcon = wrapper.find('FontIcon[id="CTF_icon"]');
    expect(filterIcon).toHaveLength(1);
    expect(filterIcon.props()['iconName']).toEqual('Filter');

    expect(wrapper.find('input')).toHaveLength(0);

    // Clicking the filter icon should show the callout
    filterIcon.simulate('click');
    const searchBox = wrapper.find('input[id="CTF_filter"]');
    expect(searchBox).toHaveLength(1);
    searchBox.simulate('change', {
      target: { value: 'AbC' },
    });

    const applyButton = wrapper.find('button[id="CTF_apply"]');
    expect(applyButton).toHaveLength(1);
    applyButton.simulate('click');

    expect(onFilter).toHaveBeenCalledWith('AbC');

    // Clicking the filter icon again should hide the callout
    filterIcon.simulate('click');
    expect(wrapper.find('input')).toHaveLength(0);
  });

  it('Render a Filtered column', () => {
    const onFilter = jest.fn();

    const wrapper = mountWithTheme(<ColumnTextFilter id="CTF" filteredValue={'XyZ'} onFilter={onFilter} />);

    const filterIcon = wrapper.find('FontIcon[id="CTF_icon"]');
    expect(filterIcon).toHaveLength(1);
    expect(filterIcon.props()['iconName']).toEqual('FilterSolid');
    expect(filterIcon.props().title).toEqual('Filtered by "XyZ"');

    // Clicking the filter icon should show the callout
    filterIcon.simulate('click');
    const searchBox = wrapper.find('input[id="CTF_filter"]');
    expect(searchBox).toHaveLength(1);
    expect(searchBox.props().value).toEqual('XyZ');
  });
});
