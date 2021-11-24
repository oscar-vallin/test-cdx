import { ChangePasswordModal } from './ChangePasswordModal';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  hidden: true,
};

describe('Badge Testing Unit...', () => {
  const tree = mountWithTheme(<ChangePasswordModal {...defaultProps}></ChangePasswordModal>);

  it('Should be defined', () => {
    expect(ChangePasswordModal).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = mountWithTheme(<ChangePasswordModal hidden={false}></ChangePasswordModal>);
    expect(tree).toMatchSnapshot();
  });

  it('Should show an alert with message "Cancel" when click on Cancel button', () => {
    const wrapper = mountWithTheme(<ChangePasswordModal></ChangePasswordModal>);
    wrapper.find('Button[text="Cancel"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('Should show an alert with message "Save" when click on Save button', () => {
    const wrapper = mountWithTheme(<ChangePasswordModal></ChangePasswordModal>);
    wrapper.find('Button[text="Save"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });
});
