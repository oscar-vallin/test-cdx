import { InheritedFromIcon } from './InheritedFromIcon';
import { shallow } from 'enzyme';
import { mountWithTheme } from 'src/utils/testUtils';

describe('InheritedFrom Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallow(<InheritedFromIcon id="icon" tooltip={undefined} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('InheritedFrom icon and Tooltip ', () => {
    const wrapper = mountWithTheme(<InheritedFromIcon id="inherit" tooltip="Hot Tips" />);
    expect(wrapper.find('CopySelect20Filled')).toHaveLength(1);
  });
});
