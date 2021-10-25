import { CDXTabs } from './Tabs';
import { renderWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  items: [
    {
      title: 'Test',
      content: 'Content',
      hash: '#test',
    },
  ],
  selectedKey: '',
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
});
