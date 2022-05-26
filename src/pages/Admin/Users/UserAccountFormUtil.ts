import { GqOperationResponse, Maybe, UiOption, UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { CheckboxItem } from 'src/data/Types';

export const defaultForm = {
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
    label: 'Organization',
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

export const updateForm = (
  userAccountForm: UserAccountForm,
  userAccount?: UserAccount,
  accessPolicyGroupSids?: string[]
): UserAccountForm => {
  if (userAccount) {
    userAccountForm.email = {
      ...(userAccountForm?.email ?? defaultForm.email),
      value: userAccount.email,
    };
    userAccountForm.person = {
      firstNm: {
        ...(userAccountForm?.person?.firstNm ?? defaultForm.person?.firstNm),
        value: userAccount.person?.firstNm,
      },
      lastNm: {
        ...(userAccountForm?.person?.lastNm ?? defaultForm.person?.lastNm),
        value: userAccount.person?.lastNm,
      },
    };
  }

  if (accessPolicyGroupSids) {
    userAccountForm.accessPolicyGroups = {
      ...(userAccountForm.accessPolicyGroups ?? defaultForm.accessPolicyGroups),
      value: accessPolicyGroupSids.map((sid) => {
        return {
          name: '',
          value: sid,
        };
      }),
    };
  }

  return userAccountForm;
};

export const renderSelectedGroupsReadOnly = (form?: UserAccountForm): string => {
  const groupOptions: CheckboxItem[] = [];

  if (form) {
    const formOpts: Maybe<UiOption>[] =
      form?.options?.find((itm) => {
        return itm?.key === form?.accessPolicyGroups?.options;
      })?.values ?? [];
    const groupSids = form?.accessPolicyGroups?.value?.map((nvp) => nvp?.value) ?? [];

    formOpts.forEach((opt) => {
      if (opt) {
        if (groupSids.includes(opt.value)) {
          groupOptions.push({
            ...opt,
            checked: true,
          });
        }
      }
    });
  }

  if (groupOptions.length > 0) {
    return groupOptions.map((opt) => opt.label).join(', ');
  }
  return 'No Access Groups Assigned';
};


export const getAccessGroupOptions = (form?: UserAccountForm): UiOption[] => {
  const formOpts: Maybe<UiOption>[] =
    form?.options?.find((itm) => {
      return itm?.key == form?.accessPolicyGroups?.options;
    })?.values ?? [];

  const groupOpts: UiOption[] = [];
  formOpts.forEach((opt) => {
    if (opt) {
      groupOpts.push({
        ...opt,
      });
    }
  });
  return groupOpts;
};

export const getSelectedAccessGroupSids = (form?: UserAccountForm): string[] => {
  return (
    form?.accessPolicyGroups?.value
      ?.filter((grp) => grp && grp.value)
      ?.map((grp) => {
        return grp?.value || '';
      }) ?? []
  );
};

export const getOrganizationSpecificGroups = (groupOptions: UiOption[]) => {
  return groupOptions.filter((g) => g.category === 'Organization specific groups');
};

export const getSystemManagedGroups = (groupOptions: UiOption[]) => {
  return groupOptions.filter((g) => g.category === 'System managed groups');
};
