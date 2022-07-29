import { InheritedByIcon } from './InheritedByIcon';
import { shallow } from 'enzyme';
import { mountWithTheme } from 'src/utils/testUtils';

describe('InheritedBy Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallow(<InheritedByIcon id="icon" tooltip={undefined} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('InheritedBy icon and Tooltip ', () => {
    const wrapper = mountWithTheme(<InheritedByIcon id="inherit" tooltip="Hot Tips" />);
    expect(wrapper.find('CopyArrowRight16Filled')).toHaveLength(1);
  });
});