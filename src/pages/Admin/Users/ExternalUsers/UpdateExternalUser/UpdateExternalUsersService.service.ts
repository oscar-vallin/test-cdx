import { useEffect, useState } from 'react';
import {
  CdxWebCommandType,
  GqOperationResponse,
  GrantExternalUserAccessMutation,
  UserAccountForm,
  useExternalUserForOrgLazyQuery,
  useGrantExternalUserAccessMutation,
  WebCommand,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { defaultForm } from '../ExternalUsersFormUtil';

export type UseUpdateExternalUserPanel = {
  isPanelOpen: boolean;
  showPanel: (userSid: string) => void;
  closePanel: () => void;
  userAccountForm: UserAccountForm;
  resetPasswordCmd: WebCommand | null | undefined;
  activateUserCmd: WebCommand | null | undefined;
  deactivateUserCmd: WebCommand | null | undefined;
  changeHistoryCmd: WebCommand | null | undefined;
  auditActivityCmd: WebCommand | null | undefined;
  callGrantUserAccess: () => Promise<GrantExternalUserAccessMutation | null | undefined>;
  resetForm: () => void;
};

export const useUpdateExternalUsersService = (orgSid: string): UseUpdateExternalUserPanel => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [userSid, setUserSid] = useState('');
  const [userAccountForm, setUserAccountForm] = useState<UserAccountForm>(defaultForm);
  const [resetPasswordCmd, setResetPasswordCmd] = useState<WebCommand>();
  const [activateUserCmd, setActiveUserCmd] = useState<WebCommand>();
  const [deactivateUserCmd, setDeactivateUserCmd] = useState<WebCommand>();
  const [changeHistoryCmd, setChangeHistoryCmd] = useState<WebCommand>();
  const [auditActivityCmd, setAuditActivityCmd] = useState<WebCommand>();

  const handleError = ErrorHandler();

  const [
    callGrantExternalUserAccess,
    { data: dataGrantExternalUserAccess, loading: loadingGrantExternalUserAccess, error: errorGrantExternalUserAccess },
  ] = useGrantExternalUserAccessMutation();

  const [
    callExternalUserForOrg,
    { data: dataExternalUserForOrg, loading: loadingExternalUserForOrg, error: errorExternalUserForOrg },
  ] = useExternalUserForOrgLazyQuery();

  const showPanel = (userAccountSid: string) => {
    setUserSid(userAccountSid);
    callExternalUserForOrg({
      variables: {
        orgSid,
        userSid: userAccountSid,
      },
    });
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  useEffect(() => {
    handleError(errorGrantExternalUserAccess);
  }, [errorGrantExternalUserAccess]);

  useEffect(() => {
    handleError(errorExternalUserForOrg);
  }, [errorExternalUserForOrg]);

  const internalServerError = {
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

  /*  const handleUpdateUserGroups = async (sids: string[]) => {
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
 */

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
    if (dataExternalUserForOrg?.externalUserForOrg) {
      setUserAccountForm(dataExternalUserForOrg?.externalUserForOrg ?? defaultForm);
      setPanelOpen(true);
    }
  }, [dataExternalUserForOrg]);

  useEffect(() => {
    setResetPasswordCmd(findCmd(CdxWebCommandType.Reset));
    setActiveUserCmd(findCmd(CdxWebCommandType.Activate));
    setDeactivateUserCmd(findCmd(CdxWebCommandType.Deactivate));
    setChangeHistoryCmd(findCmd(CdxWebCommandType.History));
    setAuditActivityCmd(findCmd(CdxWebCommandType.Audit));
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
    callGrantUserAccess: handleGrantUserAccess,
    resetForm,
  };
};
