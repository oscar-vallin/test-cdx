/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import { ActionButton } from '@fluentui/react';
import { Button } from 'src/components/buttons';
import { useNotification } from 'src/hooks/useNotification';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { LightSeparator } from 'src/components/separators/Separator';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import {
  CdxWebCommandType,
  GqOperationResponse,
  OrgSecurityForm,
  UiStringField,
  UpdateOrgSecurityInput,
  useOrgSecurityFormLazyQuery,
  useUpdateOrgSecurityMutation,
  WebCommand,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_SECURITY_SETTINGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { UIInputToggle } from 'src/components/inputs/InputToggle';
import { FieldRow, FormRow } from 'src/components/layouts/Row/Row.styles';
import { FormLabel } from 'src/components/labels/FormLabel';
import { UIInputText } from 'src/components/inputs/InputText';
import { Text } from 'src/components/typography/Text';
import { DEFAULT_FORM, extractFormValues } from './OrganizationSecuritySettingsPageUtils';

const _OrganizationSecuritySettingsPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [fetchPageForm, { data, loading: isLoadingForm, error: formError }] = useOrgSecurityFormLazyQuery();
  const [callUpdateOrgSecurity, { data: dataUpdateOrgSecurity, loading: isUpdating, error: updateError }] =
    useUpdateOrgSecurityMutation();

  const [state, setState] = useState<UpdateOrgSecurityInput>({ ...DEFAULT_FORM });
  const [form, setForm] = useState<OrgSecurityForm | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand>();
  const [whitelistFields, setWhiteListFields] = useState<UiStringField[]>([]);

  const handleError = ErrorHandler();

  const updateForm = (orgSecurityForm?: OrgSecurityForm) => {
    if (orgSecurityForm) {
      const whitelistValues: string[] = [];
      const _whitelistFields: UiStringField[] = [];
      orgSecurityForm.whitelist?.forEach((whitelistForm) => {
        if (whitelistForm?.pattern) {
          _whitelistFields.push(whitelistForm.pattern);
          whitelistValues.push(whitelistForm.pattern?.value ?? '');
        }
      });
      setWhiteListFields(_whitelistFields);

      setForm(orgSecurityForm);
      setState({
        ...state,
        ...extractFormValues(DEFAULT_FORM, orgSecurityForm),
        whitelist: whitelistValues,
      });
      setUpdateCmd(orgSecurityForm.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Update));
    } else {
      setWhiteListFields([]);
      setState({ ...DEFAULT_FORM });
    }
  };

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!isLoadingForm && data?.orgSecurityForm) {
      updateForm(data.orgSecurityForm);
    }
  }, [data, isLoadingForm]);

  useEffect(() => {
    if (!isUpdating && dataUpdateOrgSecurity?.updateOrgSecurity) {
      const orgSecurityForm = dataUpdateOrgSecurity.updateOrgSecurity;
      updateForm(orgSecurityForm);
      if (orgSecurityForm?.response === GqOperationResponse.Success) {
        Toast.success({ text: 'Organization security settings saved' });
      } else {
        Toast.error({ text: orgSecurityForm?.errMsg ?? 'An error occurred saving' });
      }
    }
  }, [dataUpdateOrgSecurity, isUpdating]);

  useEffect(() => {
    handleError(formError);
  }, [formError]);

  useEffect(() => {
    handleError(updateError);
  }, [updateError]);

  const doSave = () => {
    // Remove any blank values
    const whitelist = state.whitelist?.filter((o) => o?.trim().length > 0);
    state.whitelist = whitelist;
    callUpdateOrgSecurity({
      variables: {
        orgSecurityInfo: {
          ...state,
          orgSid,
          whitelist,
        },
      },
    }).catch(() => {
      Toast.error({
        text: 'An error occurred while updating the security settings. Please, try again.',
      });
    });
  };

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_SECURITY_SETTINGS.API_ID}>
      <PageHeader id="__OrganizationSecuritySettingsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Organization Security Settings" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Container>
        <FormRow>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <LightSeparator />
            </Spacing>
          </Column>
        </FormRow>
        <FormRow>
          <Column lg="6">
            {form && (
              <>
                <UIInputToggle
                  id="forgotPasswordEnabledToggle"
                  uiField={form.forgotPasswordEnabled}
                  onText="On"
                  offText="Off"
                  role="checkbox"
                  value={state.forgotPasswordEnabled ?? false}
                  onChange={(e?: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                    setState({ ...state, forgotPasswordEnabled: !!checked });
                  }}
                />
                <FormRow>
                  <UIInputTextArea
                    id="forgotPasswordMsgInput"
                    uiField={form.forgotPasswordMsg}
                    value={state.forgotPasswordMsg ?? ''}
                    multiline={true}
                    onChange={(ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                      setState({ ...state, forgotPasswordMsg: newValue });
                    }}
                    resizable={false}
                    rows={10}
                    showRichTextEditor
                  />
                </FormRow>
                <FormRow>
                  <UIInputTextArea
                    id="allowedEmailDomains"
                    uiField={form.allowedEmailDomains}
                    value={state.allowedEmailDomains ?? ''}
                    multiline={true}
                    onChange={(ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                      setState({ ...state, allowedEmailDomains: newValue ?? '' });
                    }}
                    resizable={false}
                    rows={8}
                  />
                </FormRow>
                <FormRow>
                  <Text variant="extraBold">Dashboard IP Whitelist</Text>
                  {/*Need to use FormLabel as opposed to UIFormLabel to force the required flag not to show*/}
                  <FormLabel
                    id="__WhiteList_lbl"
                    label={whitelistFields[0]?.label ?? ''}
                    required={false}
                    info={whitelistFields[0]?.info ?? undefined}
                    errorMessage={whitelistFields[0]?.errMsg ?? undefined}
                  />
                  {whitelistFields.map((field, index) => (
                    <FieldRow key={`__Whitelist_IP_${index}`}>
                      <UIInputText
                        id={`__Whitelist_IP_${index}`}
                        uiField={field}
                        value={state?.whitelist ? state?.whitelist[index] : ''}
                        onChange={(event, newValue) => {
                          const clone: string[] = Object.assign([], state?.whitelist ?? []);
                          clone[index] = newValue ?? '';
                          setState({ ...state, whitelist: clone });
                        }}
                        renderLabel={false}
                      />
                    </FieldRow>
                  ))}
                  {!whitelistFields[0]?.readOnly && whitelistFields[0]?.visible && (
                    <ActionButton
                      id="__Add_Whitelist"
                      ariaLabel="Add more IP Addresses/Netmask"
                      onClick={() => {
                        const whitelistClone: UiStringField[] = Object.assign([], whitelistFields);
                        const fieldClone: UiStringField = { ...whitelistClone[0] };
                        fieldClone.value = '';
                        whitelistClone.push(fieldClone);
                        setWhiteListFields(whitelistClone);
                      }}
                    >
                      + Add more IP Addresses/Netmask
                    </ActionButton>
                  )}
                </FormRow>
                {updateCmd && (
                  <Spacing margin={{ top: 'normal' }}>
                    <Row>
                      <Column lg="6">
                        <Button
                          id="__OrgSecurity-Save"
                          variant="primary"
                          disabled={isLoadingForm || isUpdating}
                          onClick={doSave}
                        >
                          {updateCmd.label}
                        </Button>
                      </Column>
                    </Row>
                  </Spacing>
                )}
              </>
            )}
          </Column>
        </FormRow>
      </Container>
    </LayoutDashboard>
  );
};

const OrganizationSecuritySettingsPage = memo(_OrganizationSecuritySettingsPage);

export { OrganizationSecuritySettingsPage };
