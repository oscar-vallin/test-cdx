import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  UserAccount,
  UserAccountForm,
  useUserAccountFormLazyQuery,
  useGrantExternalUserAccessMutation,
  useCreateExternalUserMutation,
  Maybe,
  useExternalUserForOrgLazyQuery,
} from 'src/data/services/graphql';
import { defaultForm, updateForm } from './ExternalUsersFormUtil';
import { ApolloClient, gql } from '@apollo/client';
import { ITag } from '@fluentui/react';
import { ErrorHandler } from 'src/utils/ErrorHandler';

export const useExternalUsersAccessService = (orgSid: string, userAccountSid?: string) => {
  const [callGrantExternalUserAccess, { error: grantExternalUserAccessError }] = useGrantExternalUserAccessMutation();

  const [callCreateExternalUser, { error: createExternalUserError }] = useCreateExternalUserMutation();

  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

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

  const handleError = ErrorHandler();
  useEffect(() => {
    handleError(grantExternalUserAccessError);
  }, [grantExternalUserAccessError]);
  useEffect(() => {
    handleError(createExternalUserError);
  }, [createExternalUserError]);
  useEffect(() => {
    handleError(userAccountFormError);
  }, [userAccountFormError]);
  useEffect(() => {
    handleError(externalUserForOrgError);
  }, [externalUserForOrgError]);

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
    const { data, errors } = await callGrantExternalUserAccess({
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
    if (data && errors && errors.length > 0) {
      // Set errors into the objet itself
      data.grantExternalUserAccess = {
        sid: null,
        organization: {
          label: 'Organization',
          required: false,
          visible: true,
        },
        response: GqOperationResponse.Fail,
        errCode: 'INTERNAL_ERROR',
        errMsg: 'An internal server error has occurred.  Please contact your administrator.',
      };
    }

    return data;
  };

  const handleCreateExternalUser = async () => {
    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];

    const { data, errors } = await callCreateExternalUser({
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
    if (data && errors && errors.length > 0) {
      // Set errors into the objet itself
      data.createExternalUser = {
        sid: null,
        organization: {
          label: 'Organization',
          required: false,
          visible: true,
        },
        response: GqOperationResponse.Fail,
        errCode: 'INTERNAL_ERROR',
        errMsg: 'An internal server error has occurred.  Please contact your administrator.',
      };
    }

    return data;
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
    handleError: (error?: any) => void,
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
        handleError(result.error);
        users = parseToPickerOpts(result.data.findExternalUsers);
      });

    return users;
  }

  // * Return the state of the form.
  return {
    callCreateExternalUser: handleCreateExternalUser,
    setSendAccountActivation,
    callGrantUserAccess: handleGrantUserAccess,
    updateAccountInfo,
    updateAccessPolicyGroups,
    resetForm,
    callFindExternalUsers,
    userAccountForm,
  };
};
