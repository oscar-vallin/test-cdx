import React, { useState } from 'react';
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack } from '@fluentui/react';
import { WorkPacketCommand } from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';

type CommandButtonType = {
  id: string;
  icon: string;
  confirmationTitle?: string;
  confirmationMsg: string;
  command?: WorkPacketCommand | null;
  onClick: () => void;
};

export const WorkPacketCommandButton = ({
  id,
  icon,
  confirmationTitle = 'Are you sure?',
  confirmationMsg,
  command,
  onClick,
}: CommandButtonType) => {
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);

  if (command) {
    return (
      <Stack.Item align="center">
        <ActionButton
          id={id}
          onClick={() => setIsConfirmationHidden(false)}
          iconProps={{ iconName: icon, style: { fontSize: theme.fontSizes.normal } }}
          style={{ fontSize: theme.fontSizes.normal }}
        >
          {command.label}
        </ActionButton>
        <Dialog
          hidden={isConfirmationHidden}
          onDismiss={() => setIsConfirmationHidden(true)}
          dialogContentProps={{
            type: DialogType.normal,
            title: confirmationTitle,
            subText: confirmationMsg,
          }}
          modalProps={{ isBlocking: true }}
        >
          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                onClick();
                setIsConfirmationHidden(true);
              }}
              text="Yes"
            />
            <DefaultButton onClick={() => setIsConfirmationHidden(true)} text="No" />
          </DialogFooter>
        </Dialog>
      </Stack.Item>
    );
  }
  return null;
};
