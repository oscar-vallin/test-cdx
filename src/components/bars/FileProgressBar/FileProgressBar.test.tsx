import { FileProgressBar } from './FileProgressBar.js';
import { STEP_COLOR_PURPLE } from '../../../data/constants/FileStatusConstants.js';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  colors: ['#29c891'],
};

describe('FileProgressBar Testing Unit...', () => {
  const tree = mountWithTheme(<FileProgressBar {...defaultProps} />);

  it('Should be defined', () => {
    expect(FileProgressBar).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the provided color if its not processing', () => {
    const node = tree.find('#Box').last().getDOMNode();
    const style =  window.getComputedStyle(node);

    expect(style.background).toEqual('rgb(41, 200, 145)');
  });

  it('Should render the provided color if its not processing', () => {
    const wrapper = mountWithTheme(<FileProgressBar colors={[STEP_COLOR_PURPLE]} />);
    const node = wrapper.find('#Box').last().getDOMNode();
    const style =  window.getComputedStyle(node);

    expect(style.animation).toEqual('barberpole 3s linear infinite');
  });
});
