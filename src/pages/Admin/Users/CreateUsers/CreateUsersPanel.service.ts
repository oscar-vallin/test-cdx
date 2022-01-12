import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  useCreateUserMutation,
  UserAccount,
  UserAccountForm,
  useUserAccountFormLazyQuery,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';

export const useCreateUsersPanel = (orgSid: string) => {
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const [isUserCreated, setUserCreated] = useState(false);
  const handleError = ErrorHandler();

  const [callUserAccountForm, { data: dataUserAccountForm, loading: userAccountLoading, error: userAccountError }] =
    useUserAccountFormLazyQuery({
      variables: {
        orgSid,
      },
    });

  const [callCreateUser, { data: userCreatedData, loading: creatingUserLoading, error: createUserError }] =
    useCreateUserMutation();

  const updateAccountInfo = (updates: UserAccount) => {
    const updated = updateForm(userAccountForm, updates);
    setUserAccountForm(updated);
  };

  const updateAccessPolicyGroups = (sids: string[]) => {
    const updated = updateForm(userAccountForm, undefined, sids);
    setUserAccountForm(updated);
  };

  const setSendAccountActivation = (sendEmail: boolean) => {
    userAccountForm.sendActivationEmail = {
      ...(userAccountForm.sendActivationEmail ?? defaultForm.sendActivationEmail),
      value: sendEmail,
    };
  };

  //
  // * When the organizationId changes, we need to re-fetch the user account form.
  useEffect(() => {
    if (orgSid) {
      callUserAccountForm({
        variables: {
          orgSid,
        },
      });
    }
  }, [orgSid]);

  useEffect(() => {
    handleError(createUserError);
  }, [createUserError]);

  useEffect(() => {
    handleError(userAccountError);
  }, [userAccountError]);

  const clearUserCreation = () => {
    setUserCreated(false);
  };

  const handleCreateUser = async () => {
    setUserCreated(false);

    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];

    const { data, errors } = await callCreateUser({
      variables: {
        userInfo: {
          email: userAccountForm.email?.value ?? '',
          orgSid,
          sendActivationEmail: userAccountForm.sendActivationEmail?.value ?? true,
          accessPolicyGroupSids,
        },
        personInfo: {
          firstNm: userAccountForm.person?.firstNm.value ?? '',
          lastNm: userAccountForm.person?.lastNm.value ?? '',
        },
      },
      errorPolicy: 'all',
    });

    if (data?.createUser) {
      setUserAccountForm(data?.createUser);
    }
    if (data && errors && errors.length > 0) {
      // Set errors into the objet itself
      data.createUser = {
        sid: null,
        organization: {
          label: 'Primary Organization',
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

  const resetForm = () => {
    if (orgSid) {
      callUserAccountForm({
        variables: {
          orgSid,
        },
      });
    }
  };

  //
  useEffect(() => {
    if (dataUserAccountForm) {
      setUserAccountForm(dataUserAccountForm?.userAccountForm ?? defaultForm);
    }
  }, [dataUserAccountForm]);

  //
  // * Return the state of the form.
  return {
    userAccountForm,
    userAccountLoading,
    userAccountError,
    callUpdateUser: handleCreateUser,
    responseCreateUser: userCreatedData,
    loadingCreateUser: creatingUserLoading,
    isUserCreated,
    clearUserCreation,
    resetForm,
    updateAccountInfo,
    updateAccessPolicyGroups,
    setSendAccountActivation,
  };
};
