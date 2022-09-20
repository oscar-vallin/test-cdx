import { useState } from 'react';
import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { PanelType } from '@fluentui/react';

type JobGroupProps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
};

const JobGroupPanel = ({ isPanelOpen, closePanel }: JobGroupProps) => {
  const [title, setTitle] = useState('Job Group Panel');
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText={title}
      isOpen={isPanelOpen}
      onDismiss={() => {
        closePanel(false);
      }}
    >
      Job Group Panel
    </ThemedPanel>
  );
};

export { JobGroupPanel };
