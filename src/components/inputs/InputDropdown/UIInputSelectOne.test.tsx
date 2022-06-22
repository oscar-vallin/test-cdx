import { ErrorSeverity, UiSelectOneField } from 'src/data/services/graphql';
import { UIInputSelectOne } from './UIInputSelectOne';
import { mountWithTheme } from 'src/utils/testUtils';
import {
  expectInfoIcon,
  expectInfoWarningIcons,
  expectNoIcons,
  uiOptions,
} from 'src/components/inputs/InputDropdown/testData';

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

    expectInfoWarningIcons(wrapper);
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

    expectNoIcons(wrapper);
  });

  const expectLabels = (wrapper) => {
    const html = wrapper.html();
    expect(wrapper.find('#selectOne_lbl-Label-Text').hostNodes()).toHaveLength(1);
    expect(wrapper.find('#selectOne-input').hostNodes()).toHaveLength(0);
    expect(wrapper.find('#selectOne_lbl-Required-Text').hostNodes()).toHaveLength(1);
    expect(html).toContain('Select One Field');
  };

  it('Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
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
    expect(html).toContain('Four');

    expectInfoIcon(wrapper);
  });

  it('Empty Read Only Field', () => {
    const wrapper = mountWithTheme(
      <UIInputSelectOne
        id="selectOne"
        value={'4'}
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
