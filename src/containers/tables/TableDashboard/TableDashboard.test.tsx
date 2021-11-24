import Component from './TableDashboard';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { TABLE_NAMES } from 'src/data/constants/TableConstants';

const defaultProps = {
  id: '',
  tableId: TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR,
  data: 10,
  altData: 20,
  date: 'today',
  loading: false,
  title: 'Transmissions / BUs by Vendor',
  emptyMessage: 'None',
};

describe('Table Dashboard Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });
});
