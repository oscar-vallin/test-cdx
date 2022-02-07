/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';

import { MessageBar, MessageBarType, Panel, PanelType, Stack } from '@fluentui/react';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { Button } from 'src/components/buttons';
import { Column } from 'src/components/layouts';
import { UIInputText } from 'src/components/inputs/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';

import { useCreateGroupPanel } from './CreateGroupPanel.service';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { UICheckboxList } from 'src/components/inputs/CheckboxList';
import { AccessPolicyGroupForm, GqOperationResponse } from 'src/data/services/graphql';
import { UIInputMultiSelect } from 'src/components/inputs/InputMultiselect';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';
import { Text } from 'src/components/typography';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreateGroupPolicy: () => null,
  onUpdateGroupPolicy: '',
};

type CreateGroupPanelProps = {
  isOpen?: boolean;
  onDismiss?: any | null;
  onCreateGroupPolicy?: any | null;
  onUpdateGroupPolicy?: any | null;
  selectedGroupId?: any;
  templateId?: any;
} & typeof defaultProps;

// * ------------------------------------------------------------------
// * --- CreateGroupPanel ---
// * ------------------------------------------------------------------
const CreateGroupPanel = ({
  isOpen,
  onDismiss,
  onCreateGroupPolicy,
  onUpdateGroupPolicy,
  selectedGroupId,
  templateId,
}: CreateGroupPanelProps): ReactElement => {
  const { orgSid } = useOrgSid();

  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const accessManagementGroupService = useCreateGroupPanel(isOpen, orgSid, selectedGroupId, templateId);
  const { policies, specializations } = accessManagementGroupService;
  const { accessPolicyData, accessPolicyForm, setAccessPolicyForm } = accessManagementGroupService;
  const { clearAccessPolicyForm, addToAccessPolicyData } = accessManagementGroupService;
  const { orgQuickSearch, organizationTags } = accessManagementGroupService;
  const { loadingPolicies } = accessManagementGroupService;
  const { createPolicyGroup, updatePolicyGroup } = accessManagementGroupService;
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const { createAccessPolicyGroupData, updateAccessPolicyGroupData } = accessManagementGroupService;
  const Toast = useNotification();



  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    // Reset the form
    clearAccessPolicyForm();
    setShowDialog(false);
    setUnsavedChanges(false);
    setErrorMsg(undefined);
    onDismiss();
  };

  useEffect(() => {
    const response: AccessPolicyGroupForm = createAccessPolicyGroupData?.createAccessPolicyGroup;
    if (response) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = response?.errMsg ?? 'Error Creating Access Policy Group';
        setAccessPolicyForm(response);
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'Access Policy Group Successfully Created' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.errMsg ?? 'Error Creating Access Policy Group';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        doClosePanel();
        onCreateGroupPolicy(response);
      }
    }
  }, [createAccessPolicyGroupData])

  useEffect(() => {
    const response: AccessPolicyGroupForm = updateAccessPolicyGroupData?.updateAccessPolicyGroup;
    if (response) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = response?.errMsg ?? 'Error Updating Access Policy Group';
        setAccessPolicyForm(response);
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'Access Policy Group Successfully Updated' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const errorMsg = response?.errMsg ?? 'Error Updating Access Policy Group';
        Toast.warning({ text: errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        doClosePanel();
        onUpdateGroupPolicy(response);
      }
    }
  }, [updateAccessPolicyGroupData])

  useEffect(() => {
    if (isOpen) {
      clearAccessPolicyForm();
    }
  }, [isOpen]);

  const renderBody = (form?: AccessPolicyGroupForm | null) => {
    if (form) {
      return (
        <>
          <FormRow>
            <Column lg="12">
              <FormRow>
                <Column lg="12">
                  <UIInputText id='__groupInputName'
                               uiStringField={form.name}
                               value={accessPolicyData.name}
                               placeholder='Please enter a Unique Name'
                               onChange={(event, newValue) => {
                                 setUnsavedChanges(true);
                                 addToAccessPolicyData({ name: newValue });
                               }} />
                </Column>
              </FormRow>
              <FormRow>
                <Column lg="12">
                  <UIInputText
                    id="__groupDescription"
                    uiStringField={form.description}
                    value={accessPolicyData.description}
                    placeholder='Please enter a Unique Description'
                    onChange={(event, newValue) => {
                      setUnsavedChanges(true);
                      addToAccessPolicyData({ description: newValue });
                    }}
                  />
                </Column>
              </FormRow>
              <FormRow>
                <Column lg="12">
                  <UIInputTextReadOnly id='primaryOrg'
                                       uiField={form.organization}/>
                </Column>
              </FormRow>
              <FormRow>
                <Column lg="6">
                  <UIInputCheck id="__checkBoxTemplateGroup"
                                uiField={form.tmpl}
                                value={accessPolicyData.tmpl}
                                onChange={(_event, tmpl: any) => {
                                  setUnsavedChanges(true);
                                  addToAccessPolicyData({ tmpl, tmplUseAsIs: tmpl ? accessPolicyData.tmplUseAsIs : false });
                                }}/>
                </Column>
                <Column lg="6">
                  {accessPolicyData.tmpl && form.tmplUseAsIs?.visible && (
                    <UIInputCheck id="__checkboxUseAsIs"
                                  uiField={form.tmplUseAsIs}
                                  value={accessPolicyData.tmplUseAsIs}
                                  onChange={(_event, tmplUseAsIs: any) => {
                                    setUnsavedChanges(true);
                                    addToAccessPolicyData({ tmplUseAsIs });
                                  }}/>
                  )}
                </Column>
              </FormRow>
              {accessPolicyData.tmpl && form.applicableOrgTypes?.visible && (
                <FormRow>
                  <Column lg="12">
                    <UIInputMultiSelect id="__applicableOrgTypes"
                                        uiField={form.applicableOrgTypes}
                                        value={accessPolicyData.applicableOrgTypes}
                                        options={form.options ?? []}
                                        placeholder="--Applies to All Org Types--"
                                        onChange={(applicableOrgTypes) => {
                                          setUnsavedChanges(true);
                                          addToAccessPolicyData({ applicableOrgTypes });
                                        }}/>
                  </Column>
                </FormRow>
              )}
              {form?.policies?.visible && (
                <>
                  <FormRow>
                    <Column lg="12">
                      <UICheckboxList id="__policies"
                                      options={policies}
                                      value={accessPolicyData.policySids}
                                      uiField={form.policies}
                                      emptyMessage="No policies configured"
                                      onChange={(policySids) => {
                                        setUnsavedChanges(true);
                                        addToAccessPolicyData( { policySids });
                                      }}
                      />
                    </Column>
                  </FormRow>
                </>
              )}

              {form?.specializations?.visible && (
                <>
                  <FormRow>
                    <Column lg="12">
                      <UICheckboxList id="__specializations"
                                      uiField={form.specializations}
                                      options={specializations}
                                      value={accessPolicyData.specializationSids}
                                      emptyMessage='No specializations configured'
                                      onChange={(specializationSids) => {
                                        setUnsavedChanges(true);
                                        addToAccessPolicyData({ specializationSids });
                                      }}
                      />
                    </Column>
                  </FormRow>
                </>
              )}

              <FormRow>
                <Column lg="12">
                  <UIInputCheck id='__includeAllSubOrgs'
                                uiField={form.includeAllSubOrgs}
                                value={accessPolicyData.includeAllSubOrgs}
                                onChange={(event, includeAllSubOrgs) => {
                                  setUnsavedChanges(true);
                                  addToAccessPolicyData({ includeAllSubOrgs });
                                }}
                                alignBottom={false}/>
                </Column>
              </FormRow>

              {form?.includeOrgSids?.visible && (
                <FormRow>
                  <Column lg="12">
                    <TagPicker id='__includeOrgSids'
                               uiField={form.includeOrgSids}
                               disabled={accessPolicyData.includeAllSubOrgs}
                               value={accessPolicyData.includeOrgSids}
                               apiQuery={orgQuickSearch}
                               options={organizationTags()}
                               onChange={(includeOrgSids) => {
                                 setUnsavedChanges(true);
                                 addToAccessPolicyData({ includeOrgSids });
                               }}/>

                  </Column>
                </FormRow>
              )}

              {form?.excludeOrgSids?.visible && (
                <FormRow>
                  <Column lg="12">
                    <TagPicker id='__excludeOrgSids'
                               uiField={form.excludeOrgSids}
                               disabled={!accessPolicyData.includeAllSubOrgs}
                               value={accessPolicyData.excludeOrgSids}
                               apiQuery={orgQuickSearch}
                               options={organizationTags()}
                               onChange={(excludeOrgSids) => {
                                 setUnsavedChanges(true);
                                 addToAccessPolicyData({ excludeOrgSids });
                               }}/>

                  </Column>
                </FormRow>
              )}

              <FormRow>
                <Column lg="12">
                  <Button
                    id="__CreateGroupPanelId"
                    variant="primary"
                    disabled={loadingPolicies}
                    onClick={() => {
                      const commonVariables = {
                        name: accessPolicyData.name,
                        description: accessPolicyData.description,
                        tmpl: accessPolicyData.tmpl,
                        tmplUseAsIs: accessPolicyData.tmplUseAsIs,
                        applicableOrgTypes: accessPolicyData.applicableOrgTypes,
                        policySids: accessPolicyData.policySids,
                        specializationSids: accessPolicyData.specializationSids,
                        includeAllSubOrgs: accessPolicyData.includeAllSubOrgs,
                        includeOrgSids: accessPolicyData.includeOrgSids?.map((sid) => (sid.key)),
                        excludeOrgSids: accessPolicyData.excludeOrgSids?.map((sid) => (sid.key)),
                      };

                      if (accessPolicyData.sid) {
                        updatePolicyGroup({
                          updateAccessPolicyGroupInput: { sid: accessPolicyData.sid, ...commonVariables },
                        }).then();
                      } else {
                        createPolicyGroup({
                          createAccessPolicyGroupInput: { orgSid, ...commonVariables },
                        }).then();
                      }
                      return null;
                    }}
                  >
                    {accessPolicyData.sid ? 'Update Group' : 'Save Group'}
                  </Button>
                </Column>
              </FormRow>
            </Column>
          </FormRow>
        </>
      );
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreateGroup_Panel_Title" variant="bold">
            {!accessPolicyData.sid ? 'New Access Policy Group' : 'Update Access Policy Group'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  return (
    <>
      <Panel
        id="__createGroupPanel"
        closeButtonAriaLabel="Close"
        type={PanelType.large}
        headerText={!accessPolicyData.sid ? 'New Access Policy Group' : 'Update Access Policy Group'}
        onRenderHeader={renderPanelHeader}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
      >
        <PanelBody>
          {errorMsg && (
            <MessageBar
              id="__AccessPolicyGroup_Error"
              messageBarType={MessageBarType.error}
              isMultiline
              onDismiss={() => setErrorMsg(undefined)}
            >
              {errorMsg}
            </MessageBar>
          )}
          {loadingPolicies ? (
            <Text>Loading...</Text>
          ) : renderBody(accessPolicyForm) }
        </PanelBody>
      </Panel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about lose all changes to this Access Policy Group. Are you sure you want to continue?"
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

CreateGroupPanel.defaultProps = defaultProps;

export default CreateGroupPanel;
