import { access } from 'fs';
import { useEffect, useState } from 'react';
import { InputTextProps } from 'src/components/inputs/InputText/InputText';
import { useCreateUserMutation, useUserAccountFormLazyQuery } from 'src/data/services/graphql';
import { CheckType } from 'src/hooks/useCheckValue';
import { InputType, useInputValue } from 'src/hooks/useInputValue';

export type OptionType = {
  id?: string;
  label: string;
  checked: boolean;
};

export type FormTitle = {
  label: string | undefined;
  required: boolean | undefined;
  info: any | undefined;
};

export type FormInput = {
  id?: string;
  type?: string;
  disabled?: boolean;
  onChange?: any | null;
  autofocus?: boolean;
  errorMessage?: any | string;
  onKeyDown?: any | null;
  onKeyEnter?: any | null;
  value?: string | undefined;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  canRevealPassword?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
  info?: string;
  visible?: boolean;
};

export type FormUserType = {
  account?: { title: FormTitle & { description: string | undefined }; fields: FormInput[] } | undefined;
  access?: {
    title?: FormTitle;
    options: OptionType[] | undefined;
  };
  auth?: {
    title: FormTitle;
    options: OptionType[] | undefined;
  };
};

export const useCreateUsersPanel = (orgSid) => {
  const [opts, setOpts] = useState<boolean[]>([]);

  const [exchangeReaderAll, setExchangeReaderAll] = useState(false);
  const [exchangeAdminVendor, setExchangeAdminVendor] = useState(false);
  const [userAdminAllOrgs, setUserAdminAllOrgs] = useState(false);
  const [userAdminSubOrgs, setUserAdminSubOrgs] = useState(false);
  const [userAccountForm, setUserAccountForm] = useState<any>();
  const [form, setForm] = useState<FormUserType>();
  const [isUserCreated, setUserCreated] = useState(false);

  const [apiUserAccountForm, { data: dataUserAccountForm, loading: userAccountLoading, error: userAccountError }] =
    useUserAccountFormLazyQuery({
      variables: {
        orgSid,
      },
    });

  const [apiCall, { data: userCreatedData, loading: creatingUserLoading }] = useCreateUserMutation();

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

  const clearUserCreation = () => {
    setUserCreated(false);
  };

  const handleCreateUser = async () => {
    setUserCreated(false);
    const accountFirstName = form?.account?.fields?.find(({ id }) => id === 'firstNm')?.value ?? '';
    const accountLastName = form?.account?.fields?.find(({ id }) => id === 'lastNm')?.value ?? '';
    const accountEmail = form?.account?.fields?.find(({ id }) => id === 'email')?.value ?? '';

    const sendAccountActivation =
      form?.auth?.options?.find(({ id }) => id === 'activation-link-checkbox')?.checked ?? false;
    const accessPolicyGroupsOpts: string[] =
      form?.access?.options?.filter(({ checked }) => checked)?.map((opt) => opt.id ?? '') ?? [];

    const { data } = await apiCall({
      variables: {
        userInfo: {
          email: accountEmail,
          orgSid,
          sendActivationEmail: sendAccountActivation,
          accessPolicyGroupSids: accessPolicyGroupsOpts,
        },
        personInfo: {
          firstNm: accountFirstName,
          lastNm: accountLastName,
        },
      },
    });

    return data;
  };

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
              value: '',
              label: userAccountForm?.person?.firstNm?.label,
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
              value: '',
              label: userAccountForm?.person?.lastNm?.label,
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
              value: '',
              label: userAccountForm?.email?.label,
              required: userAccountForm?.email?.required,
              disabled: !!userAccountForm?.email?.readOnly,
              type: 'text',
              placeholder: undefined,
              errorMessage: '',
              id: 'email',
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
    setForm,
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
  };
};
