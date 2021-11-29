import { FileProgress } from './FileProgress';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  id: 'FileProgress_Id',
  step: 0,
  stepStatus: 0,
};

describe('FileProgress Testing Unit...', () => {
  const tree = mountWithTheme(
    <FileProgress {...defaultProps} step="" stepStatus={{ label: '', value: '' }}></FileProgress>
  );

  it('Should be defined', () => {
    expect(FileProgress).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should return null if progressItem does not exist', () => {
    const tree = mountWithTheme(<FileProgress {...defaultProps} step="a" stepStatus="b"></FileProgress>);
    expect(tree).toEqual({});
  });
});
