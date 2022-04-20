import React, { useState } from 'react';
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack } from '@fluentui/react';
import { WorkPacketCommand } from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { Spacing } from 'src/components/spacings/Spacing';

type CommandButtonType = {
  id: string;
  icon: string;
  confirmationTitle?: string;
  confirmationMsg: string;
  command?: WorkPacketCommand | null;
  onClick: () => Promise<any>;
  callback?: () => void;
};

export const WorkPacketCommandButton = ({
  id,
  icon,
  confirmationTitle = 'Are you sure?',
  confirmationMsg,
  command,
  onClick,
  callback,
}: CommandButtonType) => {
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [ responseLogMessages, setResponseLogMessages ] = useState<any[]>([])

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
          maxWidth={700}
          hidden={isConfirmationHidden}
          onDismiss={() => setIsConfirmationHidden(true)}
          dialogContentProps={{
            type: DialogType.normal,
            title: responseLogMessages?.length  ? "Log Messages" : confirmationTitle,
            subText: responseLogMessages?.length  ? '' : confirmationMsg,
          }}
          modalProps={{ isBlocking: true }}
        >
          {responseLogMessages?.map((item, index)=>{
            return (
              <Spacing key={`dialog_logMessage-${index}`} padding={{ right: 'normal'}}>
                <LogMessageItem logMessage={item} />
              </Spacing>
            )
          })}
          {responseLogMessages.length>0 &&(
            <DialogFooter>
              <PrimaryButton
                  onClick={() => {
                    setIsConfirmationHidden(true);
                    if(callback) callback();
                  }}
                text="Close"
              />
            </DialogFooter>
          )}
          {!responseLogMessages?.length && (
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  onClick().then((res)=>{
                    if(res?.data){
                      const workPacketKey = Object.keys(res.data)[0];
                      if(res.data[workPacketKey].allMessages?.length){
                        setResponseLogMessages(res.data.workPacketDelete.allMessages)                        
                      }else{
                        setIsConfirmationHidden(true);
                        if(callback) callback();
                      }
                    }
                  })                  
                }}
                text="Yes"
              />
              <DefaultButton onClick={() => setIsConfirmationHidden(true)} text="No" />
            </DialogFooter>
          )}          
        </Dialog>
      </Stack.Item>
    );
  }
  return null;
};
