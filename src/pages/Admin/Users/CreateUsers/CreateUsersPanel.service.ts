import { access } from 'fs';
import { useEffect, useState } from 'react';
import { InputTextProps } from 'src/components/inputs/InputText/InputText';
import { useCreateUserMutation, useUserAccountFormLazyQuery } from 'src/data/services/graphql';
import { CheckType } from 'src/hooks/useCheckValue';
import { InputType, useInputValue } from 'src/hooks/useInputValue';

export type OptionType = CheckType;

export type FormTitle = {
  label: string | undefined;
  required: boolean | undefined;
  info: any | undefined;
};

export type FormInput = InputTextProps & {
  visible: boolean | undefined;
};

export type FormUserType = {
  account: {
    title: FormTitle & { description: string | undefined };
    fields: FormInput[];
  };
  access: {
    title: FormTitle;
    options: OptionType[] | undefined;
  };
  auth: {
    title: FormTitle;
    options: OptionType[] | undefined;
  };
};

export const useCreateUsersPanel = (orgSid) => {
  const firstName = useInputValue('First Name', '', '', 'text');
  const lastName = useInputValue('Last Name', '', '', 'text');
  const email = useInputValue('Username and Email Address', '', '', 'email');
  const [opts, setOpts] = useState<boolean[]>([]);

  const [exchangeReaderAll, setExchangeReaderAll] = useState(false);
  const [exchangeAdminVendor, setExchangeAdminVendor] = useState(false);
  const [userAdminAllOrgs, setUserAdminAllOrgs] = useState(false);
  const [userAdminSubOrgs, setUserAdminSubOrgs] = useState(false);
  const [sendAccountActivation, setSendAccountActivation] = useState(false);
  const [organizationId, setOrganizationId] = useState();
  const [userAccountForm, setUserAccountForm] = useState<any>();
  const [form, setForm] = useState<FormUserType>();

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

  //  //accessPolicyGroups: {value: null, label: "Access Groups", readOnly: false, info: null, required: false, visible: true,…}
  // errCode: null;
  // errMsg: null;
  // errSeverity: null;
  // info: null;
  // label: 'Access Groups';
  // options: 'AccessPolicyGroup';
  // query: null;
  // readOnly: false;
  // required: false;
  // value: null;
  // visible: tru;

  //
  useEffect(() => {
    if (dataUserAccountForm) {
      const userAccountForm = dataUserAccountForm?.userAccountForm;
      setUserAccountForm(dataUserAccountForm?.userAccountForm);
      const accessPolicyGroups = dataUserAccountForm?.userAccountForm?.accessPolicyGroups;
      const accessOptions = dataUserAccountForm?.userAccountForm?.options?.find(
        (option) => option?.key === accessPolicyGroups?.options
      );

      // Set Maps
      setOpts(new Array((accessOptions?.values?.length ?? 0) + 1).fill(false));

      const newForm: FormUserType = {
        account: {
          title: {
            label: userAccountForm?.organization?.label,
            required: userAccountForm?.organization?.required,
            info: userAccountForm?.organization?.info,
            description: userAccountForm?.organization?.description ?? '',
          },
          fields: [
            {
              ...firstName,
              required: userAccountForm?.person?.firstNm?.required,
              disabled: !!userAccountForm?.person?.firstNm?.readOnly,
              type: 'text',
              placeholder: undefined,
              errorMessage: '',
              id: 'firstNm',
              autofocus: false,
              maxLength: userAccountForm?.person?.firstNm?.max,
              minLength: userAccountForm?.person?.firstNm?.min,
              visible: userAccountForm?.person?.firstNm?.visible,
            },
            {
              ...lastName,
              required: userAccountForm?.person?.lastNm?.required,
              disabled: !!userAccountForm?.person?.lastNm?.readOnly,
              type: 'text',
              placeholder: undefined,
              errorMessage: '',
              id: 'lastNm',
              autofocus: false,
              maxLength: userAccountForm?.person?.lastNm?.max,
              minLength: userAccountForm?.person?.lastNm?.min,
              visible: userAccountForm?.person?.lastNm?.visible,
            },
            {
              ...email,
              required: userAccountForm?.email?.required,
              disabled: !!userAccountForm?.email?.readOnly,
              type: 'text',
              placeholder: undefined,
              errorMessage: '',
              id: 'firstNm',
              autofocus: false,
              maxLength: userAccountForm?.email?.max,
              minLength: userAccountForm?.email?.min,
              visible: userAccountForm?.person?.lastNm?.visible,
            },
          ],
        },

        access: {
          title: {
            label: accessPolicyGroups?.label,
            required: accessPolicyGroups?.required,
            info: accessPolicyGroups?.info,
          },
          options: accessOptions?.values?.map((option, index) => {
            return {
              label: option?.label ?? '',
              id: option?.value ?? '0',
              checked: opts[index],
              onChange: (index) => {
                const newOpts = [...opts];
                newOpts[index] = !newOpts[index];
                setOpts(newOpts);
              },
            };
          }),
        },
        auth: {
          title: {
            label: 'Authentication',
            required: true,
            info: null,
          },
          options: [
            {
              label: 'Send an Account Activation Link',
              id: 'activation-link-checkbox',
              checked: opts[opts.length - 1],
              onChange: () => {
                const newOpts = [...opts];
                newOpts[opts.length - 1] = !newOpts[opts.length - 1];
                setOpts(newOpts);
              },
            },
          ],
        },
      };

      setForm(newForm);
    }
  }, [dataUserAccountForm]);

  //
  // * Return the state of the form.
  return {
    form,
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
