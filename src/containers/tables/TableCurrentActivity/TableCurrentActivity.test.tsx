import Component from './TableCurrentActivity';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';
import { OrganizationLink } from 'src/data/services/graphql';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloContextProvider } from '../../../contexts/ApolloContext';

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
};

describe('Table Current Activity Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });

  it('Should find table with Id __Table__In__Process', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <Component {...defaultProps} />
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );
    const input = wrapper.find('Table[id="__Table__In__Process"]').first();
    expect(input).toMatchSnapshot();
  });
});
