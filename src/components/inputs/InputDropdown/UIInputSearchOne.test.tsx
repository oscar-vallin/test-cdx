import { ErrorSeverity, UiSelectOneField } from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';
import {
  expectInfoIcon,
  expectInfoWarningIcons,
  expectNoIcons,
  uiOptions,
} from './testData';
import { UIInputSearchOne } from './UIInputSearchOne';

const fullField: UiSelectOneField = {
  value: {
    label: 'Four',
    value: '4',
  },
  label: 'Select One Search',
  required: true,
  visible: true,
  readOnly: false,
  info: 'Select One or More Items',
  errMsg: 'This is a required field',
  errSeverity: ErrorSeverity.Error,
  options: 'fieldOpts',
};

describe('Search One UI Input', () => {
  it('No Options', async () => {
    const onChange = jest.fn();
    const onType = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSearchOne
        id="__SearchOne"
        uiField={fullField}
        value={{
          value: '4',
          label: 'Four',
        }}
        onType={onType}
        onSelectValue={onChange}
        placeholder="Type to search"
        emptyText="Nothing found"
        options={[]}
      />
    );

    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__SearchOne-input"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__SearchOne-input"]').prop('value')).toEqual('Four');
    expect(wrapper.find('span[id="__SearchOne_lbl-Required-Text"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]').text()).toEqual('Select One Search');

    expectInfoWarningIcons(wrapper);

    wrapper.find('CustomizedIconButton').simulate('click');
    expect(wrapper.find('#__SearchOne-list').text()).toEqual('Clear value');

    wrapper.find('input[id="__SearchOne-input"]').simulate('input', { target: { value: '834' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(onType).toHaveBeenCalled();

    // wrapper.find('CustomizedIconButton').simulate('click');
    wrapper.update();

    // console.log(wrapper.debug());

    expect(wrapper.find('#__SearchOne-list').text()).toEqual('Nothing found');
  });

  it('Some Options', async () => {
    const onChange = jest.fn();
    const onType = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSearchOne
        id="__SearchOne"
        uiField={fullField}
        value={{
          value: '4',
          label: 'Four',
        }}
        onType={onType}
        onSelectValue={onChange}
        placeholder="Type to search"
        emptyText="Nothing found"
        options={uiOptions[1].values}
      />
    );

    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__SearchOne-input"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__SearchOne-input"]').prop('value')).toEqual('Four');
    expect(wrapper.find('span[id="__SearchOne_lbl-Required-Text"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]').text()).toEqual('Select One Search');

    expectInfoWarningIcons(wrapper);

    wrapper.find('input[id="__SearchOne-input"]').simulate('input', { target: { value: '834' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(onType).toHaveBeenCalled();

    wrapper.find('CustomizedIconButton').simulate('click');
    wrapper.update();

    wrapper.find('button[id="__SearchOne-list1"]').simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('Hidden Field', () => {
    const onChange = jest.fn();
    const onType = jest.fn();
    const wrapper = mountWithTheme(
      <UIInputSearchOne
        id="selectOne"
        value={{
          value: '4',
          label: 'Four',
        }}
        onType={onType}
        onSelectValue={onChange}
        uiField={{
          ...fullField,
          visible: false,
        }}
        placeholder="Type to search"
        options={uiOptions[1].values}
      />
    );

    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]')).toHaveLength(0);
    expect(wrapper.find('input[id="__SearchOne-input"]')).toHaveLength(0);
    expect(wrapper.find('span[id="__SearchOne_lbl-Required-Text"]')).toHaveLength(0);
    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]')).toHaveLength(0);

    expectNoIcons(wrapper);
  });

  const expectLabels = (wrapper) => {
    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__SearchOne-input"]').hostNodes()).toHaveLength(0);
    expect(wrapper.find('span[id="__SearchOne_lbl-Required-Text"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('span[id="__SearchOne_lbl-Label-Text"]').text()).toEqual('Select One Search');
  };

  it('Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputSearchOne
        id="__SearchOne"
        value={{
          value: '4',
          label: 'Four',
        }}
        onType={jest.fn()}
        onSelectValue={jest.fn()}
        uiField={{
          ...fullField,
          readOnly: true,
          errMsg: null,
        }}
        placeholder="-- All --"
        options={uiOptions[1].values}
      />
    );

    const html = wrapper.html();
    expectLabels(wrapper);
    expect(html).toContain('Four');

    expectInfoIcon(wrapper);
  });

  it('Empty Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputSearchOne
        id="__SearchOne"
        value={{
          value: '4',
          label: 'Four',
        }}
        onType={jest.fn()}
        onSelectValue={jest.fn()}
        uiField={{
          ...fullField,
          readOnly: true,
          value: null,
        }}
        placeholder="-- All --"
        options={uiOptions[1].values}
      />
    );

    const html = wrapper.html();
    expectLabels(wrapper);
    expect(html).toContain('empty');

    expectInfoWarningIcons(wrapper);
  });
});
