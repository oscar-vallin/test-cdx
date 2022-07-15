import { mountWithTheme } from 'src/utils/testUtils';
import { WorkStatus, WorkStep } from 'src/data/services/graphql';
import {
  STEP_COLOR_BLUE,
  STEP_COLOR_GREEN,
  STEP_COLOR_NONE,
  STEP_COLOR_RED,
} from 'src/data/constants/FileStatusConstants';
import { FileProgress } from './FileProgress';

describe('FileProgress Testing Unit...', () => {
  it('Should return null if progressItem does not exist', () => {
    const tree = mountWithTheme(
      <FileProgress
        id="PBar"
        step={WorkStep.TransmitFile}
        stepStatus={WorkStatus.NoRecords}
        archiveOnly={false}
      ></FileProgress>
    );
    expect(tree).toEqual({});
  });

  it('All Three segments should render when complete', () => {
    const tree = mountWithTheme(
      <FileProgress
        id="PBar"
        step={WorkStep.TransmitFile}
        stepStatus={WorkStatus.Complete}
        archiveOnly={false}
      ></FileProgress>
    );
    expect(tree.find('Box[order=0]')).toHaveLength(1);
    expect(tree.find('Box[order=0]').props().color).toEqual(STEP_COLOR_GREEN);
    expect(tree.find('Box[order=1]')).toHaveLength(1);
    expect(tree.find('Box[order=1]').props().color).toEqual(STEP_COLOR_GREEN);
    expect(tree.find('Box[order=2]')).toHaveLength(1);
    expect(tree.find('Box[order=2]').props().color).toEqual(STEP_COLOR_GREEN);
  });

  it('Archive Only should render blue', () => {
    const tree = mountWithTheme(
      <FileProgress
        id="PBar"
        step={WorkStep.TransmitFile}
        stepStatus={WorkStatus.Complete}
        archiveOnly={true}
      ></FileProgress>
    );
    expect(tree.find('Box[order=0]')).toHaveLength(1);
    expect(tree.find('Box[order=0]').props().color).toEqual(STEP_COLOR_GREEN);
    expect(tree.find('Box[order=1]')).toHaveLength(1);
    expect(tree.find('Box[order=1]').props().color).toEqual(STEP_COLOR_GREEN);
    expect(tree.find('Box[order=2]')).toHaveLength(1);
    expect(tree.find('Box[order=2]').props().color).toEqual(STEP_COLOR_BLUE);
  });

  it('Errors should render red', () => {
    const tree = mountWithTheme(
      <FileProgress
        id="PBar"
        step={WorkStep.TransformExtract}
        stepStatus={WorkStatus.Error}
        archiveOnly={false}
      ></FileProgress>
    );
    expect(tree.find('Box[order=0]')).toHaveLength(1);
    expect(tree.find('Box[order=0]').props().color).toEqual(STEP_COLOR_GREEN);
    expect(tree.find('Box[order=1]')).toHaveLength(1);
    expect(tree.find('Box[order=1]').props().color).toEqual(STEP_COLOR_RED);
    expect(tree.find('Box[order=2]')).toHaveLength(1);
    expect(tree.find('Box[order=2]').props().color).toEqual(STEP_COLOR_NONE);
  });
});
