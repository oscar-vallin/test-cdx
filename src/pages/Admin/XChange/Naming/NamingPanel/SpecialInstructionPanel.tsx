import { useEffect, useState } from 'react';
import {
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useUpdateXchangeConfigInstructionMutation } from 'src/data/services/graphql';
import { useNotification } from 'src/hooks/useNotification';

type SpecialInstructionProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
    sid: string,
    onCount: (data: number) => void;
    specialInstruction?: string,
    hideIcon: (data: string | null) => void;
    refreshNamingPage: (data: boolean) => void;
};

const SpecialInstructionPanel = ({
  isOpen,
  closePanel,
  sid,
  onCount,
  specialInstruction,
  hideIcon,
  refreshNamingPage,
}: SpecialInstructionProps) => {
  const Toast = useNotification();
  const [instructionData, setInstructionData] = useState('');
  const [xchangeInstruction, { data, loading }] = useUpdateXchangeConfigInstructionMutation();

  const onSaveInstruction = () => {
    xchangeInstruction({
      variables: {
        sid,
        instruction: instructionData,
      },
    });
  };

  useEffect(() => {
    setInstructionData(specialInstruction ?? '');
  }, [specialInstruction]);

  useEffect(() => {
    if (!loading && data) {
      closePanel(false);
      refreshNamingPage(true);
      Toast.success({ text: 'The instructions were saved successfully' });
    }
  }, [data, loading]);

  const renderPanelHeader = () => (
    <PanelHeader id="__SpecialInstruction_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__SpecialInstruction_Panel_Title" variant="bold" size="large">
          {specialInstruction?.trim() === '' ? 'Add' : 'Update'} special instruction
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const renderPanelFooter = () => (
    <PrimaryButton
      id="__Special_Instruction_Button"
      iconProps={{ iconName: 'Save' }}
      onClick={() => {
        onSaveInstruction();
      }}
    >
      Save
    </PrimaryButton>
  );
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.smallFixedFar}
      onRenderHeader={renderPanelHeader}
      onRenderFooterContent={renderPanelFooter}
      isOpen={isOpen}
      onDismiss={() => {
        if (specialInstruction?.trim() === '') {
          onCount(1);
          setInstructionData('');
        } else {
          setInstructionData(specialInstruction ?? '');
          onCount(0)
        }
        hideIcon(null);
        closePanel(false);
      }}
    >
      <TextField
        multiline
        label="Instruction"
        resizable={false}
        value={instructionData}
        rows={15}
        onChange={(event, newValue) => {
          setInstructionData(newValue ?? '')
        }}
      />
    </ThemedPanel>
  );
};

export { SpecialInstructionPanel };
