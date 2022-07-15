import React, { useEffect, useState } from 'react';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack } from '@fluentui/react';
import {
  WorkPacketCommand,
  WorkPacketCommandType,
  ChangeReason,
  WorkStatus,
  useReprocessDialogLazyQuery,
} from 'src/data/services/graphql';
import { theme } from 'src/styles/themes/theme';
import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { Spacing } from 'src/components/spacings/Spacing';
import { InputText } from 'src/components/inputs/InputText';
import { ErrorHandler } from 'src/utils/ErrorHandler';

type CommandButtonType = {
  id: string;
  icon: string;
  confirmationTitle?: string;
  confirmationMsg: string;
  command?: WorkPacketCommand | null;
  onClick?: () => Promise<any>;
  callback?: () => void;
  workPacketCommands?: any;
  realId?: string;
  packetStatus?: WorkStatus;
  fileName: string;
};

enum ButtonActionTypes {
  Default = 'DEFAULT',
  SecondaryDefault = 'SECONDARY_DEFAULT',
  HandleDeleteCmd = 'DELETE_CMD',
  HandleCloseLogMessageDialog = 'CLOSE_LOG_MESSAGE',
  HandleExternalReprocess = 'EXTERNAL_REPROCESS',
  HandleInternalReprocess = 'INTERNAL_REPROCESS',
  HandleReprocess = 'REPROCESS',
  HandleRename = 'RENAME',
  HandleInternalRerun = 'INTERNAL_RERUN',
  HandleExternalRerun = 'EXTERNAL_RERUN',
  HandleRerun = 'RERUN',
  SecondaryDefaultCallback = 'SECONDARY_DEFAULT_CALLBACK',
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
  packetStatus,
  fileName,
}: CommandButtonType) => {
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [showSecondaryButton, setShowSecondaryButton] = useState(true);
  const [showPrimaryButton, setShowPrimaryButton] = useState(true);
  const [showReprocessSecondButton, setShowReprocessSecondButton] = useState(false);
  const [responseLogMessages, setResponseLogMessages] = useState<any[]>([]);
  const [title, setTitle] = useState(responseLogMessages?.length ? 'Log Messages' : confirmationTitle);
  const [subText, setSubText] = useState(responseLogMessages?.length ? '' : confirmationMsg);

  const [buttonText, setButtonText] = useState('Yes');
  const [secondaryButtonText, setSecondaryButtonText] = useState('No');
  const [reprocessSecondButtonText, setReprocessSecondButtonText] = useState('External Exchange');
  const [reprocessSecondButtonAction, setReprocessSecondButtonAction] = useState(
    ButtonActionTypes.HandleExternalReprocess
  );
  const [buttonAction, setButtonAction] = useState(ButtonActionTypes.Default);
  const [secondaryButtonAction, setSecondaryButtonAction] = useState(ButtonActionTypes.SecondaryDefault);
  const [newFileName, setNewFileName] = useState(fileName);

  const handleError = ErrorHandler();

  const [
    apiCallReprocessDialog,
    { data: dataReprocessDialog, loading: loadingReprocessDialog, error: errorReprocessDialog },
  ] = useReprocessDialogLazyQuery({
    variables: {
      workOrderId: realId ?? '',
    },
  });

  useEffect(() => {
    handleError(errorReprocessDialog);
  }, [errorReprocessDialog, handleError]);

  const handleDefaultAction = () => {
    setIsConfirmationHidden(true);
    if (onClick) onClick().then();
    if (callback) callback();
  };

  const handleSecondaryDefaultAction = () => {
    setIsConfirmationHidden(true);
  };

  const handleSecondaryDefaultCallbackAction = () => {
    setIsConfirmationHidden(true);
    if (callback) callback();
  };

  const handleDeleteCmd = () => {
    if (onClick) {
      onClick().then((res) => {
        if (res?.data) {
          const workPacketKey = Object.keys(res.data)[0];
          setButtonText('Ok');
          setShowSecondaryButton(false);
          setButtonAction(ButtonActionTypes.SecondaryDefaultCallback);
          if (res.data[workPacketKey].allMessages?.length) {
            setResponseLogMessages(res.data.workPacketDelete.allMessages);
          }
          if (res.data[workPacketKey].response === 'SUCCESS') {
            setTitle('Success');
            setSubText('This Work Packet has been deleted');
          } else {
            setTitle('Failure');
            setSubText('Unable to delete this Work Packet');
          }
        }
      });
    }
  };

  const handleRenameCmd = () => {
    workPacketCommands
      .apiCallRenameReprocess({
        variables: {
          workOrderId: realId ?? '',
          newFileName,
        },
      })
      .then(() => {
        handleCloseLogMessageDialog();
        setNewFileName('');
      });
  };

  const handleCloseLogMessageDialog = () => {
    setIsConfirmationHidden(true);
    if (callback) callback();
  };

  const handleChangeReasonReprocess = (changeReason?: ChangeReason) => {
    workPacketCommands
      .apiCallReprocess({
        variables: {
          workOrderId: realId ?? '',
          changeReason: changeReason ?? null,
        },
      })
      .then(() => {
        handleCloseLogMessageDialog();
      });
  };

  const handleChangeReasonRerun = (changeReason?: ChangeReason) => {
    workPacketCommands
      .apiCallRerun({
        variables: {
          workOrderId: realId ?? '',
          stepName: packetStatus ?? '',
          changeReason: changeReason ?? null,
        },
      })
      .then(() => {
        handleCloseLogMessageDialog();
      });
  };

  useEffect(() => {
    if (command?.commandType === WorkPacketCommandType.Delete) {
      setShowSecondaryButton(true);
      setButtonText('Yes');
      if (!responseLogMessages?.length) {
        setButtonAction(ButtonActionTypes.HandleDeleteCmd);
      } else {
        setButtonAction(ButtonActionTypes.HandleCloseLogMessageDialog);
      }
    }
  }, [command?.commandType]);

  useEffect(() => {
    if (command?.commandType === WorkPacketCommandType.Rename) {
      setButtonAction(ButtonActionTypes.HandleRename);
      setNewFileName(fileName);
    }
  }, [command?.commandType]);

  useEffect(() => {
    if (!loadingReprocessDialog && dataReprocessDialog && dataReprocessDialog.reprocessDialog) {
      const { title: _title, message, captureChangeReason } = dataReprocessDialog.reprocessDialog;
      setTitle(_title ?? confirmationTitle);
      setSubText(message ?? confirmationMsg);
      if (captureChangeReason) {
        if (command?.commandType === WorkPacketCommandType.Reprocess) {
          setButtonAction(ButtonActionTypes.HandleInternalReprocess);
          setReprocessSecondButtonAction(ButtonActionTypes.HandleExternalReprocess);
        } else if (command?.commandType === WorkPacketCommandType.RerunStep) {
          setButtonAction(ButtonActionTypes.HandleInternalRerun);
          setReprocessSecondButtonAction(ButtonActionTypes.HandleExternalRerun);
        }

        setButtonText('Internal Change');
        setReprocessSecondButtonText('External Change');
        setShowReprocessSecondButton(true);
        setSecondaryButtonText('Cancel');
      } else {
        if (command?.commandType === WorkPacketCommandType.Reprocess) {
          setButtonAction(ButtonActionTypes.HandleReprocess);
        } else if (command?.commandType === WorkPacketCommandType.RerunStep) {
          setButtonAction(ButtonActionTypes.HandleRerun);
        }
        setButtonText('Yes');
      }
    }
  }, [dataReprocessDialog]);

  const getButtonAction = (_buttonAction: string) => {
    let method = handleDefaultAction;
    switch (_buttonAction) {
      case ButtonActionTypes.HandleDeleteCmd:
        method = handleDeleteCmd;
        break;
      case ButtonActionTypes.Default:
        method = handleDefaultAction;
        break;
      case ButtonActionTypes.SecondaryDefault:
        method = handleSecondaryDefaultAction;
        break;
      case ButtonActionTypes.HandleReprocess:
        method = () => {
          handleChangeReasonReprocess();
        };
        break;
      case ButtonActionTypes.HandleExternalReprocess:
        method = () => {
          handleChangeReasonReprocess(ChangeReason.External);
        };
        break;
      case ButtonActionTypes.HandleInternalReprocess:
        method = () => {
          handleChangeReasonReprocess(ChangeReason.Internal);
        };
        break;
      case ButtonActionTypes.HandleCloseLogMessageDialog:
        method = handleCloseLogMessageDialog;
        break;
      case ButtonActionTypes.HandleRename:
        method = handleRenameCmd;
        break;
      case ButtonActionTypes.HandleInternalRerun:
        method = () => {
          handleChangeReasonRerun(ChangeReason.Internal);
        };
        break;
      case ButtonActionTypes.HandleExternalRerun:
        method = () => {
          handleChangeReasonRerun(ChangeReason.External);
        };
        break;
      case ButtonActionTypes.HandleRerun:
        method = () => {
          handleChangeReasonRerun();
        };
        break;
      case ButtonActionTypes.SecondaryDefaultCallback:
        method = handleSecondaryDefaultCallbackAction;
        break;
    }
    return method;
  };

  const showDialog = () => {
    if (
      realId &&
      (command?.commandType === WorkPacketCommandType.Reprocess ||
        command?.commandType === WorkPacketCommandType.RerunStep)
    ) {
      apiCallReprocessDialog({
        variables: {
          workOrderId: realId,
        },
      });
    }
    setIsConfirmationHidden(false);
  };

  if (command) {
    return (
      <Stack.Item align="center">
        <PrimaryButton
          id={id}
          onClick={showDialog}
          iconProps={{ iconName: icon, style: { fontSize: theme.fontSizes.normal } }}
          style={{ fontSize: theme.fontSizes.normal }}
        >
          {command.label}
        </PrimaryButton>
        <Dialog
          maxWidth={700}
          hidden={isConfirmationHidden}
          onDismiss={() => setIsConfirmationHidden(true)}
          dialogContentProps={{
            type: DialogType.normal,
            title,
            subText,
          }}
          modalProps={{ isBlocking: true }}
        >
          {responseLogMessages?.map((item, index) => {
            return (
              <Spacing key={`dialog_logMessage-${index}`} padding={{ right: 'normal' }}>
                <LogMessageItem logMessage={item} />
              </Spacing>
            );
          })}
          {command?.commandType === WorkPacketCommandType.Rename && (
            <InputText
              id="renameInput"
              type="text"
              value={newFileName}
              label="Please specify a new file name to continue:"
              onChange={(e, newValue) => {
                setNewFileName(newValue ?? '');
              }}
            />
          )}
          <DialogFooter>
            {showPrimaryButton && (
              <PrimaryButton
                disabled={command?.commandType === WorkPacketCommandType.Rename && newFileName.length <= 0}
                onClick={getButtonAction(buttonAction)}
                text={buttonText}
              />
            )}
            {showReprocessSecondButton && (
              <PrimaryButton onClick={getButtonAction(reprocessSecondButtonAction)} text={reprocessSecondButtonText} />
            )}
            {showSecondaryButton && (
              <DefaultButton onClick={getButtonAction(secondaryButtonAction)} text={secondaryButtonText} />
            )}
          </DialogFooter>
        </Dialog>
      </Stack.Item>
    );
  }
  return null;
};
