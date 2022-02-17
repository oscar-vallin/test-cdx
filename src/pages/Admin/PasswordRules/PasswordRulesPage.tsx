/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import { Checkbox, Spinner, SpinnerSize } from '@fluentui/react';
import { Card } from 'src/components/cards';
import { EmptyState } from 'src/containers/states';
import { Button } from 'src/components/buttons';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { LightSeparator } from 'src/components/separators/Separator';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Spacing } from 'src/components/spacings/Spacing';

import {
  PasswordComplexity,
  PasswordRules, PasswordRulesForm,
  usePasswordRulesFormLazyQuery,
  useUpdatePasswordRulesMutation
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { DEFAULT_FORM, extractFormValues, FormInput, FormOptions, replaceInputs } from './PasswordRulesFormUtils';
import { StyledColumn, StyledComboBox, StyledDiv } from './PasswordRulesPage.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_PASSWORD_RULES } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

const _PasswordRulesPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [fetchPageForm, { data, loading: isLoadingForm, error: formError }] = usePasswordRulesFormLazyQuery();
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  const [state, setState] = useState<PasswordRules>({ ...DEFAULT_FORM });
  const [form, setForm] = useState<PasswordRulesForm | null>();
  const handleError = ErrorHandler();

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (data?.passwordRulesForm) {
      setState({ ...state, ...extractFormValues(DEFAULT_FORM, data?.passwordRulesForm || {}) });
      setForm(data.passwordRulesForm);
    }
  }, [data]);

  useEffect(() => {
    // console.log(state);
  }, [state]);

  useEffect(() => {
    handleError(formError);
  }, [formError]);

  useEffect(() => {
    handleError(updateError);
  }, [updateError]);

  useEffect(() => {
    if (updatedRules) {
      if (updatedRules.updatePasswordRules?.response === 'FAIL') {
        const errorMessage = updatedRules.updatePasswordRules?.errMsg ?? 'Please, check the highlighted fields and try again';
        Toast.error({ text: errorMessage });
      } else {
        Toast.success({ text: 'Password rules updated successfully' });
      }
      setForm(updatedRules.updatePasswordRules);
    }
  }, [updatedRules]);

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_PASSWORD_RULES.API_ID}>
      <PageHeader id="__PasswordRulesHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Password Rules" />
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
          <StyledColumn sm="12" xxl={form ? '10' : '12'}>
            <Spacing margin={{ top: !form ? 'normal' : 'double' }}>
              {isLoadingForm ? (
                <Spinner size={SpinnerSize.large} label="Loading password rules" />
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
                <div id="__PasswordRules-Form">
                  <Row>
                    <Column>
                      <div>
                        <Text variant="bold">Must always be met</Text>
                        <InfoIcon
                          id="mustAlwaysTooltip"
                          tooltip="Newly created passwords must always conform to the following selected rules"
                        />
                      </div>
                    </Column>
                  </Row>

                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <FormOptions
                      form={form}
                      group="mustAlwaysBeMet"
                      state={state}
                      onChange={setState}
                    />
                  </Spacing>

                  {form?.someMustBeMet?.enabled?.visible && (
                    <Spacing margin={{ bottom: 'normal' }}>
                      <Row>
                        <Column>
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxSomeMustBeMet"
                              checked={state.someMustBeMet?.enabled ?? false}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  someMustBeMet: {
                                    ...state.someMustBeMet,
                                    enabled: !!checked,
                                  },
                                })}
                            />

                            <Text>
                              <strong>Must be a password of</strong>

                              <StyledComboBox
                                selectedKey={state?.someMustBeMet?.minPasswordComplexity?.toString()}
                                disabled={state.someMustBeMet?.enabled == false}
                                options={
                                  form?.options
                                    ?.find((opt) => opt?.key === 'PasswordComplexity')
                                    ?.values?.map((opt) => ({
                                      key: opt?.value ?? '',
                                      text: opt?.label ?? '',
                                    })) || []
                                }
                                onChange={(event, option) => {
                                  const complexity = Object.keys(PasswordComplexity).find((x) => PasswordComplexity[x] == option?.key?.toString()) ?? 'ANY';
                                  setState({
                                    ...state,
                                    someMustBeMet: {
                                      ...state.someMustBeMet,
                                      minPasswordComplexity: PasswordComplexity[complexity]
                                    },
                                  });
                                }}
                              />

                              <strong>complexity</strong>
                              <InfoIcon
                                id="passComplexityTooltip"
                                tooltip={form?.someMustBeMet?.minPasswordComplexity?.info}
                                leftPad={false}
                              />
                              <strong>&nbsp;OR Match</strong>

                              <FormInput
                                id="__inputMustPassingRules"
                                key="__inputMustPassingRules"
                                group="someMustBeMet"
                                option="requiredNumPassingRules"
                                state={state}
                                disabled={state.someMustBeMet?.enabled == false}
                                errorMessage={form?.someMustBeMet?.requiredNumPassingRules?.errMsg}
                                value={state?.someMustBeMet?.requiredNumPassingRules}
                                onChange={setState}
                              />

                              <strong>of the following rules</strong>
                            </Text>
                          </StyledDiv>
                        </Column>
                      </Row>

                      <Row>
                        <Column>
                          <Card elevation="none">
                            <FormOptions
                              form={form}
                              disabled={state.someMustBeMet?.enabled == false}
                              group="someMustBeMet"
                              state={state}
                              onChange={setState}
                            />
                          </Card>
                        </Column>
                      </Row>
                    </Spacing>
                  )}

                  {(form?.autoLockAccount?.visible ||
                    form?.autoUnlockAccount?.visible) && (
                    <Spacing margin={{ bottom: 'double' }}>
                      {form?.autoLockAccount?.visible && (
                        <Row>
                          <Column>
                            <StyledDiv>
                              <Checkbox
                                id="__checkBoxAutoLock"
                                checked={state?.autoLockAccount ?? false}
                                onChange={(event, checked) =>
                                  setState({
                                    ...state,
                                    autoLockAccount: !!checked,
                                  })}
                              />

                              <Text {...(form?.autoLockAccount?.errMsg ? { variant: 'error' } : {})}>
                                <span>
                                  {form?.autoLockAccount?.label || 'Missing label from form'}
                                </span>

                                {form?.autoLockAfterFailedAttempts?.label
                                  ? replaceInputs(form?.autoLockAfterFailedAttempts.label, {
                                      '{0}': (
                                        <FormInput
                                          id="__inputAutoLock"
                                          key="__inputAutoLock"
                                          disabled={state?.autoLockAccount == false}
                                          option="autoLockAfterFailedAttempts"
                                          state={state}
                                          errorMessage={form?.autoLockAfterFailedAttempts?.errMsg}
                                          value={state.autoLockAfterFailedAttempts}
                                          onChange={setState}
                                        />
                                      ),
                                    })
                                  : 'Missing label from form'}
                              </Text>
                            </StyledDiv>
                          </Column>
                        </Row>
                      )}

                      {form?.autoUnlockAccount?.visible && (
                        <Row>
                          <Column>
                            <StyledDiv>
                              <Checkbox
                                id="__checkBoxAutoUnlock"
                                checked={state?.autoUnlockAccount ?? false}
                                onChange={(event, checked) =>
                                  setState({
                                    ...state,
                                    autoUnlockAccount: !!checked,
                                  })}
                              />

                              <Text
                                {...(form?.autoUnlockAccount?.errMsg ? { variant: 'error' } : {})}
                              >
                                <span>
                                  {form?.autoUnlockAccount?.label || 'Missing label from form'}
                                </span>

                                {form?.autoUnlockAccountDelayMinutes?.label
                                  ? replaceInputs(form?.autoUnlockAccountDelayMinutes.label, {
                                      '{0}': (
                                        <FormInput
                                          id="__inputAutoUnlock"
                                          key="__inputAutoUnLock"
                                          disabled={state?.autoUnlockAccount == false}
                                          option="autoUnlockAccountDelayMinutes"
                                          state={state}
                                          errorMessage={form?.autoUnlockAccountDelayMinutes?.errMsg}
                                          value={state.autoUnlockAccountDelayMinutes}
                                          onChange={setState}
                                        />
                                      ),
                                    })
                                  : 'Missing label from form'}
                              </Text>
                            </StyledDiv>
                          </Column>
                        </Row>
                      )}
                    </Spacing>
                  )}

                  <Row>
                    <Column lg="12">
                      <Button
                        id="__PasswordRules-Save"
                        variant="primary"
                        disabled={isUpdatingRules}
                        onClick={() => {
                          updatePasswordRules({
                            variables: {
                              passwordRulesInput: {
                                ...state,
                                orgSid: orgSid,
                              },
                              errorPolicy: 'all'
                            },
                          }).catch(() => {
                            Toast.error({
                              text: 'An error occurred while updating the password rules. Please, try again.',
                            });
                          });

                          return null;
                        }}
                      >
                        Save
                      </Button>
                    </Column>
                  </Row>
                </div>
              )}
            </Spacing>
          </StyledColumn>
        </Row>
      </Container>
    </LayoutDashboard>
  );
};

const PasswordRulesPage = memo(_PasswordRulesPage);

export { PasswordRulesPage };
export default PasswordRulesPage;
