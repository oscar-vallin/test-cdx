import Component from './TableOrganizations';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { OrganizationLink } from 'src/data/services/graphql';
import { TableOrganizations } from './TableOrganizations';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';
import { BrowserRouter as Router } from 'react-router-dom';

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
  tableName: 'Test Table',
  items: items,
  loading: false,
  data: [],
};

describe('Table Organizations Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);
  const tree = mountWithTheme(
    <StoreProvider store={store}>
      <Router>
        <TableOrganizations {...defaultProps}></TableOrganizations>
      </Router>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
    expect(tree).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });
});
