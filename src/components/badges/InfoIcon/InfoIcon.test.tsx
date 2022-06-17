import { InfoIcon } from './InfoIcon';
import { shallow } from 'enzyme';
import { mountWithTheme } from 'src/utils/testUtils';

describe('Information Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallow(<InfoIcon id="icon" tooltip={undefined} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('Info icon and Tooltip ', () => {
    const wrapper = mountWithTheme(<InfoIcon id="info" tooltip="Hot Tips" />);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
  });
});
