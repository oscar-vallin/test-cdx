import { ErrorIcon } from 'src/components/badges/ErrorIcon/ErrorIcon';
import { mount, shallow } from 'enzyme';


describe('Error Icon component', () => {

  it('Empty value', () => {
    const wrapper = shallow(<ErrorIcon id='icon' errorMessage={undefined} />);
    expect(wrapper.children()).toHaveLength(0)
  });

  it('Tooltip with left pad defaulted', () => {
    const wrapper = mount(<ErrorIcon id='err' errorMessage='Error Message'/>);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html()).toContain('&nbsp;');
  });

  it('Tooltip with no left pad', () => {
    const wrapper = mount(<ErrorIcon id='err' errorMessage='Error Message' leftPad={false}/>);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html().indexOf('&nbsp;')).toBeLessThan(0);
  });
});
