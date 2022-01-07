import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  useFindUserAccountLazyQuery,
  UserAccount,
  UserAccountForm,
  useUpdateUserMutation,
  useUpdateUserAccessPolicyGroupsMutation,
  UpdateUserMutation,
  UpdateAccessPolicyGroupMutation,
  UpdateUserAccessPolicyGroupsMutation
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';
import { ApolloError } from "@apollo/client";

export type UseUpdateUserPanel = {
  isPanelOpen: boolean,
  showPanel: (userSid: string) => void,
  closePanel: () => void,
  userAccountForm: UserAccountForm,
  findUserAccountError: ApolloError | undefined,
  callUpdateUser: (updates: UserAccount) => Promise<UpdateUserMutation | null | undefined>,
  responseCreateUser: UpdateUserMutation | null | undefined ,
  callAssignGroups: (sids: string[]) => Promise<UpdateUserAccessPolicyGroupsMutation | null | undefined>,
  responseAssignGroups: UpdateAccessPolicyGroupMutation | null | undefined,
  resetForm: () => void
}

export const useUpdateUserPanel = (): UseUpdateUserPanel => {

  const [panelOpen, setPanelOpen] = useState(false);
  const [userSid, setUserSid] = useState('');
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const handleError = ErrorHandler();

  const [callFindUserAccount, { data: dataFindUserAccount, error: findUserAccountError }] =
    useFindUserAccountLazyQuery();

  const [callUpdateUser, { data: dataUpdateUser, error: updateUserError }] =
    useUpdateUserMutation();

  const [callAssignGroups, { data: dataAssignGroups, error: assignGroupsError }] =
    useUpdateUserAccessPolicyGroupsMutation();

  const showPanel = (userSid: string) => {
    setUserSid(userSid);
    callFindUserAccount({
      variables: {
        userSid,
      },
    })
  };

  const closePanel = () => {
    setPanelOpen(false);
  }

  // Refresh the form when the userSid changes
  // useEffect(() => {
  //   if (userSid) {
  //     callFindUserAccount({
  //       variables: {
  //         userSid,
  //       },
  //     });
  //   }
  // }, [userSid]);

  useEffect(() => {
    handleError(updateUserError);
  }, [updateUserError]);

  useEffect(() => {
    handleError(findUserAccountError);
  }, [findUserAccountError]);

  useEffect(() => {
    handleError(assignGroupsError);
  }, [assignGroupsError]);

  const internalServerError = {
    sid: null,
    organization: {
      label: 'Primary Organization',
      required: false,
      visible: true
    },
    response: GqOperationResponse.Fail,
    errCode: 'INTERNAL_ERROR',
    errMsg: 'An internal server error has occurred.  Please contact your administrator.'
  };

  const handleUpdateUserGroups = async (sids: string[]) => {
    updateForm(userAccountForm, undefined, sids);
    const { data, errors } = await callAssignGroups({
      variables: {
        userAccessPolicyGroupUpdate: {
          userAccountSid: userSid,
          accessPolicyGroupSids: sids
        }
      }
    });

    if (data?.updateUserAccessPolicyGroups) {
      setUserAccountForm(data?.updateUserAccessPolicyGroups);
    }
    if (data && errors && errors.length > 0) {
      // Set errors into the object itself
      data.updateUserAccessPolicyGroups = internalServerError;
    }

    return data;
  };

  const handleUpdateUser = async (userAccount: UserAccount) => {
    updateForm(userAccountForm, userAccount);
    const { data, errors } = await callUpdateUser({
      variables: {
        userInfo: {
          sid: userSid,
          email: userAccount.email,
          firstNm: userAccount.person?.firstNm ?? '',
          lastNm: userAccount.person?.lastNm ?? ''
        },
      },
      errorPolicy: 'all'
    });

    if (data?.updateUser) {
      setUserAccountForm(data?.updateUser);
    }
    if (data && errors && errors.length > 0) {
      // Set errors into the object itself
      data.updateUser = internalServerError;
    }

    return data;
  };

  const resetForm = () => {
    if (userSid) {
      //setUserAccountForm(defaultForm);
    }
  };

  //
  useEffect(() => {
    if (dataFindUserAccount?.findUserAccount) {
      setUserAccountForm(dataFindUserAccount?.findUserAccount ?? defaultForm);
      setPanelOpen(true);
    }
  }, [dataFindUserAccount]);

  //
  // * Return the state of the form.
  return {
    isPanelOpen: panelOpen,
    showPanel,
    closePanel,
    userAccountForm,
    findUserAccountError,
    callUpdateUser: handleUpdateUser,
    responseCreateUser: dataUpdateUser,
    callAssignGroups: handleUpdateUserGroups,
    responseAssignGroups: dataAssignGroups,
    resetForm
  };
};
