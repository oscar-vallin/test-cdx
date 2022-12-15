import { UIInputTextArea } from 'src/components/inputs/InputTextArea/UIInputTextArea';
import { UiStringField } from 'src/data/services/graphql';
import { mountWithTheme, renderWithTheme } from 'src/utils/testUtils';

const defaultField: UiStringField = {
  label: 'Comments',
  max: 2000,
  min: 0,
  readOnly: false,
  required: true,
  visible: true,
};

const readOnlyField: UiStringField = {
  ...defaultField,
  readOnly: true,
};

const hiddenField: UiStringField = {
  ...defaultField,
  visible: false,
};

describe('UI Input Text Area', () => {
  it('Plain Text Area', () => {
    const wrapper = mountWithTheme(<UIInputTextArea id="__Comments" uiField={defaultField} value="Turkey Pastrami" />);
    expect(wrapper.find('FormLabel[id="__Comments_lbl"]')).toHaveLength(1);
    expect(wrapper.find('textarea[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find('textarea[id="__Comments"]').props().readOnly).toBeUndefined();
    expect(wrapper.find('textarea[id="__Comments"]').text()).toEqual('Turkey Pastrami');
  });

  it('Rich Text Area', () => {
    const wrapper = mountWithTheme(
      <UIInputTextArea id="__Comments" uiField={defaultField} showRichTextEditor={true} value="Turkey Pastrami" />
    );
    expect(wrapper.find('FormLabel[id="__Comments_lbl"]')).toHaveLength(1);
    expect(wrapper.find('div[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find('div[id="__Comments"]').props().className).toContain('quill');
    expect(wrapper.find('div[id="__Comments"]').text().trim()).toEqual('Turkey Pastrami');
  });

  it('Read Only Text Area', () => {
    const wrapper = mountWithTheme(<UIInputTextArea id="__Comments" uiField={readOnlyField} value="Turkey Pastrami" />);
    expect(wrapper.find('FormLabel[id="__Comments_lbl"]')).toHaveLength(1);
    expect(wrapper.find('textarea')).toHaveLength(0);
    expect(wrapper.find('pre[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find('pre[id="__Comments"]').text()).toEqual('Turkey Pastrami');
  });

  it('Read Only Rich Text Area', () => {
    const wrapper = mountWithTheme(
      <UIInputTextArea
        id="__Comments"
        uiField={readOnlyField}
        showRichTextEditor={true}
        value='&lt;div id="__htmlComment"&gt;Embedded HTML&lt;div&gt;'
      />
    );
    expect(wrapper.find('FormLabel[id="__Comments_lbl"]')).toHaveLength(1);
    expect(wrapper.find('Quill')).toHaveLength(0);
    expect(wrapper.find('pre[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find('pre[id="__Comments"]').props().dangerouslySetInnerHTML).toBeDefined();
  });

  it('Read Only Empty Value', () => {
    const wrapper = mountWithTheme(<UIInputTextArea id="__Comments" uiField={readOnlyField} />);
    expect(wrapper.find('FormLabel[id="__Comments_lbl"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__Comments"]').text()).toEqual('<empty>');
  });

  it('Not visible', () => {
    const wrapper = renderWithTheme(<UIInputTextArea id="__Comments" uiField={hiddenField} />);
    expect(wrapper.find('#__Comments_lbl')).toHaveLength(0);
    expect(wrapper.find('#__Comments')).toHaveLength(0);
    expect(wrapper.html()).toEqual('');
  });
});
