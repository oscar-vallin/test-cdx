/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import { Checkbox, Spinner, SpinnerSize } from '@fluentui/react';
import { Card } from 'src/components/cards';
import { EmptyState } from 'src/containers/states';
import { Button } from 'src/components/buttons';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { Column, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Spacing } from 'src/components/spacings/Spacing';

import {
  PasswordComplexity,
  PasswordRules,
  usePasswordRulesFormLazyQuery,
  useUpdatePasswordRulesMutation
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { DEFAULT_FORM, extractFormValues, FormInput, FormOptions, replaceInputs } from './PasswordRulesFormUtils';
import { StyledColumn, StyledComboBox, StyledDiv } from './PasswordRulesPage.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';

const _PasswordRulesPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const [fetchPageForm, { data, loading: isLoadingForm }] = useQueryHandler(usePasswordRulesFormLazyQuery);
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  const [state, setState] = useState<PasswordRules>({ ...DEFAULT_FORM });
  const [form, setForm]: any = useState({});
  const handleError = ErrorHandler();

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (data) {
      setState({ ...state, ...extractFormValues(DEFAULT_FORM, data?.passwordRulesForm || {}) });
      setForm(data);
    }
  }, [data]);

  useEffect(() => {
    // console.log(state);
  }, [state]);

  useEffect(() => {
    handleError(updateError);
  }, [updateError]);

  // useEffect(() => {
  //   if (!state.someMustBeMet.enabled) {
  //     setState({
  //       ...state,
  //       someMustBeMet: {
  //         ...state.someMustBeMet,
  //         ...Object.keys(INITIAL_STATE.someMustBeMet).reduce((obj, key) => ({ ...obj, [key]: false }), {}),
  //       },
  //     });
  //   }
  // }, [state.someMustBeMet.enabled]);

  useEffect(() => {
    if (updatedRules) {
      if (updatedRules.updatePasswordRules?.response === 'FAIL') {
        const errorMessage = updatedRules.updatePasswordRules?.errMsg ?? 'Please, check the highlighted fields and try again';
        Toast.error({ text: errorMessage });
      } else {
        Toast.success({ text: 'Password rules updated successfully' });
      }
      setForm({
        passwordRulesForm: updatedRules.updatePasswordRules,
      });
    }
  }, [updatedRules]);

  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <PageTitle id="__Page_Title" title="Password Rules" />
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Separator />
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
                      form={form?.passwordRulesForm}
                      group="mustAlwaysBeMet"
                      state={state}
                      onChange={setState}
                    />
                  </Spacing>

                  {form?.passwordRulesForm?.someMustBeMet?.enabled?.visible && (
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
                                selectedKey={state?.someMustBeMet?.minPasswordComplexity}
                                options={
                                  form.passwordRulesForm?.options
                                    ?.find((opt) => opt.key === 'PasswordComplexity')
                                    ?.values?.map(({ label, value }) => ({
                                      key: value,
                                      text: label,
                                    })) || []
                                }
                                onChange={(event, option) => {
                                  setState({
                                    ...state,
                                    someMustBeMet: {
                                      ...state.someMustBeMet,
                                      minPasswordComplexity: PasswordComplexity[option?.key?.toString() ?? 'ANY'] ,
                                    },
                                  });
                                }}
                              />

                              <strong>complexity</strong>
                              <InfoIcon
                                id="passComplexityTooltip"
                                tooltip={form?.passwordRulesForm?.someMustBeMet?.minPasswordComplexity?.info}
                                leftPad={false}
                              />
                              <strong>&nbsp;OR Match</strong>

                              <FormInput
                                id="__inputMustPassingRules"
                                key="__inputMustPassingRules"
                                group="someMustBeMet"
                                option="requiredNumPassingRules"
                                state={state}
                                errorMessage={form?.passwordRulesForm?.someMustBeMet?.requiredNumPassingRules?.errMsg}
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
                              form={form?.passwordRulesForm}
                              group="someMustBeMet"
                              state={state}
                              onChange={setState}
                            />
                          </Card>
                        </Column>
                      </Row>
                    </Spacing>
                  )}

                  {(form?.passwordRulesForm?.autoLockAccount?.visible ||
                    form?.passwordRulesForm?.autoUnlockAccount?.visible) && (
                    <Spacing margin={{ bottom: 'double' }}>
                      {form?.passwordRulesForm?.autoLockAccount?.visible && (
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

                              <Text {...(form?.passwordRulesForm?.autoLockAccount?.errMsg ? { variant: 'error' } : {})}>
                                <span>
                                  {form?.passwordRulesForm?.autoLockAccount?.label || 'Missing label from form'}
                                </span>

                                {form?.passwordRulesForm?.autoLockAfterFailedAttempts.label
                                  ? replaceInputs(form?.passwordRulesForm?.autoLockAfterFailedAttempts.label, {
                                      '{0}': (
                                        <FormInput
                                          id="__inputAutoLock"
                                          key="__inputAutoLock"
                                          option="autoLockAfterFailedAttempts"
                                          state={state}
                                          errorMessage={form?.passwordRulesForm?.autoLockAfterFailedAttempts?.errMsg}
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

                      {form?.passwordRulesForm?.autoUnlockAccount?.visible && (
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
                                {...(form?.passwordRulesForm?.autoUnlockAccount?.errMsg ? { variant: 'error' } : {})}
                              >
                                <span>
                                  {form?.passwordRulesForm?.autoUnlockAccount?.label || 'Missing label from form'}
                                </span>

                                {form?.passwordRulesForm?.autoUnlockAccountDelayMinutes.label
                                  ? replaceInputs(form?.passwordRulesForm?.autoUnlockAccountDelayMinutes.label, {
                                      '{0}': (
                                        <FormInput
                                          id="__inputAutoUnlock"
                                          key="__inputAutoUnLock"
                                          option="autoUnlockAccountDelayMinutes"
                                          state={state}
                                          errorMessage={form?.passwordRulesForm?.autoUnlockAccountDelayMinutes?.errMsg}
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
      </Spacing>
    </LayoutAdmin>
  );
};

const PasswordRulesPage = memo(_PasswordRulesPage);

export { PasswordRulesPage };
export default PasswordRulesPage;
