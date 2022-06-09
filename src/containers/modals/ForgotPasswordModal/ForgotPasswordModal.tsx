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
  const [success, setSuccess] = useState(false);
  const [successfulText, setSuccessfulText] = useState<string>('');
  const [closeProcess, setCloseProcess] = useState(true);
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
      return <DialogMessageWrapper dangerouslySetInnerHTML={{ __html: successfulText }} />;
    }
  };

  const showDialog = () => {
    if (!isVerifyingUserId) {
      if (!verifiedUserId?.beginLogin?.forgotPasswordEnabled) {
        return (
          <Dialog hidden={!forgotPassword} onDismiss={() => setForgotPassword(true)} minWidth="500px">
            {enabledUserId && parserMsg()}
            <DialogFooter>
              <PrimaryButton id="forgotPasswordModal-cancel-button" text="Ok" onClick={cancelForgotPassword} />
            </DialogFooter>
          </Dialog>
        );
      }
      return (
        <Dialog
          dialogContentProps={{
            title: 'Forgot Password'
          }}
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
            <PrimaryButton id="forgotPasswordModal-submit-button" text="Submit" onClick={() => sendIdUser(userId)} />
            <DefaultButton id="forgotPasswordModal-cancel-button" text="Cancel" onClick={cancelForgotPassword} />
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
        <Dialog hidden={!closeProcess} dialogContentProps={{ title: 'Password reset submitted' }} minWidth="500px">
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
