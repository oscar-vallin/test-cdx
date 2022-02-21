import { UiBooleanField } from 'src/data/services/graphql';
import { UIInputCheck } from 'src/components/inputs/InputCheck/index';
import { mountWithTheme } from 'src/utils/testUtils';

const fullField: UiBooleanField = {
  value: true,
  label: 'Confirm?',
  info: 'Information',
  errMsg: 'Required',
  visible: true,
  readOnly: false,
  required: true,
};

const minField: UiBooleanField = {
  value: false,
  label: 'Chills?',
  info: undefined,
  errMsg: undefined,
  visible: true,
  readOnly: false,
  required: false,
};

const hiddenField: UiBooleanField = {
  value: true,
  label: 'Hide Me?',
  info: 'Information',
  errMsg: 'Required',
  visible: false,
  readOnly: false,
  required: true,
};

describe('Input Check UI Field', () => {
  it('Test Full Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(<UIInputCheck id="daCheck" value={true} uiField={fullField} onChange={onChange} />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').props().id).toEqual('daCheck');
    expect(wrapper.find('input').props().type).toEqual('checkbox');
    expect(wrapper.find('input').props().checked).toEqual(true);

    expect(wrapper.html()).toContain('Confirm?');

    expect(wrapper.find("i[data-icon-name='Info']")).toHaveLength(1);
    expect(wrapper.find("i[data-icon-name='Warning12']")).toHaveLength(1);

    // Test onChange
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });

  it('Test Min Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(<UIInputCheck id="daCheck" value={false} uiField={minField} onChange={onChange} />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').props().id).toEqual('daCheck');
    expect(wrapper.find('input').props().type).toEqual('checkbox');
    expect(wrapper.find('input').props().checked).toEqual(false);

    expect(wrapper.html()).toContain('Chills?');
    expect(wrapper.html().indexOf('*')).toBeLessThan(0);

    expect(wrapper.find("i[data-icon-name='Info']")).toHaveLength(0);
    expect(wrapper.find("i[data-icon-name='Warning12']")).toHaveLength(0);

    // Test onChange
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });

  it('Test Hidden Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputCheck id="daCheck" value={true} uiField={hiddenField} onChange={onChange} />
    );
    expect(wrapper.find('input')).toHaveLength(0);

    expect(wrapper.html().indexOf('Hide Me?')).toBeLessThan(0);
    expect(wrapper.html().indexOf('*')).toBeLessThan(0);

    expect(wrapper.find("i[data-icon-name='Info']")).toHaveLength(0);
    expect(wrapper.find("i[data-icon-name='Warning12']")).toHaveLength(0);
  });
});
