/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, ReactElement } from 'react';

import { useLocation } from 'react-router-dom';
import { Panel, PanelType } from '@fluentui/react/lib-commonjs/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TagPicker } from '@fluentui/react/lib-commonjs/Pickers';
import { mergeStyles } from '@fluentui/react/lib-commonjs/Styling';
import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { TooltipHost } from '@fluentui/react/lib-commonjs/Tooltip';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { Spacing } from '../../../../../components/spacings/Spacing';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';
import { StyledContainer } from './CreateGroupPanel.styles';
import { QueryParams } from '../../../../../utils/QueryParams';

import { useCreateGroupPanel } from './CreateGroupPanel.service';

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
} & typeof defaultProps;

const rootClass = mergeStyles({
  width: '100%',
});

// * ------------------------------------------------------------------
// * --- CreateGroupPanel ---
// * ------------------------------------------------------------------
const CreateGroupPanel = ({
  isOpen,
  onDismiss,
  onCreateGroupPolicy,
  onUpdateGroupPolicy,
  selectedGroupId,
}: CreateGroupPanelProps): ReactElement => {
  const { orgSid } = useOrgSid();

  const accessManagementGroupService = useCreateGroupPanel(isOpen, orgSid, selectedGroupId);
  const { policies, specializations, organizations } = accessManagementGroupService;
  const { accessPolicyForm, accessPolicyFormRaw } = accessManagementGroupService;
  const { clearAccessPolicyForm, addToAccessPolicyForm } = accessManagementGroupService;
  const { onIncludedOrgsSelected, onExcludedOrgsSelected } = accessManagementGroupService;
  const { filterSuggestedTags, getTextFromItem } = accessManagementGroupService;
  const { organizationTags } = accessManagementGroupService;
  const { loadingPolicies } = accessManagementGroupService;
  const { createPolicyGroup, updatePolicyGroup } = accessManagementGroupService;
  const { isFormOpen } = accessManagementGroupService;
  const { createdPolicyGroup } = accessManagementGroupService;

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested Organizations',
    noResultsFoundText: 'No organization tags found',
  };

  // * Dismiss the panel
  const handleDismiss = () => {
    clearAccessPolicyForm();
    onDismiss();
  };

  useEffect(() => {
    if (!isFormOpen && createdPolicyGroup) {
      clearAccessPolicyForm();
      onCreateGroupPolicy(createdPolicyGroup.createAccessPolicyGroup);
      handleDismiss();
    }
  }, [isFormOpen, createdPolicyGroup]);

  useEffect(() => {
    if (isOpen) {
      clearAccessPolicyForm();
    }
  }, [isOpen]);

  return (
    <Panel
      id="__createGroupPanel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!accessPolicyForm.policyGroupSid ? 'New Access Policy Group' : 'Update Policy Group'}
      isOpen={isOpen}
      onDismiss={handleDismiss}
    >
      <>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    id="__groupInputName"
                    required
                    label="Name"
                    placeholder="Please enter a Unifique Name"
                    value={accessPolicyForm.name}
                    onChange={({ target }) => addToAccessPolicyForm({ name: target.value })}
                  />
                </Column>
              </Row>

              {accessPolicyFormRaw?.organization?.visible && (
                <>
                  <Row>
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="bold">Organizations</Text>
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="normal">{accessPolicyFormRaw?.organization?.label}</Text>
                    </Spacing>

                    {accessPolicyFormRaw?.tmpl?.visible && (
                      <Column lg="6" direction="row">
                        <Checkbox
                          id="__checkBoxTemplateGroup"
                          label={accessPolicyFormRaw?.tmpl?.label}
                          checked={accessPolicyForm.tmpl}
                          onChange={(_event, tmpl: any) =>
                            addToAccessPolicyForm({ tmpl, tmplUseAsIs: tmpl ? accessPolicyForm.tmplUseAsIs : false })
                          }
                        />
                        {accessPolicyFormRaw?.tmpl?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.tmpl?.info} id="tmplTooltip">
                            &nbsp; <FontIcon aria-describedby="tmplTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Column>
                    )}
                    {accessPolicyForm.tmpl && accessPolicyFormRaw?.tmplUseAsIs?.visible && (
                      <Column lg="6" direction="row">
                        <Checkbox
                          id="__checkBoxUseAsIs"
                          label={accessPolicyFormRaw?.tmplUseAsIs?.label}
                          checked={accessPolicyForm.tmplUseAsIs}
                          onChange={(_event, tmplUseAsIs: any) => addToAccessPolicyForm({ tmplUseAsIs })}
                        />
                        {accessPolicyFormRaw?.tmplUseAsIs?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.tmplUseAsIs?.info} id="tmplUseAsIsTooltip">
                            &nbsp; <FontIcon aria-describedby="tmplUseAsIsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Column>
                    )}
                  </Row>
                </>
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              {accessPolicyFormRaw?.policies?.visible && (
                <>
                  <Row id="Policies-Section">
                    <Column lg="4" direction="row">
                      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
                        <Text variant="bold">Policies</Text>
                        {accessPolicyFormRaw?.policies?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.policies?.info} id="policiesTooltip">
                            &nbsp; <FontIcon aria-describedby="policiesTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {policies.map((item: { name: any; sid: never }, index) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox
                                id={`__checkBoxPolicies_${index + 1}`}
                                label={item.name}
                                checked={accessPolicyForm.policySids.includes(item.sid)}
                                onChange={(event, policy) => {
                                  addToAccessPolicyForm({
                                    policySids: policy
                                      ? [...accessPolicyForm.policySids, item.sid]
                                      : accessPolicyForm.policySids.filter((polItem) => polItem !== item.sid),
                                  });
                                }}
                              />
                            </Spacing>
                          );
                        })}
                      </Column>
                    </Row>
                  </StyledContainer>
                </>
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              {accessPolicyFormRaw?.specializations?.visible && (
                <>
                  <Row>
                    <Column lg="4" direction="row">
                      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
                        <Text variant="bold">Specialization</Text>
                        {accessPolicyFormRaw?.specializations?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.specializations?.info} id="specializationTooltip">
                            &nbsp; <FontIcon aria-describedby="specializationTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {specializations.map((item: { name: any; sid: never }, index) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox
                                id={`__checkBoxSuperPolicy_${index + 1}`}
                                label={item.name}
                                checked={accessPolicyForm.specializationSids.includes(item.sid)}
                                onChange={(event, specialization) => {
                                  addToAccessPolicyForm({
                                    specializationSids: specialization
                                      ? [...accessPolicyForm.specializationSids, item.sid]
                                      : accessPolicyForm.specializationSids.filter((specItem) => specItem !== item.sid),
                                  });
                                }}
                              />
                            </Spacing>
                          );
                        })}
                      </Column>
                    </Row>
                  </StyledContainer>
                </>
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Checkbox
                  id="__checkBoxPoliciesApplies"
                  label="Policies Applies to All Sub Organizations except for those explicitly exclude"
                  onChange={(event, _stepWise) => addToAccessPolicyForm({ _stepWise })}
                />
              </Spacing>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Row bottom>
                  <Column lg="12">
                    <InputText
                      label="Policies apply to the following Organizations"
                      placeholder="Type to Search"
                      disabled
                      value={accessPolicyForm.policyName}
                      onChange={({ target }) => addToAccessPolicyForm({ policyName: target.value })}
                    />
                  </Column>
                </Row>
              </Spacing>

              {accessPolicyFormRaw?.excludeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{accessPolicyFormRaw?.excludeOrgSids?.label}</strong>
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          // selectionAriaLabel="Selected colors"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          itemLimit={4}
                          inputProps={{
                            id: '__pickerPoliciesNotApply',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              {accessPolicyFormRaw?.includeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{accessPolicyFormRaw?.includeOrgSids.label}</strong>
                        {accessPolicyFormRaw?.includeOrgSids?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.includeOrgSids?.info} id="includeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="includeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          // selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onItemSelected={onIncludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: '__pickerPoliciesApply',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              {accessPolicyFormRaw?.excludeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{accessPolicyFormRaw?.excludeOrgSids?.label}</strong>
                        {accessPolicyFormRaw?.excludeOrgSids?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.excludeOrgSids?.info} id="excludeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="excludeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          // selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onItemSelected={onExcludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: '__pickerPoliciesNotApplyTwo',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              {accessPolicyFormRaw?.includeAllSubOrgs?.visible && (
                <Column lg="6" direction="row">
                  <Checkbox
                    id="__checkBoxIncludeAllSubOrgs"
                    label={accessPolicyFormRaw?.includeAllSubOrgs?.label}
                    checked={accessPolicyForm.includeAllSubOrgs}
                    onChange={(_event, includeAllSubOrgs) => addToAccessPolicyForm({ includeAllSubOrgs })}
                  />{' '}
                  {accessPolicyFormRaw?.includeAllSubOrgs?.info && (
                    <TooltipHost content={accessPolicyFormRaw?.includeAllSubOrgs?.info} id="includeAllSubOrgsTooltip">
                      &nbsp; <FontIcon aria-describedby="includeAllSubOrgsTooltip" iconName="Error" />
                    </TooltipHost>
                  )}
                </Column>
              )}

              {accessPolicyFormRaw?.includeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{accessPolicyFormRaw?.includeOrgSids.label}</strong>
                        {accessPolicyFormRaw?.includeOrgSids?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.includeOrgSids?.info} id="includeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="includeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          // selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onChange={onIncludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: 'includeOrgsId',
                          }}
                          selectedItems={organizationTags.filter((items) =>
                            accessPolicyForm.includeOrgSids.some((f) => f === items.key)
                          )}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              {accessPolicyFormRaw?.excludeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{accessPolicyFormRaw?.excludeOrgSids?.label}</strong>
                        {accessPolicyFormRaw?.excludeOrgSids?.info && (
                          <TooltipHost content={accessPolicyFormRaw?.excludeOrgSids?.info} id="excludeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="excludeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          // selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onChange={onExcludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: 'excludeOrgsId',
                          }}
                          selectedItems={organizationTags.filter((items) =>
                            accessPolicyForm.excludeOrgSids.some((f) => f === items.key)
                          )}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              <Row>
                <Column lg="12">
                  <Button
                    id="__CreateGroupPanelId"
                    variant="primary"
                    disabled={loadingPolicies}
                    onClick={() => {
                      const commonVariables = {
                        name: accessPolicyForm.name,
                        tmpl: accessPolicyForm.tmpl,
                        tmplUseAsIs: accessPolicyForm.tmplUseAsIs,
                        policySids: accessPolicyForm.policySids,
                        specializationSids: accessPolicyForm.specializationSids,
                        includeAllSubOrgs: accessPolicyForm.includeAllSubOrgs,
                        includeOrgSids: accessPolicyForm.includeOrgSids,
                        excludeOrgSids: accessPolicyForm.excludeOrgSids,
                      };

                      if (accessPolicyForm.policyGroupSid) {
                        updatePolicyGroup({
                          updateAccessPolicyGroupInput: { sid: accessPolicyForm.policyGroupSid, ...commonVariables },
                        });
                      } else {
                        createPolicyGroup({
                          createAccessPolicyGroupInput: { orgSid, ...commonVariables },
                        });
                      }
                      return null;
                    }}
                  >
                    {accessPolicyForm.policyGroupSid ? 'Update Group' : 'Save Group'}
                  </Button>
                </Column>
              </Row>
            </Spacing>
          </Column>
        </Row>
      </>
    </Panel>
  );
};

CreateGroupPanel.defaultProps = defaultProps;

export default CreateGroupPanel;
