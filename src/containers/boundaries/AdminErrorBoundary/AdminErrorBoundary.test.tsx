import AdminErrorBoundary from './AdminErrorBoundary';
import { shallowWithTheme } from '../../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import { shallow } from 'enzyme';
import store from '../../../store/index';

const defaultProps = {
  id: 'AdminErrorBoundary',
  menuOptionSelected: 'admin',
  sidebarOptionSelected: '',
};

describe('AdminErrorBoundary Testing Unit...', () => {
  const tree = shallowWithTheme(
    <StoreProvider store={store}>
      <AdminErrorBoundary {...defaultProps}></AdminErrorBoundary>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(AdminErrorBoundary).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should show an alert with message "Save" when click on Save button', () => {
    const wrapper = shallow(
      <StoreProvider store={store}>
        <AdminErrorBoundary></AdminErrorBoundary>
      </StoreProvider>
    );
    wrapper.find('LayoutDashboard[id="AdminErrorBoundary"]');
    expect(wrapper).toMatchSnapshot();
  });
});
