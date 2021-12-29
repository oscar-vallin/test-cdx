import { shallow } from 'enzyme';
import { PageTitle as Component } from './PageTitle';
import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';

describe('PageTitle', () => {
  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    const pageTitle = shallow(<Component id="__LeTitle" title="Page Title" subTitle="Sub Title" icon="FilterSolid" />);
    expect(pageTitle).toMatchSnapshot();
  });

  it('Title Only', () => {
    const wrapper = shallow(<Component id="__PageTitle" title="Page Title Only" />);
    expect(wrapper.contains('Page Title Only')).toEqual(true);
  });

  it('Title and Icon', () => {
    const wrapper = shallow(<Component id="__PageTitle" title="Page Title" icon="FavoriteStar" />);
    expect(wrapper.contains('Page Title')).toEqual(true);
    expect(wrapper.containsMatchingElement(<FontIcon iconName="FavoriteStar" />)).toEqual(true);
  });

  it('Title, Subtitle, and Icon', () => {
    const wrapper = shallow(<Component id="__PageTitle" title="Page Title" subTitle="SubSub" icon="FavoriteStar" />);
    expect(wrapper.contains('Page Title')).toEqual(true);
    expect(wrapper.contains('SubSub')).toEqual(true);
    expect(wrapper.containsMatchingElement(<FontIcon iconName="FavoriteStar" />)).toEqual(true);
  });
});
