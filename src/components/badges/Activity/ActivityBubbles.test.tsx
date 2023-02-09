import { ActivityBubbles } from './ActivityBubbles'
import { XchangeActivity } from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';

describe("Activity Bubbles Unit Testing", () => {
  const zero: XchangeActivity = {
    filesProcessed: 0,
    lastActivity: new Date(2023, 1, 31, 3, 33, 34)
  }
  const five: XchangeActivity = {
    filesProcessed: 5,
    lastActivity: new Date(2023, 1, 31, 3, 33, 34)
  };
  const ten: XchangeActivity = {
    filesProcessed: 10,
    lastActivity: new Date(2023, 3, 15, 3, 33, 34)
  };
  const twenty: XchangeActivity = {
    filesProcessed: 20,
    lastActivity: new Date(2023, 1, 28, 15, 33, 34)
  };

  it("Totals with values", () => {
    const wrapper = mountWithTheme(
      <ActivityBubbles
        total={true}
        orgSid="9"
        uat={five}
        test={ten}
        prod={twenty}/>);

    const bubbles = wrapper.find("ActivityBubbles");
    expect(bubbles).toBeDefined();

    expect(bubbles.children()).toHaveLength(3);
    expect(bubbles.childAt(0).prop('large')).toBeTruthy();
    expect(bubbles.childAt(1).prop('large')).toBeTruthy();
    expect(bubbles.childAt(2).prop('large')).toBeTruthy();
    expect(bubbles.childAt(0).prop('color')).toEqual('purple');
    expect(bubbles.childAt(1).prop('color')).toEqual('orange');
    expect(bubbles.childAt(2).prop('color')).toEqual('blue');
    expect(bubbles.childAt(0).text()).toEqual('5');
    expect(bubbles.childAt(1).text()).toEqual('10');
    expect(bubbles.childAt(2).text()).toEqual('20');
  });

  it("Empty Totals", () => {
    const wrapper = mountWithTheme(
      <ActivityBubbles
        total={true}
        orgSid="9"
        uat={zero}
        test={zero}
        prod={zero}/>);

    const bubbles = wrapper.find("ActivityBubbles");
    expect(bubbles).toBeDefined();

    expect(bubbles.children()).toHaveLength(3);
    expect(bubbles.childAt(0).prop('large')).toBeTruthy();
    expect(bubbles.childAt(1).prop('large')).toBeTruthy();
    expect(bubbles.childAt(2).prop('large')).toBeTruthy();
    expect(bubbles.childAt(0).prop('color')).toEqual('gray');
    expect(bubbles.childAt(1).prop('color')).toEqual('gray');
    expect(bubbles.childAt(2).prop('color')).toEqual('gray');
    expect(bubbles.childAt(0).text()).toEqual('0');
    expect(bubbles.childAt(1).text()).toEqual('0');
    expect(bubbles.childAt(2).text()).toEqual('0');
  });

  it("Item with values", () => {
    const wrapper = mountWithTheme(
      <ActivityBubbles
        total={false}
        orgSid="9"
        uat={five}
        test={ten}
        prod={twenty}/>);

    const bubbles = wrapper.find("ActivityBubbles");
    expect(bubbles).toBeDefined();

    expect(bubbles.children()).toHaveLength(3);
    expect(wrapper.find('div.uat')).toHaveLength(1);
    expect(wrapper.find('div.uat').prop('color')).toEqual('purple');
    expect(wrapper.find('div.uat').text()).toEqual('5');
    expect(wrapper.find('div.test')).toHaveLength(1);
    expect(wrapper.find('div.test').prop('color')).toEqual('orange');
    expect(wrapper.find('div.test').text()).toEqual('10');
    expect(wrapper.find('div.prod')).toHaveLength(1);
    expect(wrapper.find('div.prod').prop('color')).toEqual('blue');
    expect(wrapper.find('div.prod').text()).toEqual('20');

    wrapper.find('div.prod').simulate('mouseenter');
    console.log(wrapper.debug());
  });

  it("Empty Item", () => {
    const wrapper = mountWithTheme(
      <ActivityBubbles
        total={false}
        orgSid="9"
        uat={zero}
        test={zero}
        prod={zero}/>);

    const bubbles = wrapper.find("ActivityBubbles");
    expect(bubbles).toBeDefined();

    expect(bubbles.children()).toHaveLength(3);
    expect(wrapper.find('div.uat')).toHaveLength(1);
    expect(wrapper.find('div.uat').prop('color')).toEqual('gray');
    expect(wrapper.find('div.uat').text()).toEqual('0');
    expect(wrapper.find('div.test')).toHaveLength(1);
    expect(wrapper.find('div.test').prop('color')).toEqual('gray');
    expect(wrapper.find('div.test').text()).toEqual('0');
    expect(wrapper.find('div.prod')).toHaveLength(1);
    expect(wrapper.find('div.prod').prop('color')).toEqual('gray');
    expect(wrapper.find('div.prod').text()).toEqual('0');
  });
});