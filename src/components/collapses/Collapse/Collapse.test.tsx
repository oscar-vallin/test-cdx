import CDXCollapse from './Collapse.js';
import { mountWithTheme } from '../../../utils/testUtils';
import { shallow } from 'enzyme';

const defaultProps = {
  label: 'Test',
};

const theme = {
  radius: { large: '10px' },
  fontWeights: { normal: 400 },
  fontStyles: {
    link: `normal ${400} ${10}/${1} ${'Segoe UI'}, ${'Source Sans Pro'}, sans-serif`,
  },
  colors: {
    themeTertiary: '#000',
    warning: 'yellow',
    custom: { error: '#FAFAFA  ' },
  },
  spacing: { normal: '15px' },
  fontSizes: { normal: '400' },
};

describe('Collapse Testing Unit...', () => {
  const mockFn = jest.fn();

  const tree = mountWithTheme(
    <CDXCollapse {...defaultProps} onToggle={mockFn}>
      Content
    </CDXCollapse>
  );

  it('Should be defined', () => {
    expect(CDXCollapse).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property', () => {
    const text = tree.find('.collapse__trigger').at(0).text().trim();

    expect(text).toEqual(defaultProps.label);
  });

  it('Should trigger the onToggle callback', () => {
    tree.find('.collapse__trigger').at(0).simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('Test styled Collapse component', () => {
    const testTemp = shallow(
      <CDXCollapse {...defaultProps} onToggle={mockFn} expanded={true} theme={theme}>
        Content
      </CDXCollapse>
    ).dive();

    expect(testTemp).toMatchSnapshot();
  });
});
