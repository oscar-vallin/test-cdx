import { LabelValue } from '.';
import { mountWithTheme } from 'src/utils/testUtils';

describe('LabelValue component which renders a label and a value', () => {
  it('Happy Path', () => {
    const wrapper = mountWithTheme(<LabelValue label="First Name" value="Joey" title="Joseph" />);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('span').get(0).props.children).toEqual('First Name:');
    expect(wrapper.find('span').get(1).props.children).toEqual('Joey');
    expect(wrapper.find('span').get(1).props.title).toEqual('Joseph');
  });

  it('Test a numeric value', () => {
    const wrapper = mountWithTheme(<LabelValue label="Age" value={5} />);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('span').get(0).props.children).toEqual('Age:');
    expect(wrapper.find('span').get(1).props.children).toEqual(5);
    expect(wrapper.find('span').get(1).props.title).toBeUndefined();
  });

  it('Test Empty', () => {
    const wrapper = mountWithTheme(<LabelValue label="None" />);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('span').get(0).props.children).toEqual('None:');
    expect(wrapper.find('span').get(1).props.children).toEqual('<empty>');
    expect(wrapper.find('span').get(1).props.title).toBeUndefined();
  });
});
