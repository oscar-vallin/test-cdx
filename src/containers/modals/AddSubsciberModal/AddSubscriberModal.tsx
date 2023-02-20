import {
  DefaultButton,
  DialogFooter,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  Stack,
  Text,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { ButtonLink } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { useUserQuickSearchLazyQuery, useCreateUserMutation } from 'src/data/services/graphql';
import { InputText } from 'src/components/inputs/InputText';
import { SubscriberOptionProps } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { StyledDialog, StyledSubsOptions } from './AddSubscriberModal.styles';

type AddSubscriberModalProps = {
  isOpen: (data: boolean) => void;
  orgSid: string;
  currentSubscribers: SubscriberOptionProps[];
  addSubscribers: (data: SubscriberOptionProps[]) => void;
};

const AddSubscriberModal = ({
  isOpen, orgSid, addSubscribers, currentSubscribers,
}: AddSubscriberModalProps) => {
  const [userQuickSearch,
    { data: quickSearchData }] = useUserQuickSearchLazyQuery();
  const [createUser,
    { data: createUserData, loading: createUserLoading, error }] = useCreateUserMutation();
  const [currentSubscriber, setCurrentSubscriber] = useState('');
  const [subscriberFound, setSubsciberFound] = useState<SubscriberOptionProps | null>();
  const [addNewAccount, setAddNewAccount] = useState(false);
  const [firstNm, setFirstNm] = useState('');
  const [lastNm, setLastNm] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const response = createUserData?.createUser;
    if (createUserData) {
      const responseCode = response?.response;
      const { createUser: newUser } = createUserData;
      if (responseCode === 'FAIL') {
        const errorMsg = newUser?.errMsg
          ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setEmailError(newUser?.email?.errMsg ?? '');
        setMessage(errorMsg);
      }

      if (responseCode === 'SUCCESS') {
        addSubscribers([
          ...currentSubscribers,
          {
            name: newUser?.person?.firstNm.value ?? '',
            email: newUser?.email?.value ?? '',
            sid: newUser?.sid ?? '',
          },
        ]);
        isOpen(false);
      }
    }
  }, [createUserData, createUserLoading, error]);

  const doSearch = () => {
    if (quickSearchData?.userQuickSearch?.length && quickSearchData.userQuickSearch.length > 0) {
      const subscribers = quickSearchData.userQuickSearch;
      return subscribers.map((subscriber, index) => (
        <Spacing margin={{ left: 'normal', top: 'normal', bottom: 'normal' }} key={index}>
          <Text
            id="__QuickSearch__Users"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setCurrentSubscriber(subscriber.email);
              setSubsciberFound({
                name: subscriber.person?.firstNm,
                email: subscriber.email,
                sid: subscriber.sid,
              });
            }}
          >
            {subscriber.email}
          </Text>
        </Spacing>
      ));
    }

    return (
      <Spacing margin={{ left: 'normal', top: 'normal', bottom: 'normal' }}>
        <Stack>
          <Text>No matching account found</Text>
          <ButtonLink id="__Add_NewAccount" style={{ paddingTop: '10px' }} onClick={() => setAddNewAccount(true)}>
            Add a new account
          </ButtonLink>
        </Stack>
      </Spacing>
    );
  };

  const renderBody = () => (
    <>
      {message && (
      <Spacing margin={{ bottom: 'normal' }}>
        <MessageBar
          id="__AddSubscriberDialog_Msg"
          messageBarType={messageType}
          isMultiline
          onDismiss={() => setMessage(undefined)}
        >
          {message}
        </MessageBar>
      </Spacing>
      )}
      <SearchBox
        id="Subscriber_Input-Search"
        disabled={false}
        value={currentSubscriber}
        styles={{ root: { width: '100%', borderColor: 'gray' } }}
        onChange={(event, searchText) => {
          userQuickSearch({
            variables: {
              orgSid,
              searchText,
            },
          });
          setCurrentSubscriber(searchText ?? '');
          if (currentSubscriber.trim() === '') {
            setSubsciberFound(null);
          }
        }}
        placeholder="Search for user"
      />
      {addNewAccount && (
        <>
          <InputText
            id="firstNmSubscriber"
            type="text"
            value={firstNm}
            label="First Name"
            required={true}
            onChange={(event, newValue) => setFirstNm(newValue ?? '')}
          />
          <InputText
            id="lastNmSubscriber"
            type="text"
            value={lastNm}
            label="Last Name"
            required={true}
            onChange={(event, newValue) => setLastNm(newValue ?? '')}
          />
          <InputText
            id="emailSubscriber"
            type="email"
            value={email}
            errorMessage={emailError}
            label="Username and Email Address"
            required={true}
            onChange={(event, newValue) => setEmail(newValue ?? '')}
          />
        </>
      )}
    </>
  );

  const addNewUser = () => {
    if (subscriberFound) {
      addSubscribers([...currentSubscribers, subscriberFound]);
      isOpen(false);
    }
    createUser({
      variables: {
        userInfo: {
          orgSid,
          email,
        },
        personInfo: {
          firstNm,
          lastNm,
        },
      },
    });
  };

  const renderButtons = () => (
    <>
      <PrimaryButton
        id="__AddSubscriber_add_button"
        text="Add"
        onClick={() => addNewUser()}
      />
      <DefaultButton
        id="__AddSubscriber_cancel_button"
        style={{ marginLeft: '10px' }}
        text="Cancel"
        onClick={() => isOpen(false)}
      />
    </>
  );

  return (
    <StyledDialog hidden={false} dialogContentProps={{ title: 'Add person to be notified' }} minWidth="500px">
      {renderBody()}
      {currentSubscriber.trim() !== '' && !addNewAccount && !subscriberFound && (
        <StyledSubsOptions>{doSearch()}</StyledSubsOptions>
      )}
      <DialogFooter>{renderButtons()}</DialogFooter>
    </StyledDialog>
  );
};

export { AddSubscriberModal };
