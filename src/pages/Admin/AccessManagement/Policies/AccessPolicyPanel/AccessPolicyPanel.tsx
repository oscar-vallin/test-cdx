/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';

import { Checkbox, Label, Panel, PanelType, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { Multiselect } from 'src/components/selects/Multiselect';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Column, Row } from 'src/components/layouts';
import { LightSeparator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';
import { UIInputText } from 'src/components/inputs/InputText';
import { Collapse } from 'src/components/collapses/Collapse';
import { useQueryHandler } from 'src/hooks/useQueryHandler';

import {
  AccessPolicyForm,
  CdxWebCommandType,
  GqOperationResponse,
  UiOption,
  UiOptions,
  useAccessPolicyFormLazyQuery,
  useCreateAccessPolicyMutation,
  useFindAccessPolicyLazyQuery,
  useUpdateAccessPolicyMutation,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';
import { PaddedIcon } from 'src/components/inputs/CheckboxList/CheckboxList.styles';
import { EmptyValue } from 'src/components/inputs/InputText/InputText.styles';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  permissions: [],
};

type PermissionSubGroup = {
  label: string;
  options: UiOption[];
};

type PermissionGroup = {
  label: string;
  permissions: PermissionSubGroup[];
};

const groupPermissions = (opts: UiOptions[]): PermissionGroup[] => {
  const uiOptions = opts.find((opt) => opt.key === 'Permission');
  const permGroups: any = {};
  const getGroup = (opt: UiOption) => {
    const permString = opt.value;
    if (permString) {
      const idx = permString.indexOf('_');
      if (idx > 0) {
        const prefix = permString.substring(0, idx);
        let group = permGroups[prefix];
        if (!group) {
          group = [];
          permGroups[prefix] = group;
        }
        return group;
      }
    }
    return [];
  };

  uiOptions?.values?.forEach((opt) => {
    if (opt) {
      const permGroup = getGroup(opt);
      permGroup.push(opt);
    }
  });

  const exchangeStatus: PermissionSubGroup[] = [];
  if (permGroups.K2U && permGroups.K2U.length > 0) {
    exchangeStatus.push({ label: 'K2U Exchanges', options: permGroups.K2U });
  }
  exchangeStatus.push({ label: 'Test Exchanges', options: permGroups.TEST });
  exchangeStatus.push({ label: 'UAT Exchanges', options: permGroups.UAT });
  exchangeStatus.push({ label: 'Production Exchanges', options: permGroups.PROD });

  const accessManagement: PermissionSubGroup[] = [
    { label: 'Users', options: permGroups.USER },
    { label: 'Access Management', options: permGroups.ACCESS },
    { label: 'Organization', options: permGroups.ORG },
  ];

  const siteSettings: PermissionSubGroup[] = [
    { label: 'Password', options: permGroups.PASSWORD },
    { label: 'Color Palettes', options: permGroups.COLORPALETTE },
    { label: 'Theme', options: permGroups.THEME },
    { label: 'SSO', options: permGroups.SSOIDP },
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

const AccessPolicyPanel = ({
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
  const [policyForm, setPolicyForm] = useState<AccessPolicyForm | null>();
  const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
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
          createAccessPolicy?.errMsg ??
          createAccessPolicy?.response ??
          'Please check the highlighted fields and try again';
        Toast.error({ text: errorMsg });
      } else if (createAccessPolicy?.sid) {
        onCreatePolicy(createAccessPolicy);
        Toast.success({ text: 'Access Policy created successfully' });
        doClosePanel();
      }
    }
  }, [createdPolicy]);

  useEffect(() => {
    if (updatedPolicy && selectedPolicyId) {
      const { updateAccessPolicy } = updatedPolicy;

      if (updateAccessPolicy?.response === GqOperationResponse.Fail) {
        setPolicyForm(updateAccessPolicy);
        const errorMsg =
          updateAccessPolicy?.errMsg ??
          updateAccessPolicy?.response ??
          'Please check the highlighted fields and try again';
        Toast.error({ text: errorMsg });
      } else if (updateAccessPolicy?.sid) {
        onUpdatePolicy(updateAccessPolicy);
        Toast.success({ text: 'Access Policy updated successfully' });
        doClosePanel();
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
            ...(selectedTemplateId
              ? {
                  templatePolicySid: selectedTemplateId,
                }
              : {}),
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
          <PanelTitle id="__CreatePolicy_Panel_Title" variant="bold" size="large">
            {!selectedPolicyId ? 'New access policy' : 'Update access policy'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const renderSaveButton = () => {
    const saveCmd = policyForm?.commands?.find(
      (cmd) => cmd?.commandType === CdxWebCommandType.Create || cmd?.commandType === CdxWebCommandType.Update
    );
    if (saveCmd) {
      return (
        <Button
          id="__CreatePoliciesPanelId"
          variant="primary"
          disabled={isCreatingPolicy || isUpdatingPolicy}
          aria-label={saveCmd.label}
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
          {saveCmd.label}
        </Button>
      );
    }
  };

  const renderPermissionList = (options?: UiOption[], readOnly: boolean = true) => {
    if (readOnly) {
      const selectedOptions = options?.filter((option) => state.permissions.includes(option.value)) ?? [];
      if (selectedOptions.length > 0) {
        return selectedOptions.map((option, optIndex) => (
          <Spacing margin={{ top: 'small' }} key={`perm-${optIndex}`}>
            <Text>
              <PaddedIcon iconName="RadioBullet" />
              {option.label}
            </Text>
          </Spacing>
        ));
      } else {
        return <EmptyValue>&lt;no access&gt;</EmptyValue>;
      }
    }
    return options?.map((option, optIndex) => (
      <Spacing margin={{ top: 'small' }} key={`perm-${optIndex}`}>
        <Checkbox
          label={option.label}
          checked={state.permissions.includes(option.value)}
          disabled={readOnly}
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
    ));
  };

  const renderBody = () => {
    const permissionsReadOnly = policyForm?.permissions?.readOnly ?? true;

    return (
      <Spacing margin={{ top: 'normal' }}>
        <FormRow>
          <Column lg="6" sm="12">
            <UIInputText
              id="PolicyInput__Name"
              uiField={policyForm?.name}
              value={state.policyName}
              onChange={(event, newValue) => {
                setUnsavedChanges(true);
                setState({ ...state, policyName: newValue });
              }}
            />
          </Column>
          <Column lg="3" sm="6">
            <UIInputCheck
              id="PolicyTmpl__Check"
              uiField={policyForm?.tmpl}
              value={state.isTemplate}
              onChange={(event, isTemplate) => {
                setUnsavedChanges(true);
                setState({ ...state, isTemplate });
              }}
              alignBottom={true}
            />
          </Column>
          <Column lg="3" sm="6">
            {state.isTemplate && (
              <UIInputCheck
                id="UseAsIs__Check"
                uiField={policyForm?.tmplUseAsIs}
                value={state.usedAsIs}
                onChange={(event, usedAsIs) => {
                  setUnsavedChanges(true);
                  setState({ ...state, usedAsIs });
                }}
                alignBottom={true}
              />
            )}
          </Column>
        </FormRow>
        <FormRow>
          <Column lg="6">
            <UIInputTextReadOnly id="Organization" uiField={policyForm?.organization} />
          </Column>

          <Column lg="6">
            {policyForm?.applicableOrgTypes?.visible && state.isTemplate && (
              <>
                <UIFormLabel id="applicableOrgTypes" uiField={policyForm?.applicableOrgTypes} />

                <Multiselect
                  value={applicableOrgTypes}
                  disabled={policyForm?.applicableOrgTypes?.readOnly ?? true}
                  options={
                    policyForm?.options
                      ?.find((opt) => opt?.key === 'OrgType')
                      ?.values?.map((opt) => ({ key: opt?.value, text: opt?.label })) || []
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
                {permissions.map((group: PermissionGroup, groupIndex) => (
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

                                    {renderPermissionList(permission.options, permissionsReadOnly)}
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
      </Spacing>
    );
  };

  const renderPanelFooter = () => <div>{renderSaveButton()}</div>;

  return (
    <>
      <Panel
        id="AccessPolicyPanel"
        closeButtonAriaLabel="Close"
        type={PanelType.large}
        headerText={!selectedPolicyId ? 'New access policy' : 'Update access policy'}
        onRenderHeader={renderPanelHeader}
        onRenderFooterContent={renderPanelFooter}
        isFooterAtBottom={true}
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
                    <LightSeparator />
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

AccessPolicyPanel.defaultProps = defaultProps;

export default AccessPolicyPanel;
