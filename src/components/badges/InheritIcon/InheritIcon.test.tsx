import { InheritIcon } from './InheritIcon';
import { shallow } from 'enzyme';
import { mountWithTheme } from 'src/utils/testUtils';

describe('Inherit Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallow(<InheritIcon id="icon" tooltip={undefined} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('Inherit icon and Tooltip ', () => {
    const wrapper = mountWithTheme(<InheritIcon id="inherit" tooltip="Hot Tips" />);
    expect(wrapper.find('CopySelect20Filled')).toHaveLength(1);
  });
});
