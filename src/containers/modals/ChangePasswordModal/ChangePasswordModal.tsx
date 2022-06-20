/* eslint-disable no-alert */
import { ReactElement } from 'react';
import { TextField } from '@fluentui/react';
import { Button } from 'src/components/buttons';
import { Modal } from 'src/components/modals/Modal';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledDiv } from './ChangePasswordModal.styles';

const defaultProps = {
  hidden: false,
};

type ChangePasswordModalProps = {
  hidden?: boolean;
} & typeof defaultProps;

const handleAlert = (message: string) => {
  alert(message);
};

const ModalFooter = () => {
  return (
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
  );
};

const ChangePasswordModal = ({ hidden, ...props }: ChangePasswordModalProps): ReactElement => {

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
