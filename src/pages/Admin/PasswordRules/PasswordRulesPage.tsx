/* eslint-disable react-hooks/exhaustive-deps */
/* tslint-disable */
import { useState, useEffect, memo } from 'react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { SpinnerSize } from '@fluentui/react';
import { Card } from '../../../components/cards';
import { EmptyState } from '../../../containers/states';
import { Button } from '../../../components/buttons';
import { useQueryHandler } from '../../../hooks/useQueryHandler';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';
import { useNotification } from '../../../hooks/useNotification';
import { Row, Column } from '../../../components/layouts';
import { Text } from '../../../components/typography';
import { Separator } from '../../../components/separators/Separator';
import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { Spacing } from '../../../components/spacings/Spacing';

import { StyledColumn, StyledDiv, StyledComboBox } from './PasswordRulesPage.styles';
import { usePasswordRulesFormLazyQuery, useUpdatePasswordRulesMutation } from '../../../data/services/graphql';
import { DEFAULT_FORM, FormOptions, FormInput, extractFormValues, replaceInputs } from './PasswordRulesFormUtils';

const _PasswordRulesPage = () => {
  // const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();
  const Toast = useNotification();
  const [fetchPageForm, { data, loading: isLoadingForm }] = useQueryHandler(usePasswordRulesFormLazyQuery);
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  const [state, setState] = useState({ ...DEFAULT_FORM });
  const [form, setForm]: any = useState({});

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  useEffect(() => {
    if (data) {
      setState({ ...state, ...extractFormValues(DEFAULT_FORM, data?.passwordRulesForm || {}) });
      setForm(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(state);
  }, [state]);

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
      if (updatedRules.updatePasswordRules.response === 'FAIL') {
        Toast.error({ text: 'Please, check the highlighted fields and try again' });
      } else {
        Toast.success({ text: 'Password rules updated sucessfully' });

        setForm({
          passwordRulesForm: updatedRules.updatePasswordRules,
        });
      }
    }
  }, [updatedRules]);

  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double">
        {(isLoadingForm || data) && (
          <Row>
            <Column lg="4">
              <Spacing margin={{ top: 'small' }}>
                <Text id="__Page-Title" variant="bold">
                  Password Rules
                </Text>
              </Spacing>
            </Column>
          </Row>
        )}

        {(isLoadingForm || data) && (
          <Row>
            <Column lg="12">
              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>
            </Column>
          </Row>
        )}

        <Row>
          <StyledColumn sm="12" xxl={form ? '8' : '12'}>
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
                            orgSid: ActiveDomainStore.domainOrg.current.orgSid,
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
                      <Text variant="bold">Must always be met</Text>
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
                              checked={state.someMustBeMet.enabled}
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
                                selectedKey={state.someMustBeMet.minPasswordComplexity}
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
                                      minPasswordComplexity: option?.key?.toString() || '',
                                    },
                                  });
                                }}
                              />

                              <strong>complexity OR Match</strong>

                              <FormInput
                                id="__inputMustPassingRules"
                                group="someMustBeMet"
                                option="requiredNumPassingRules"
                                state={state}
                                value={state.someMustBeMet.requiredNumPassingRules}
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
                                checked={state.autoLockAccount}
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
                                          option="autoLockAfterFailedAttempts"
                                          state={state}
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
                                checked={state.autoUnlockAccount}
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
                                          option="autoUnlockAccountDelayMinutes"
                                          state={state}
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
                                orgSid: ActiveDomainStore.domainOrg.current.orgSid,
                                ...state,
                              },
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
