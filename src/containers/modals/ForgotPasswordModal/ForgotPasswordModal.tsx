/* eslint-disable no-alert */
import { ReactElement, useEffect, useState } from 'react';
import { Text, Dialog, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import { useForgotPasswordMutation, useBeginLoginMutation } from 'src/data/services/graphql';
import { InputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledError } from './ForgotPasswordModal.styles';

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
  const [success, setSuccess] = useState(false);
  const [successfulText, setSuccessfulText] = useState<string | undefined>('');
  const [closeProcess, setCloseProcess] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [forgotPasswordMutation, { data: dataForgotPassword }] = useForgotPasswordMutation();

  const [verifyUserId, { data: verifiedUserId, loading: isVerifyingUserId }] = useBeginLoginMutation();

  const sendIdUser = (user: string) => {
    if (user !== currentUserId && user.trim() !== '') {
      setErrorText('The email address must match the login address you entered');
      setError(true);
      return;
    }
    forgotPasswordMutation({
      variables: {
        userId: user,
      },
    });
  };

  const getUserForgotPasswordEnabled = () => {
    verifyUserId({
      variables: {
        userId: currentUserId,
      },
    });
  };

  const cancelForgotPassword = () => {
    isOpen(false);
    setForgotPassword(false);
  };

  const deleteTag = (message: any): string => {
    let correctMessage: string;
    let index: number;

    if (message.includes('<') || message.includes('>')) {
      index = message.indexOf('>');
      correctMessage = message.slice(index + 1, message.length);
      index = correctMessage.indexOf('<');
      correctMessage = correctMessage.slice(0, index);
      return correctMessage;
    }

    return message;
  };

  const showDialog = () => {
    if (!isVerifyingUserId) {
      if (!verifiedUserId?.beginLogin?.forgotPasswordEnabled) {
        return (
          <Dialog hidden={!forgotPassword} onDismiss={() => setForgotPassword(true)} minWidth="500px">
            <Text>{successfulText || 'Forgot password email'}</Text>
            <DialogFooter>
              <DefaultButton id="forgotPaswwordModal-cancel-button" text="Cancel" onClick={cancelForgotPassword} />
            </DialogFooter>
          </Dialog>
        );
      }
      return (
        <Dialog
          title="Forgot Password"
          hidden={!forgotPassword}
          onDismiss={() => setForgotPassword(true)}
          minWidth="500px"
        >
          <Spacing margin={{ bottom: 'small' }}>
            <InputText
              id="renameInput"
              type="email"
              value={userId}
              label="Please re-enter you email address *"
              onChange={(e, newValue) => {
                setUserId(newValue ?? '');
              }}
            />
            {error && <StyledError>{errorText}</StyledError>}
          </Spacing>
          <DialogFooter>
            <PrimaryButton id="forgotPaswwordModal-submit-button" text="Submit" onClick={() => sendIdUser(userId)} />
            <DefaultButton id="forgotPaswwordModal-cancel-button" text="Cancel" onClick={cancelForgotPassword} />
          </DialogFooter>
        </Dialog>
      );
    }
  };

  useEffect(() => {
    let message: string;
    if (verifiedUserId) {
      const messageEnabled = verifiedUserId.beginLogin?.forgotPasswordMsg;
      const correctMessage = deleteTag(messageEnabled);
      setSuccessfulText(correctMessage);
    }
    if (dataForgotPassword?.forgotPassword?.response === 'SUCCESS') {
      message = dataForgotPassword.forgotPassword?.responseMsg;
      setSuccessfulText(message);
      setSuccess(true);
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

  return (
    <>
      {showDialog()}
      {success && (
        <Dialog hidden={!closeProcess} title="Password reset submitted" minWidth="500px">
          <Spacing>
            <Text>{successfulText}</Text>
          </Spacing>
          <DialogFooter>
            <PrimaryButton text="ok" onClick={() => setCloseProcess(false)} />
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export { ForgotPasswordModal };
