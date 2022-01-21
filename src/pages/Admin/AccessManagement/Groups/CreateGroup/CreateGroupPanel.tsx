/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, ReactElement } from 'react';

import { Panel, PanelType } from '@fluentui/react';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { Button } from 'src/components/buttons';
import { Column } from 'src/components/layouts';
import { UIInputText } from 'src/components/inputs/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { StyledContainer } from './CreateGroupPanel.styles';

import { useCreateGroupPanel } from './CreateGroupPanel.service';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { CheckboxList } from 'src/components/inputs/CheckboxList';
import { AccessPolicyGroupForm } from 'src/data/services/graphql';
import { UIInputMultiSelect } from 'src/components/inputs/InputMultiselect';
import { TagPicker } from 'src/components/inputs/TagPicker';

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

  const accessManagementGroupService = useCreateGroupPanel(isOpen, orgSid, selectedGroupId, templateId);
  const { policies, specializations } = accessManagementGroupService;
  const { accessPolicyData, accessPolicyForm } = accessManagementGroupService;
  const { clearAccessPolicyForm, addToAccessPolicyData } = accessManagementGroupService;
  const { orgQuickSearch, organizationTags } = accessManagementGroupService;
  const { loadingPolicies } = accessManagementGroupService;
  const { createPolicyGroup, updatePolicyGroup } = accessManagementGroupService;
  const { isFormOpen } = accessManagementGroupService;
  const { createdPolicyGroup, updatedPolicyGroup } = accessManagementGroupService;

  // * Dismiss the panel
  const handleDismiss = () => {
    clearAccessPolicyForm();
    onDismiss();
  };

  useEffect(() => {
    if (!isFormOpen && (createdPolicyGroup || updatedPolicyGroup)) {
      clearAccessPolicyForm();

      if (createdPolicyGroup) {
        onCreateGroupPolicy(createdPolicyGroup.createAccessPolicyGroup);
      } else {
        onUpdateGroupPolicy(updatedPolicyGroup?.updateAccessPolicyGroup);
      }
      handleDismiss();
    }
  }, [isFormOpen, createdPolicyGroup, updatedPolicyGroup]);

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
                               onChange={(event, newValue) => addToAccessPolicyData({ name: newValue })} />
                </Column>
              </FormRow>
              <FormRow>
                <Column lg="12">
                  <UIInputText
                    id="__groupDescription"
                    uiStringField={form.description}
                    value={accessPolicyData.description}
                    onChange={(event, newValue) => addToAccessPolicyData({ description: newValue })}
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
                                onChange={(_event, tmpl: any) =>
                                  addToAccessPolicyData({ tmpl, tmplUseAsIs: tmpl ? accessPolicyData.tmplUseAsIs : false })
                                }/>
                </Column>
                <Column lg="6">
                  {accessPolicyData.tmpl && form.tmplUseAsIs?.visible && (
                    <UIInputCheck id="__checkboxUseAsIs"
                                  uiField={form.tmplUseAsIs}
                                  value={accessPolicyData.tmplUseAsIs}
                                  onChange={(_event, tmplUseAsIs: any) => addToAccessPolicyData({ tmplUseAsIs })}/>
                  )}
                </Column>
              </FormRow>
              <FormRow>
                <Column lg="12">
                  <UIInputMultiSelect id="__applicableOrgTypes"
                                      uiField={form.applicableOrgTypes}
                                      value={accessPolicyData.applicableOrgTypes}
                                      options={form.options ?? []}
                                      placeholder="--Applies to All Org Types--"
                                      onChange={(applicableOrgTypes) => {
                                        addToAccessPolicyData({ applicableOrgTypes });
                                      }}/>
                </Column>
              </FormRow>
              {form?.policies?.visible && (
                <>
                  <FormRow>
                    <Column lg="12">
                      <UIFormLabel id="__policies"
                                   uiField={form.policies}/>
                      <StyledContainer>
                        <CheckboxList items={policies}
                                      value={accessPolicyData.policySids}
                                      emptyMessage='No policies configured'
                                      onChange={(policySids) => {
                                        addToAccessPolicyData( { policySids });
                                      }}
                        />
                      </StyledContainer>
                    </Column>
                  </FormRow>
                </>
              )}

              {form?.specializations?.visible && (
                <>
                  <FormRow>
                    <Column lg="12">
                      <UIFormLabel id="__specializations"
                                   uiField={form.specializations}/>
                      <StyledContainer>
                        <CheckboxList items={specializations}
                                      value={accessPolicyData.specializationSids}
                                      emptyMessage='No specializations configured'
                                      onChange={(specializationSids) => {
                                        addToAccessPolicyData({ specializationSids })
                                      }}
                        />
                      </StyledContainer>
                    </Column>
                  </FormRow>
                </>
              )}

              <FormRow>
                <Column lg="12">
                  <UIInputCheck id='__includeAllSubOrgs'
                                uiField={form.includeAllSubOrgs}
                                value={accessPolicyData.includeAllSubOrgs}
                                onChange={(event, includeAllSubOrgs) => addToAccessPolicyData({ includeAllSubOrgs })}
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

  return (
    <Panel
      id="__createGroupPanel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!accessPolicyData.sid ? 'New Access Policy Group' : 'Update Policy Group'}
      isOpen={isOpen}
      onDismiss={handleDismiss}
    >
      { renderBody(accessPolicyForm) }
    </Panel>
  );
};

CreateGroupPanel.defaultProps = defaultProps;

export default CreateGroupPanel;
