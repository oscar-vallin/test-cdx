import { mount } from 'enzyme';
import { ButtonLink } from './ButtonLink';


const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('Button Link wrapper', () => {
  it('Using the "to" attribute', () => {
    const wrapper = mount(<ButtonLink id="__TestLink" to="/foo/bar">Hi</ButtonLink>);
    expect(wrapper.find('LinkBase[id="__TestLink"]')).toHaveLength(1);
    wrapper.find('LinkBase[id="__TestLink"]').simulate('click');
    expect(mockPush).toHaveBeenCalled();
    mockPush.mockReset();
  });

  it('Use a specific OnClick', () => {
    const clickIt = jest.fn();
    const wrapper = mount(<ButtonLink id="__TestLink" onClick={clickIt}>Hi</ButtonLink>);
    expect(wrapper.find('LinkBase[id="__TestLink"]')).toHaveLength(1);
    wrapper.find('LinkBase[id="__TestLink"]').simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(clickIt).toHaveBeenCalled();
  });

  it('Use an OnClick and a To', () => {
    const clickIt = jest.fn();
    const wrapper = mount(<ButtonLink id="__TestLink" to="/dont/go/here" onClick={clickIt}>Hi</ButtonLink>);
    expect(wrapper.find('LinkBase[id="__TestLink"]')).toHaveLength(1);
    wrapper.find('LinkBase[id="__TestLink"]').simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(clickIt).toHaveBeenCalled();
  });

});
