import { shallow } from 'enzyme';
import AccessPolicyGroupPanel from 'src/pages/Admin/AccessManagement/Groups/AccessPolicyGroup/AccessPolicyGroupPanel';
import { StoreProvider } from 'easy-peasy';
import store from '../../../../../store/index';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreateGroupPolicy: () => null,
  onUpdateGroupPolicy: () => null,
  selectedGroupId: '48',
  templateId: '',
};

describe('Unit test AccessPolicyGroupPanel', () => {
  const tree = shallow(
    <StoreProvider store={store}>
      <AccessPolicyGroupPanel {...defaultProps} />
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(AccessPolicyGroupPanel).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(AccessPolicyGroupPanel).toMatchSnapshot();
  });
});
