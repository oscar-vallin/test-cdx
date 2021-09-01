import React, { ReactElement } from 'react';
import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { CDXTabs } from './Tabs.js';
import { defaultTheme } from '../../../styles/themes/index.js';
import { theme } from '../../../styles/themes/theme.js';

/* TODO: Move to util? */
const LightTheme = { ...theme, ...defaultTheme };
export const mountWithTheme = (children: any) => mount(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const renderWithTheme = (children: any) => render(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

const defaultProps = {
  items: [
    {
      title: 'Test',
      content: 'Content',
      hash: '#test',
    },
  ],
  selectedKey: '',
  theme,
};

describe('Tabs Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = renderWithTheme(<CDXTabs {...defaultProps} onClickTab={mockFn} />);
  const [{ title, content }] = defaultProps.items;

  it('Should be defined', () => {
    expect(CDXTabs).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the tab button', () => {
    const text = tree.find('.ms-Button-flexContainer').text().trim();

    expect(text).toEqual(title);
  });

  it('Should render the tab content', () => {
    const text = tree.find('[role="tabpanel"]').text().trim();

    expect(text).toEqual(content);
  });

  // it('Should trigger the onClickTab callback', () => {
  //   expect(mockFn).toHaveBeenCalled();
  // });
});
