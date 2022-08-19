import { mount } from 'enzyme';
import { WalkThrough } from './WalkThrough';
import { topNavTour } from './tours';

describe('WalkThrough component', () => {
  it('Top Nav Tour', () => {
    const dismiss = jest.fn();
    const wrapper = mount(<WalkThrough id="LeTour" show={true} tour={topNavTour} onDismiss={dismiss} />);
    expect(wrapper.find('div[id="LeTour"]')).toHaveLength(1);
    expect(wrapper.find('div[id="LeTour"] div.ms-TeachingBubble-header').text()).toEqual('Main Navigation');
    expect(wrapper.find('div[id="LeTour"] .ms-TeachingBubble-subText').text()).toContain(
      'This shows the current Organization you are working in.'
    );

    // Footer should show steps
    const footerItems = wrapper.find('div[id="LeTour"] div.ms-TeachingBubble-footer div.ms-StackItem');
    expect(footerItems).toHaveLength(2);
    expect(footerItems.at(0).text()).toEqual('1 of 9');

    // Previous button should be disabled
    let prevButton = wrapper.find('button.ms-TeachingBubble-secondaryButton');
    expect(prevButton.props().disabled).toEqual(true);
    expect(prevButton.text()).toEqual('Previous');

    // Next button should be enabled
    let nextButton = wrapper.find('button.ms-TeachingBubble-primaryButton');
    expect(nextButton.props().disabled).toBeUndefined();
    expect(nextButton.text()).toEqual('Next');

    // Click Next to go to the next step
    nextButton.simulate('click');
    // Should be on the next step
    expect(wrapper.find('div[id="LeTour"] div.ms-TeachingBubble-header').text()).toEqual('Home Button');
    expect(wrapper.find('div[id="LeTour"] .ms-TeachingBubble-subText').text()).toContain(
      'This button brings you back to your Home page.'
    );
    expect(footerItems.at(0).text()).toEqual('2 of 9');

    // Previous button should be enabled
    prevButton = wrapper.find('button.ms-TeachingBubble-secondaryButton');
    expect(prevButton.props().disabled).toBeFalsy();
    // Click Previous to go back to the previous step
    prevButton.simulate('click');
    expect(wrapper.find('div[id="LeTour"] div.ms-TeachingBubble-header').text()).toEqual('Main Navigation');
    expect(wrapper.find('div[id="LeTour"] .ms-TeachingBubble-subText').text()).toContain(
      'This shows the current Organization you are working in.'
    );
    expect(footerItems.at(0).text()).toEqual('1 of 9');

    // Click next 8 more times to get to the end
    for (let i = 0; i < 8; i++) {
      nextButton.simulate('click');
    }

    nextButton = wrapper.find('button.ms-TeachingBubble-primaryButton');
    expect(nextButton.text()).toEqual('Finish');
    nextButton.simulate('click');

    expect(dismiss).toHaveBeenCalled();
  });

  it('WalkThrough hidden', () => {
    const wrapper = mount(<WalkThrough id="LeTour" show={false} tour={topNavTour} onDismiss={jest.fn()} />);
    expect(wrapper.find('div[id="LeTour"]')).toHaveLength(0);
  });
});
