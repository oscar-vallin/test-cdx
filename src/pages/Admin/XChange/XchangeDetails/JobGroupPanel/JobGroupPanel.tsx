import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { PanelType } from '@fluentui/react';

type JobGroupProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
};

const JobGroupPanel = ({ isPanelOpen, closePanel }: JobGroupProps) => (
  <ThemedPanel
    closeButtonAriaLabel="Close"
    type={PanelType.medium}
    isOpen={isPanelOpen}
    onDismiss={() => {
      closePanel(false);
    }}
  >
    Job Group Panel
  </ThemedPanel>
);

export { JobGroupPanel };
