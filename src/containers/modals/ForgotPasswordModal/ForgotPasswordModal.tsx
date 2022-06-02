/* eslint-disable no-alert */
import { ReactElement, useEffect, useState } from 'react';
import { Text, Dialog, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import { useForgotPasswordMutation } from 'src/data/services/graphql';
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

  const [forgotPasswordMutation, { data, loading }] = useForgotPasswordMutation();

  const sendIdUser = (user: string) => {
    if (user !== currentUserId && user.trim() !== '') {
      setErrorText('the email address must match the login address you entered');
      setError(true);
      return;
    }
    forgotPasswordMutation({
      variables: {
        userId: user,
      },
    });
  };

  const cancelForgotPassword = () => {
    isOpen(false);
    setForgotPassword(false);
  };

  useEffect(() => {
    if (data?.forgotPassword?.response === 'SUCCESS') {
      let message = data.forgotPassword?.responseMsg;
      message = message.replace('<p>', '');
      message = message.replace('</p>', '');
      setSuccessfulText(message);
      setSuccess(true);
      setForgotPassword(false);
    }
    if (data?.forgotPassword?.response === 'FAIL') {
      const message = data.forgotPassword?.responseMsg;
      setErrorText(message);
      setError(true);
    }
  }, [data]);

  return (
    <>
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
