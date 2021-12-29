import { shallow } from 'enzyme';
import CreateGroupPanel from './CreateGroupPanel';
import { StoreProvider } from 'easy-peasy';
import store from '../../../../../store/index';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  sronCreateGroupPolicyc: () => null,
  onUpdateGroupPolicy: () => null,
  selectedGroupId: '48',
  templateId: '',
};

describe('Unit test CreateGroupPanel', () => {
  const tree = shallow(
    <StoreProvider store={store}>
      <CreateGroupPanel {...defaultProps} />
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(CreateGroupPanel).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(CreateGroupPanel).toMatchSnapshot();
  });
});
