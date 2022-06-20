import { ErrorSeverity, UiSelectManyField } from 'src/data/services/graphql';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown/index';
import { mountWithTheme } from 'src/utils/testUtils';
import { expectInfoIcon, expectInfoWarningIcons, expectNoIcons, uiOptions } from './testData.test';

const fullField: UiSelectManyField = {
  value: [
    {
      name: 'One',
      value: '1',
    },
    {
      name: 'Four',
      value: '4',
    },
  ],
  label: 'Select Many Field',
  required: true,
  visible: true,
  readOnly: false,
  info: 'Select One or More Items',
  errMsg: 'This is a required field',
  errSeverity: ErrorSeverity.Error,
  options: 'fieldOpts',
};

describe('Multi Select UI Input', () => {
  it('Full Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputMultiSelect
        id="multiSelect"
        value={['1', '4']}
        onChange={onChange}
        uiField={fullField}
        placeholder="-- All --"
        options={uiOptions}
      />
    );

    const html = wrapper.html();
    expect(wrapper.find('#multiSelect_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#multiSelect-input').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#multiSelect_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#multiSelect-input').hostNodes().props().value).toEqual('One, Four');
    expect(html).toContain('Select Many Field');

    expectInfoWarningIcons(wrapper);
  });

  it('Hidden Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputMultiSelect
        id="multiSelect"
        value={['1', '4']}
        onChange={onChange}
        uiField={{
          ...fullField,
          visible: false,
        }}
        placeholder="-- All --"
        options={uiOptions}
      />
    );

    const html = wrapper.html();
    expect(wrapper.find('#multiSelect_lbl-Label-Text')).toHaveLength(0);
    expect(wrapper.find('#multiSelect-input')).toHaveLength(0);
    expect(wrapper.find('#multiSelect_lbl-Required-Text')).toHaveLength(0);
    expect(html.indexOf('Select Many Field')).toBeLessThan(0);

    expectNoIcons(wrapper);
  });

  const expectLabels = (wrapper) => {
    const html = wrapper.html();
    expect(wrapper.find('#multiSelect_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#multiSelect-input').hostNodes()).toHaveLength(0);
    expect(wrapper.find('#multiSelect_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(html).toContain('Select Many Field');
  };

  it('Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputMultiSelect
        id="multiSelect"
        value={['1', '4']}
        onChange={jest.fn()}
        uiField={{
          ...fullField,
          readOnly: true,
          errMsg: null,
        }}
        placeholder="-- All --"
        options={uiOptions}
      />
    );

    const html = wrapper.html();
    expectLabels(wrapper);
    expect(html).toContain('One, Four');

    expectInfoIcon(wrapper);
  });

  it('Empty Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputMultiSelect
        id="multiSelect"
        value={['1', '4']}
        onChange={jest.fn()}
        uiField={{
          ...fullField,
          readOnly: true,
          value: null,
        }}
        placeholder="-- All --"
        options={uiOptions}
      />
    );

    const html = wrapper.html();
    expectLabels(wrapper);
    expect(html).toContain('empty');

    expectInfoWarningIcons(wrapper);
  });
});
