/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';

import { Checkbox, Label, Panel, PanelType, Spinner, SpinnerSize, Stack } from '@fluentui/react';

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
import { InfoIcon } from 'src/components/badges/InfoIcon';
import {
  groupPermissions,
  PermissionGroup,
  PermissionGroups,
} from 'src/pages/Admin/AccessManagement/Policies/AccessPolicyPanel/PermissionGrouping';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  permissions: [],
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
  const [permissions, setPermissions] = useState<PermissionGroups>();
  const [applicableOrgTypes, setApplicableOrgTypes]: any = useState([]);

  const [fetchPolicyForm, { data: form, loading: isLoadingForm }] = useQueryHandler(useAccessPolicyFormLazyQuery);
  const [createPolicy, { data: createdPolicy, loading: isCreatingPolicy }] =
    useQueryHandler(useCreateAccessPolicyMutation);

  const [updatePolicy, { data: updatedPolicy, loading: isUpdatingPolicy }] =
    useQueryHandler(useUpdateAccessPolicyMutation);

  const [fetchPolicy, { data: policy, loading: isLoadingPolicy }] = useQueryHandler(useFindAccessPolicyLazyQuery);

  const doClosePanel = () => {
    setState({ ...INITIAL_STATE });

    // Reset the form
    setPolicyForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

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
        setPermissions(undefined);
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
        const _accessPolicyForm = form?.accessPolicyForm || {};

        setState({
          ...INITIAL_STATE,
          permissions: _accessPolicyForm?.permissions.value?.map(({ value }) => value) || [],
        });

        setApplicableOrgTypes(_accessPolicyForm?.applicableOrgTypes.value?.map(({ value }) => value) || []);
      }
    }
  }, [form, isOpen]);

  useEffect(() => {
    if (policy) {
      const _accessPolicyForm: AccessPolicyForm = policy.findAccessPolicy;

      setPolicyForm(_accessPolicyForm);
      setPermissions(groupPermissions(_accessPolicyForm?.options));
      setApplicableOrgTypes(_accessPolicyForm?.applicableOrgTypes?.value?.map(({ value }) => value));

      setState({
        sid: _accessPolicyForm?.sid,
        permissions: _accessPolicyForm?.permissions?.value?.map(({ value }) => value) || [],
        policyName: _accessPolicyForm?.name.value,
        isTemplate: _accessPolicyForm?.tmpl?.value,
        usedAsIs: _accessPolicyForm?.tmplUseAsIs?.value,
      });
    }
  }, [policy]);

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
            {!selectedPolicyId ? 'New Access Policy' : 'Update Access Policy'}
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
    return null;
  };

  const renderCheckboxLabel = (uiOption: UiOption): JSX.Element | null => {
    return (
      <>
        <span>{uiOption?.label}</span>
        <InfoIcon id={`__Perm-info-${uiOption?.value}`} tooltip={uiOption?.info} leftPad={true} />
      </>
    );
  };

  const isListOption = (option?: UiOption): boolean => {
    return option?.value?.endsWith('_LIST') ?? false;
  };

  const isReadOption = (option?: UiOption): boolean => {
    return option?.value?.endsWith('_READ') ?? false;
  };

  /**
   * Given a permission option, find its corresponding LIST permission option in the
   * given list of options
   * @param option option to find
   * @param options array of options to search
   * @return UiOption which refers to a LIST permission OR undefined if a LIST permission option was not found
   */
  const findListOption = (option?: UiOption, options?: UiOption[]): UiOption | null => {
    if (!option || !options) {
      return null;
    }
    return options.find((opt) => isListOption(opt)) ?? null;
  };

  /**
   * Given a permission option, find its corresponding READ permission option in the
   * given list of options
   * @param option option to find
   * @param options array of options to search
   * @return UiOption which refers to a READ permission OR undefined if a READ permission option was not found
   */
  const findReadOption = (option?: UiOption, options?: UiOption[]): UiOption | null => {
    if (!option || !options) {
      return null;
    }
    const perm = option.value;
    const readPerm = `${perm.substring(0, perm.lastIndexOf('_'))}_READ`;
    return options.find((opt) => opt.value === readPerm) ?? null;
  };

  /**
   * Should the given option within a list of options be disabled based on if the corresponding READ permission is checked?
   * @param option option to find
   * @param options array of options to search
   * @return true if the corresponding READ permission for the given option is unchecked,
   *         false otherwise or if the given option does not have a corresponding READ permission
   */
  const isConditionallyDisabled = (option?: UiOption, options?: UiOption[]): boolean => {
    if (isListOption(option)) {
      return false;
    }
    const listOption = findListOption(option, options);
    if (listOption && !state.permissions.includes(listOption.value)) {
      return true;
    }
    if (isReadOption(option)) {
      return false;
    }
    const readOption = findReadOption(option, options);
    if (!readOption) {
      return false;
    }
    return !state.permissions.includes(readOption.value);
  };

  const togglePermission = (option: UiOption, checked: boolean, options?: UiOption[]) => {
    setUnsavedChanges(true);

    let _permissions = checked
      ? [...state.permissions, option.value]
      : state.permissions.filter((value) => value !== option.value);

    if (!checked) {
      const permissionOptions = options?.map((opt) => opt.value);

      if (isListOption(option)) {
        // If this is a LIST permission and we unchecked, we need to uncheck all other permissions in this group
        _permissions = _permissions.filter((value) => !permissionOptions?.includes(value));
      } else if (isReadOption(option)) {
        // If this is a READ permission and we unchecked, we need to uncheck all other _CREATE, _UPDATE, etc. permissions
        const permPrefix = option.value.substring(0, option.value.lastIndexOf('_READ'));
        const readControlledOptions = permissionOptions?.filter(
          (perm) => perm.startsWith(permPrefix) && !perm.endsWith('_LIST')
        );
        _permissions = _permissions.filter((value) => !readControlledOptions?.includes(value));
      }
    }

    setState({
      ...state,
      permissions: _permissions,
    });
  };

  const renderPermissionList = (options?: UiOption[], readOnly = true) => {
    if (readOnly) {
      const selectedOptions = options?.filter((option) => state.permissions.includes(option.value)) ?? [];
      if (selectedOptions.length > 0) {
        return selectedOptions.map((option, optIndex) => (
          <Spacing margin={{ top: 'small' }} key={`perm-${optIndex}`}>
            <Text>
              <PaddedIcon iconName="RadioBullet" />
              {option.label}
            </Text>
            <InfoIcon id={`__Perm-info-${option.value}`} tooltip={option.info} leftPad={true} />
          </Spacing>
        ));
      }

      return <EmptyValue>&lt;no access&gt;</EmptyValue>;
    }
    return options?.map((option, optIndex) => (
      <Spacing margin={{ top: 'small' }} key={`perm-${optIndex}`}>
        <Checkbox
          label={option.label}
          onRenderLabel={() => renderCheckboxLabel(option)}
          checked={state.permissions.includes(option.value)}
          disabled={readOnly || isConditionallyDisabled(option, options)}
          id={option.value}
          onChange={(event, checked) => togglePermission(option, checked ?? false, options)}
        />
      </Spacing>
    ));
  };

  const renderPermissionGroup = (group?: PermissionGroup, permissionsReadOnly = true) => {
    if (!group?.subGroup?.find((sg) => sg?.options?.length > 0)) {
      return null;
    }
    return (
      <Collapse label={group.label} expanded>
        <Spacing padding={{ top: 'normal', bottom: 'normal' }}>
          <Row>
            <Column lg="12">
              <Card elevation="none" spacing="none">
                <Row top>
                  {group.subGroup
                    ?.filter((subGroup) => subGroup?.options?.length)
                    ?.map((subGroup, pIndex) => (
                      <Column lg="3" key={`${pIndex}`}>
                        <Card elevation="none">
                          {subGroup.label.length > 0 && (
                            <Spacing margin={{ bottom: 'normal' }}>
                              <Label>{subGroup.label}</Label>
                            </Spacing>
                          )}

                          {renderPermissionList(subGroup.options, permissionsReadOnly)}
                        </Card>
                      </Column>
                    ))}
                </Row>
              </Card>
            </Column>
          </Row>
        </Spacing>
      </Collapse>
    );
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
                {renderPermissionGroup(permissions?.exchange, permissionsReadOnly)}
                {renderPermissionGroup(permissions?.accessManagement, permissionsReadOnly)}
                {renderPermissionGroup(permissions?.orgAdmin, permissionsReadOnly)}
                {renderPermissionGroup(permissions?.tools, permissionsReadOnly)}
                {renderPermissionGroup(permissions?.other, permissionsReadOnly)}
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onOuterClick={() => {}}
      >
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
