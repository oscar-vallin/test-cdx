import React from 'react';
import { shallow } from 'enzyme';
import { CheckboxList } from "./CheckboxList";
import { UiOption } from "src/data/services/graphql";

const items: UiOption[] = [
  {
    label: "One",
    value: "1",
    info: null
  },
  {
    label: "Two",
    value: "2",
    info: null
  },
  {
    label: "Three",
    value: "3",
    info: "The Third Option"
  },
];

describe('Checkbox List Component', () => {

  it('Test Rendering Checkboxes', () => {
    let selected: string[] = [];
    const onChange = (selectedItems: string[]) => {
      selected = selectedItems;
    };

    const wrapper = shallow(<CheckboxList items={items} value={['1']} onChange={onChange}/>);
    expect(wrapper.find('StyledCheckboxBase')).toHaveLength(3);
    expect(wrapper.find('StyledCheckboxBase').get(0).props.label).toEqual('One');
    expect(wrapper.find('StyledCheckboxBase').get(0).props.checked).toEqual(true);
    expect(wrapper.find('StyledCheckboxBase').get(1).props.label).toEqual('Two');
    expect(wrapper.find('StyledCheckboxBase').get(1).props.checked).toEqual(false);
    expect(wrapper.find('StyledCheckboxBase').get(2).props.label).toEqual('Three');
    expect(wrapper.find('StyledCheckboxBase').get(2).props.checked).toEqual(false);

    wrapper.find('StyledCheckboxBase').last().simulate('change');
    expect(selected.includes('1')).toEqual(true);
    expect(selected.includes('2')).toEqual(false);
    expect(selected.includes('3')).toEqual(true);
  });

  it('Test Default Empty Message', () => {
    const wrapper = shallow(<CheckboxList items={[]} value={['1']} onChange={jest.fn()} emptyMessage='Custom Empty Message'/>);
    expect(wrapper.html()).toContain('Custom Empty Message');
  });

  it('Test Default Empty Message', () => {
    const wrapper = shallow(<CheckboxList items={[]} value={['1']} onChange={jest.fn()}/>);
    expect(wrapper.html()).toContain('No options available');
  });
});