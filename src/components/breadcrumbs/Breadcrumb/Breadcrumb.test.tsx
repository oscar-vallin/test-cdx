import React, { ReactElement } from 'react';
import { mount, render } from 'enzyme';
import { CDXBreadcrumb } from './Breadcrumb.js';

const defaultProps = {
  items: [{ ID: 'test', TITLE: 'Test' }],
};

describe('Breadcrumb Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = render(<CDXBreadcrumb {...defaultProps} />);
  const [{ TITLE }] = defaultProps.items;

  it('Should be defined', () => {
    expect(CDXBreadcrumb).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the default dashboard button', () => {
    const text = tree.find('.ms-TooltipHost').first().text();

    expect(text).toEqual('Dashboard');
  });

  it('Should render the breadcrumb buttons', () => {
    const text = tree.find('.ms-TooltipHost').last().text();

    expect(text).toEqual(TITLE);
  });

  it('Should trigger the onClick callback', () => {
    const wrapper = mount(<CDXBreadcrumb {...defaultProps} onClick={mockFn} />);

    wrapper.find('.ms-Breadcrumb-itemLink').last().simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
