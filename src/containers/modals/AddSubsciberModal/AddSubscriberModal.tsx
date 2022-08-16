import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  SearchBox,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { ButtonLink } from 'src/components/buttons';
import { Spacing } from 'src/components/spacings/Spacing';
import { useUserQuickSearchLazyQuery, useCreateUserMutation } from 'src/data/services/graphql';
import { InputText } from 'src/components/inputs/InputText';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { SubscriberOptionProps } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { StyledSubsOptions } from './AddSubscriberModal.styles';

const defaultProps = {
  open: false,
  isOpen: (data: boolean) => {},
  orgSid: '',
};

type AddSubscriberModalProps = {
  open: boolean;
  isOpen: (data: boolean) => void;
  orgSid: string;
  currentSubscribers: SubscriberOptionProps[];
  addSubscribers: (data: SubscriberOptionProps[]) => void;
} & typeof defaultProps;

const AddSubscriberModal = ({ open, isOpen, orgSid, addSubscribers, currentSubscribers }: AddSubscriberModalProps) => {
  const [userQuickSearch, { data: quickSearchData, loading: quickSearchLoading }] = useUserQuickSearchLazyQuery();
  const [createUser, { data: createUserData, loading: createUserLoading }] = useCreateUserMutation();
  const [addSubscriber, setAddSubscriber] = useState(false);
  const [currentSubscriber, setCurrentSubscriber] = useState('');
  const [subscriberFound, setSubsciberFound] = useState<SubscriberOptionProps | null>();
  const [addNewAccount, setAddNewAccount] = useState(false);
  const [firstNm, setFirstNm] = useState('');
  const [lastNm, setLastNm] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!createUserLoading && createUserData) {
      const { createUser: newUser } = createUserData;
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
  }, [createUserData, createUserLoading]);

  const doSearch = () => {
    if (quickSearchLoading) {
      return (
        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Spinner size={SpinnerSize.small} />
        </Spacing>
      );
    }

    if (quickSearchData?.userQuickSearch?.length && quickSearchData.userQuickSearch.length > 0) {
      const subscribers = quickSearchData.userQuickSearch;
      return subscribers.map((subscriber, index) => (
        <Spacing margin={{ left: 'normal', top: 'normal', bottom: 'normal' }} key={index}>
          <Text
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

    if (quickSearchData?.userQuickSearch && !addNewAccount) {
      return (
        <Spacing margin={{ left: 'normal', top: 'normal', bottom: 'normal' }}>
          <Stack>
            <Text>No matching account found</Text>
            <ButtonLink style={{ paddingTop: '10px' }} onClick={() => setAddNewAccount(true)}>
              Add a new account
            </ButtonLink>
          </Stack>
        </Spacing>
      );
    }

    return null;
  };

  const renderBody = () => {
    if (addSubscriber) {
      return (
        <>
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
            placeholder="Search Susbscriber"
          />
          {addNewAccount && (
            <>
              <InputText
                id="firstNameSubscriber"
                type="text"
                value={firstNm}
                label="First Name"
                required={true}
                onChange={(event, newValue) => setFirstNm(newValue ?? '')}
              />
              <InputText
                id="text"
                type="text"
                value={lastNm}
                label="Last Name"
                required={true}
                onChange={(event, newValue) => setLastNm(newValue ?? '')}
              />
              <InputText
                id="text"
                type="email"
                value={email}
                label="Username and Email Address"
                required={true}
                onChange={(event, newValue) => setEmail(newValue ?? '')}
              />
              <Spacing margin={{ top: 'normal' }}>
                <MessageBar
                  type="warning"
                  content="This user does not seem to be within your organization (based on their email address) This user will be added as a 3rd party user."
                  multiline
                />
              </Spacing>
            </>
          )}
        </>
      );
    }

    return null;
  };

  const addNewUser = () => {
    if (subscriberFound) {
      addSubscribers([...currentSubscribers, subscriberFound]);
      isOpen(false);
    }
    if (firstNm.trim() !== '' && lastNm.trim() !== '' && email.trim() !== '') {
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
    }
  };

  const renderButtons = () => {
    return (
      <>
        <PrimaryButton
          id="__AddSubscriber_test_button"
          text="Add"
          iconProps={{ iconName: 'Add' }}
          onClick={() => {
            if (addSubscriber) {
              addNewUser();
            }
            setAddSubscriber(true);
          }}
        />
        <DefaultButton
          style={{ marginLeft: '10px' }}
          id="__AddSubscriber_cancel_button"
          text="Cancel"
          onClick={() => isOpen(false)}
        />
      </>
    );
  };

  return (
    <Dialog hidden={false} dialogContentProps={{ title: 'Add Subscriber' }} minWidth="500px">
      {renderBody()}
      {currentSubscriber.trim() !== '' && !addNewAccount && !subscriberFound && (
        <StyledSubsOptions>{doSearch()}</StyledSubsOptions>
      )}
      <DialogFooter>{renderButtons()}</DialogFooter>
    </Dialog>
  );
};

export { AddSubscriberModal };
