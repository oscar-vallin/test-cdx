import { UiBooleanField } from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';
import { UIInputToggle } from './UIInputToggle';

const uiField: UiBooleanField = {
  errCode: undefined,
  errMsg: undefined,
  errSeverity: undefined,
  info: undefined,
  inheritedBy: undefined,
  inheritedFrom: undefined,
  label: 'Subscribed',
  readOnly: false,
  required: true,
  value: true,
  visible: true,
};

const readOnlyField: UiBooleanField = {
  ...uiField,
  readOnly: true,
};

const hiddenField: UiBooleanField = {
  ...uiField,
  visible: false,
};

describe('UI Input Toggle', () => {
  it('Editable Field', () => {
    const wrapper = mountWithTheme(<UIInputToggle id="__Subscribe" uiField={uiField} value={true} />);
    expect(wrapper.find('div[id="__Subscribe_lbl"]')).toHaveLength(1);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]')).toHaveLength(1);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]').props().disabled).toBeFalsy();
  });

  it('No Label', () => {
    const wrapper = mountWithTheme(
      <UIInputToggle id="__Subscribe" uiField={uiField} value={true} renderLabel={false} />
    );
    expect(wrapper.find('div[id="__Subscribe_lbl"]')).toHaveLength(0);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]')).toHaveLength(1);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]').props().disabled).toBeFalsy();
  });

  it('Read Only Field', () => {
    const wrapper = mountWithTheme(<UIInputToggle id="__Subscribe" uiField={readOnlyField} value={true} />);
    expect(wrapper.find('div[id="__Subscribe_lbl"]')).toHaveLength(1);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]')).toHaveLength(1);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]').props().disabled).toBeTruthy();
  });

  it('Hidden Field', () => {
    const wrapper = mountWithTheme(<UIInputToggle id="__Subscribe" uiField={hiddenField} value={true} />);
    expect(wrapper.find('div[id="__Subscribe_lbl"]')).toHaveLength(0);
    expect(wrapper.find('ToggleBase[id="__Subscribe"]')).toHaveLength(0);
    expect(wrapper.html()).toEqual('');
  });
});
