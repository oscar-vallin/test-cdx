import { ReactElement } from 'react';
import {
  Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
} from '@fluentui/react';

export type DialogYesNoProps = {
  id: string;
  open?: boolean;
  title: string;
  message: string;
  labelYes?: string;
  labelNo?: string;
  onYes?: () => void;
  onNo?: () => void;
  highlightNo?: boolean;
  highlightYes?: boolean;
  onClose?: () => void;
};

//
// ─── DIALOG YES NO ───────────────────────────────────────────────────────────────
//
export const DialogYesNo = ({
  id,
  open,
  title,
  message,
  labelYes = 'Yes',
  labelNo = 'No',
  onYes,
  onNo,
  highlightNo,
  highlightYes,
  onClose,
}: DialogYesNoProps): ReactElement => {
  const handleYes = (): void => {
    if (onYes) {
      onYes();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleNo = (): void => {
    if (onNo) {
      onNo();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleDismiss = () => {
    if (onClose) {
      onClose();
    }
  };

  const renderYesButton = () => {
    if (highlightYes) {
      return <PrimaryButton id={`${id}_Yes`} onClick={handleYes} text={labelYes} />;
    }
    return <DefaultButton id={`${id}_Yes`} onClick={handleYes} text={labelYes} />;
  };

  const renderNoButton = () => {
    if (highlightNo) {
      return <PrimaryButton id={`${id}_No`} onClick={handleNo} text={labelNo} />;
    }
    return <DefaultButton id={`${id}_No`} onClick={handleNo} text={labelNo} />;
  };

  return (
    <Dialog
      hidden={!open}
      onDismiss={handleDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title,
        titleProps: {
          id: `${id}_title`,
        },
        subTextId: `${id}_subtitle`,
        subText: message,
      }}
      modalProps={{ isBlocking: true, containerClassName: 'dialog-yes-no' }}
    >
      <DialogFooter>
        {renderYesButton()}
        {renderNoButton()}
      </DialogFooter>
    </Dialog>
  );
};
