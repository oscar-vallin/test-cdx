import { useEffect, useState } from 'react';
import { useCreateUserMutation, useUserAccountFormLazyQuery } from 'src/data/services/graphql';
import { useInputValue } from 'src/hooks/useInputValue';

export const useCreateUsersPanel = (orgSid) => {
  const firstName = useInputValue('First Name', '', '', 'text');
  const lastName = useInputValue('Last Name', '', '', 'text');
  const email = useInputValue('Username and Email Address', '', '', 'email');
  const [exchangeReaderAll, setExchangeReaderAll] = useState(false);
  const [exchangeAdminVendor, setExchangeAdminVendor] = useState(false);
  const [userAdminAllOrgs, setUserAdminAllOrgs] = useState(false);
  const [userAdminSubOrgs, setUserAdminSubOrgs] = useState(false);
  const [sendAccountActivation, setSendAccountActivation] = useState(false);
  const [organizationId, setOrganizationId] = useState();
  const [userAccountForm, setUserAccountForm] = useState<any>();

  const [apiUserAccountForm, { data: dataUserAccountForm, loading: userAccountLoading, error: userAccountError }] =
    useUserAccountFormLazyQuery({
      variables: {
        orgSid,
      },
    });

  const [apiCall, { data, loading }] = useCreateUserMutation({
    variables: {
      userInfo: {
        email: email.value,
        orgSid: organizationId ?? '',
      },
      personInfo: {
        firstNm: firstName.value,
        lastNm: lastName.value,
      },
    },
  });

  //
  // * When the organizationId changes, we need to re-fetch the user account form.
  useEffect(() => {
    console.log('useCreateUsersPanel.useEffect: organizationId changed', orgSid);
    if (orgSid) {
      apiUserAccountForm({
        variables: {
          orgSid,
        },
      });
    }
  }, [orgSid]);

  useEffect(() => {
    if (dataUserAccountForm) {
      setUserAccountForm(dataUserAccountForm?.userAccountForm);
    }
  }, [dataUserAccountForm]);

  //
  // * Return the state of the form.
  return {
    userAccountForm,
    userAccountLoading,
    userAccountError,
    infoAccount: { firstName, lastName, email },
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
    infoAuthentication: { sendAccountActivation, setSendAccountActivation },
    createUserCall: apiCall,
    responseCreateUser: data,
    loadingCreateUser: loading,
    setOrganizationId,
  };
};
