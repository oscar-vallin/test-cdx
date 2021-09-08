import React, { useState, useEffect, Fragment } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { InputText } from '../../../components/inputs/InputText';
import { Button } from '../../../components/buttons/Button';
import { Modal } from '../../../components/modals/Modal';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledDiv } from './ChangePasswordModal.styles';

const ChangePasswordModal = ({ hidden = false, ...props }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
  });

  const ModalFooter = () => {
    return (
      <>
        <StyledDiv>
          <Spacing margin={{ right: 'small' }}>
            <Button text="Cancel" onClick={() => alert('Cancel')} />
          </Spacing>

          <Button variant="primary" text="Save" onClick={() => alert('Save')} />
        </StyledDiv>
      </>
    );
  };

  useEffect(() => {}, [isFormValid]);

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

export { ChangePasswordModal };
