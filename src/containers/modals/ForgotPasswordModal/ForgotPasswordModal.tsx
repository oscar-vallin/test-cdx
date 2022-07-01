/* eslint-disable no-alert */
import { ReactElement, useEffect, useState } from 'react';
import { Text, Dialog, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import { useForgotPasswordMutation, useBeginLoginMutation } from 'src/data/services/graphql';
import { InputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { DialogMessageWrapper, StyledError } from './ForgotPasswordModal.styles';

const defaultProps = {
  open: false,
  isOpen: (data: boolean) => {},
  currentUserId: '',
};

type ForgotPasswordModalProps = {
  open: boolean;
  isOpen: (data: boolean) => void;
  currentUserId: string;
} & typeof defaultProps;

const ForgotPasswordModal = ({ isOpen, open, currentUserId }: ForgotPasswordModalProps): ReactElement => {
  const [forgotPassword, setForgotPassword] = useState(open);
  const [userId, setUserId] = useState('');
  const [successfulText, setSuccessfulText] = useState<string>('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [enabledUserId, setEnabledUserId] = useState<boolean>(false);

  const [forgotPasswordMutation, { data: dataForgotPassword }] = useForgotPasswordMutation();

  const [verifyUserId, { data: verifiedUserId, loading: isVerifyingUserId }] = useBeginLoginMutation();

  const sendIdUser = (user: string) => {
    if (user !== currentUserId && user.trim() !== '') {
      setErrorText('The email address must match the login address you entered');
      setError(true);
      return;
    }
    setErrorText('');
    setError(false);
    forgotPasswordMutation({
      variables: {
        userId: user,
      },
    }).then();
  };

  const getUserForgotPasswordEnabled = () => {
    verifyUserId({
      variables: {
        userId: currentUserId,
      },
    }).then();
  };

  const cancelForgotPassword = () => {
    isOpen(false);
    setForgotPassword(false);
  };

  const parserMsg = () => {
    if (successfulText) {
      return (
        <DialogMessageWrapper id="__ForgotPasswordDisabled_Msg" dangerouslySetInnerHTML={{ __html: successfulText }} />
      );
    }
  };

  const renderForgotPasswordDialog = () => {
    if (!isVerifyingUserId) {
      if (!verifiedUserId?.beginLogin?.forgotPasswordEnabled) {
        return (
          <Dialog hidden={!forgotPassword} onDismiss={() => setForgotPassword(true)} minWidth="500px">
            {enabledUserId && parserMsg()}
            <DialogFooter>
              <PrimaryButton id="__ForgotPassword_message_ok_button" text="Ok" onClick={cancelForgotPassword} />
            </DialogFooter>
          </Dialog>
        );
      }
      return (
        <Dialog
          dialogContentProps={{
            title: 'Forgot Password',
          }}
          hidden={!forgotPassword}
          onDismiss={() => setForgotPassword(true)}
          minWidth="500px"
        >
          <Spacing margin={{ bottom: 'small' }}>
            <InputText
              id="emailVerify"
              type="email"
              value={userId}
              label="Please re-enter your email address *"
              onChange={(e, newValue) => {
                setUserId(newValue ?? '');
              }}
            />
            {error && <StyledError id="__ForgotPassword_error">{errorText}</StyledError>}
          </Spacing>
          <DialogFooter>
            <PrimaryButton
              id="__ForgotPassword_submit_button"
              text="Submit"
              onClick={() => sendIdUser(userId)}
              disabled={userId.trim().length === 0}
            />
            <DefaultButton id="__ForgotPassword_cancel_button" text="Cancel" onClick={cancelForgotPassword} />
          </DialogFooter>
        </Dialog>
      );
    }
  };

  useEffect(() => {
    let message: string;
    if (verifiedUserId && !verifiedUserId?.beginLogin?.forgotPasswordEnabled) {
      const enabledMessage = verifiedUserId?.beginLogin?.forgotPasswordMsg ?? '';
      setSuccessfulText(enabledMessage);
      setEnabledUserId(true);
    }
    if (dataForgotPassword?.forgotPassword?.response === 'SUCCESS') {
      message = dataForgotPassword.forgotPassword?.responseMsg;
      setSuccessfulText(message);
      setShowConfirmationDialog(true);
      setForgotPassword(false);
    }
    if (dataForgotPassword?.forgotPassword?.response === 'FAIL') {
      message = dataForgotPassword.forgotPassword?.responseMsg;
      setErrorText(message);
      setError(true);
    }
  }, [dataForgotPassword, verifiedUserId]);

  useEffect(() => {
    getUserForgotPasswordEnabled();
  }, []);

  const renderConfirmationDialog = () => {
    if (!showConfirmationDialog) {
      return null;
    }
    return (
      <Dialog hidden={false} dialogContentProps={{ title: 'Password reset submitted' }} minWidth="500px">
        <div id="__ConfirmBody">
          <Spacing>
            <Text id="__ForgotPassword_success">{successfulText}</Text>
          </Spacing>
          <DialogFooter>
            <PrimaryButton
              id="__ForgotPassword_confirm_ok"
              text="Ok"
              onClick={() => setShowConfirmationDialog(false)}
            />
          </DialogFooter>
        </div>
      </Dialog>
    );
  };

  return (
    <>
      {renderForgotPasswordDialog()}
      {renderConfirmationDialog()}
    </>
  );
};

export { ForgotPasswordModal };
