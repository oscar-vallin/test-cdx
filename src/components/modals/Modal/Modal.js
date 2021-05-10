import React from 'react';
import { StyledModal } from './Modal.styles';
import { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

const CDXModal = ({
  footer,
  title = '',
  subText = '',
  hidden = true,
  isBlocking = true,
  onDismiss = () => {},
  children,
}) => {
  return (
    <StyledModal
      hidden={hidden}
      onDismiss={onDismiss}
      modalProps={{ isBlocking }}
      dialogContentProps={{
        type: DialogType.normal,
        ...title ? { title } : {},
        ...subText ? { subText } : {},
      }}
    >
      {children}

      {footer && (
        <DialogFooter>
          {footer}
        </DialogFooter>
      )}
    </StyledModal>
  )
}

export { CDXModal };