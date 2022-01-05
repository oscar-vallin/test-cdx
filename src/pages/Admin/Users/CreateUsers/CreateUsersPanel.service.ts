import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  useCreateUserMutation,
  UserAccount,
  UserAccountForm,
  useUserAccountFormLazyQuery,
} from 'src/data/services/graphql';
import { ErrorHandler } from '../../../../utils/ErrorHandler';

export const useCreateUsersPanel = (orgSid) => {
  const defaultForm = {
    sid: null,
    email: {
      label: 'Email',
      required: true,
      visible: true,
      min: 0,
      max: 255,
    },
    person: {
      firstNm: {
        label: 'First Name',
        required: true,
        visible: true,
        min: 0,
        max: 60,
      },
      lastNm: {
        label: 'Last Name',
        required: true,
        visible: true,
        min: 0,
        max: 60,
      },
    },
    organization: {
      label: 'Primary Organization',
      required: false,
      visible: true,
    },
    accessPolicyGroups: {
      label: 'Access Policy Groups',
      required: false,
      visible: true,
    },
    sendActivationEmail: {
      label: 'Send Activation Email',
      required: false,
      visible: true,
    },
    response: GqOperationResponse.Success,
  };

  const [exchangeReaderAll, setExchangeReaderAll] = useState(false);
  const [exchangeAdminVendor, setExchangeAdminVendor] = useState(false);
  const [userAdminAllOrgs, setUserAdminAllOrgs] = useState(false);
  const [userAdminSubOrgs, setUserAdminSubOrgs] = useState(false);
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const [isUserCreated, setUserCreated] = useState(false);
  const handleError = ErrorHandler();

  const [apiUserAccountForm, { data: dataUserAccountForm, loading: userAccountLoading, error: userAccountError }] =
    useUserAccountFormLazyQuery({
      variables: {
        orgSid,
      },
    });

  const [callCreateUser, { data: userCreatedData, loading: creatingUserLoading, error: createUserError }] =
    useCreateUserMutation();

  const updateAccountInfo = (updates: UserAccount) => {
    userAccountForm.email = {
      ...(userAccountForm?.email ?? defaultForm.email),
      value: updates.email,
    };
    userAccountForm.person = {
      firstNm: {
        ...(userAccountForm?.person?.firstNm ?? defaultForm.person?.firstNm),
        value: updates.person?.firstNm,
      },
      lastNm: {
        ...(userAccountForm?.person?.lastNm ?? defaultForm.person?.lastNm),
        value: updates.person?.lastNm,
      },
    };
    setUserAccountForm(userAccountForm);
  };

  const updateAccessPolicyGroups = (sids: string[]) => {
    userAccountForm.accessPolicyGroups = {
      ...(userAccountForm.accessPolicyGroups ?? defaultForm.accessPolicyGroups),
      value: sids.map((sid) => {
        return {
          name: '',
          value: sid,
        };
      }),
    };

    setUserAccountForm(userAccountForm);
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
      apiUserAccountForm({
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

  // useEffect(() => {
  //   if (userSid) {
  //     apiGetUSer({
  //       variables: {
  //         userSid: userSid ?? '',
  //       },
  //     });
  //   }
  // }, [userSid]);

  const clearUserCreation = () => {
    setUserCreated(false);
  };

  const handleCreateUser = async () => {
    setUserCreated(false);

    const accessPolicyGroupSids: string[] =
      userAccountForm.accessPolicyGroups?.value
        ?.filter((opt) => opt != null && opt?.value != null)
        ?.map((opt) => opt?.value ?? '') ?? [];
    // const accessPolicyGroupsOpts: string[] =
    //   form?.access?.options?.filter(({ checked }) => checked)?.map((opt) => opt.id ?? '') ?? [];

    const { data } = await callCreateUser({
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
    });

    if (data?.createUser) {
      setUserAccountForm(data?.createUser);
    }

    return data;
  };

  const resetForm = () => {
    if (orgSid) {
      apiUserAccountForm({
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
    infoAccess: {
      exchangeReaderAll,
      exchangeAdminVendor,
      userAdminAllOrgs,
      userAdminSubOrgs,
      setExchangeReaderAll,
      setExchangeAdminVendor,
      setUserAdminAllOrgs,
      setUserAdminSubOrgs,
    },
    createUserCall: handleCreateUser,
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
