/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TagPicker, ITag, IBasePickerSuggestionsProps } from '@fluentui/react/lib/Pickers';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { FontIcon } from '@fluentui/react/lib/Icon';

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
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  serviceType: '',
  permissions: [],
};

const INITIAL_OPTIONS = {
  permissionServices: [],
  predicates: [],
  templateServices: [],
};

const CreateGroupPanel = ({ isOpen, onDismiss, onCreateGroupPolicy, selectedGroupPolicyId }) => {
  const [stepWise, setStepWise] = useState(false);
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });
  const [policies, setPolicies] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [response, setResponse] = useState({});

  const [apiUseAccessPolicyForm, { data, loading: isCreatingPolicy }] = useAccessPolicyGroupFormLazyQuery();
  const [fetchPolicies, { data: policiesData }] = useAccessPoliciesForOrgLazyQuery();
  const [fetchSpecializations, { data: specializationsData }] = useAccessSpecializationsForOrgLazyQuery();
  const [fetchOrganizations, { data: orgsData, loading: loadingOrgs }] = useDirectOrganizationsLazyQuery();
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

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Policy Group' : 'Update Policy Group'}
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
                    value={state.policyName}
                    onChange={({ target }) => setState({ ...state, policyName: target.value })}
                  />
                </Column>
              </Row>

              {response?.organization?.visible && (
                <>
                  <Row>
                    <Spacing margin={{ top: 'normal' }}>
                      <Text variant="bold">Organizations</Text>
                    </Spacing>

                    <Spacing margin={{ top: 'small' }}>
                      <Text variant="normal">{response?.organization?.label}</Text>
                    </Spacing>
                    {response?.tmpl?.visible && (
                      <Column lg="6">
                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Checkbox
                            label={response?.tmpl?.label}
                            onChange={(event, _stepWise) => setStepWise(_stepWise)}
                          />
                        </Spacing>
                      </Column>
                    )}
                    {response?.tmplUseAsIs?.visible && (
                      <Column lg="6">
                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Checkbox
                            label={response?.tmplUseAsIs?.label}
                            onChange={(event, _stepWise) => setStepWise(_stepWise)}
                          />
                        </Spacing>
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
                        &nbsp; <FontIcon iconName="Error" />
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {policies.map((item) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox label={item.name} onChange={(event, _stepWise) => setStepWise(_stepWise)} />
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
                        &nbsp; <FontIcon iconName="Error" />
                      </Spacing>
                    </Column>
                  </Row>

                  <StyledContainer>
                    <Row>
                      <Column lg="6">
                        {specializations.map((item) => {
                          return (
                            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                              <Checkbox label={item.name} onChange={(event, _stepWise) => setStepWise(_stepWise)} />
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
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Checkbox
                    label={response?.includeAllSubOrgs?.label}
                    onChange={(event, _stepWise) => setStepWise(_stepWise)}
                  />
                </Spacing>
              )}

              {response?.includeOrgSids?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row bottom>
                    <Column lg="12">
                      <InputText
                        label={response?.includeOrgSids.label}
                        placeholder="Type to Search"
                        disabled
                        value={state.policyName}
                        onChange={({ target }) => setState({ ...state, policyName: target.value })}
                      />
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
                        <TagPicker
                          removeButtonAriaLabel="Remove"
                          selectionAriaLabel="Selected colors"
                          onResolveSuggestions={filterSuggestedTags}
                          getTextFromItem={getTextFromItem}
                          pickerSuggestionsProps={pickerSuggestionsProps}
                          itemLimit={4}
                          inputProps={{
                            id: 'pickerId',
                          }}
                        />
                      </div>
                    </Column>
                  </Row>
                </Spacing>
              )}

              <Row>
                <Column lg="12">
                  <Button variant="primary" disabled={isCreatingPolicy} onClick={() => console.log('saving')}>
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
