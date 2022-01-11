import { useEffect, useState } from 'react';
import {
  DeactivateUserMutation,
  GqOperationResponse,
  ResetPasswordMutation,
  UpdateUserAccessPolicyGroupsMutation,
  UpdateUserMutation,
  useDeactivateUserMutation,
  useFindUserAccountLazyQuery,
  UserAccount,
  UserAccountForm,
  useResetPasswordMutation,
  useUpdateUserAccessPolicyGroupsMutation,
  useUpdateUserMutation
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';

export type UseUpdateUserPanel = {
  isPanelOpen: boolean,
  showPanel: (userSid: string) => void,
  closePanel: () => void,
  userAccountForm: UserAccountForm,
  callUpdateUser: (updates: UserAccount) => Promise<UpdateUserMutation | null | undefined>,
  callAssignGroups: (sids: string[]) => Promise<UpdateUserAccessPolicyGroupsMutation | null | undefined>,
  callResetPassword: () => Promise<ResetPasswordMutation | null | undefined>,
  callInactivateUser: () => Promise<DeactivateUserMutation | null | undefined>,
  resetForm: () => void
}

export const useUpdateUserPanel = (): UseUpdateUserPanel => {

  const [panelOpen, setPanelOpen] = useState(false);
  const [userSid, setUserSid] = useState('');
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const handleError = ErrorHandler();

  const [callFindUserAccount, { data: dataFindUserAccount, error: findUserAccountError }] =
    useFindUserAccountLazyQuery();

  const [callUpdateUser, { error: updateUserError }] =
    useUpdateUserMutation();

  const [callAssignGroups, { error: assignGroupsError }] =
    useUpdateUserAccessPolicyGroupsMutation();

  const [callResetPassword, { error: resetPasswordError }] =
    useResetPasswordMutation();

  const [callInactivateUser, { error: inactivateUserError}] =
    useDeactivateUserMutation();

  const showPanel = (userSid: string) => {
    setUserSid(userSid);
    callFindUserAccount({
      variables: {
        userSid,
      },
    });
  };

  const closePanel = () => {
    setPanelOpen(false);
  }

  useEffect(() => {
    handleError(updateUserError);
  }, [updateUserError]);

  useEffect(() => {
    handleError(findUserAccountError);
  }, [findUserAccountError]);

  useEffect(() => {
    handleError(assignGroupsError);
  }, [assignGroupsError]);

  useEffect(() => {
    handleError(resetPasswordError);
  }, [resetPasswordError]);

  useEffect(() => {
    handleError(inactivateUserError);
  }, [inactivateUserError]);

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

  const handleResetPassword = async () => {
    const {data} = await callResetPassword({
      variables: {
        userSid: userSid
      },
      errorPolicy: 'all'
    });

    return data;
  }

  const handleInactivateUser = async() => {
    const {data} = await callInactivateUser({
      variables: {
        sidInput: {
          sid: userSid
        }
      },
      errorPolicy: 'all'
    });

    if (data?.deactivateUser === GqOperationResponse.Success) {
      // Update the form
      callFindUserAccount({
        variables: {
          userSid,
        },
      });
    }

    return data;
  }

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
    callUpdateUser: handleUpdateUser,
    callAssignGroups: handleUpdateUserGroups,
    callResetPassword: handleResetPassword,
    callInactivateUser: handleInactivateUser,
    resetForm
  };
};
