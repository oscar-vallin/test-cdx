import { useEffect, useState } from 'react';
import {
  ActivateUserMutation,
  CdxWebCommandType,
  DeactivateUserMutation,
  GqOperationResponse,
  MigrateUserMutation,
  ResetPasswordMutation,
  UpdateUserAccessPolicyGroupsMutation,
  UpdateUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useFindUserAccountLazyQuery,
  useMigrateUserMutation,
  UserAccount,
  UserAccountForm,
  useResetPasswordMutation,
  useUpdateUserAccessPolicyGroupsMutation,
  useUpdateUserMutation,
  WebCommand,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm, updateForm } from '../UserAccountFormUtil';

export type UseUpdateUserPanel = {
  isPanelOpen: boolean;
  showPanel: (userSid: string) => void;
  closePanel: () => void;
  userAccountForm: UserAccountForm;
  resetPasswordCmd: WebCommand | null | undefined;
  activateUserCmd: WebCommand | null | undefined;
  deactivateUserCmd: WebCommand | null | undefined;
  changeHistoryCmd: WebCommand | null | undefined;
  auditActivityCmd: WebCommand | null | undefined;
  migrateUserCmd: WebCommand | null | undefined;
  callUpdateUser: (updates: UserAccount) => Promise<UpdateUserMutation | null | undefined>;
  callAssignGroups: (sids: string[]) => Promise<UpdateUserAccessPolicyGroupsMutation | null | undefined>;
  callResetPassword: () => Promise<ResetPasswordMutation | null | undefined>;
  callDeactivateUser: () => Promise<DeactivateUserMutation | null | undefined>;
  callActivateUser: () => Promise<ActivateUserMutation | null | undefined>;
  callMigrateUser: (orgSid: string, accessPolicyGroupSids: string[]) => Promise<MigrateUserMutation | null | undefined>;
  resetForm: () => void;
};

export const useUpdateUserPanel = (): UseUpdateUserPanel => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [userSid, setUserSid] = useState('');
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);
  const [resetPasswordCmd, setResetPasswordCmd] = useState<WebCommand>();
  const [activateUserCmd, setActiveUserCmd] = useState<WebCommand>();
  const [deactivateUserCmd, setDeactivateUserCmd] = useState<WebCommand>();
  const [changeHistoryCmd, setChangeHistoryCmd] = useState<WebCommand>();
  const [auditActivityCmd, setAuditActivityCmd] = useState<WebCommand>();
  const [migrateUserCmd, setMigrateUserCmd] = useState<WebCommand>();

  const handleError = ErrorHandler();

  const [callFindUserAccount, { data: dataFindUserAccount, error: findUserAccountError }] =
    useFindUserAccountLazyQuery();

  const [callUpdateUser, { error: updateUserError }] = useUpdateUserMutation();

  const [callAssignGroups, { error: assignGroupsError }] = useUpdateUserAccessPolicyGroupsMutation();

  const [callResetPassword, { error: resetPasswordError }] = useResetPasswordMutation();

  const [callDeactivateUser, { error: deactivateUserError }] = useDeactivateUserMutation();

  const [callActivateUser, { error: activateUserError }] = useActivateUserMutation();

  const [callMigrateUser, { error: migrateUserError }] = useMigrateUserMutation();

  const showPanel = (userAccountSid: string) => {
    setUserSid(userAccountSid);
    callFindUserAccount({
      variables: {
        userSid: userAccountSid,
      },
    });
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  useEffect(() => {
    handleError(updateUserError);
  }, [updateUserError]);

  useEffect(() => {
    handleError(findUserAccountError);
  }, [findUserAccountError]);

  useEffect(() => {
    handleError(assignGroupsError);
  }, [assignGroupsError]);

  useEffect(() => {
    handleError(resetPasswordError);
  }, [resetPasswordError]);

  useEffect(() => {
    handleError(deactivateUserError);
  }, [deactivateUserError]);

  useEffect(() => {
    handleError(activateUserError);
  }, [activateUserError]);

  useEffect(() => {
    handleError(migrateUserError);
  }, [migrateUserError]);

  const internalServerError = {
    sid: null,
    organization: {
      label: 'Organization',
      required: false,
      visible: true,
    },
    accessGrantOrgNames: [],
    response: GqOperationResponse.Fail,
    errCode: 'INTERNAL_ERROR',
    errMsg: 'An internal server error has occurred.  Please contact your administrator.',
  };

  const handleUpdateUserGroups = async (sids: string[]) => {
    updateForm(userAccountForm, undefined, sids);
    const { data, errors } = await callAssignGroups({
      variables: {
        userAccessPolicyGroupUpdate: {
          userAccountSid: userSid,
          accessPolicyGroupSids: sids,
        },
      },
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

  const handleUpdateUser = async (userAccount: UserAccount) => {
    updateForm(userAccountForm, userAccount);
    const { data, errors } = await callUpdateUser({
      variables: {
        userInfo: {
          sid: userSid,
          email: userAccount.email,
          firstNm: userAccount.person?.firstNm ?? '',
          lastNm: userAccount.person?.lastNm ?? '',
        },
      },
      errorPolicy: 'all',
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

  const handleResetPassword = async () => {
    const { data } = await callResetPassword({
      variables: {
        userSid,
      },
      errorPolicy: 'all',
    });

    return data;
  };

  const handleDeactivateUser = async () => {
    const { data } = await callDeactivateUser({
      variables: {
        sidInput: {
          sid: userSid,
        },
      },
      errorPolicy: 'all',
    });

    if (data?.deactivateUser === GqOperationResponse.Success) {
      // Update the form
      callFindUserAccount({
        variables: {
          userSid,
        },
      });
    }

    return data;
  };

  const handleActivateUser = async () => {
    const { data } = await callActivateUser({
      variables: {
        sidInput: {
          sid: userSid,
        },
      },
      errorPolicy: 'all',
    });

    if (data?.activateUser === GqOperationResponse.Success) {
      // Update the form
      callFindUserAccount({
        variables: {
          userSid,
        },
      });
    }

    return data;
  };

  const handleMigrateUser = async (orgSid: string, accessPolicyGroupSids: string[]) => {
    const { data } = await callMigrateUser({
      variables: {
        migrateInput: {
          userAccountSid: userSid,
          orgSid,
          accessPolicyGroupSids,
        },
      },
      errorPolicy: 'all',
    });

    if (data?.migrateUser === GqOperationResponse.Success) {
      // Update the form
      callFindUserAccount({
        variables: {
          userSid,
        },
      });
    }

    return data;
  };

  const resetForm = () => {
    if (userSid) {
      // setUserAccountForm(defaultForm);
    }
  };

  const findCmd = (cmdType: CdxWebCommandType): WebCommand | undefined => {
    return userAccountForm.commands?.find((cmd) => cmd?.commandType === cmdType);
  };

  //
  useEffect(() => {
    if (dataFindUserAccount?.findUserAccount) {
      setUserAccountForm(dataFindUserAccount?.findUserAccount ?? defaultForm);
      setPanelOpen(true);
    }
  }, [dataFindUserAccount]);

  useEffect(() => {
    setResetPasswordCmd(findCmd(CdxWebCommandType.Reset));
    setActiveUserCmd(findCmd(CdxWebCommandType.Activate));
    setDeactivateUserCmd(findCmd(CdxWebCommandType.Deactivate));
    setChangeHistoryCmd(findCmd(CdxWebCommandType.History));
    setAuditActivityCmd(findCmd(CdxWebCommandType.Audit));
    setMigrateUserCmd(findCmd(CdxWebCommandType.Migrate));
  }, [userAccountForm]);

  //
  // * Return the state of the form.
  return {
    isPanelOpen: panelOpen,
    showPanel,
    closePanel,
    userAccountForm,
    resetPasswordCmd,
    activateUserCmd,
    deactivateUserCmd,
    changeHistoryCmd,
    auditActivityCmd,
    migrateUserCmd,
    callUpdateUser: handleUpdateUser,
    callAssignGroups: handleUpdateUserGroups,
    callResetPassword: handleResetPassword,
    callDeactivateUser: handleDeactivateUser,
    callActivateUser: handleActivateUser,
    callMigrateUser: handleMigrateUser,
    resetForm,
  };
};
