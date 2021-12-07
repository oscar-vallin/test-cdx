import { useState } from 'react';
import { useCreateUserMutation } from 'src/data/services/graphql';
import { useInputValue } from 'src/hooks/useInputValue';

export const useCreateUsersPanel = () => {
  const firstName = useInputValue('First Name', '', '', 'text');
  const lastName = useInputValue('Last Name', '', '', 'text');
  const email = useInputValue('Username and Email Address', '', '', 'email');
  const [exchangeReaderAll, setExchangeReaderAll] = useState(false);
  const [exchangeAdminVendor, setExchangeAdminVendor] = useState(false);
  const [userAdminAllOrgs, setUserAdminAllOrgs] = useState(false);
  const [userAdminSubOrgs, setUserAdminSubOrgs] = useState(false);
  const [sendAccountActivation, setSendAccountActivation] = useState(false);
  const [organizationId, setOrganizationId] = useState();

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

  return {
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
