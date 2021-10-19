/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import {
  IconButton,
  MessageBar,
  Label,
  ComboBox,
  Checkbox,
  Panel,
  PanelType,
  DetailsList,
  SelectionMode,
} from 'office-ui-fabric-react';
import _ from 'lodash';

import { Spacing } from '../../../../../components/spacings/Spacing';
import { Card } from '../../../../../components/cards';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';
import { Collapse } from '../../../../../components/collapses/Collapse';
import { useQueryHandler } from '../../../../../hooks/useQueryHandler';
import { StyledCommandButton, StyledColumn } from './CreatePoliciesPanel.styles';

import {
  useAccessPolicyFormQuery,
  useCreateAccessPolicyMutation,
  useUpdateAccessPolicyMutation,
  useAccessPolicyLazyQuery,
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';
import { TagPicker } from '../../../../../components/pickers/TagPicker';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  permissions: [],
};

const groupPermissions = ([permissions, ...opts]) => {
  const { values } = permissions;
  const { K2U, COLORPALETTE, ACCESS, ORG, PASSWORD, PROD, SSOIDP, TEST, THEME, UAT, USER } = _.groupBy(
    values,
    (item) => {
      return item.value.split('_').shift();
    }
  );

  const exchangeStatus = [
    { label: 'ASD', options: K2U },
    { label: 'ASD', options: TEST },
    { label: 'ASD', options: UAT },
    { label: 'ASD', options: PROD },
  ];

  const accessManagement = [
    { label: 'ASD', options: USER },
    { label: 'ASD', options: ACCESS },
    { label: 'ASD', options: ORG },
  ];

  const siteSettings = [
    { label: 'ASD', options: PASSWORD },
    { label: 'ASD', options: COLORPALETTE },
    { label: 'ASD', options: THEME },
    { label: 'ASD', options: SSOIDP },
  ];

  return [
    { label: 'Exchange Status', permissions: exchangeStatus },
    { label: 'Access Management', permissions: accessManagement },
    { label: 'Site Settings', permissions: siteSettings },
  ];
};

const CreatePoliciesPanel = ({ isOpen, onDismiss, onCreatePolicy, selectedPolicyId }) => {
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });

  const [apiUseAccessPolicyForm, { data }] = useAccessPolicyFormQuery();
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

  // useEffect(() => {
  //   if (policy) {
  //     const { amPolicy } = policy;

  //     setState({
  //       ...state,
  //       policySid: amPolicy.id,
  //       policyName: amPolicy.name,
  //       isTemplate: amPolicy.tmpl,
  //       usedAsIs: amPolicy.tmplUseAsIs,
  //     });
  //   }
  // }, [policy]);

  useEffect(() => {
    if (createdPolicy) {
      onCreatePolicy(createdPolicy.createAccessPolicy);
      onDismiss();
    }
  }, [createdPolicy]);

  useEffect(() => {
    if (isOpen) {
      fetchPolicyForm({ variables: { orgSid } });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && form) {
      setPolicyForm(form.accessPolicyForm);
      setPermissions(groupPermissions(form.accessPolicyForm.options));
    }
  }, [form, isOpen]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Policy' : 'Update Access Policy'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });
        // setOptions({ ...INITIAL_OPTIONS });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="6">
                  {policyForm.name?.visible && (
                    <InputText
                      label={policyForm.name?.label}
                      minLength={policyForm.name?.min}
                      maxLength={policyForm.name?.max}
                      value={state.policyName}
                      required={policyForm.name?.required}
                      onChange={({ target }) => setState({ ...state, policyName: target.value })}
                    />
                  )}
                </Column>

                <Column lg="6">
                  <Row>
                    <Column lg="4">
                      <Spacing margin={{ bottom: 'small' }}>
                        {policyForm.tmpl?.visible && (
                          <Checkbox
                            label={policyForm.tmpl?.label}
                            required={policyForm.tmpl?.required}
                            checked={state.isTemplate}
                            onChange={(event, isTemplate) => setState({ ...state, isTemplate })}
                          />
                        )}
                      </Spacing>
                    </Column>
                    {state.isTemplate && (
                      <Column lg="8">
                        <Spacing margin={{ bottom: 'small' }}>
                          {policyForm.tmplUseAsIs?.visible && (
                            <Checkbox
                              label={policyForm.tmplUseAsIs?.label}
                              required={policyForm.tmplUseAsIs?.required}
                              checked={state.usedAsIs}
                              onChange={(event, usedAsIs) => setState({ ...state, usedAsIs })}
                            />
                          )}
                        </Spacing>
                      </Column>
                    )}
                  </Row>
                </Column>
              </Row>

              {policyForm.organization?.visible && (
                <Spacing margin={{ top: 'normal' }}>
                  <Label>Organization</Label>
                  <p>{policyForm.organization?.label}</p>
                </Spacing>
              )}

              {policyForm.permissions?.visible && (
                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row>
                    <Column lg="12">
                      <Spacing margin={{ top: 'small' }}>
                        <Text variant="bold">Permissions</Text>
                      </Spacing>
                    </Column>
                  </Row>

                  <Row>
                    <Column lg="12">
                      {permissions.map((group) => (
                        <Collapse label={group.label} expanded>
                          <Spacing padding={{ top: 'normal', bottom: 'normal' }}>
                            <Row>
                              <Column lg="12">
                                <Card elevation="none" spacing="none">
                                  <Row top>
                                    {group.permissions.map((permission) => (
                                      <Column lg="3">
                                        <Card elevation="none">
                                          <Spacing margin={{ bottom: 'normal' }}>
                                            <Label>{permission.label}</Label>
                                          </Spacing>

                                          {permission.options.map((option) => (
                                            <Spacing margin={{ top: 'small' }}>
                                              <Checkbox
                                                label={option.label}
                                                checked={state.permissions.includes(option.value)}
                                                onChange={(event, checked) =>
                                                  setState({
                                                    ...state,
                                                    permissions: checked
                                                      ? [...state.permissions, option.value]
                                                      : state.permissions.filter((value) => value !== option.value),
                                                  })
                                                }
                                              />
                                            </Spacing>
                                          ))}
                                        </Card>
                                      </Column>
                                    ))}
                                  </Row>
                                </Card>
                              </Column>
                            </Row>
                          </Spacing>
                        </Collapse>
                      ))}
                    </Column>
                  </Row>
                </Spacing>
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              <Row>
                <Column lg="12">
                  <Button
                    variant="primary"
                    disabled={isCreatingPolicy}
                    onClick={() => {
                      const callback = !state.policySid ? createPolicy : updatePolicy;

                      callback({
                        variables: {
                          [!state.policySid ? 'policyInfo' : 'updateAMPolicyInput']: {
                            ...(state.policySid ? { policySid: state.policySid } : {}),
                            name: state.policyName,
                            orgOwnerId: 1,
                            permissions: state.permissions.map((permission) => ({
                              policySid: state.policySid,
                              effect: permission.effect,
                              actions: permission.actions.map((action) => ({
                                permissionSid: permission.permissionSid,
                                service: action.service.key,
                                facet: action.facet.key,
                                verb: action.verb.key,
                              })),
                              predicate: permission.predicateName,
                              predVar1: permission.parameterVariable,
                              predParam1: permission.parameterValue,
                            })),
                            tmpl: state.isTemplate,
                            tmplUseAsIs: state.usedAsIs,
                            ...(state.serviceType !== '' ? { tmplServiceType: state.serviceType } : {}),
                          },
                        },
                      });
                    }}
                  >
                    Save policy
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

export default CreatePoliciesPanel;
