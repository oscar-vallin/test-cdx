import { TableDashboard } from './TableDashboard';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';
import { BrowserRouter as Router } from 'react-router-dom';

const defaultProps = {
  id: 'TableDashboardId',
  data: [],
  altData: [],
  date: '',
  loading: false,
  tableId: TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR,
  title: '',
  emptyMessage: false,
};

describe('Table Dashboard Testing Unit...', () => {
  const tree = mountWithTheme(
    <StoreProvider store={store}>
      <Router>
        <TableDashboard {...defaultProps}></TableDashboard>
      </Router>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(TableDashboard).toBeDefined();
  });

  it('Should render correctly', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <TableDashboard {...defaultProps} data={null} altData={null}></TableDashboard>
        </Router>
      </StoreProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <TableDashboard {...defaultProps} data={[{ name: 'Name', count: 0, total: 0 }]}></TableDashboard>
        </Router>
      </StoreProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = shallowWithTheme(
      <StoreProvider store={store}>
        <Router>
          <TableDashboard
            {...defaultProps}
            altData={[{ name: 'Name', secondaryDescr: 'k', count: 0, total: 0 }]}
          ></TableDashboard>
        </Router>
      </StoreProvider>
    ).dive();
    expect(tree).toMatchSnapshot();
  });
});
