import { shallow } from 'enzyme';
import { FontIcon } from '@fluentui/react';
import { PageTitle } from './PageTitle';

describe('PageTitle', () => {
  it('Should render correctly', () => {
    const pageTitle = shallow(<PageTitle id="__LeTitle" title="Page Title" subTitle="Sub Title" icon="FilterSolid" />);
    expect(pageTitle).toMatchSnapshot();
  });

  it('Title Only', () => {
    const wrapper = shallow(<PageTitle id="__Page_Title" title="Page Title Only" />);
    expect(wrapper.contains('Page Title Only')).toEqual(true);
    expect(wrapper.find('FontIcon')).toHaveLength(0);
  });

  it('Title and Icon', () => {
    const wrapper = shallow(<PageTitle id="__Page_Title" title="Page Title" icon="FavoriteStar" />);
    expect(wrapper.contains('Page Title')).toEqual(true);
    expect(wrapper.containsMatchingElement(<FontIcon iconName="FavoriteStar" />)).toEqual(true);
  });

  it('Title, Subtitle, and Icon', () => {
    const wrapper = shallow(<PageTitle id="__Page_Title" title="Page Title" subTitle="SubSub" icon="FavoriteStar" />);
    expect(wrapper.contains('Page Title')).toEqual(true);
    expect(wrapper.contains('SubSub')).toEqual(true);
    expect(wrapper.containsMatchingElement(<FontIcon iconName="FavoriteStar" />)).toEqual(true);
  });

  it('Loading Spinner', () => {
    const wrapper = shallow(<PageTitle id="__Page_Title" title="Page Title" subTitle="SubSub" icon="FavoriteStar" loading={true} />);
    expect(wrapper.find('StyledSpinnerBase')).toHaveLength(1);
  });
});
