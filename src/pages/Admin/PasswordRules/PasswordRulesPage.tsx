/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { SpinnerSize } from '@fluentui/react';
import { MaskedTextField } from '@fluentui/react/lib-commonjs/TextField';
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
  const [fetchPageForm, { data, loading: isLoadingForm }] = useQueryHandler(usePasswordRulesFormLazyQuery);
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  const [state, setState] = useState({ ...INITIAL_STATE });
  const [form, setForm] = useState({});

  const replaceInputs = (string, inputs) => string.split(' ').map((token) => inputs[token] || `${token} `);

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  useEffect(() => {
    if (data) {
      const values = {};

      Object.keys(INITIAL_STATE).forEach((key) => {
        if (key === 'mustAlwaysBeMet' || key === 'someMustBeMet') {
          Object.keys(INITIAL_STATE[key]).forEach((subKey) => {
            values[key] = {
              ...(values[key] || {}),
              [subKey]:
                subKey === 'minPasswordComplexity'
                  ? data.passwordRulesForm[key][subKey]?.value?.value || 'STRONG'
                  : data.passwordRulesForm[key][subKey]?.value || false,
            };
          });
        } else {
          values[key] = data.passwordRulesForm[key]?.value || false;
        }
      });

      setState({ ...state, ...values });
      setForm(data);
    }
  }, [data]);

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
                      <Column lg="12" xl="6">
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainWhiteSpace?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainWhiteSpace?.label ||
                                'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustFollowLengthRequirements?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustFollowLengthRequirements?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustFollowLengthRequirements?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minLength.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minLength: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                      '{1}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.maxLength.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                maxLength: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainUpperCaseLetters?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainUpperCaseLetters?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainUpperCaseLetters?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minUpperCaseLetters.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minUpperCaseLetters: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainLowerCaseLetters?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainLowerCaseLetters?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainLowerCaseLetters?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minLowerCaseLetters.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minLowerCaseLetters: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainNumericDigits?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainNumericDigits?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainNumericDigits?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minNumericDigits.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minNumericDigits: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainSpecialCharacters?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainSpecialCharacters?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustContainSpecialCharacters?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minSpecialCharacters.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minSpecialCharacters: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
                          </StyledDiv>
                        )}
                      </Column>
                      <Column lg="12" xl="6">
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainNumericSequence?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotContainNumericSequence?.label ||
                                'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotRepeatCharacters?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotRepeatCharacters?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotRepeatCharacters?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.maxAllowedRepeatedChars.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                maxAllowedRepeatedChars: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotReusePasswords?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotReusePasswords?.label
                                ? replaceInputs(
                                    form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotReusePasswords?.label,
                                    {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.mustAlwaysBeMet.minPasswordHistoryVariations.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              mustAlwaysBeMet: {
                                                ...state.mustAlwaysBeMet,
                                                minPasswordHistoryVariations: target.value,
                                              },
                                            })}
                                        />
                                      ),
                                    }
                                  )
                                : 'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchExactDictionaryWord?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchExactDictionaryWord?.label ||
                                'Missing label from form'}
                            </Text>
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

                            <Text
                              {...(form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchPartialDictionaryWord?.errMsg
                                ? { variant: 'error' }
                                : {})}
                            >
                              {form?.passwordRulesForm?.mustAlwaysBeMet?.mustNotMatchPartialDictionaryWord?.label ||
                                'Missing label from form'}
                            </Text>
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
                                      minPasswordComplexity: option.key,
                                    },
                                  });
                                }}
                              />

                              <strong>complexity OR Match</strong>

                              <MaskedTextField
                                maskFormat={{
                                  '*': /[0-9_]/,
                                }}
                                mask="***"
                                maskChar=""
                                id="__inputMustDigit"
                                value={state.someMustBeMet.requiredNumPassingRules.toString()}
                                onChange={({ target }) =>
                                  setState({
                                    ...state,
                                    someMustBeMet: {
                                      ...state.someMustBeMet,
                                      requiredNumPassingRules: target.value,
                                    },
                                  })}
                              />
                              <strong>of the following rules</strong>
                            </Text>
                          </StyledDiv>
                        </Column>
                      </Row>

                      <Row>
                        <Column>
                          <Card elevation="none">
                            <Row>
                              <Column lg="12" xl="6">
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotContainWhiteSpace?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotContainWhiteSpace?.label ||
                                        'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustFollowLengthRequirements?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustFollowLengthRequirements?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustFollowLengthRequirements?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minLength.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minLength: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                              '{1}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.maxLength.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        maxLength: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustContainUpperCaseLetters?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainUpperCaseLetters?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustContainUpperCaseLetters?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minUpperCaseLetters.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minUpperCaseLetters: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustContainLowerCaseLetters?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainLowerCaseLetters?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustContainLowerCaseLetters?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minLowerCaseLetters.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minLowerCaseLetters: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustContainNumericDigits?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainNumericDigits?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustContainNumericDigits?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minNumericDigits.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minNumericDigits: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustContainSpecialCharacters?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustContainSpecialCharacters?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustContainSpecialCharacters?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minSpecialCharacters.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minSpecialCharacters: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
                                  </StyledDiv>
                                )}
                              </Column>
                              <Column lg="12" xl="6">
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotContainNumericSequence?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotContainNumericSequence?.label ||
                                        'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotRepeatCharacters?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotRepeatCharacters?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustNotRepeatCharacters?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.maxAllowedRepeatedChars.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        maxAllowedRepeatedChars: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotReusePasswords?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotReusePasswords?.label
                                        ? replaceInputs(
                                            form?.passwordRulesForm?.someMustBeMet?.mustNotReusePasswords?.label,
                                            {
                                              '{0}': (
                                                <MaskedTextField
                                                  maskFormat={{
                                                    '*': /[0-9_]/,
                                                  }}
                                                  mask="***"
                                                  maskChar=""
                                                  id="__inputMustDigit"
                                                  value={state.someMustBeMet.minPasswordHistoryVariations.toString()}
                                                  onChange={({ target }) =>
                                                    setState({
                                                      ...state,
                                                      someMustBeMet: {
                                                        ...state.someMustBeMet,
                                                        minPasswordHistoryVariations: target.value,
                                                      },
                                                    })}
                                                />
                                              ),
                                            }
                                          )
                                        : 'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotMatchExactDictionaryWord
                                        ?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchExactDictionaryWord?.label ||
                                        'Missing label from form'}
                                    </Text>
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

                                    <Text
                                      {...(form?.passwordRulesForm?.someMustBeMet?.mustNotMatchPartialDictionaryWord
                                        ?.errMsg
                                        ? { variant: 'error' }
                                        : {})}
                                    >
                                      {form?.passwordRulesForm?.someMustBeMet?.mustNotMatchPartialDictionaryWord
                                        ?.label || 'Missing label from form'}
                                    </Text>
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

                              <Text {...(form?.passwordRulesForm?.autoLockAccount?.errMsg ? { variant: 'error' } : {})}>
                                <span>
                                  {form?.passwordRulesForm?.autoLockAccount?.label || 'Missing label from form'}
                                </span>

                                {form?.passwordRulesForm?.autoLockAfterFailedAttempts.label
                                  ? replaceInputs(form?.passwordRulesForm?.autoLockAfterFailedAttempts.label, {
                                      '{0}': (
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.autoLockAfterFailedAttempts.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              autoLockAfterFailedAttempts: target.value,
                                            })}
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
                                  })
                                }
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
                                        <MaskedTextField
                                          maskFormat={{
                                            '*': /[0-9_]/,
                                          }}
                                          mask="***"
                                          maskChar=""
                                          id="__inputMustDigit"
                                          value={state.autoUnlockAccountDelayMinutes.toString()}
                                          onChange={({ target }) =>
                                            setState({
                                              ...state,
                                              autoUnlockAccountDelayMinutes: target.value,
                                            })}
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
