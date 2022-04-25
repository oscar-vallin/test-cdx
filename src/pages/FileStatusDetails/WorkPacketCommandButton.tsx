import React, { useEffect, useState } from 'react';
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack } from '@fluentui/react';
import { WorkPacketCommand, WorkPacketCommandType, ChangeReason, WorkStatus} from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { Spacing } from 'src/components/spacings/Spacing';
import { InputText } from 'src/components/inputs/InputText';

type CommandButtonType = {
  id: string;
  icon: string;
  confirmationTitle?: string;
  confirmationMsg: string;
  command?: WorkPacketCommand | null;
  onClick: () => Promise<any>;
  callback?: () => void;
  workPacketCommands?: any;
  realId?: string;
  packetStatus?: WorkStatus;
};

enum ButtonActionTypes {
  Default= 'DEFAULT',
  SecondaryDefault= 'SECONDARY_DEFAULT',
  HandleDeleteCmd = 'DELETE_CMD',
  HandleCloseLogMessageDialog = 'CLOSE_LOG_MESSAGE',
  HandleExternalReprocess= 'EXTERNAL_REPROCESS',
  HandleInternalReprocess= 'INTERNAL_REPROCESS',
  HandleReprocess = 'REPROCESS',
  HandleRename = 'RENAME',
  HandleInternalRerun = 'INTERNAL_RERUN',
  HandleExternalRerun = 'EXTERNAL_RERUN',
  HandleRerun = "RERUN"
}


export const WorkPacketCommandButton = ({
  id,
  icon,
  confirmationTitle = 'Are you sure?',
  confirmationMsg,
  command,
  onClick,
  callback,
  workPacketCommands,
  realId,
  packetStatus
}: CommandButtonType) => {

  const [ isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [ showSecondaryButton, setShowSecondaryButton] = useState(true);
  const [ responseLogMessages, setResponseLogMessages ] = useState<any[]>([]);
  const [ title, setTitle ] = useState(responseLogMessages?.length  ? "Log Messages" : confirmationTitle)
  const [ subText, setSubText ] = useState(responseLogMessages?.length  ? '' : confirmationMsg)

  const [buttonText, setButtonText] = useState("Yes");
  const [secondaryButtonText, setSecondaryButtonText] = useState("No");
  const [ buttonAction, setButtonAction] = useState(ButtonActionTypes.Default)
  const [ secondaryButtonAction, setSecondaryButtonAction] = useState(ButtonActionTypes.SecondaryDefault)
  const [newFileName, setNewFileName] = useState('');
  
  const handleDefaultAction = () => {
    setIsConfirmationHidden(true);
    onClick().then();
    if(callback) callback();
  }
 
  const handleSecondaryDefaultAction = () =>{
    setIsConfirmationHidden(true);
  }

  const handleDeleteCmd =()=> {
    onClick().then((res)=>{
      if(res?.data){
        const workPacketKey = Object.keys(res.data)[0];
        if(res.data[workPacketKey].allMessages?.length){
          setResponseLogMessages(res.data.workPacketDelete.allMessages)      
          setButtonText("Close")
          setShowSecondaryButton(false)                  
        }else{
          setIsConfirmationHidden(true);
          setShowSecondaryButton(true);
          if(callback) callback();
        }
      }
    })
  }

  const handleRenameCmd=()=>{
    workPacketCommands.apiCallRenameReprocess({
      variables: {
        workOrderId: realId,
        newFileName: newFileName
      }
    }).then(()=>{
      handleCloseLogMessageDialog();
      setNewFileName('')
    })
  }

  const handleCloseLogMessageDialog =()=> {
    setIsConfirmationHidden(true);
    if(callback) callback();
  }        

  const handleChangeReasonReporcess = (changeReason?: ChangeReason) =>{
    workPacketCommands.apiCallReprocess({
      variables: {
        workOrderId: realId,
        changeReason: changeReason ?? null
      }
    }).then(()=>{
      handleCloseLogMessageDialog();
    })
  }
  
  const handleChangeReasonRerun = (changeReason?: ChangeReason) =>{
    workPacketCommands.apiCallRerun({
      variables: {
        workOrderId: realId,
        stepName: packetStatus ?? '',
        changeReason: changeReason ?? null
      }
    }).then(()=>{
      handleCloseLogMessageDialog();
    })
  }

  useEffect(()=>{ 
    if(command?.commandType===WorkPacketCommandType.Delete){
      if(!responseLogMessages?.length){
        setButtonAction(ButtonActionTypes.HandleDeleteCmd);
      }else{
        setButtonAction(ButtonActionTypes.HandleCloseLogMessageDialog);
      }
    }
  }, [command?.commandType])


  useEffect(()=>{ 
    if(command?.commandType===WorkPacketCommandType.Rename){
      setButtonAction(ButtonActionTypes.HandleRename)
    }
  }, [command?.commandType])


  useEffect(()=>{ 
    if(command?.commandType===WorkPacketCommandType.Reprocess){
      onClick().then((res)=>{
        if(res?.data?.reprocessDialog){
          const {title, message, captureChangeReason } = res.data.reprocessDialog 
          setTitle(title ?? confirmationTitle);
          setSubText(message?? confirmationMsg);   
          if(captureChangeReason){
            setButtonAction(ButtonActionTypes.HandleInternalReprocess);
            setSecondaryButtonAction(ButtonActionTypes.HandleExternalReprocess);
            setButtonText('Internal Change');
            setSecondaryButtonText('External Change');
          }else{
            setButtonAction(ButtonActionTypes.HandleReprocess);
            setButtonText('Yes');
          }
        }
      })
    }
  }, [command?.commandType])

  useEffect(()=>{ 
    if(command?.commandType===WorkPacketCommandType.RerunStep){
      onClick().then((res)=>{
        if(res?.data?.reprocessDialog){
          const {title, message, captureChangeReason } = res.data.reprocessDialog
          console.log( res.data.reprocessDialog.message)
          setTitle(title ?? confirmationTitle);
          setSubText(message?? confirmationMsg);   
          if(captureChangeReason){
            setButtonAction(ButtonActionTypes.HandleInternalRerun);
            setSecondaryButtonAction(ButtonActionTypes.HandleExternalRerun);
            setButtonText('Internal Change');
            setSecondaryButtonText('External Change');
          }else{
            setButtonAction(ButtonActionTypes.HandleRerun);
            setButtonText('Yes');
          }
        }
      })
    }
  }, [command?.commandType])

  const getButtonAction = (buttonAction: string) =>{
    let method = handleDefaultAction
    switch(buttonAction){
      case ButtonActionTypes.HandleDeleteCmd: 
        method = handleDeleteCmd;
        break;
      case ButtonActionTypes.Default:
        method = handleDefaultAction
        break;
      case ButtonActionTypes.SecondaryDefault:
        method = handleSecondaryDefaultAction;
        break;
      case ButtonActionTypes.HandleReprocess:
        method = ()=>{handleChangeReasonReporcess()};
        break;
      case ButtonActionTypes.HandleExternalReprocess:
        method = ()=>{handleChangeReasonReporcess(ChangeReason.External)};
        break;
      case ButtonActionTypes.HandleInternalReprocess:        
        method = ()=>{handleChangeReasonReporcess(ChangeReason.Internal)};
        break;
      case ButtonActionTypes.HandleCloseLogMessageDialog:
        method = handleCloseLogMessageDialog;
        break;
      case ButtonActionTypes.HandleRename:
        method = handleRenameCmd;
        break;
      case ButtonActionTypes.HandleInternalRerun:
        method = ()=>{handleChangeReasonRerun(ChangeReason.Internal)};
        break;
      case ButtonActionTypes.HandleExternalRerun:
        method = ()=>{handleChangeReasonRerun(ChangeReason.External)};
        break;
      case ButtonActionTypes.HandleRerun:
        method = ()=>{handleChangeReasonRerun()};
        break;
    }
    return method
  }

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
            title,
            subText
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
          {command?.commandType===WorkPacketCommandType.Rename && (             
            <InputText
              id="renameInput"
              type="text"
              value={newFileName}
              label="Please specify a new file name to continue:"
              onChange={(e, newValue)=>{
                setNewFileName(newValue ??'')
              }}
            ></InputText>
          )
        }
          <DialogFooter>
            <PrimaryButton
              disabled={(command?.commandType===WorkPacketCommandType.Rename && newFileName.length<=0)}
              onClick={getButtonAction(buttonAction)}
              text={buttonText}
            />
            {showSecondaryButton && (
              <DefaultButton
                onClick={getButtonAction(secondaryButtonAction)} 
                text={secondaryButtonText}/>
            )}
          </DialogFooter>
              
        </Dialog>
      </Stack.Item>
    );
  }
  return null;
};
