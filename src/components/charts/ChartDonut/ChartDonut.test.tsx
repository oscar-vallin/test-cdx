import { render } from 'enzyme';
import { renderWithTheme } from 'src/utils/testUtils';
import { ChartDonut as Component } from './index';

const defaultProps = {
  id: '__ChartDonut',
  label: 'label',
  size: 50,
  data: [
    { name: 'Group A', value: 400, color: '' },
    { name: 'Group B', value: 300, color: '' },
    { name: 'Group C', value: 300, color: '' },
    { name: 'Group D', value: 200, color: '' },
    { name: 'Group E', value: 278, color: '' },
    { name: 'Group F', value: 189, color: '' },
  ],
};

jest.mock('src/store/ThemeStore/useThemeStore', () => ({
  useThemeStore: () => {
    return {
      userTheme: {
        colors: {
          black: '#121829',
          white: '#fefefe',
          custom: {
            severeError: '#FA4100',
            error: '#a80000',
            errorAlt: '#fde7e9',
            warning: '#D83B01',
            warningAlt: '#fcde54',
            success: '#107C10',
            successAlt: '#DFF6DD',
            info: '#005A9E',
            infoAlt: '#C7E0F4',
          },
        },
      },
      changeThemeColors: jest.fn(),
      setFontSize: jest.fn(),
      reset: jest.fn(),
    };
  }
}));


describe('Basic Input Component', () => {
  it('Renders 6 sectors circles in simple PieChart', () => {
    const wrapper = renderWithTheme(<Component {...defaultProps} />);

    expect(wrapper.find('.recharts-pie-sector').length).toEqual(defaultProps.data.length);
  });

  it('Renders 6 sectors circles when add Cell to specified props of eact slice', () => {
    const wrapper = renderWithTheme(<Component {...defaultProps} />);

    expect(wrapper.find('.recharts-pie-sector').length).toEqual(6);
  });

  it('Renders legend when all the values are 0', () => {
    const emptyData = [
      { name: 'Group A', value: 0, color: '' },
      { name: 'Group B', value: 0, color: '' },
      { name: 'Group C', value: 0, color: '' },
      { name: 'Group D', value: 0, color: '' },
      { name: 'Group E', value: 0, color: '' },
      { name: 'Group F', value: 0, color: '' },
    ];
    const wrapper = renderWithTheme(<Component {...defaultProps} data={emptyData} />);

    expect(wrapper.find('.recharts-text.label').text()).toEqual('');
    expect(wrapper.find('.recharts-pie-sector').length).toEqual(0);
  });

  it("Don't renders any sectors when width or height is smaller than 0", () => {
    const wrapper = render(<Component {...defaultProps} size={0} />);
    expect(wrapper.find('.recharts-pie-sector').length).toEqual(0);
  });

  it('Renders label legend item when add a Label element', () => {
    const wrapper = renderWithTheme(<Component {...defaultProps} />);
    expect(wrapper.find('.recharts-text.label').text()).toEqual(defaultProps.label);
  });
});
