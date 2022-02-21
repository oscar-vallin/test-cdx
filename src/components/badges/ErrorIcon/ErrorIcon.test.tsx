import { ErrorIcon } from 'src/components/badges/ErrorIcon/ErrorIcon';
import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';

describe('Error Icon component', () => {
  it('Empty value', () => {
    const wrapper = shallowWithTheme(<ErrorIcon id="icon" errorMessage={undefined} />);
    expect(wrapper.html()).toEqual('');
  });

  it('Tooltip with left pad defaulted', () => {
    const wrapper = mountWithTheme(<ErrorIcon id="err" errorMessage="Error Message" />);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html()).toContain('&nbsp;');
  });

  it('Tooltip with no left pad', () => {
    const wrapper = mountWithTheme(<ErrorIcon id="err" errorMessage="Error Message" leftPad={false} />);
    expect(wrapper.find('FontIcon')).toHaveLength(1);
    expect(wrapper.html().indexOf('&nbsp;')).toBeLessThan(0);
  });
});
