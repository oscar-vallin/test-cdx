import React, { useEffect, useState } from 'react';
import {
  MessageBar,
  MessageBarType,
  PanelType,
} from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import {
  GqOperationResponse,
  useMyProfileLazyQuery,
  UserAccountForm,
  useUpdateMyProfileMutation,
} from 'src/data/services/graphql';
import {
  PanelBody,
  ThemedPanel,
  WizardBody,
  WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { Button } from 'src/components/buttons';
import { useNotification } from 'src/hooks/useNotification';
import { Spacing } from 'src/components/spacings/Spacing';

type UserProfilePanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
}

const UserProfilePanel = ({ isOpen, closePanel }: UserProfilePanelProps) => {
  const Toast = useNotification();
  const [userAccount, setUserAccount] = useState<UserAccountForm | null>();
  const [firstNm, setFirstNm] = useState('');
  const [lastNm, setLastNm] = useState('');
  const [email, setEmail] = useState('');
  const [userProfile, { data, loading }] = useMyProfileLazyQuery();
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const handleError = ErrorHandler();
  const [updateProfile,
    {
      data: updateData,
      loading: isLoadingUpdate,
      error: updateError,
    },
  ] = useUpdateMyProfileMutation();

  useEffect(() => {
    handleError(updateError);
  }, [updateError]);

  const fetchData = () => {
    userProfile({
      variables: {},
    })
  };

  const onSaveProdile = () => {
    updateProfile({
      variables: {
        userInfo: {
          firstNm,
          lastNm,
          email,
        },
      },
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const { myProfile } = data;
      setUserAccount(myProfile);
      setFirstNm(myProfile?.person?.firstNm.value ?? '');
      setLastNm(myProfile?.person?.lastNm.value ?? '');
      setEmail(myProfile?.email?.value ?? '');
    }
  }, [data, loading]);

  useEffect(() => {
    const response = updateData?.updateMyProfile;

    if (updateData) {
      const responseCode = response?.response;
      const { updateMyProfile } = updateData;
      setUserAccount(updateMyProfile);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateMyProfile?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        closePanel(false);
        Toast.success({ text: 'Profile Successfully Updated' });
      }
    }
  }, [updateData, isLoadingUpdate]);
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="My Profile"
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__MyProfile_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        <WizardBody>
          <FormRow>
            {userAccount?.person?.firstNm.visible && (
              <Column lg="6">
                <UIInputText
                  id="__userFirstNm"
                  uiField={userAccount.person.firstNm}
                  value={firstNm}
                  onChange={(e, _newValue) => {
                    setFirstNm(_newValue ?? '');
                  }}
                />
              </Column>
            )}
            {userAccount?.person?.lastNm.visible && (
              <Column lg="6">
                <UIInputText
                  id="__userLastNm"
                  uiField={userAccount.person.lastNm}
                  value={lastNm}
                  onChange={(e, _newValue) => {
                    setLastNm(_newValue ?? '');
                  }}
                />
              </Column>
            )}
          </FormRow>
          <FormRow>
            {userAccount?.email && (
              <Column lg="12">
                <UIInputText
                  id="__userEmail"
                  uiField={userAccount.email}
                  value={email}
                  onChange={(e, _newValue) => {
                    setEmail(_newValue ?? '');
                  }}
                />
              </Column>
            )}
          </FormRow>
          <FormRow>
            <Column lg="12">
              <UIInputTextReadOnly id="__userOrg" uiField={userAccount?.organization} />
            </Column>
          </FormRow>
        </WizardBody>
        <WizardButtonRow>
          <span>
            <Button id="__Profile_Save_Button" onClick={onSaveProdile} variant="primary">
              Save
            </Button>
          </span>
        </WizardButtonRow>
      </PanelBody>
    </ThemedPanel>
  )
};

export { UserProfilePanel };
