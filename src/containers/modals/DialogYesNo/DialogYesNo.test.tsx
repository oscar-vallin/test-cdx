import Component from './DialogYesNo';
import { mountWithTheme } from 'src/utils/testUtils';

const defaultProps = {
  open: true,
  title: '',
  message: '',
  onYes: jest.fn(),
  onNo: jest.fn(),
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: jest.fn(),
  closeOnNo: false,
  closeOnYes: false,
};

describe('Dialog Yes/No Container Testing Unit...', () => {
  const mountedComponent = mountWithTheme(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(mountedComponent.children()).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent.children()).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = mountWithTheme(<Component open={true} />);
    expect(wrapper.children()).toMatchSnapshot();
  });

  it('Should show an alert with message "Yes" when click on Yes button', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    wrapper.find('Button[text="Yes"]').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should show an alert with message "No" when click on Yes button', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    wrapper.find('Button[text="No"]').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
