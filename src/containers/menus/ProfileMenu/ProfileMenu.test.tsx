import { ProfileMenu } from './ProfileMenu';
import { shallowWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  id: 'ProfileMenuId',
  onUserSettings: () => {},
};

describe('Badge Testing Unit...', () => {
  const tree = shallowWithTheme(<ProfileMenu {...defaultProps}></ProfileMenu>);

  it('Should be defined', () => {
    expect(ProfileMenu).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
