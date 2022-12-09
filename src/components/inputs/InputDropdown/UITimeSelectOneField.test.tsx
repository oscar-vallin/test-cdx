import { ErrorSeverity, UiSelectOneField } from 'src/data/services/graphql';
import { UITimeSelectOneField } from './UITimeSelectOneField';
import { mountWithTheme } from 'src/utils/testUtils';
import {
  expectNoIcons,
  uiOptions,
} from 'src/components/inputs/InputDropdown/testData';

const fullField: UiSelectOneField = {
    value: {
      label: 'Four',
      value: '4',
    },
    label: 'Select One Field',
    required: true,
    visible: true,
    readOnly: false,
    info: 'Select One or More Items',
    errMsg: 'This is a required field',
    errSeverity: ErrorSeverity.Error,
  };

describe('Select One UI Input', () => {
    it('Field', () => {
        const onChange = jest.fn();

        const wrapper = mountWithTheme(
            <UITimeSelectOneField
            id="selectOne"
            value={'4'}
            onChange={onChange}
            uiFieldMinute={fullField}
            uiFieldHour={fullField}
            placeholder="-- All --"
            options={uiOptions}
      />
        );

        const html = wrapper.html();
        expect(wrapper.find('span').hostNodes()).toHaveLength(2);
        expect(wrapper.find('div[role="combobox"]')).toHaveLength(1);
        wrapper.find('div[role="combobox"]').simulate('click');
        expect(wrapper.find('button').at(0).simulate('click'));
        wrapper.find('span').at(1).simulate('click');
        expect(html.indexOf('Select Many Field')).toBeLessThan(0);
    });

    it('Hidden Field', () => {
        const onChange = jest.fn();
    
        const wrapper = mountWithTheme(
          <UITimeSelectOneField
            id="selectOne"
            value={'4'}
            onChange={onChange}
            uiFieldHour={{
              ...fullField,
              visible: false,
            }}
            uiFieldMinute={{
              ...fullField,
              visible: false,
            }}
            placeholder="-- All --"
            options={uiOptions}
          />
        );
    
        const html = wrapper.html();
        expect(wrapper.find('span')).toHaveLength(0);
        expect(html.indexOf('Select Many Field')).toBeLessThan(0);
    
        expectNoIcons(wrapper);
      });

      it('Error message in dropdown field', () => {
        const wrapper = mountWithTheme(
          <UITimeSelectOneField
            id="selectOne"
            value={'4'}
            onChange={jest.fn()}
            uiFieldHour={{
              ...fullField,
              readOnly: false,
              value: null,
              errMsg: 'Please fill out all required* fields',
            }}
            uiFieldMinute={{
              ...fullField,
              readOnly: false,
              value: null,
              errMsg: 'Please fill out all required* fields',
            }}
            placeholder="-- All --"
            options={uiOptions}
          />
        );
    
        expect(wrapper.find("i[data-icon-name='Warning']")).toHaveLength(1);
      });
})  