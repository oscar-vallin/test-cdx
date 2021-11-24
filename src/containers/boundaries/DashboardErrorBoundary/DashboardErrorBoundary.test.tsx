import DashboardErrorBoundary from './DashboardErrorBoundary';
import { shallowWithTheme } from '../../../utils/testUtils';
import { shallow } from 'enzyme';

const defaultProps = {
  type: 'ADMIN',
};

describe('Badge Testing Unit...', () => {
  const tree = shallowWithTheme(<DashboardErrorBoundary type="ADMIN"></DashboardErrorBoundary>);

  it('Should be defined', () => {
    expect(DashboardErrorBoundary).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const wrapper = shallowWithTheme(<DashboardErrorBoundary type="user"></DashboardErrorBoundary>);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should find table with Id TableAccessManagementGroupsId', () => {
    const wrapper = shallow(<DashboardErrorBoundary {...defaultProps}></DashboardErrorBoundary>);
    wrapper.find('Layout[isAdmin="ADMIN"]');
    expect(wrapper).toMatchSnapshot();
  });
});
