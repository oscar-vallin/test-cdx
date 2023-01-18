import React from 'react';
import { UiStringField } from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';
import { UIInputCode } from 'src/components/inputs/InputCode/UIInputCode';

describe('UI Input Code Component', () => {

  it('Should render if visible and editable', async () => {
    const field: UiStringField = {
      label: 'XML Data',
      visible: true,
      required: true,
      value: 'RAWR',
      readOnly: false,
      min: 0,
      max: 4000,
    };

    let wrapper = mountWithTheme(
      <UIInputCode
        id="__XMLCode"
        uiField={field}
        mode="xml"
        value="<Test><MyData/></Test>"
        onChange={jest.fn()}
      />
    );
    console.log(wrapper?.debug());
    expect(wrapper.find('Text[id="__XMLCode_lbl-Label"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]').text()).toEqual("XML Data");
    expect(wrapper.find('textarea[id="__XMLCode"]')).toHaveLength(1);
    expect(wrapper.find('textarea[id="__XMLCode"]').text()).toEqual("<Test><MyData/></Test>");
  });

  it('Should not render if not visible', () => {
    const field: UiStringField = {
      label: 'XML Data',
      visible: false,
      required: false,
      value: 'RAWR',
      readOnly: false,
      min: 0,
      max: 4000,
    };

    const wrapper = mountWithTheme(
      <UIInputCode
        id="__XMLCode"
        uiField={field}
        mode="xml"
        onChange={jest.fn()}
      />);
    console.log(wrapper.debug());
    expect(wrapper.find('Text[id="__XMLCode_lbl-Label"]')).toHaveLength(0);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]')).toHaveLength(0);
    expect(wrapper.find('textarea')).toHaveLength(0);
    expect(wrapper.find('div[id="__XMLCode"]')).toHaveLength(0);
  });

  it('Do not render Label', () => {
    const field: UiStringField = {
      label: 'XML Data',
      visible: true,
      required: false,
      value: 'RAWR',
      readOnly: false,
      min: 0,
      max: 4000,
    };

    const wrapper = mountWithTheme(
      <UIInputCode
        id="__XMLCode"
        uiField={field}
        mode="xml"
        renderLabel={false}
        onChange={jest.fn()}
      />
    );
    console.log(wrapper.debug());

    expect(wrapper.find('Text[id="__XMLCode_lbl-Label"]')).toHaveLength(0);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]')).toHaveLength(0);
    expect(wrapper.find('textarea[id="__XMLCode"]')).toHaveLength(1);
  });


  it('Render Read Only', () => {
    const field: UiStringField = {
      label: 'XML Data',
      visible: true,
      required: false,
      value: 'RAWR',
      readOnly: true,
      min: 0,
      max: 4000,
    };

    const wrapper = mountWithTheme(
      <UIInputCode
        id="__XMLCode"
        uiField={field}
        mode="xml"
        value="<Test><MyData/></Test>"
        onChange={jest.fn()}
      />
    );

    console.log(wrapper.debug());
    expect(wrapper.find('Text[id="__XMLCode_lbl-Label"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__XMLCode_lbl-Label-Text"]').text()).toEqual("XML Data");
    expect(wrapper.find('textarea[id="__XMLCode"]')).toHaveLength(0);
    expect(wrapper.find('div[id="__XMLCode"]')).toHaveLength(1);
    expect(wrapper.find('div[id="__XMLCode"]').text()).toEqual("<Test><MyData/></Test>");
  });

});