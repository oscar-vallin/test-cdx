import {
  MessageBar, MessageBarType, PanelType, Spinner, SpinnerSize, Stack,
} from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { LightSeparator } from 'src/components/separators/Separator';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import React, { useEffect, useState } from 'react';
import {
  PanelBody, PanelHeader, PanelTitle, ThemedPanel,
} from 'src/layouts/Panels/Panels.styles';
import {
  CdxWebCommandType,
  GqOperationResponse,
  OrganizationForm,
  OrgType,
  useCreateOrgMutation,
  useFindOrganizationLazyQuery,
  useOrganizationFormLazyQuery,
  useUpdateOrgMutation,
} from 'src/data/services/graphql';
import { Button } from 'src/components/buttons';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UIInputText } from 'src/components/inputs/InputText';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import { getEnumByValue } from 'src/utils/CDXUtils';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { useNotification } from 'src/hooks/useNotification';

type OrgPanelType = {
  isOpen: boolean;
  selectedOrgSid?: string | null;
  onDismiss: () => void;
  onSave: () => void;
};

type OrgStateType = {
  sid?: string;
  name?: string;
  orgId?: string;
  orgType?: OrgType;
  mv1Id?: string;
  mv1Folder?: string | null;
};

const INITIAL_STATE: OrgStateType = {
  sid: undefined,
  name: '',
  orgId: '',
  orgType: undefined,
};

export const OrgPanel = ({
  isOpen, selectedOrgSid, onDismiss, onSave,
}: OrgPanelType) => {
  const { orgSid: orgOwnerSid } = useOrgSid();
  const [orgState, setOrgState] = useState<OrgStateType>(INITIAL_STATE);
  const [orgForm, setOrgForm] = useState<OrganizationForm | null>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [message, setMessage] = useState<string | undefined>();

  const [fetchOrgForm, { data: dataForm, loading: loadingForm, error: errorForm }] = useOrganizationFormLazyQuery();
  const [fetchOrg, { data: dataOrg, loading: loadingOrg, error: errorOrg }] = useFindOrganizationLazyQuery();
  const [createOrg, { data: dataCreateOrg, loading: loadingCreate, error: errorCreate }] = useCreateOrgMutation();
  const [updateOrg, { data: dataUpdateOrg, loading: loadingUpdate, error: errorUpdate }] = useUpdateOrgMutation();
  const Toast = useNotification();
  const handleError = ErrorHandler();

  const doClosePanel = () => {
    setOrgState({ ...INITIAL_STATE });

    // Reset the form
    setOrgForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  useEffect(() => {
    handleError(errorForm);
    handleError(errorOrg);
    handleError(errorCreate);
    handleError(errorUpdate);
  }, [errorForm, errorOrg, errorCreate, errorUpdate]);

  useEffect(() => {
    if (selectedOrgSid) {
      fetchOrg({
        variables: {
          orgSid: selectedOrgSid,
        },
      });
    } else {
      fetchOrgForm({
        variables: {
          orgOwnerSid,
        },
      });
    }
  }, [selectedOrgSid]);

  useEffect(() => {
    if (dataForm && !loadingForm) {
      setOrgForm(dataForm.organizationForm);
    }
  }, [dataForm, loadingForm]);

  useEffect(() => {
    if (dataOrg && !loadingOrg) {
      setOrgForm(dataOrg.findOrganization);
    }
  }, [dataOrg, loadingOrg]);

  useEffect(() => {
    if (dataCreateOrg && !loadingCreate) {
      const form = dataCreateOrg.createOrg;

      if (form?.response === GqOperationResponse.Fail) {
        setOrgForm(form);
        const errorMsg = form.errMsg ?? form.response ?? 'Error Saving Organization';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      } else if (form?.sid) {
        Toast.success({ text: `Organization ${form?.name?.value} created` });
        doClosePanel();
        onSave();
      }
    }
  }, [dataCreateOrg, loadingCreate]);

  useEffect(() => {
    if (dataUpdateOrg && !loadingUpdate) {
      const form = dataUpdateOrg.updateOrg;

      if (form?.response === GqOperationResponse.Fail) {
        setOrgForm(form);
        const errorMsg = form.errMsg ?? form.response ?? 'Error Saving Organization';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      } else if (form?.sid) {
        Toast.success({ text: `Organization ${form?.name?.value} saved` });
        doClosePanel();
        onSave();
      }
    }
  }, [dataUpdateOrg, loadingUpdate]);

  useEffect(() => {
    if (orgForm) {
      const _orgState: OrgStateType = {
        sid: orgForm?.sid ?? undefined,
        orgId: orgForm?.orgId?.value ?? '',
        name: orgForm?.name?.value ?? undefined,
        orgType: getEnumByValue(OrgType, orgForm?.orgType?.value?.value),
        mv1Id: orgForm?.mv1Id?.value?.toString(),
        mv1Folder: orgForm?.mv1Folder?.value,
      };

      setOrgState(_orgState);
    } else {
      setOrgState(INITIAL_STATE);
    }
  }, [orgForm]);

  const renderOrgId = () => {
    if (selectedOrgSid) {
      return <UIInputTextReadOnly id="__OrgID" uiField={orgForm?.orgId} />;
    }
    return (
      <UIInputText
        id="__OrgID"
        uiField={orgForm?.orgId}
        value={orgState.orgId}
        onChange={(event, newValue) => {
          setUnsavedChanges(true);
          setOrgState({ ...orgState, orgId: newValue ?? '' });
        }}
      />
    );
  };

  const renderBody = () => (
    <>
      <FormRow>
        <Column lg="6">{renderOrgId()}</Column>
        <Column lg="6">
          <UIInputSelectOne
            id="__OrgType"
            uiField={orgForm?.orgType}
            value={orgState.orgType?.toString() ?? ''}
            options={orgForm?.options}
            onChange={(newValue) => {
              setUnsavedChanges(true);
              const orgType = getEnumByValue(OrgType, newValue);
              setOrgState({ ...orgState, orgType });
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <UIInputText
            id="__OrgName"
            uiField={orgForm?.name}
            value={orgState.name ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, name: newValue });
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="6">
          <UIInputText
            id="__Mv1Id"
            uiField={orgForm?.mv1Id}
            value={orgState.mv1Id ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, mv1Id: newValue });
            }}
          />
        </Column>
        <Column lg="6">
          <UIInputText
            id="__Mv1Folder"
            uiField={orgForm?.mv1Folder}
            value={orgState.mv1Folder ?? ''}
            onChange={(event, newValue) => {
              setUnsavedChanges(true);
              setOrgState({ ...orgState, mv1Folder: newValue });
            }}
          />
        </Column>
      </FormRow>
    </>
  );

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__Org_Panel_Title" variant="bold" size="large">
            {!selectedOrgSid ? 'New Organization' : 'Update Organization'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const doSave = () => {
    if (!selectedOrgSid) {
      createOrg({
        variables: {
          orgInfo: {
            orgId: orgState.orgId ?? '',
            name: orgState.name ?? '',
            orgType: orgState.orgType ?? OrgType.IntegrationSponsor,
            mv1Id: orgState.mv1Id ? +orgState.mv1Id : undefined,
            mv1Folder: orgState.mv1Folder,
            orgOwnerSid,
          },
        },
      }).then();
    } else {
      updateOrg({
        variables: {
          orgInfo: {
            orgSid: selectedOrgSid,
            name: orgState.name ?? '',
            orgType: orgState.orgType ?? OrgType.IntegrationSponsor,
            mv1Id: orgState.mv1Id ? +orgState.mv1Id : undefined,
            mv1Folder: orgState.mv1Folder,
          },
        },
      }).then();
    }

    return null;
  };

  const renderPanelFooter = () => {
    const commands = orgForm?.commands;
    const command = commands?.find(
      (cmd) => cmd?.commandType === CdxWebCommandType.Create || cmd?.commandType === CdxWebCommandType.Update,
    );
    if (command) {
      return (
        <div>
          <Button
            id="__SaveOrganizationBtnId"
            variant="primary"
            disabled={loadingCreate || loadingUpdate}
            onClick={doSave}
          >
            {command.label}
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ThemedPanel
        id="org-panel"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        headerText={!selectedOrgSid ? 'New Organization' : 'Update Organization'}
        onRenderHeader={renderPanelHeader}
        onRenderFooterContent={renderPanelFooter}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
      >
        <PanelBody>
          {message && (
            <MessageBar
              id="__OrgPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          )}
          {!orgForm || loadingForm || loadingOrg ? (
            <>
              <Spacing margin={{ top: 'normal', bottom: 'double' }}>
                <LightSeparator />
              </Spacing>

              <Spacing>
                <Spinner size={SpinnerSize.large} label="Loading..." />
              </Spacing>
            </>
          ) : (
            renderBody()
          )}
        </PanelBody>
      </ThemedPanel>
      <DialogYesNo
        id="__OrgUnsavedChanges_Dlg"
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about lose all changes made to this Organization. Are you sure you want to continue?"
        onYes={() => {
          setShowDialog(false);
          doClosePanel();
        }}
        onClose={() => {
          setShowDialog(false);
        }}
      />
    </>
  );
};
