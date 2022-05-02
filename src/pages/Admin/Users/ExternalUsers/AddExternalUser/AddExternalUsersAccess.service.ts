import { useEffect, useState } from 'react';
import {
  GqOperationResponse,
  useCreateUserMutation,
  UserAccount,
  UserAccountForm,
  useUserAccountFormLazyQuery,
  useFindExternalUsersLazyQuery,
  useGrantExternalUserAccessMutation,
  useCreateExternalUserMutation,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from './AddExternalUsersFormUtil';

export const useAddExternalUsersAccessService = (orgSid: string) => {
  const [
    callFindExternalUsers,
    { data: dataFindExternalUsers, loading: loadingFindExternalUsers, error: errorFindExternalUsers },
  ] = useFindExternalUsersLazyQuery();

  const [
    callGrantExternalUserAccess,
    { data: dataGrantExternalUserAccess, loading: loadingGrantExternalUserAccess, error: errorGrantExternalUserAccess },
  ] = useGrantExternalUserAccessMutation();

  const [
    callCreateExternalUser,
    { data: dataCreateExternalUser, loading: loadingCreateExternalUser, error: errorCreateExternalUser },
  ] = useCreateExternalUserMutation();

  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);

  const [callUserAccountForm, { data: dataUserAccountForm, loading: userAccountLoading, error: userAccountError }] =
    useUserAccountFormLazyQuery({
      variables: {
        orgSid,
      },
    });

  const [selectedExternalUsers, setSelectedExternalUsers] = useState<any[]>([]);

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
    if (dataUserAccountForm) {
      setUserAccountForm(dataUserAccountForm?.userAccountForm ?? defaultForm);
    }
  }, [dataUserAccountForm]);

  useEffect(() => {
    if (dataFindExternalUsers?.findExternalUsers) setSelectedExternalUsers(dataFindExternalUsers?.findExternalUsers);
  }, [dataFindExternalUsers]);

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

  // * Return the state of the form.
  return {
    callCreateExternalUser: handleCreateExternalUser,
    setSendAccountActivation,
    callGrantUserAccess: handleGrantUserAccess,
    updateAccountInfo,
    updateAccessPolicyGroups,
    selectedExternalUsers,
    resetForm,
    callFindExternalUsers,
    userAccountForm,
  };
};
