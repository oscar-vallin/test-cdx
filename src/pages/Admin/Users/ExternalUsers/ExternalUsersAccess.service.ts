import { useEffect, useState } from 'react';
import {
  CdxWebCommandType,
  Maybe,
  useCreateExternalUserMutation,
  useExternalUserForOrgLazyQuery,
  useGrantExternalUserAccessMutation,
  UserAccount,
  UserAccountForm,
  useRevokeExternalUserAccessMutation,
  useUserAccountFormLazyQuery,
  WebCommand,
} from 'src/data/services/graphql';
import { ApolloClient, gql } from '@apollo/client';
import { ITag } from '@fluentui/react';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';

export const useExternalUsersAccessService = (orgSid: string, userAccountSid?: string) => {
  const [callGrantExternalUserAccess, { error: grantExternalUserAccessError }] = useGrantExternalUserAccessMutation();

  const [callCreateExternalUser, { error: createExternalUserError }] = useCreateExternalUserMutation();

  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);
  const [revokeAccessCmd, setRevokeAccessCmd] = useState<WebCommand>();

  const [
    callUserAccountForm,
    { data: dataUserAccountForm, loading: userAccountFormLoading, error: userAccountFormError },
  ] = useUserAccountFormLazyQuery({
    variables: {
      orgSid,
    },
  });

  const [
    callExternalUserForOrg,
    { data: dataExternalUserForOrg, loading: externalUsersForOrgLoading, error: externalUserForOrgError },
  ] = useExternalUserForOrgLazyQuery();

  const [callRevokeExternalUserAccess, { error: revokeExternalUserAccess }] = useRevokeExternalUserAccessMutation();

  const handleError = ErrorHandler();
  useEffect(() => {
    handleError(grantExternalUserAccessError);
  }, [grantExternalUserAccessError, handleError]);
  useEffect(() => {
    handleError(createExternalUserError);
  }, [createExternalUserError, handleError]);
  useEffect(() => {
    handleError(userAccountFormError);
  }, [userAccountFormError, handleError]);
  useEffect(() => {
    handleError(externalUserForOrgError);
  }, [externalUserForOrgError, handleError]);
  useEffect(() => {
    handleError(revokeExternalUserAccess);
  }, [revokeExternalUserAccess, handleError]);

  useEffect(() => {
    if (orgSid) {
      if (userAccountSid) {
        callExternalUserForOrg({
          variables: {
            orgSid,
            userSid: userAccountSid,
          },
        });
      } else {
        callUserAccountForm({
          variables: {
            orgSid,
          },
        });
      }
    }
  }, [orgSid, userAccountSid]);

  useEffect(() => {
    if (!userAccountFormLoading && dataUserAccountForm) {
      setUserAccountForm(dataUserAccountForm.userAccountForm ?? defaultForm);
    }
  }, [userAccountFormLoading, dataUserAccountForm]);

  useEffect(() => {
    if (!externalUsersForOrgLoading && dataExternalUserForOrg) {
      setUserAccountForm(dataExternalUserForOrg.externalUserForOrg ?? defaultForm);
    }
  }, [externalUsersForOrgLoading, dataExternalUserForOrg]);

  useEffect(() => {
    if (userAccountForm) {
      setRevokeAccessCmd(userAccountForm.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Deactivate));
    }
  }, [userAccountForm]);

  const resetForm = () => {
    if (orgSid) {
      callUserAccountForm({
        variables: {
          orgSid,
        },
      });
    }
  };

  const updateAccessPolicyGroups = (sids: string[]) => {
    const updated = updateForm(userAccountForm, undefined, sids);
    setUserAccountForm(updated);
  };

  const updateAccountInfo = (updates: UserAccount) => {
    const updated = updateForm(userAccountForm, updates);
    setUserAccountForm(updated);
  };

  const setSendAccountActivation = (sendEmail: boolean) => {
    userAccountForm.sendActivationEmail = {
      ...(userAccountForm.sendActivationEmail ?? defaultForm.sendActivationEmail),
      value: sendEmail,
    };
  };

  const handleGrantUserAccess = async () => {
    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];
    const { data } = await callGrantExternalUserAccess({
      variables: {
        userInfo: {
          userAccountSid: userAccountForm.sid ?? '',
          orgSid,
          accessPolicyGroupSids,
        },
      },
      errorPolicy: 'all',
    });

    if (data?.grantExternalUserAccess) {
      setUserAccountForm(data?.grantExternalUserAccess);
    }

    return data;
  };

  const handleCreateExternalUser = async () => {
    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];

    const { data } = await callCreateExternalUser({
      variables: {
        userInfo: {
          email: userAccountForm.email?.value ?? '',
          sendActivationEmail: userAccountForm.sendActivationEmail?.value ?? true,
          orgSid,
          accessPolicyGroupSids,
        },
        personInfo: {
          firstNm: userAccountForm.person?.firstNm.value ?? '',
          lastNm: userAccountForm.person?.lastNm.value ?? '',
        },
      },
      errorPolicy: 'all',
    });

    if (data?.createExternalUser) {
      setUserAccountForm(data?.createExternalUser);
    }

    return data;
  };

  const handleRevokeExternalUserAccess = async () => {
    if (userAccountSid) {
      const { data } = await callRevokeExternalUserAccess({
        variables: {
          orgSid,
          userAccountSid,
        },
        errorPolicy: 'all',
      });
      return data;
    }
    return null;
  };

  const parseToPickerOpts = (arr?: Maybe<UserAccount>[] | null): ITag[] => {
    if (!arr) {
      return [];
    }
    return arr.map((user) => ({
      name: user?.email ?? '',
      key: user?.sid ?? '',
      email: user?.email ?? '',
      firstName: user?.person?.firstNm ?? '',
      lastName: user?.person?.lastNm ?? '',
    }));
  };

  async function callFindExternalUsers(
    client: ApolloClient<object>,
    handleApolloError: (error?: any) => void,
    searchText: string
  ): Promise<ITag[]> {
    let users: ITag[] = [];
    await client
      .query({
        errorPolicy: 'all',
        variables: {
          searchText,
        },
        query: gql`
          query FindExternalUsers($searchText: String!) {
            findExternalUsers(searchText: $searchText) {
              sid
              email
              person {
                firstNm
                lastNm
              }
            }
          }
        `,
      })
      .then((result) => {
        handleApolloError(result.error);
        users = parseToPickerOpts(result.data.findExternalUsers);
      });

    return users;
  }

  // * Return the state of the form.
  return {
    callCreateExternalUser: handleCreateExternalUser,
    setSendAccountActivation,
    callGrantUserAccess: handleGrantUserAccess,
    callRevokeExternalUserAccess: handleRevokeExternalUserAccess,
    updateAccountInfo,
    updateAccessPolicyGroups,
    resetForm,
    callFindExternalUsers,
    userAccountForm,
    revokeAccessCmd,
  };
};
