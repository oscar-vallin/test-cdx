/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TagPicker } from '@fluentui/react/lib/Pickers';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';

import { Spacing } from '../../../../../components/spacings/Spacing';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';
import { StyledContainer } from './CreateGroupPanel.styles';

import {
  useAccessPolicyGroupFormLazyQuery,
  useAccessSpecializationsForOrgLazyQuery,
  useAccessPoliciesForOrgLazyQuery,
  useDirectOrganizationsLazyQuery,
  useCreateAccessPolicyGroupMutation,
  useFindAccessPolicyGroupLazyQuery,
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';

const INITIAL_STATE = {
  name: '',
  tmpl: false,
  tmplUseAsIs: false,
  includeAllSubOrgs: false,
  policySids: [],
  specializationSids: [],
  includeOrgSids: [],
  excludeOrgSids: [],
};

const INITIAL_OPTIONS = {
  permissionServices: [],
  predicates: [],
  templateServices: [],
};

const CreateGroupPanel = ({ isOpen, onDismiss, onCreateGroupPolicy, selectedGroupId }) => {
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });
  const [policies, setPolicies] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [response, setResponse] = useState({});

  const [apiUseAccessPolicyForm, { data, loading: isLoadingPolicy }] = useAccessPolicyGroupFormLazyQuery();
  const [fetchPolicies, { data: policiesData }] = useAccessPoliciesForOrgLazyQuery();
  const [fetchSpecializations, { data: specializationsData }] = useAccessSpecializationsForOrgLazyQuery();
  const [fetchOrganizations, { data: orgsData, loading: loadingOrgs }] = useDirectOrganizationsLazyQuery();
  const [createPolicyGroup, { data: createdPolicyGroup, loading: isCreatingPolicyGroup }] =
    useCreateAccessPolicyGroupMutation();
  const [fetchPolicyGroup, { data: policyGroup }] = useFindAccessPolicyGroupLazyQuery();

  useEffect(() => {
    if (isOpen) {
      apiUseAccessPolicyForm({ variables: { orgSid } });
      fetchPolicies({ variables: { orgSid } });
      fetchSpecializations({ variables: { orgSid } });
      fetchOrganizations({
        variables: {
          orgSid,
          orgFilter: { activeFilter: 'ACTIVE' },
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedGroupId) {
      fetchPolicyGroup({
        variables: {
          policyGroupSid: selectedGroupId,
        },
      });
    }
  }, [selectedGroupId, isOpen]);

  useEffect(() => {
    if (policyGroup) {
      const { findAccessPolicyGroup } = policyGroup;
      setResponse(findAccessPolicyGroup);
      setState({
        ...state,
        policyGroupSid: findAccessPolicyGroup.sid,
        name: findAccessPolicyGroup.name.value,
        tmpl: findAccessPolicyGroup.tmpl.value,
        tmplUseAsIs: findAccessPolicyGroup.tmplUseAsIs.value,
        includeAllSubOrgs: findAccessPolicyGroup.includeAllSubOrgs.value,
        policySids: findAccessPolicyGroup.policies.value,
        specializationSids: findAccessPolicyGroup.specializations.value,
        includeOrgSids: findAccessPolicyGroup.includeOrgSids.value,
        excludeOrgSids: findAccessPolicyGroup.excludeOrgSids.value,
      });
    }
  }, [policyGroup]);

  useEffect(() => {
    if (isOpen && data) {
      setResponse(data.accessPolicyGroupForm);
    }
  }, [data, isOpen]);

  useEffect(() => {
    if (isOpen && policiesData) {
      setPolicies(policiesData.accessPoliciesForOrg.nodes);
    }
  }, [isOpen, policiesData]);

  useEffect(() => {
    if (isOpen && specializationsData) {
      setSpecializations(specializationsData.accessSpecializationsForOrg.nodes);
    }
  }, [isOpen, specializationsData]);

  useEffect(() => {
    if (isOpen && orgsData) {
      setOrganizations(orgsData.directOrganizations.nodes);
    }
  }, [isOpen, orgsData]);

  useEffect(() => {
    console.log('createdPolicyGroup');
    console.log(createdPolicyGroup);
    if (createdPolicyGroup) {
      // onCreateGroupPolicy(createdPolicyGroup.createAccessPolicyGroup);
      onDismiss();
    }
  }, [createdPolicyGroup]);

  const rootClass = mergeStyles({
    width: '100%',
  });

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested Organizations',
    noResultsFoundText: 'No organization tags found',
  };
  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const organizationTags = organizations.map((item) => ({ key: item.sid, name: item.name }));

  const filterSuggestedTags = (filterText, tagList) => {
    return filterText
      ? organizationTags.filter(
          (tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList)
        )
      : [];
  };

  const getTextFromItem = (item) => item.name;

  const onIncludedOrgsSelected = (item) => {
    setState({ ...state, includeOrgSids: item.map((org) => org.key) });
  };

  const onExcludedOrgsSelected = (item) => {
    setState({ ...state, excludeOrgSids: item.map((org) => org.key) });
  };

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policyGroupSid ? 'New Access Policy Group' : 'Update Policy Group'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });
        setOptions({ ...INITIAL_OPTIONS });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    required
                    label="Name"
                    placeholder="Please enter a Unifique Name"
                    value={state.name}
                    onChange={({ target }) => setState({ ...state, name: target.value })}
                  />
                </Column>
              </Row>

              {response?.organization?.visible && (
                <>
                  <Row>
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="bold">Organizations</Text>
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Text variant="normal">{response?.organization?.label}</Text>
                    </Spacing>

                    {response?.tmpl?.visible && (
                      <Column lg="6" direction="row">
                        <Checkbox
                          label={response?.tmpl?.label}
                          onChange={(_event, tmpl) =>
                            setState({ ...state, tmpl, tmplUseAsIs: tmpl ? state.tmplUseAsIs : false })
                          }
                        />
                        {response?.tmpl?.info && (
                          <TooltipHost content={response?.tmpl?.info} id="tmplTooltip">
                            &nbsp; <FontIcon aria-describedby="tmplTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Column>
                    )}
                    {state.tmpl && response?.tmplUseAsIs?.visible && (
                      <Column lg="6" direction="row">
                        <Checkbox
                          label={response?.tmplUseAsIs?.label}
                          onChange={(event, tmplUseAsIs) => setState({ ...state, tmplUseAsIs })}
                        />
                        {response?.tmplUseAsIs?.info && (
                          <TooltipHost content={response?.tmplUseAsIs?.info} id="tmplUseAsIsTooltip">
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

              {response?.policies?.visible && (
                <>
                  <Row>
                    <Column lg="4" direction="row">
                      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
                        <Text variant="bold">Policies</Text>
                        {response?.policies?.info && (
                          <TooltipHost content={response?.policies?.info} id="policiesTooltip">
                            &nbsp; <FontIcon aria-describedby="policiesTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {policies.map((item) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox
                                label={item.name}
                                onChange={(event, policy) => {
                                  setState({
                                    ...state,
                                    policySids: policy
                                      ? [...state.policySids, item.sid]
                                      : state.policySids.filter((polItem) => polItem !== item.sid),
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

              {response?.specializations?.visible && (
                <>
                  <Row>
                    <Column lg="4" direction="row">
                      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
                        <Text variant="bold">Specialization</Text>
                        {response?.specializations?.info && (
                          <TooltipHost content={response?.specializations?.info} id="specializationTooltip">
                            &nbsp; <FontIcon aria-describedby="specializationTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {specializations.map((item) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox
                                label={item.name}
                                onChange={(event, specialization) => {
                                  setState({
                                    ...state,
                                    specializationSids: specialization
                                      ? [...state.specializationSids, item.sid]
                                      : state.specializationSids.filter((specItem) => specItem !== item.sid),
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

              {response?.includeAllSubOrgs?.visible && (
                <Column lg="6" direction="row">
                  <Checkbox
                    label={response?.includeAllSubOrgs?.label}
                    onChange={(event, includeAllSubOrgs) => setState({ ...state, includeAllSubOrgs })}
                  />{' '}
                  {response?.includeAllSubOrgs?.info && (
                    <TooltipHost content={response?.includeAllSubOrgs?.info} id="includeAllSubOrgsTooltip">
                      &nbsp; <FontIcon aria-describedby="includeAllSubOrgsTooltip" iconName="Error" />
                    </TooltipHost>
                  )}
                </Column>
              )}

              {response?.includeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{response?.includeOrgSids.label}</strong>
                        {response?.includeOrgSids?.info && (
                          <TooltipHost content={response?.includeOrgSids?.info} id="includeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="includeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onChange={onIncludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: 'includeOrgsId',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              {response?.excludeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <div className={rootClass}>
                        <strong>{response?.excludeOrgSids?.label}</strong>
                        {response?.excludeOrgSids?.info && (
                          <TooltipHost content={response?.excludeOrgSids?.info} id="excludeOrgSidsTooltip">
                            &nbsp; <FontIcon aria-describedby="excludeOrgSidsTooltip" iconName="Error" />
                          </TooltipHost>
                        )}
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          selectionAriaLabel="Selected Orgs"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          onChange={onExcludedOrgsSelected}
                          itemLimit={4}
                          inputProps={{
                            id: 'excludeOrgsId',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              <Row>
                <Column lg="12">
                  <Button
                    variant="primary"
                    disabled={isLoadingPolicy}
                    onClick={() => {
                      createPolicyGroup({
                        variables: {
                          createAccessPolicyInput: {
                            name: state.name,
                            tmpl: state.tmpl,
                            tmplUseAsIs: state.tmplUseAsIs,
                            organizationSid: '1',
                            policySids: state.policySids,
                            specializationSids: state.specializationSids,
                            includeAllSubOrgs: state.includeAllSubOrgs,
                            includeOrgSids: state.includeOrgSids,
                            excludeOrgSids: state.excludeOrgSids,
                          },
                        },
                      });
                    }}
                  >
                    Save
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

export default CreateGroupPanel;
