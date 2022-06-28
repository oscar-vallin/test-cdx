import { UiOption, UiSelectManyField } from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';
import { UICheckboxList } from './UICheckboxList';

const uiField: UiSelectManyField = {
  label: 'Movies',
  readOnly: false,
  required: true,
  value: [],
  visible: true,
};

const readOnlyField = {
  ...uiField,
  readOnly: true,
};

const hiddenField = {
  ...uiField,
  visible: false,
};

const options: UiOption[] = [
  { value: '1', label: 'The Phantom Menace' },
  { value: '2', label: 'Attack of the Clones' },
  { value: '3', label: 'Revenge of the Sith' },
  { value: '4', label: 'A New Hope' },
  { value: '5', label: 'The Empires Strikes Back' },
  { value: '6', label: 'Return of the Jedi' },
  { value: '7', label: 'The Force Awakens' },
  { value: '8', label: 'The Last Jedi' },
  { value: '9', label: 'The Rise of Skywalker' },
];

const value: string[] = ['5', '6', '7'];

describe('UI Checkbox List', () => {
  it('Editable List', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList
        id="__Movies"
        uiField={uiField}
        onChange={jest.fn()}
        value={value}
        subtitle="Star Wars"
        options={options}
      />
    );

    expect(wrapper.find('div[id="__Movies_lbl"]')).toHaveLength(1);
    // Look for subtitle
    expect(wrapper.find('Text[variant="muted"]').text()).toEqual('Star Wars');

    expect(wrapper.find('div[id="__Movies"]')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(9);
    expect(wrapper.find('input[type="checkbox"]').at(0).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(1).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(2).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(3).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(4).props().checked).toBeTruthy();
    expect(wrapper.find('input[type="checkbox"]').at(5).props().checked).toBeTruthy();
    expect(wrapper.find('input[type="checkbox"]').at(6).props().checked).toBeTruthy();
    expect(wrapper.find('input[type="checkbox"]').at(7).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(8).props().checked).toBeFalsy();
  });

  it('No Options', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList id="__Movies" uiField={uiField} onChange={jest.fn()} value={value} />
    );

    expect(wrapper.find('div[id="__Movies_lbl"]')).toHaveLength(1);
    // Look for subtitle
    expect(wrapper.find('Text[variant="muted"]')).toHaveLength(0);

    expect(wrapper.find('div[id="__Movies"]')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(0);
    expect(wrapper.find('div[id="__Movies"]').text()).toEqual('No options available');
  });

  it('No Label', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList id="__Movies" uiField={uiField} onChange={jest.fn()} hideLabel={true} options={options} />
    );

    expect(wrapper.find('div[id="__Movies_lbl"]')).toHaveLength(0);

    expect(wrapper.find('div[id="__Movies"]')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(9);
  });

  it('Read Only List', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList id="__Movies" uiField={readOnlyField} onChange={jest.fn()} value={value} options={options} />
    );

    expect(wrapper.find('div[id="__Movies_lbl"]')).toHaveLength(1);

    expect(wrapper.find('div[id="__Movies"]')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(0);
    expect(wrapper.find('FontIcon')).toHaveLength(3);
  });

  it('Read Only Empty Values', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList id="__Movies" uiField={readOnlyField} onChange={jest.fn()} options={options} />
    );

    expect(wrapper.find('div[id="__Movies_lbl"]')).toHaveLength(1);

    expect(wrapper.find('div[id="__Movies"]')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(0);
    expect(wrapper.find('FontIcon')).toHaveLength(0);
    expect(wrapper.find('Text[variant="muted"]')).toHaveLength(1);
    expect(wrapper.find('Text[variant="muted"]').text()).toEqual('No values selected');
  });

  it('Hidden List', () => {
    const wrapper = mountWithTheme(
      <UICheckboxList
        id="__Movies"
        uiField={hiddenField}
        onChange={jest.fn()}
        value={value}
        subtitle="Star Wars"
        options={options}
      />
    );

    expect(wrapper.html()).toEqual('');
  });
});
