/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';

import { MessageBar, MessageBarType, Panel, PanelType, Stack, Checkbox } from '@fluentui/react';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { Button } from 'src/components/buttons';
import { Column, Row } from 'src/components/layouts';
import { UIInputText } from 'src/components/inputs/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UIFormLabel } from 'src/components/labels/FormLabel';

import { useCreateGroupPanel } from 'src/pages/Admin/AccessManagement/Groups/AccessPolicyGroup/AccessPolicyGroupPanel.service';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { formatInfoTooltip } from 'src/components/inputs/CheckboxList';
import { AccessPolicyGroupForm, CdxWebCommandType, GqOperationResponse } from 'src/data/services/graphql';
import { UIInputMultiSelect } from 'src/components/inputs/InputDropdown';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { PanelBody, PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';
import { Text } from 'src/components/typography';
import { orgQuickSearch } from 'src/hooks/useQuickSearch';
import { useApolloClient } from '@apollo/client';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { InlineLabel } from 'src/components/inputs/InputCheck/UIInputCheck.styles';

type AccessPolicyGroupPanelType = {
  isOpen?: boolean;
  onDismiss: () => void;
  onCreateGroupPolicy: (response: AccessPolicyGroupForm) => void;
  onUpdateGroupPolicy: (response: AccessPolicyGroupForm) => void;
  selectedGroupId?: string | null;
  templateId?: string | null;
};

// * ------------------------------------------------------------------
// * --- AccessPolicyGroupPanel ---
// * ------------------------------------------------------------------
const AccessPolicyGroupPanel = ({
  isOpen,
  onDismiss,
  onCreateGroupPolicy,
  onUpdateGroupPolicy,
  selectedGroupId,
  templateId,
}: AccessPolicyGroupPanelType): ReactElement => {
  const { orgSid } = useOrgSid();

  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const accessManagementGroupService = useCreateGroupPanel(isOpen, orgSid, selectedGroupId, templateId);
  const { policies, specializations } = accessManagementGroupService;
  const { accessPolicyData, accessPolicyForm, setAccessPolicyForm } = accessManagementGroupService;
  const { clearAccessPolicyForm, addToAccessPolicyData } = accessManagementGroupService;
  const { loading } = accessManagementGroupService;
  const { createPolicyGroup, updatePolicyGroup } = accessManagementGroupService;
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const { createAccessPolicyGroupData, updateAccessPolicyGroupData } = accessManagementGroupService;
  const Toast = useNotification();
  const client = useApolloClient();
  const handleError = ErrorHandler();
  const [selectedPoliciesValues, setSelectedPoliciesValues] = useState<string[]>(accessPolicyData.policySids);

  const [selectedSpecializationsValues, setSelectedSpecializationsValues] = useState<string[]>(
    accessPolicyData.specializationSids
  );

  const doClosePanel = () => {
    // Reset the form
    clearAccessPolicyForm();
    setShowDialog(false);
    setUnsavedChanges(false);
    setErrorMsg(undefined);
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
    setSelectedPoliciesValues(accessPolicyData.policySids);
  }, [accessPolicyData.policySids.length]);

  useEffect(() => {
    setSelectedSpecializationsValues(accessPolicyData.specializationSids);
  }, [accessPolicyData.specializationSids.length]);

  useEffect(() => {
    const response: AccessPolicyGroupForm = createAccessPolicyGroupData?.createAccessPolicyGroup;
    if (response) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        const _errorMsg = response?.errMsg ?? 'Error Creating Access Policy Group';
        setAccessPolicyForm(response);
        setErrorMsg(_errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'Access Policy Group Successfully Created' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const _errorMsg = response?.errMsg ?? 'Error Creating Access Policy Group';
        Toast.warning({ text: _errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        doClosePanel();
        onCreateGroupPolicy(response);
      }
    }
  }, [createAccessPolicyGroupData]);

  useEffect(() => {
    const response: AccessPolicyGroupForm = updateAccessPolicyGroupData?.updateAccessPolicyGroup;
    if (response) {
      const responseCode = response?.response;
      if (responseCode === GqOperationResponse.Fail) {
        const _errorMsg = response?.errMsg ?? 'Error Updating Access Policy Group';
        setAccessPolicyForm(response);
        setErrorMsg(_errorMsg);
      } else {
        setErrorMsg(undefined);
      }

      if (responseCode === GqOperationResponse.Success) {
        Toast.success({ text: 'Access Policy Group Successfully Updated' });
      }
      if (responseCode === GqOperationResponse.PartialSuccess) {
        const _errorMsg = response?.errMsg ?? 'Error Updating Access Policy Group';
        Toast.warning({ text: _errorMsg });
      }

      if (responseCode === GqOperationResponse.Success || responseCode === GqOperationResponse.PartialSuccess) {
        doClosePanel();
        onUpdateGroupPolicy(response);
      }
    }
  }, [updateAccessPolicyGroupData]);

  useEffect(() => {
    if (isOpen) {
      clearAccessPolicyForm();
    }
  }, [isOpen]);

  const renderLabel = (item) => {
    return (
      <span>
        <InlineLabel required={item?.required}>{item?.label}</InlineLabel>
        <InfoIcon id="$_Info" tooltip={formatInfoTooltip(item?.info)} />
        <ErrorIcon id="$-ErrorMsg" errorMessage={item?.errMsg} />
      </span>
    );
  };

  const renderOptionsGroup = (formUiLabelField, options, onChange, id) => {
    const subGroups: any[][] = [[], []];
    for (let i = 0; i < options.length; i++) {
      subGroups[i % 2].push(options[i]);
    }
    return (
      <Spacing padding={{ top: 'normal', bottom: 'normal' }}>
        <UIFormLabel id={`${id}_Label`} uiField={formUiLabelField} />
        <Row>
          <Column lg="12">
            <Card id={`${id}-Card`} elevation="none" spacing="none">
              <Row top>
                {subGroups.map((subGroup, index) => {
                  return (
                    <Column lg="6" key={index}>
                      <Card id={`${id}_subGroup-${index}`} elevation="none">
                        {subGroup.map((item, itemindex) => {
                          return (
                            <Spacing
                              id={`${id}_subGroup-${index}_item-${itemindex}`}
                              margin={{ top: 'small' }}
                              key={`${index}-${itemindex}`}
                            >
                              <Checkbox
                                label={item.label}
                                onRenderLabel={() => renderLabel(item)}
                                checked={item.checked}
                                onChange={() => onChange(item.value)}
                              />
                            </Spacing>
                          );
                        })}
                      </Card>
                    </Column>
                  );
                })}
              </Row>
            </Card>
          </Column>
        </Row>
      </Spacing>
    );
  };

  const onPolicyChange = (policySid) => {
    const idx = selectedPoliciesValues.indexOf(policySid);
    const checked = idx > -1;
    if (checked) {
      // remove it
      selectedPoliciesValues.splice(idx, 1);
    } else {
      // add it
      selectedPoliciesValues.push(policySid);
    }
    setUnsavedChanges(true);
    addToAccessPolicyData({ policySids: selectedPoliciesValues });
  };

  const onSpecializationChange = (specializationSid) => {
    const idx = selectedSpecializationsValues.indexOf(specializationSid);
    const checked = idx > -1;
    if (checked) {
      // remove it
      selectedSpecializationsValues.splice(idx, 1);
    } else {
      // add it
      selectedSpecializationsValues.push(specializationSid);
    }
    setUnsavedChanges(true);
    addToAccessPolicyData({ specializationSids: selectedSpecializationsValues });
  };

  const getCheckedValues = (options, selectedOptions) => {
    const newOptions: any = [];
    options.forEach((element) => {
      newOptions.push({ ...element, checked: selectedOptions.includes(element.value) });
    });
    return newOptions;
  };

  const renderBody = (form?: AccessPolicyGroupForm | null) => {
    if (form) {
      return (
        <FormRow>
          <Column lg="12">
            <FormRow>
              <Column lg="12">
                <UIInputText
                  id="__groupInputName"
                  uiField={form.name}
                  value={accessPolicyData.name}
                  placeholder="Please enter a Unique Name"
                  onChange={(event, newValue) => {
                    setUnsavedChanges(true);
                    addToAccessPolicyData({ name: newValue });
                  }}
                />
              </Column>
            </FormRow>
            <FormRow>
              <Column lg="12">
                <UIInputText
                  id="__groupDescription"
                  uiField={form.description}
                  value={accessPolicyData.description}
                  placeholder="Please enter a Unique Description"
                  onChange={(event, newValue) => {
                    setUnsavedChanges(true);
                    addToAccessPolicyData({ description: newValue });
                  }}
                />
              </Column>
            </FormRow>
            <FormRow>
              <Column lg="12">
                <UIInputTextReadOnly id="primaryOrg" uiField={form.organization} />
              </Column>
            </FormRow>
            <FormRow>
              <Column lg="6">
                <UIInputCheck
                  id="__checkBoxTemplateGroup"
                  uiField={form.tmpl}
                  value={accessPolicyData.tmpl}
                  onChange={(_event, tmpl: any) => {
                    setUnsavedChanges(true);
                    addToAccessPolicyData({ tmpl, tmplUseAsIs: tmpl ? accessPolicyData.tmplUseAsIs : false });
                  }}
                />
              </Column>
              <Column lg="6">
                {accessPolicyData.tmpl && form.tmplUseAsIs?.visible && (
                  <UIInputCheck
                    id="__checkboxUseAsIs"
                    uiField={form.tmplUseAsIs}
                    value={accessPolicyData.tmplUseAsIs}
                    onChange={(_event, tmplUseAsIs: any) => {
                      setUnsavedChanges(true);
                      addToAccessPolicyData({ tmplUseAsIs });
                    }}
                  />
                )}
              </Column>
            </FormRow>
            {accessPolicyData.tmpl && form.applicableOrgTypes?.visible && (
              <FormRow>
                <Column lg="12">
                  <UIInputMultiSelect
                    id="__applicableOrgTypes"
                    uiField={form.applicableOrgTypes}
                    value={accessPolicyData.applicableOrgTypes}
                    options={form.options ?? []}
                    placeholder="--Applies to All Org Types--"
                    onChange={(applicableOrgTypes) => {
                      setUnsavedChanges(true);
                      addToAccessPolicyData({ applicableOrgTypes });
                    }}
                  />
                </Column>
              </FormRow>
            )}

            {renderOptionsGroup(
              form.policies,
              getCheckedValues(policies, selectedPoliciesValues),
              onPolicyChange,
              'policiesGroup'
            )}
            {renderOptionsGroup(
              form.specializations,
              getCheckedValues(specializations, selectedSpecializationsValues),
              onSpecializationChange,
              'specializationsGroup'
            )}

            <FormRow>
              <Column lg="12">
                <UIInputCheck
                  id="__includeAllSubOrgs"
                  uiField={form.includeAllSubOrgs}
                  value={accessPolicyData.includeAllSubOrgs}
                  onChange={(event, includeAllSubOrgs) => {
                    setUnsavedChanges(true);
                    addToAccessPolicyData({ includeAllSubOrgs });
                  }}
                  alignBottom={false}
                />
              </Column>
            </FormRow>

            {form?.includeOrgSids?.visible && (
              <FormRow>
                <Column lg="12">
                  <TagPicker
                    id="__includeOrgSids"
                    uiField={form.includeOrgSids}
                    disabled={form.includeOrgSids?.readOnly || accessPolicyData.includeAllSubOrgs}
                    value={accessPolicyData.includeOrgSids}
                    doSearch={(searchText) => orgQuickSearch(client, handleError, searchText, orgSid)}
                    onChange={(includeOrgSids) => {
                      setUnsavedChanges(true);
                      addToAccessPolicyData({ includeOrgSids });
                    }}
                  />
                </Column>
              </FormRow>
            )}

            {form?.excludeOrgSids?.visible && (
              <FormRow>
                <Column lg="12">
                  <TagPicker
                    id="__excludeOrgSids"
                    uiField={form.excludeOrgSids}
                    disabled={form.excludeOrgSids.readOnly || !accessPolicyData.includeAllSubOrgs}
                    value={accessPolicyData.excludeOrgSids}
                    doSearch={(searchText) => orgQuickSearch(client, handleError, searchText, orgSid)}
                    onChange={(excludeOrgSids) => {
                      setUnsavedChanges(true);
                      addToAccessPolicyData({ excludeOrgSids });
                    }}
                  />
                </Column>
              </FormRow>
            )}
          </Column>
        </FormRow>
      );
    }
    return null;
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreateGroup_Panel_Title" variant="bold" size="large">
            {!accessPolicyData.sid ? 'New Access Policy Group' : 'Update Access Policy Group'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const renderPanelFooter = () => {
    const commands = accessPolicyForm?.commands;
    const command = commands?.find(
      (cmd) => cmd?.commandType === CdxWebCommandType.Create || cmd?.commandType === CdxWebCommandType.Update
    );
    if (command) {
      return (
        <div>
          <Button
            id="__CreateGroupPanelId"
            variant="primary"
            disabled={loading}
            aria-label={command.label ?? undefined}
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
                includeOrgSids: accessPolicyData.includeOrgSids?.map((sid) => sid.key),
                excludeOrgSids: accessPolicyData.excludeOrgSids?.map((sid) => sid.key),
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
            }}
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
      <Panel
        id="__createGroupPanel"
        closeButtonAriaLabel="Close"
        type={PanelType.large}
        headerText={!accessPolicyData.sid ? 'New Access Policy Group' : 'Update Access Policy Group'}
        onRenderHeader={renderPanelHeader}
        onRenderFooterContent={renderPanelFooter}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
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
          {loading ? <Text>Loading...</Text> : renderBody(accessPolicyForm)}
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

export default AccessPolicyGroupPanel;
