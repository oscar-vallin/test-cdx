import Component from './TableFilters';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';
import { OrganizationLink } from 'src/data/services/graphql';

const items: OrganizationLink[] = [
  {
    id: '1',
    name: 'Client 1',
    activityTime: '2019-01-01T00:00:00.000Z',
    orgId: '1',
  },
];

const defaultProps = {
  id: '',
  searchText: '',
  startDate: null,
  endDate: null,
};

describe('Table Vendor Count Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });
});
