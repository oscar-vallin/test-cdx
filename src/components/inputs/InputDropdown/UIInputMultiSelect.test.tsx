import { ErrorSeverity, UiOptions, UiSelectManyField } from 'src/data/services/graphql';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown/index';
import { mountWithTheme } from 'src/utils/testUtils';

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

const uiOptions: UiOptions[] = [
  {
    key: 'ignoreMe',
    values: [],
  },
  {
    key: 'fieldOpts',
    values: [
      {
        value: '1',
        label: 'One',
      },
      {
        value: '2',
        label: 'Two',
      },
      {
        value: '3',
        label: 'Three',
      },
      {
        value: '4',
        label: 'Four',
      },
      {
        value: '5',
        label: 'Five',
      },
    ],
  },
  {
    key: 'ignoreMeToo',
    values: [],
  },
];

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

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(1);
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

    expect(wrapper.find('i[data-icon-name="Info"]')).toHaveLength(0);
    expect(wrapper.find('i[data-icon-name="Warning12"]')).toHaveLength(0);
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

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(0);
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

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(1);
  });
});
