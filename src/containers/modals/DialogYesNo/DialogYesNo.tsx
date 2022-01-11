import { useState, useEffect, ReactElement } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib-commonjs/Dialog';
import { Button } from 'src/components/buttons';

const defaultPropsDialogYesNo = {
  open: false,
  title: 'Validation',
  message: 'Are you sure to continue?',
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: () => null,
  onYes: () => {},
  onNo: () => {},
  closeOnNo: true,
  closeOnYes: true,
  highlightNo: false,
  highlightYes: false,
  onClose: () => {},
};

export type DialogYesNoProps = {
  open?: boolean;
  title?: string;
  message?: string;
  messageYes?: string;
  messageNo?: string;
  onYesNo?: () => void;
  onYes?: () => any;
  onNo?: () => any;
  closeOnNo?: boolean;
  closeOnYes?: boolean;
  highlightNo?: boolean;
  highlightYes?: boolean;
  onClose?: () => any;
} & typeof defaultPropsDialogYesNo;

//
// ─── DIALOG YES NO ───────────────────────────────────────────────────────────────
//
const DialogYesNo = (props: DialogYesNoProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(props.open);

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  const handleYesNo = (isYes: boolean): null => {
    setIsOpen(false);

    if (isYes) {
      return props.onYes ? props.onYes() : null;
    }

    return props.onNo ? props.onNo() : null;
  };

  const handleYes = (): null => {
    if (props.closeOnYes) {
      props.onClose();
      setIsOpen(false);
    }

    return handleYesNo(true);
  };

  const handleNo = (): null => {
    if (props.closeOnYes) {
      props.onClose();
      setIsOpen(false);
    }

    return handleYesNo(false);
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={() => setIsOpen(false)}
      dialogContentProps={{
        type: DialogType.normal,
        title: props.title,
        subText: props.message,
      }}
      modalProps={
        { isBlocking: true,
          containerClassName: 'dialog-yes-no'
        }
      }
    >
      <DialogFooter>
        <Button
          id="__optionDialogYes"
          onClick={handleYes}
          text={props.messageYes}
          variant={props.highlightYes ? 'primary' : undefined}
        />
        <Button
          id="__optionDialogNo"
          onClick={handleNo}
          text={props.messageNo}
          variant={props.highlightNo ? 'primary' : undefined}
        />
      </DialogFooter>
    </Dialog>
  );
};

DialogYesNo.defaultProps = defaultPropsDialogYesNo;

export { DialogYesNo };
export default DialogYesNo;
