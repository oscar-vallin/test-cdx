/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';

import { SpinnerSize, Checkbox, Panel, PanelType, Spinner } from '@fluentui/react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { Multiselect } from 'src/components/selects/Multiselect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Separator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';
import { InputText } from 'src/components/inputs/InputText';
import { Collapse } from 'src/components/collapses/Collapse';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Label } from 'src/components/labels/Label';

import {
  useAccessPolicyFormLazyQuery,
  useCreateAccessPolicyMutation,
  useUpdateAccessPolicyMutation,
  useFindAccessPolicyLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  permissions: [],
};

const groupPermissions: any = (opts) => {
  const { values } = opts.find((opt) => opt.key === 'Permission');
  const { K2U, COLORPALETTE, ACCESS, ORG, PASSWORD, PROD, SSOIDP, TEST, THEME, UAT, USER } = _.groupBy(
    values,
    (item) => {
      return item.value.split('_').shift();
    }
  );

  const exchangeStatus = [
    { label: 'K2U Exchanges', options: K2U },
    { label: 'Test Exchanges', options: TEST },
    { label: 'UAT Exchanges', options: UAT },
    { label: 'Production Exchanges', options: PROD },
  ];

  const accessManagement = [
    { label: 'Users', options: USER },
    { label: 'Access Management', options: ACCESS },
    { label: 'Organization', options: ORG },
  ];

  const siteSettings = [
    { label: 'Password', options: PASSWORD },
    { label: 'Color Palettes', options: COLORPALETTE },
    { label: 'Theme', options: THEME },
    { label: 'SSO', options: SSOIDP },
  ];

  return [
    { label: 'Exchange Status', permissions: exchangeStatus },
    { label: 'Access Management', permissions: accessManagement },
    { label: 'Site Settings', permissions: siteSettings },
  ];
};

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreatePolicy: () => null,
};

type CreatePoliciesPanelProps = {
  isOpen?: boolean;
  onDismiss?: any | null;
  onCreatePolicy?: any | null;
  onUpdatePolicy?: any | null;
  selectedPolicyId?: any;
  selectedTemplateId?: any;
} & typeof defaultProps;

const CreatePoliciesPanel = ({
  isOpen,
  onDismiss,
  onCreatePolicy = () => null,
  onUpdatePolicy = () => null,
  selectedPolicyId,
  selectedTemplateId,
}: CreatePoliciesPanelProps): ReactElement => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [state, setState]: any = useState({ ...INITIAL_STATE });
  const [policyForm, setPolicyForm]: any = useState({});
  const [permissions, setPermissions] = useState([]);
  const [applicableOrgTypes, setApplicableOrgTypes]: any = useState([]);

  const [fetchPolicyForm, { data: form, loading: isLoadingForm }] = useQueryHandler(useAccessPolicyFormLazyQuery);
  const [createPolicy, { data: createdPolicy, loading: isCreatingPolicy }] =
    useQueryHandler(useCreateAccessPolicyMutation);

  const [updatePolicy, { data: updatedPolicy, loading: isUpdatingPolicy }] =
    useQueryHandler(useUpdateAccessPolicyMutation);

  const [fetchPolicy, { data: policy, loading: isLoadingPolicy }] = useQueryHandler(useFindAccessPolicyLazyQuery);

  useEffect(() => {
    if (isOpen && selectedPolicyId > 0) {
      fetchPolicy({
        variables: {
          policySid: selectedPolicyId,
        },
      });
    }
  }, [selectedPolicyId, isOpen]);

  useEffect(() => {
    if (createdPolicy) {
      const { createAccessPolicy } = createdPolicy;

      if (createAccessPolicy.response === 'FAIL') {
        Toast.error({ text: 'Please check the highlighted fields and try again' });
      } else {
        onCreatePolicy(createAccessPolicy);
        Toast.success({ text: 'Access Policy created successfully' });
        onDismiss();
      }
    }
  }, [createdPolicy]);

  useEffect(() => {
    if (updatedPolicy && selectedPolicyId) {
      const { updateAccessPolicy } = updatedPolicy;

      if (updateAccessPolicy?.response && updateAccessPolicy?.response === 'FAIL') {
        Toast.error({ text: 'Please check the highlighted fields and try again' });
      } else {
        onUpdatePolicy(updateAccessPolicy);
        Toast.success({ text: 'Access Policy updated successfully' });
        onDismiss();
      }
    }
  }, [updatedPolicy]);

  useEffect(() => {
    if (isOpen) {
      if (!selectedPolicyId || selectedTemplateId) {
        setApplicableOrgTypes([]);
        setPermissions([]);
        fetchPolicyForm({
          variables: { orgSid, ...(selectedTemplateId ? { templatePolicySid: selectedTemplateId } : {}) },
        });
        setState({ ...INITIAL_STATE });
      } else {
        setPolicyForm({});
      }
    }
  }, [isOpen, selectedPolicyId, selectedTemplateId]);

  useEffect(() => {
    if (isOpen && form) {
      setPolicyForm(form.accessPolicyForm);
      setPermissions(groupPermissions(form.accessPolicyForm.options));

      if (selectedTemplateId) {
        const { applicableOrgTypes, permissions } = form?.accessPolicyForm || {};

        setState({
          ...INITIAL_STATE,
          permissions: permissions.value?.map(({ value }) => value) || [],
        });

        setApplicableOrgTypes(applicableOrgTypes.value?.map(({ value }) => value) || []);
      }
    }
  }, [form, isOpen]);

  useEffect(() => {
    if (policy) {
      const { name, applicableOrgTypes, permissions, sid, tmpl, tmplUseAsIs, options } = policy.findAccessPolicy;

      setPolicyForm(policy.findAccessPolicy);
      setPermissions(groupPermissions(options));
      setApplicableOrgTypes(applicableOrgTypes.value.map(({ value }) => value));

      setState({
        sid,
        permissions: permissions.value?.map(({ value }) => value) || [],
        policyName: name.value,
        isTemplate: tmpl.value,
        usedAsIs: tmplUseAsIs.value,
      });
    }
  }, [policy]);

  return (
    <Panel
      id="CreatePoliciesPanel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!selectedPolicyId ? 'New access policy' : 'Update access policy'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            {isLoadingForm || isLoadingPolicy ? (
              <>
                <Spacing margin={{ top: 'normal', bottom: 'double' }}>
                  <Separator />
                </Spacing>

                <Spacing>
                  <Spinner size={SpinnerSize.large} label="Loading policy form" />
                </Spacing>
              </>
            ) : (
              <Spacing margin={{ top: 'normal' }}>
                <Row bottom>
                  <Column lg="6" sm="12">
                    {policyForm.name?.visible && (
                      <InputText
                        id="PolicyInput__Name"
                        label={policyForm.name?.label}
                        minLength={policyForm.name?.min}
                        maxLength={policyForm.name?.max}
                        value={state.policyName}
                        required={policyForm.name?.required}
                        onChange={(event, newValue) => setState({ ...state, policyName: newValue })}
                        errorMessage={createdPolicy?.createAccessPolicy?.response === 'FAIL' ? 'Required field' : ''}
                      />
                    )}
                  </Column>

                  <Column lg="6" sm="12">
                    <Row>
                      <Column lg="6">
                        <Spacing margin={{ bottom: 'small' }}>
                          {policyForm.tmpl?.visible && (
                            <Checkbox
                              label={policyForm.tmpl?.label}
                              // required={policyForm.tmpl?.required}
                              checked={state.isTemplate}
                              onChange={(event, isTemplate) => setState({ ...state, isTemplate })}
                            />
                          )}
                        </Spacing>
                      </Column>
                      {state.isTemplate && (
                        <Column lg="6">
                          <Spacing margin={{ bottom: 'small' }}>
                            {policyForm.tmplUseAsIs?.visible && (
                              <Checkbox
                                label={policyForm.tmplUseAsIs?.label}
                                // required={policyForm.tmplUseAsIs?.required}
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

                <Spacing margin={{ top: 'normal' }}>
                  <Row>
                    <Column lg="6">
                      <Label>Organization</Label>
                      <p>{policyForm.organization?.label}</p>
                    </Column>

                    {policyForm.applicableOrgTypes?.visible && state.isTemplate && (
                      <Column lg="6">
                        <Label text={policyForm.applicableOrgTypes?.label} info={policyForm.applicableOrgTypes?.info} />

                        <Multiselect
                          value={applicableOrgTypes}
                          options={
                            policyForm.options
                              ?.find((opt) => opt.key === 'OrgType')
                              ?.values.map(({ label, value }) => ({ key: value, text: label })) || []
                          }
                          onChange={(evt, item) => {
                            const opts = item.selected
                              ? [...applicableOrgTypes, item.key as string]
                              : applicableOrgTypes.filter((key) => key !== item.key);

                            setApplicableOrgTypes(opts);
                          }}
                        />
                      </Column>
                    )}
                  </Row>
                </Spacing>

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
                        {permissions.map((group: any, groupIndex) => (
                          <Collapse label={group.label} expanded key={groupIndex}>
                            <Spacing padding={{ top: 'normal', bottom: 'normal' }}>
                              <Row>
                                <Column lg="12">
                                  <Card elevation="none" spacing="none">
                                    <Row top>
                                      {group.permissions?.map((permission, pIndex) => (
                                        <Column lg="3" key={`${groupIndex}-${pIndex}`}>
                                          <Card elevation="none">
                                            <Spacing margin={{ bottom: 'normal' }}>
                                              <Label>{permission.label}</Label>
                                            </Spacing>

                                            {permission.options?.map((option, optIndex) => (
                                              <Spacing
                                                margin={{ top: 'small' }}
                                                key={`${groupIndex}-${pIndex}-${optIndex}`}
                                              >
                                                <Checkbox
                                                  label={option.label}
                                                  checked={state.permissions.includes(option.value)}
                                                  id={option.value}
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
                      id="__CreatePoliciesPanelId"
                      variant="primary"
                      disabled={isCreatingPolicy || isUpdatingPolicy}
                      onClick={() => {
                        const params = {
                          name: state.policyName,
                          permissions: state.permissions,
                          tmpl: state.isTemplate,
                          tmplUseAsIs: state.usedAsIs,
                          applicableOrgTypes: state.isTemplate ? applicableOrgTypes : [],
                        };

                        if (!selectedPolicyId) {
                          createPolicy({
                            variables: {
                              createAccessPolicyInput: {
                                orgSid,
                                ...params,
                              },
                            },
                          });
                        } else {
                          updatePolicy({
                            variables: {
                              updateAccessPolicyInput: {
                                policySid: selectedPolicyId,
                                ...params,
                              },
                            },
                          });
                        }

                        return null;
                      }}
                    >
                      {!selectedPolicyId ? 'Create' : 'Update'} policy
                    </Button>
                  </Column>
                </Row>
              </Spacing>
            )}
          </Column>
        </Row>
      </>
    </Panel>
  );
};

CreatePoliciesPanel.defaultProps = defaultProps;

export default CreatePoliciesPanel;
