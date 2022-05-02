import { GqOperationResponse, UserAccount, UserAccountForm } from 'src/data/services/graphql';

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
    sid: '',
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
    (userAccountForm.sid = userAccount.person?.sid),
      (userAccountForm.email = {
        ...(userAccountForm?.email ?? defaultForm.email),
        value: userAccount.email,
      });
    userAccountForm.person = {
      firstNm: {
        ...(userAccountForm?.person?.firstNm ?? defaultForm.person?.firstNm),
        value: userAccount.person?.firstNm,
      },
      lastNm: {
        ...(userAccountForm?.person?.lastNm ?? defaultForm.person?.lastNm),
        value: userAccount.person?.lastNm,
      },
      sid: userAccount.person?.sid,
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
