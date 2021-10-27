import { UserToken } from './UserToken';
import { renderWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  id: 'UserTokenId',
  name: 'Test',
};

describe('UserToken Testing Unit...', () => {
  const tree = renderWithTheme(<UserToken {...defaultProps} />);

  it('Should be defined', () => {
    expect(UserToken).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render first letter of the name property', () => {
    const name = tree.find('.ms-Persona-initials').text();

    expect(name).toEqual(defaultProps.name.charAt(0));
  });
});
