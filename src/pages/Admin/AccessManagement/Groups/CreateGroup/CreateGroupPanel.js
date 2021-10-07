/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { FontIcon } from '@fluentui/react/lib/Icon';

import { Spacing } from '../../../../../components/spacings/Spacing';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';
import { StyledContainer } from './CreateGroupPanel.styles';

import {
  useAccessPolicyFormQuery,
  useCreateAccessPolicyMutation,
  useUpdateAccessPolicyMutation,
  useAccessPolicyLazyQuery,
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

const CreateGroupPanel = ({ isOpen, onDismiss, onCreatePolicy, selectedPolicyId }) => {
  const [stepWise, setStepWise] = useState(false);
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });

  // const [apiUseAccessPolicyForm, { data }] = useAccessPolicyFormQuery();
  const [createPolicy, { data: createdPolicy, loading: isCreatingPolicy }] = useCreateAccessPolicyMutation();
  const [fetchPolicy, { data: policy }] = useAccessPolicyLazyQuery();
  const [updatePolicy] = useUpdateAccessPolicyMutation();

  useEffect(() => {
    if (isOpen && selectedPolicyId) {
      fetchPolicy({
        variables: {
          orgSid,
          policySid: selectedPolicyId,
        },
      });
    }
  }, [selectedPolicyId, isOpen]);

  useEffect(() => {
    if (policy) {
      const { amPolicy } = policy;

      setState({
        ...state,
        policySid: amPolicy.id,
        policyName: amPolicy.name,
        isTemplate: amPolicy.tmpl,
        usedAsIs: amPolicy.tmplUseAsIs,
        serviceType: amPolicy.tmplServiceType,
        permissions: (amPolicy.permissions || []).map((permission) => ({
          policySid: amPolicy.id,
          effect: permission.effect,
          predicateName: permission.predicate,
          parameterVariable: permission.predVar1,
          parameterValue: permission.predParam1,
          actions: (permission.actions || []).map((action) => ({
            facet: { key: action.facet },
            service: { key: action.service },
            verb: { key: action.verb },
            permissionSid: permission.id,
          })),
        })),
      });
    }
  }, [policy]);

  useEffect(() => {
    if (createdPolicy) {
      onCreatePolicy(createdPolicy.createAccessPolicy);
      onDismiss();
    }
  }, [createdPolicy]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Policy Group' : 'Update policy'}
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

              <div>
                <Row>
                  <Spacing margin={{ top: 'normal' }}>
                    <Text variant="bold">Organization</Text>
                  </Spacing>

                  <Spacing margin={{ top: 'small' }}>
                    <Text variant="normal">Third Party Admin B (TPAB)</Text>
                  </Spacing>
                  <Column lg="6">
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Template Policy" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>
                  </Column>
                  <Column lg="6">
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Us as is?" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>
                  </Column>
                </Row>
              </div>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>
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
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange Prod  Read" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange K2U Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange Test Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange UAT Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange Prod Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>
                  </Column>
                  <Column lg="6">
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Site Settings Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Acces Management Read" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox
                        label="Acces Management Admin"
                        onChange={(event, _stepWise) => setStepWise(_stepWise)}
                      />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="User Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>
                  </Column>
                </Row>
              </StyledContainer>
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

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
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Vendor V" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Sub Org Users Only" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox
                        label="TPAB Access Management"
                        onChange={(event, _stepWise) => setStepWise(_stepWise)}
                      />
                    </Spacing>

                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Checkbox label="Exchange UAT Admin" onChange={(event, _stepWise) => setStepWise(_stepWise)} />
                    </Spacing>
                  </Column>
                </Row>
              </StyledContainer>
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Checkbox
                  label="Policies Applies to All Sub Organizations except for those explicitly exclude"
                  onChange={(event, _stepWise) => setStepWise(_stepWise)}
                />
              </Spacing>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Row bottom>
                  <Column lg="12">
                    <InputText
                      label="Policies apply to the following Organizations"
                      placeholder="Type to Search"
                      disabled
                      value={state.policyName}
                      onChange={({ target }) => setState({ ...state, policyName: target.value })}
                    />
                  </Column>
                </Row>
              </Spacing>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Row bottom>
                  <Column lg="12">
                    <InputText
                      label="Policies do NOT apply to the following Organizations"
                      placeholder="Type to Search"
                      value={state.policyName}
                      onChange={({ target }) => setState({ ...state, policyName: target.value })}
                    />
                  </Column>
                </Row>
              </Spacing>

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
