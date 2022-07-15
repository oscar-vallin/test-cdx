import { STEP_COLOR_PURPLE } from 'src/data/constants/FileStatusConstants';
import { mountWithTheme } from 'src/utils/testUtils';
import { FileProgressBar } from './FileProgressBar';
import { WorkStatus, WorkStep } from 'src/data/services/graphql';

describe('FileProgressBar Testing Unit...', () => {
  it('Should render the provided color if its not processing', () => {
    const tree = mountWithTheme(
      <FileProgressBar
        id="Box"
        stepStatus={{
          stepStatus: WorkStatus.Complete,
          step: WorkStep.TransmitFile,
          label: 'IgnoreMe',
          archiveOnly: false,
          segments: [{ color: '#29c891', label: 'Step' }],
        }}
      />
    );
    const node = tree.find('#Box .ms-Grid-col').last().getDOMNode();
    const style = window.getComputedStyle(node);

    expect(style.background).toEqual('rgb(41, 200, 145)');
  });

  it('Should render the barber pole if processing', () => {
    const wrapper = mountWithTheme(
      <FileProgressBar
        id="Box"
        stepStatus={{
          stepStatus: WorkStatus.Processing,
          step: WorkStep.EnqueueExtract,
          label: 'Processing',
          archiveOnly: false,
          segments: [{ color: STEP_COLOR_PURPLE, label: 'Receiving' }],
        }}
      />
    );
    const node = wrapper.find('#Box .ms-Grid-col').last().getDOMNode();
    const style = window.getComputedStyle(node);

    expect(style.animation).toEqual('barberpole 3s linear infinite');
  });
});
