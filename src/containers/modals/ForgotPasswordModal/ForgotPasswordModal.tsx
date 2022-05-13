/* eslint-disable no-alert */
import { ReactElement, useEffect, useState } from 'react';
import { Text, Dialog, DialogFooter, DialogType, PrimaryButton, DefaultButton } from '@fluentui/react';
import { useForgotPasswordMutation } from 'src/data/services/graphql';
import { Button } from 'src/components/buttons';
import { InputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledDiv } from './ForgotPasswordModal.styles';

const defaultProps = {
    open: false,
    isOpen: (data: boolean) => {}
}

type ForgotPasswordModalProps = {
    open: boolean,
    isOpen: (data: boolean) => | void,
} & typeof defaultProps;

const ForgotPasswordModal = ({isOpen, open}: ForgotPasswordModalProps): ReactElement => {
    const [forgotPassword, setForgotPassword] = useState(open);
    const [userId, setUserId] = useState('');
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successfulText, setSuccessfulText] = useState<string | undefined>('');
    const [closeProcess, setCloseProcess] = useState(true);

     const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation();

    const sendIdUser = (user: string) => {

        setForgotPassword(false);
        forgotPasswordMutation({
            variables: {
                userId: user
            }
        });
    };

    const cancelForgotPassword = () => {
        isOpen(false);
        setForgotPassword(false);
    };

    useEffect(() => {

        if(data){
            let message = data.forgotPassword?.responseMsg
            setSuccessfulText(message);
            setSuccess(true);
        };
        if(error){
            console.log(error)
        };

    },[data]);
  
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
                ></InputText>
            </Spacing>
            <DialogFooter>
                <PrimaryButton 
                    id='forgotPaswwordModal-submit-button'
                    text='Submit'
                    onClick={() => sendIdUser(userId)}
                />
                <DefaultButton 
                    id='forgotPaswwordModal-cancel-button'
                    text='Cancel'
                    onClick={cancelForgotPassword}
                />
            </DialogFooter>
            </Dialog>

            { success && (
                <Dialog
                    hidden={!closeProcess}
                    title="Password reset submitted"
                    minWidth="500px"
                >
                <Spacing>
                    <Text>
                        {successfulText} 
                    </Text>
                </Spacing>
                <DialogFooter>
                    <PrimaryButton 
                        text='ok'
                        onClick={() => setCloseProcess(false)}
                    />
                </DialogFooter>
                </Dialog>
            )}
        </>
    );
};

export { ForgotPasswordModal };