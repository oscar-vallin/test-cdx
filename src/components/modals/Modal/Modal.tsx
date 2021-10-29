import PropTypes from 'prop-types';
import { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { StyledModal } from './Modal.styles';

const CDXModal = ({
  footer,
  title = '',
  subText = '',
  hidden = true,
  isBlocking = true,
  onDismiss = () => null,
  children,
  ...props
}) => {
  return (
    <StyledModal
      hidden={hidden}
      onDismiss={onDismiss}
      modalProps={{ isBlocking }}
      dialogContentProps={{
        type: DialogType.normal,
        ...(title ? { title } : {}),
        ...(subText ? { subText } : {}),
      }}
      {...props}
    >
      {children}

      {footer && <DialogFooter>{footer}</DialogFooter>}
    </StyledModal>
  );
};

CDXModal.propTypes = {
  title: PropTypes.string,
  subText: PropTypes.string,
  hidden: PropTypes.bool,
  isBlocking: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export { CDXModal };
export default CDXModal;
