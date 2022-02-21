import { ErrorSeverity, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { UIInputSelectOne } from './UIInputSelectOne';
import { mountWithTheme } from 'src/utils/testUtils';

const fullField: UiSelectOneField = {
  value: {
    name: 'Four',
    value: '4',
  },
  label: 'Select One Field',
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

describe('Select One UI Input', () => {
  it('Full Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
        onChange={onChange}
        uiField={fullField}
        placeholder="-- All --"
        options={uiOptions}
      />
    );

    const html = wrapper.html();
    expect(wrapper.find('#selectOne_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne-input').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne-input').hostNodes().props().value).toEqual('Four');
    expect(html).toContain('Select One Field');

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(1);
  });

  it('Hidden Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
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
    expect(wrapper.find('#selectOne_lbl-Label-Text')).toHaveLength(0);
    expect(wrapper.find('#selectOne-input')).toHaveLength(0);
    expect(wrapper.find('#selectOne_lbl-Required-Text')).toHaveLength(0);
    expect(html.indexOf('Select Many Field')).toBeLessThan(0);

    expect(wrapper.find('i[data-icon-name="Info"]')).toHaveLength(0);
    expect(wrapper.find('i[data-icon-name="Warning12"]')).toHaveLength(0);
  });

  it('Read Only Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
        onChange={onChange}
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
    expect(wrapper.find('#selectOne_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne-input').hostNodes()).toHaveLength(0);
    expect(wrapper.find('#selectOne_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(html).toContain('Select One Field');
    expect(html).toContain('Four');

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(0);
  });

  it('Empty Read Only Field', () => {
    const onChange = jest.fn();

    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
        onChange={onChange}
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
    expect(wrapper.find('#selectOne_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne-input').hostNodes()).toHaveLength(0);
    expect(wrapper.find('#selectOne_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(html).toContain('Select One Field');
    expect(html).toContain('empty');

    expect(wrapper.find('i[data-icon-name="Info"]').hostNodes()).toHaveLength(1);
    expect(wrapper.find('i[data-icon-name="Warning12"]').hostNodes()).toHaveLength(1);
  });
});
