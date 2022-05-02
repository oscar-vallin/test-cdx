/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import { Spinner, SpinnerSize, Toggle } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { Button } from 'src/components/buttons';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { LightSeparator } from 'src/components/separators/Separator';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import {
  OrgSecurityForm,
  UpdateOrgSecurityInput,
  useOrgSecurityFormLazyQuery,
  useUpdateOrgSecurityMutation,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_SECURITY_SETTINGS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { DEFAULT_FORM, extractFormValues } from './OrganizationSecuritySettingsPageUtils';
import { UIInputToggle } from 'src/components/inputs/InputToggle';

const _OrganizationSecuritySettingsPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [fetchPageForm, { data, loading: isLoadingForm, error: formError }] = useOrgSecurityFormLazyQuery();
  const [useUpdateOrgSecurity, { data: updatedOrgSecurity, loading: isUpdating, error: updateError }] =
    useQueryHandler(useUpdateOrgSecurityMutation);

  const [state, setState] = useState<UpdateOrgSecurityInput>({ ...DEFAULT_FORM });
  const [form, setForm] = useState<OrgSecurityForm | null>();

  const handleError = ErrorHandler();

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (data?.orgSecurityForm) {
      setForm(data.orgSecurityForm);
      setState({ ...state, ...extractFormValues(DEFAULT_FORM, data?.orgSecurityForm || {}) });
    }
  }, [data]);

  useEffect(() => {
    console.log('State:', state);
    console.log('Form:', form);
  }, [state]);

  useEffect(() => {
    handleError(formError);
  }, [formError]);

  useEffect(() => {
    handleError(updateError);
  }, [updateError]);

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
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <LightSeparator />
            </Spacing>
          </Column>
        </Row>
        <Row>
          <Column lg="8">
            <Spacing margin={{ top: !form ? 'normal' : 'double' }}>
              {isLoadingForm || isUpdating ? (
                <Spinner size={SpinnerSize.large} label="Loading Security Settings" />
              ) : !form ? (
                <EmptyState
                  title="An error occurred"
                  description="The password rules form could not be loaded. Please, try again in a few minutes."
                  actions={
                    <Button
                      id="__ReloadFormButton"
                      variant="primary"
                      onClick={() => {
                        fetchPageForm({
                          variables: {
                            orgSid: orgSid,
                          },
                        });

                        return null;
                      }}
                      block={false}
                    >
                      Reload
                    </Button>
                  }
                />
              ) : (
                <div id="__OrganizationSecuritySettings-Form">
                  {form.forgotPasswordEnabled?.visible && (
                    <Spacing margin={{ bottom: 'normal' }}>
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
                    </Spacing>
                  )}
                  {form.forgotPasswordMsg?.visible && (
                    <Spacing margin={{ bottom: 'normal' }}>
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
                    </Spacing>
                  )}
                  {form.allowedEmailDomains?.visible && (
                    <Spacing margin={{ bottom: 'normal' }}>
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
                    </Spacing>
                  )}
                  {form?.commands?.length && (
                    <Spacing margin={{ top: 'normal' }}>
                      <Row>
                        <Column lg="6">
                          <Button
                            id="__PasswordRules-Save"
                            variant="primary"
                            disabled={isLoadingForm || isUpdating}
                            onClick={() => {
                              useUpdateOrgSecurity({
                                variables: {
                                  orgSecurityInfo: {
                                    ...state,
                                    orgSid: orgSid,
                                  },
                                  errorPolicy: 'all',
                                },
                              }).catch(() => {
                                Toast.error({
                                  text: 'An error occurred while updating the security settings. Please, try again.',
                                });
                              });
                              return null;
                            }}
                          >
                            {form?.commands[0].label}
                          </Button>
                        </Column>
                      </Row>
                    </Spacing>
                  )}
                </div>
              )}
            </Spacing>
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
};

const OrganizationSecuritySettingsPage = memo(_OrganizationSecuritySettingsPage);

export { OrganizationSecuritySettingsPage };
export default OrganizationSecuritySettingsPage;
