import { InfoIcon } from './InfoIcon';
import { mount, shallow } from 'enzyme';

describe('Information Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallow(<InfoIcon id="icon" tooltip={undefined} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('Tooltip with left pad defaulted', () => {
    const wrapper = mount(<InfoIcon id="info" tooltip="Hot Tips" />);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html()).toContain('&nbsp;');
  });

  it('Tooltip with no left pad', () => {
    const wrapper = mount(<InfoIcon id="info" tooltip="Hot Tips" leftPad={false} />);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html().indexOf('&nbsp;')).toBeLessThan(0);
  });
});
