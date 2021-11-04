/* eslint-disable no-alert */
import { ReactElement } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button } from '../../../components/buttons/Button';
import { Modal } from '../../../components/modals/Modal';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledDiv } from './ChangePasswordModal.styles';

const defaultProps = {
  hidden: false,
};

type ChangePasswordModalProps = {
  hidden?: boolean;
} & typeof defaultProps;

const ChangePasswordModal = ({ hidden = false, ...props }: ChangePasswordModalProps): ReactElement => {
  const handleAlert = (message: string): null => {
    alert(message);
    return null;
  };

  const ModalFooter = () => {
    return (
      <>
        <StyledDiv>
          <Spacing margin={{ right: 'small' }}>
            <Button
              id="__ChangePasswordModalID"
              text="Cancel"
              variant="secondary"
              disabled={false}
              block={false}
              onClick={() => handleAlert('Cancel')}
            />
          </Spacing>

          <Button
            id="__ChangePasswordModalID"
            variant="primary"
            text="Save"
            disabled={false}
            block={false}
            onClick={() => handleAlert('Save')}
          />
        </StyledDiv>
      </>
    );
  };

  return (
    <Modal title="Change password" hidden={hidden} footer={<ModalFooter />} {...props}>
      <Spacing margin={{ bottom: 'small' }}>
        <TextField required canRevealPassword type="password" label="Current password" />
      </Spacing>

      <Spacing margin={{ bottom: 'double' }}>
        <TextField required canRevealPassword type="password" label="New password" />
      </Spacing>
    </Modal>
  );
};

ChangePasswordModal.defaultProps = defaultProps;

export { ChangePasswordModal };
