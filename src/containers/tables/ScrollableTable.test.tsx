import { IColumn } from '@fluentui/react';
import { mount } from 'enzyme';
import { ScrollableTable } from './ScrollableTable';
import { mountWithTheme } from 'src/utils/testUtils';
import { ApolloError } from '@apollo/client';

const columns: IColumn[] = [
  {
    key: 'name',
    name: 'name',
    minWidth: 200,
  },
];

const items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

describe('Scrollable Table component', () => {
  it('Scrollable Table', () => {
    const table = mount(<ScrollableTable id="_ItsATable" columns={columns} items={items} />);
    expect(table.find('ScrollablePaneBase')).toHaveLength(1);
    expect(table.find('DetailsListBase')).toHaveLength(1);
    expect(table.find('EmptyState')).toHaveLength(0);
    expect(table.find('#_ItsATable_Error')).toHaveLength(0);
  });

  it('Empty Table', () => {
    const table = mountWithTheme(<ScrollableTable id="_ItsATable" columns={columns} items={[]} />);
    expect(table.find('ScrollablePaneBase')).toHaveLength(0);
    expect(table.find('DetailsListBase')).toHaveLength(0);
    expect(table.find('EmptyState')).toHaveLength(1);
    expect(table.find('#_ItsATable_Error')).toHaveLength(0);
  });

  it('Error Table', () => {
    const error: ApolloError = {
      name: 'Test Error',
      clientErrors: [],
      extraInfo: undefined,
      graphQLErrors: [],
      networkError: null,
      stack: '',
      message: 'There be an issue afoot',
    };
    const table = mountWithTheme(<ScrollableTable id="_ItsATable" columns={columns} error={error} />);
    expect(table.find('ScrollablePaneBase')).toHaveLength(0);
    expect(table.find('DetailsListBase')).toHaveLength(0);
    expect(table.find('EmptyState')).toHaveLength(0);
    expect(table.find('#_ItsATable_Error')).toHaveLength(1);
    expect(table.find('#_ItsATable_Error').text()).toEqual('Error: There be an issue afoot');
  });
});
