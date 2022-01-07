import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  useFindUserAccountLazyQuery,
  UserAccount,
  UserAccountForm,
  useUpdateUserMutation,
  useUpdateUserAccessPolicyGroupsMutation
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';

export const useUpdateUsersPanel = (userSid: string) => {

  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const handleError = ErrorHandler();

  const [callFindUserAccount, { data: dataFindUserAccount, loading: findUserAccountLoading, error: findUserAccountError }] =
    useFindUserAccountLazyQuery({
      variables: {
        userSid,
      },
    });

  const [callUpdateUser, { data: dataUpdateUser, loading: updateUserLoading, error: updateUserError }] =
    useUpdateUserMutation();

  const [callAssignGroups, { data: dataAssignGroups, loading: assignGroupsLoading, error: assignGroupsError }] =
    useUpdateUserAccessPolicyGroupsMutation();


  const updateAccountInfo = (updates: UserAccount) => {
    const updated = updateForm(userAccountForm, updates);
    setUserAccountForm(updated);
  };

  const updateAccessPolicyGroups = (sids: string[]) => {
    const updated = updateForm(userAccountForm, undefined, sids);
    setUserAccountForm(updated);
  };

  // Refresh the form when the userSid changes
  useEffect(() => {
    if (userSid) {
      console.log(`UserId changed to ${userSid}`)
      callFindUserAccount({
        variables: {
          userSid,
        },
      });
    }
  }, [userSid]);

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

  const handleUpdateUserGroups = async () => {
    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];
    const { data, errors } = await callAssignGroups({
      variables: {
        userAccessPolicyGroupUpdate: {
          userAccountSid: userSid,
          accessPolicyGroupSids: accessPolicyGroupSids
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

  const handleUpdateUser = async () => {
    const { data, errors } = await callUpdateUser({
      variables: {
        userInfo: {
          sid: userSid,
          email: userAccountForm.email?.value ?? '',
          firstNm: userAccountForm.person?.firstNm?.value ?? '',
          lastNm: userAccountForm.person?.lastNm?.value ?? ''
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
      console.log(`Updating User Account Form`)
      setUserAccountForm(dataFindUserAccount?.findUserAccount ?? defaultForm);
    }
  }, [dataFindUserAccount]);

  //
  // * Return the state of the form.
  return {
    userAccountForm,
    findUserAccountLoading,
    findUserAccountError,
    callUpdateUser: handleUpdateUser,
    responseCreateUser: dataUpdateUser,
    loadingCreateUser: updateUserLoading,
    callAssignGroups: handleUpdateUserGroups,
    responseAssignGroups: dataAssignGroups,
    loadingAssignGroups: assignGroupsLoading,
    resetForm,
    updateAccountInfo,
    updateAccessPolicyGroups,
  };
};
