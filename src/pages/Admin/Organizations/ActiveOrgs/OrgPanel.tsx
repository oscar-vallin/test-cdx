import { MessageBar, MessageBarType, Panel, PanelType, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { LightSeparator } from 'src/components/separators/Separator';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import React, { useEffect, useState } from 'react';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';
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
  whitelist?: string[];
}

const INITIAL_STATE: OrgStateType = {
  sid: undefined,
  name: '',
  orgId: '',
  orgType: OrgType.IntegrationSponsor
}

export const OrgPanel = ({isOpen, selectedOrgSid, onDismiss, onSave} : OrgPanelType) => {

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
          orgSid: selectedOrgSid
        }
      });
    } else {
      fetchOrgForm({
        variables: {
          orgOwnerSid: orgOwnerSid
        }
      });
    }
  }, [selectedOrgSid]);

  useEffect(() => {
    if (dataForm && !loadingForm) {
      setOrgState({...INITIAL_STATE});
      setOrgForm(dataForm.organizationForm);
    }
  }, [dataForm, loadingForm]);

  useEffect(() => {
    if (dataOrg && !loadingOrg) {
      const form = dataOrg.findOrganization;
      const orgState: OrgStateType = {
        sid: form?.sid ?? undefined,
        orgId: form?.orgId?.value ?? '',
        name: form?.name?.value ?? undefined,
        orgType: getEnumByValue(OrgType, form?.orgType?.value?.value),
      }
      setOrgState(orgState);

      setOrgForm(dataOrg.findOrganization);
    }
  }, [dataOrg, loadingOrg]);

  useEffect(() => {
    if (dataCreateOrg && !loadingCreate) {
      const form = dataCreateOrg.createOrg;

      if (form?.response === GqOperationResponse.Fail) {
        setOrgForm(form);
        const errorMsg =
          form.errMsg ?? form.response ?? 'Error Saving Organization';
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
        const errorMsg =
          form.errMsg ?? form.response ?? 'Error Saving Organization';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      } else if (form?.sid) {
        Toast.success({ text: `Organization ${form?.name?.value} saved` });
        doClosePanel();
        onSave();
      }
    }
  }, [dataUpdateOrg, loadingUpdate]);

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    setOrgState({ ...INITIAL_STATE });

    // Reset the form
    setOrgForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const renderOrgId = () => {
    if (selectedOrgSid) {
      return (
        <UIInputTextReadOnly id="__OrgID" uiField={orgForm?.orgId}/>
      );
    }
    return (
      <UIInputText id="__OrgID"
                   uiStringField={orgForm?.orgId}
                   value={orgState.orgId}
                   onChange={(event, newValue) => {
                     setUnsavedChanges(true);
                     setOrgState({...orgState, orgId: newValue ?? ''})
                   }}
      />
    );
  };

  const renderBody = () => {
    return (
      <>
        <FormRow>
          <Column lg="12">
            {renderOrgId()}
          </Column>
        </FormRow>
        <FormRow>
          <Column lg="12">
            <UIInputText id="__OrgName"
                         uiStringField={orgForm?.name}
                         value={orgState.name ?? ''}
                         onChange={(event, newValue) => {
                           setUnsavedChanges(true);
                           setOrgState({...orgState, name: newValue});
                         }}
            />
          </Column>
        </FormRow>
        <FormRow>
          <Column lg="12">
            <UIInputSelectOne id="__OrgType"
                              uiField={orgForm?.orgType}
                              value={orgState.orgType?.toString() ?? ''}
                              options={orgForm?.options}
                              onChange={(newValue) => {
                           setUnsavedChanges(true);
                           const orgType = getEnumByValue(OrgType, newValue);
                           setOrgState({...orgState, orgType: orgType});
                         }}
            />
          </Column>
        </FormRow>
      </>
    );
  }

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

  const renderPanelFooter = () => {
    const commands = orgForm?.commands;
    const command = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create || cmd?.commandType === CdxWebCommandType.Update);
    if (command) {
      return (
        <div>
          <Button
            id="__SaveOrganizationBtnId"
            variant="primary"
            disabled={loadingCreate || loadingUpdate}
            onClick={() => {
              if (!selectedOrgSid) {
                createOrg({
                  variables: {
                    orgInfo: {
                      orgId: orgState.orgId ?? '',
                      name: orgState.name ?? '',
                      orgType: orgState.orgType ?? OrgType.IntegrationSponsor,
                      orgOwnerSid: orgOwnerSid,
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
                    },
                  },
                }).then();
              }

              return null;
            }}
          >
            {command.label}
          </Button>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      <Panel
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
          ) : renderBody() }
        </PanelBody>
      </Panel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about lose all changes made to this Organization. Are you sure you want to continue?"
        onYes={() => {
          setShowDialog(false);
          doClosePanel();
          return null;
        }}
        onClose={() => {
          setShowDialog(false);
          return null;
        }}
      />
    </>
  );
};