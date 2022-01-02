/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Label, SpinnerSize } from '@fluentui/react';
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

import { StyledColumn, StyledDiv } from './PasswordRulesPage.styles';
import { usePasswordRulesFormLazyQuery, useUpdatePasswordRulesMutation } from '../../../data/services/graphql';

const INITIAL_STATE = {
  autoLockAccount: false,
  autoLockAfterFailedAttempts: 0,
  autoUnlockAccount: false,
  autoUnlockAccountDelayMinutes: 30,
  mustAlwaysBeMet: {
    maxAllowedRepeatedChars: 60,
    maxLength: 60,
    minLength: 10,
    minLowerCaseLetters: 1,
    minNumericDigits: 1,
    minPasswordHistoryVariations: 1,
    minSpecialCharacters: 1,
    minUpperCaseLetters: 1,
    mustContainLowerCaseLetters: false,
    mustContainNumericDigits: false,
    mustContainSpecialCharacters: false,
    mustContainUpperCaseLetters: false,
    mustFollowLengthRequirements: false,
    mustNotContainNumericSequence: false,
    mustNotContainUserName: false,
    mustNotContainWhiteSpace: false,
    mustNotMatchExactDictionaryWord: false,
    mustNotMatchPartialDictionaryWord: false,
    mustNotRepeatCharacters: false,
    mustNotReusePasswords: false,
  },
  someMustBeMet: {
    enabled: true,
    maxAllowedRepeatedChars: 60,
    maxLength: 60,
    minLength: 10,
    minLowerCaseLetters: 1,
    minNumericDigits: 1,
    minPasswordComplexity: 'STRONG',
    minPasswordHistoryVariations: 1,
    minSpecialCharacters: 1,
    minUpperCaseLetters: 1,
    mustContainLowerCaseLetters: true,
    mustContainNumericDigits: true,
    mustContainSpecialCharacters: true,
    mustContainUpperCaseLetters: true,
    mustFollowLengthRequirements: false,
    mustNotContainNumericSequence: false,
    mustNotContainUserName: false,
    mustNotContainWhiteSpace: false,
    mustNotMatchExactDictionaryWord: false,
    mustNotMatchPartialDictionaryWord: false,
    mustNotRepeatCharacters: false,
    mustNotReusePasswords: false,
    requiredNumPassingRules: 3,
  },
};

const _PasswordRulesPage = () => {
  // const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();
  const Toast = useNotification();
  const [fetchPageForm, { data: form, loading: isLoadingForm }] = useQueryHandler(usePasswordRulesFormLazyQuery);
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  const [state, setState] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  useEffect(() => {
    if (form) {
      const values = {};

      Object.keys(INITIAL_STATE).forEach((key) => {
        if (key === 'mustAlwaysBeMet' || key === 'someMustBeMet') {
          Object.keys(INITIAL_STATE[key]).forEach((subKey) => {
            values[key] = {
              ...(values[key] || {}),
              [subKey]:
                subKey === 'minPasswordComplexity'
                  ? form.passwordRulesForm[key][subKey]?.value?.value || 'STRONG'
                  : form.passwordRulesForm[key][subKey]?.value || false,
            };
          });
        } else {
          values[key] = form.passwordRulesForm[key]?.value || false;
        }
      });

      console.log(values);

      setState({ ...state, ...values });
    }
  }, [form]);

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
      if (updatedRules.response === 'FAIL') {
        Toast.error({ text: 'Please, check the highlighted fields and try again' });
      } else {
        Toast.success({ text: 'Password rules updated sucessfully' });
      }
    }
  }, [updatedRules]);

  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double">
        {(isLoadingForm || form) && (
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

        {(isLoadingForm || form) && (
          <Row>
            <Column lg="12">
              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>
            </Column>
          </Row>
        )}

        <Row>
          <StyledColumn lg={form ? '6' : '12'}>
            <Spacing margin={{ top: !form ? 'normal' : 'double' }}>
              {isLoadingForm ? (
                <Spinner size={SpinnerSize.large} label="Loading password rules" />
              ) : !form ? (
                <EmptyState
                  title="An error occurred"
                  description="The password rules form could not be loaded. Please, try again in a few minutes."
                  actions={(
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
                  )}
                />
              ) : (
                <div id="__PasswordRules-Form">
                  <Row>
                    <Column>
                      <Text variant="bold">Must always be met</Text>
                    </Column>
                  </Row>

                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <Row>
                      <Column lg="6">
                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainWhiteSpace?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustNoWhitespaces"
                              checked={state.mustAlwaysBeMet.mustNotContainWhiteSpace}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotContainWhiteSpace: !!checked,
                                  },
                                })}
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainWhiteSpace?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustFollowLengthRequirements?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustPasswordLength"
                              checked={state.mustAlwaysBeMet.mustFollowLengthRequirements}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustFollowLengthRequirements: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustFollowLengthRequirements?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainUpperCaseLetters?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustUppercase"
                              checked={state.mustAlwaysBeMet.mustContainUpperCaseLetters}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustContainUpperCaseLetters: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainUpperCaseLetters?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainLowerCaseLetters?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustLowercase"
                              checked={state.mustAlwaysBeMet.mustContainLowerCaseLetters}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustContainLowerCaseLetters: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainLowerCaseLetters?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainNumericDigits?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustDigit"
                              checked={state.mustAlwaysBeMet.mustContainNumericDigits}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustContainNumericDigits: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainNumericDigits?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainSpecialCharacters?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustSpecial"
                              checked={state.mustAlwaysBeMet.mustContainSpecialCharacters}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustContainSpecialCharacters: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainSpecialCharacters?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}
                      </Column>
                      <Column lg="6">
                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainNumericSequence?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustSequence"
                              checked={state.mustAlwaysBeMet.mustNotContainNumericSequence}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotContainNumericSequence: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainNumericSequence?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotRepeatCharacters?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustNotRepeat"
                              checked={state.mustAlwaysBeMet.mustNotRepeatCharacters}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotRepeatCharacters: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotRepeatCharacters?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotReusePasswords?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustNotReuse"
                              checked={state.mustAlwaysBeMet.mustNotReusePasswords}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotReusePasswords: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotReusePasswords?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchExactDictionaryWord?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustNoExactMatch"
                              checked={state.mustAlwaysBeMet.mustNotMatchExactDictionaryWord}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotMatchExactDictionaryWord: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchExactDictionaryWord?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}

                        {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchPartialDictionaryWord?.visible && (
                          <StyledDiv>
                            <Checkbox
                              id="__checkBoxMustNoPartialMatch"
                              checked={state.mustAlwaysBeMet.mustNotMatchPartialDictionaryWord}
                              onChange={(event, checked) =>
                                setState({
                                  ...state,
                                  mustAlwaysBeMet: {
                                    ...state.mustAlwaysBeMet,
                                    mustNotMatchPartialDictionaryWord: !!checked,
                                  },
                                })
                              }
                            />

                            <Label>
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchPartialDictionaryWord?.label ||
                                'Missing label from form'}
                            </Label>
                          </StyledDiv>
                        )}
                      </Column>
                    </Row>
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
                                })
                              }
                            />

                            <Label>
                              <strong>Must be a password of</strong> X <strong>complexity OR Match</strong> X
                              <strong>of the following rules</strong>
                            </Label>
                          </StyledDiv>
                        </Column>
                      </Row>

                      <Row>
                        <Column>
                          <Card elevation="none">
                            <Row>
                              <Column lg="6">
                                {form?.passwordRulesForm?.someMustBeMet?.mustNotContainWhiteSpace?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustNoWhitespaces"
                                      checked={state.someMustBeMet.mustNotContainWhiteSpace}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotContainWhiteSpace: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotContainWhiteSpace?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustFollowLengthRequirements?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustPasswordLength"
                                      checked={state.someMustBeMet.mustFollowLengthRequirements}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustFollowLengthRequirements: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustFollowLengthRequirements?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustContainUpperCaseLetters?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustUppercase"
                                      checked={state.someMustBeMet.mustContainUpperCaseLetters}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustContainUpperCaseLetters: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainUpperCaseLetters?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustContainLowerCaseLetters?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustLowercase"
                                      checked={state.someMustBeMet.mustContainLowerCaseLetters}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustContainLowerCaseLetters: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainLowerCaseLetters?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustContainNumericDigits?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustDigit"
                                      checked={state.someMustBeMet.mustContainNumericDigits}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustContainNumericDigits: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainNumericDigits?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustContainSpecialCharacters?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustSpecial"
                                      checked={state.someMustBeMet.mustContainSpecialCharacters}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustContainSpecialCharacters: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainSpecialCharacters?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}
                              </Column>
                              <Column lg="6">
                                {form?.passwordRulesForm?.someMustBeMet?.mustNotContainNumericSequence?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustSequence"
                                      checked={state.someMustBeMet.mustNotContainNumericSequence}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotContainNumericSequence: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotContainNumericSequence?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustNotRepeatCharacters?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustNotRepeat"
                                      checked={state.someMustBeMet.mustNotRepeatCharacters}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotRepeatCharacters: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotRepeatCharacters?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustNotReusePasswords?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustNotReuse"
                                      checked={state.someMustBeMet.mustNotReusePasswords}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotReusePasswords: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotReusePasswords?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchExactDictionaryWord?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustNoExactMatch"
                                      checked={state.someMustBeMet.mustNotMatchExactDictionaryWord}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotMatchExactDictionaryWord: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchExactDictionaryWord?.label ||
                                        'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}

                                {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchPartialDictionaryWord?.visible && (
                                  <StyledDiv>
                                    <Checkbox
                                      id="__checkBoxMustNoPartialMatch"
                                      checked={state.someMustBeMet.mustNotMatchPartialDictionaryWord}
                                      onChange={(event, checked) =>
                                        setState({
                                          ...state,
                                          someMustBeMet: {
                                            ...state.someMustBeMet,
                                            mustNotMatchPartialDictionaryWord: !!checked,
                                          },
                                        })
                                      }
                                    />

                                    <Label>
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchPartialDictionaryWord
                                        ?.label || 'Missing label from form'}
                                    </Label>
                                  </StyledDiv>
                                )}
                              </Column>
                            </Row>
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
                                  })
                                }
                              />

                              <Label>
                                <span>
                                  {form?.passwordRulesForm?.autoLockAccount?.label || 'Missing label from form'}{' '}
                                </span>
                                {form?.passwordRulesForm?.autoLockAfterFailedAttempts.label}
                              </Label>
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
                                  })
                                }
                              />

                              <Label>
                                <span>
                                  {form?.passwordRulesForm?.autoUnlockAccount?.label || 'Missing label from form'}{' '}
                                </span>
                                {form?.passwordRulesForm?.autoUnlockAccountDelayMinutes.label}
                              </Label>
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
