/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect } from 'react';

import { SpinnerSize, Checkbox, Panel, PanelType, Spinner, Label, Stack } from '@fluentui/react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { Multiselect } from 'src/components/selects/Multiselect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Separator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';
import { UIInputText } from 'src/components/inputs/InputText';
import { Collapse } from 'src/components/collapses/Collapse';
import { useQueryHandler } from 'src/hooks/useQueryHandler';

import {
  useAccessPolicyFormLazyQuery,
  useCreateAccessPolicyMutation,
  useUpdateAccessPolicyMutation,
  useFindAccessPolicyLazyQuery, GqOperationResponse, AccessPolicyForm,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';

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
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [state, setState]: any = useState({ ...INITIAL_STATE });
  const [policyForm, setPolicyForm]: any = useState<AccessPolicyForm>();
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

      if (createAccessPolicy?.response === GqOperationResponse.Fail) {
        setPolicyForm(createAccessPolicy);
        const errorMsg =
          createAccessPolicy?.errMsg ?? createAccessPolicy?.response ?? 'Please check the highlighted fields and try again';
        Toast.error({ text: errorMsg });
      } else if (createdPolicy?.sid) {
        onCreatePolicy(createAccessPolicy);
        Toast.success({ text: 'Access Policy created successfully' });
        onDismiss();
      }
    }
  }, [createdPolicy]);

  useEffect(() => {
    if (updatedPolicy && selectedPolicyId) {
      const { updateAccessPolicy } = updatedPolicy;

      if (updateAccessPolicy?.response === GqOperationResponse.Fail) {
        setPolicyForm(updateAccessPolicy);
        const errorMsg =
            updateAccessPolicy?.errMsg ?? updateAccessPolicy?.response ?? 'Please check the highlighted fields and try again';
          Toast.error({ text: errorMsg });
      } else if (updateAccessPolicy?.sid) {
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
          variables: {
            orgSid,
            ...(selectedTemplateId ? {
              templatePolicySid: selectedTemplateId } : {})
          },
          errorPolicy: 'all',
        });
        setState({ ...INITIAL_STATE });
      } else {
        setPolicyForm(null);
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

  const doClosePanel = () => {
    setState({ ...INITIAL_STATE });

    // Reset the form
    setPolicyForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader>
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreatePolicy_Panel_Title" variant="bold">
            {!selectedPolicyId ? 'New access policy' : 'Update access policy'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const renderBody = () => {
    return (
      <Spacing margin={{ top: 'normal' }}>
        <FormRow>
          <Column lg="6" sm="12">
            <UIInputText id="PolicyInput__Name"
                         uiStringField={policyForm?.name}
                         value={state.policyName}
                         onChange={(event, newValue) => {
                           setUnsavedChanges(true);
                           setState({ ...state, policyName: newValue });
                         }}/>

          </Column>
          <Column lg="3" sm="6">
            <UIInputCheck id="PolicyTmpl__Check"
                          uiField={policyForm?.tmpl}
                          value={state.isTemplate}
                          onChange={(event, isTemplate) => {
                            setUnsavedChanges(true);
                            setState({ ...state, isTemplate });
                          }}/>
          </Column>
          <Column lg="3" sm="6">
            {state.isTemplate && (
              <UIInputCheck id="UseAsIs__Check"
                            uiField={policyForm?.tmplUseAsIs}
                            value={state.usedAsIs}
                            onChange={(event, usedAsIs) => {
                              setUnsavedChanges(true);
                              setState({ ...state, usedAsIs });
                            }}/>
            )}
          </Column>
        </FormRow>
        <FormRow>
          <Column lg="6">
            <UIInputTextReadOnly id='Organization' uiField={policyForm?.organization}/>
          </Column>

          <Column lg="6">
            {policyForm?.applicableOrgTypes?.visible && state.isTemplate && (
              <>
                <UIFormLabel id='applicableOrgTypes' uiField={policyForm?.applicableOrgTypes}/>

                <Multiselect
                  value={applicableOrgTypes}
                  options={
                    policyForm.options
                      ?.find((opt) => opt.key === 'OrgType')
                      ?.values.map(({ label, value }) => ({ key: value, text: label })) || []
                  }
                  onChange={(evt, item) => {
                    setUnsavedChanges(true);

                    const opts = item.selected
                      ? [...applicableOrgTypes, item.key as string]
                      : applicableOrgTypes.filter((key) => key !== item.key);

                    setApplicableOrgTypes(opts);
                  }}
                />
              </>
            )}
          </Column>
        </FormRow>

        {policyForm?.permissions?.visible && (
          <>
            <FormRow>
              <Column lg="12">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Permissions</Text>
                </Spacing>
              </Column>
            </FormRow>

            <FormRow>
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
                                          onChange={(event, checked) => {
                                            setUnsavedChanges(true);

                                            setState({
                                              ...state,
                                              permissions: checked
                                                ? [...state.permissions, option.value]
                                                : state.permissions.filter((value) => value !== option.value),
                                            });
                                          }}
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
            </FormRow>
          </>
        )}

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <FormRow>
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
                    errorPolicy: 'all',
                  });
                } else {
                  updatePolicy({
                    variables: {
                      updateAccessPolicyInput: {
                        policySid: selectedPolicyId,
                        ...params,
                      },
                    },
                    errorPolicy: 'all',
                  });
                }

                return null;
              }}
            >
              {!selectedPolicyId ? 'Create' : 'Update'} policy
            </Button>
          </Column>
        </FormRow>
      </Spacing>
    );
  };

  return (
    <>
      <Panel
        id="CreatePoliciesPanel"
        closeButtonAriaLabel="Close"
        type={PanelType.large}
        headerText={!selectedPolicyId ? 'New access policy' : 'Update access policy'}
        onRenderHeader={renderPanelHeader}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
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
                renderBody()
              )}
            </Column>
          </Row>
        </>
      </Panel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about lose all changes made to this Access Policy. Are you sure you want to continue?"
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

CreatePoliciesPanel.defaultProps = defaultProps;

export default CreatePoliciesPanel;
