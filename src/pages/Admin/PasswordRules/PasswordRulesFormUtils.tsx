import { MaskedTextField, Checkbox } from '@fluentui/react';
import { Row, Column } from 'src/components/layouts';
import { Text } from 'src/components/typography';
import { StyledDiv } from './PasswordRulesPage.styles';

export const DEFAULT_FORM = {
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

type FormInputProps = {
  id?: any;
  value?: any;
  state?: any;
  group?: any;
  option?: any;
  onChange?: any;
};

export const FormInput = ({ id, value, state, group, option, onChange }: FormInputProps) => (
  <MaskedTextField
    maskFormat={{
      '*': /[0-9_]/,
    }}
    mask="***"
    maskChar=""
    id={id}
    value={value?.toString()}
    onChange={({ target }: any) =>
      onChange({
        ...state,
        ...(group
          ? { [group]: { ...state[group], [option]: target.value.toString() } }
          : { [option]: target.value.toString() }),
      })
    }
  />
);

export const extractFormValues = (defaultValues, form) => {
  const values = {};

  Object.keys(defaultValues).forEach((key) => {
    if (key === 'mustAlwaysBeMet' || key === 'someMustBeMet') {
      Object.keys(defaultValues[key]).forEach((subKey) => {
        values[key] = {
          ...(values[key] || {}),
          [subKey]:
            subKey === 'minPasswordComplexity'
              ? form[key][subKey]?.value?.value || 'STRONG'
              : form[key][subKey]?.value || false,
        };
      });
    } else {
      values[key] = form[key]?.value || false;
    }
  });

  return values;
};

export const replaceInputs = (string, inputs) => string.split(' ').map((token) => inputs[token] || `${token} `);

export const FormOptions = ({ form = {}, group = '_', state, onChange }) => {
  const baseCheckboxId = `__checkbox${group === 'mustAlwaysBeMet' ? 'Must' : 'Some'}`;
  const baseInputId = `__input${group === 'mustAlwaysBeMet' ? 'Must' : 'Some'}`;

  return (
    <Row>
      <Column lg="12" xl="6">
        {form[group]?.mustNotContainWhiteSpace?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NoWhitespaces`}
              checked={state[group].mustNotContainWhiteSpace}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotContainWhiteSpace: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustNotContainWhiteSpace?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotContainWhiteSpace?.label || 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustFollowLengthRequirements?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}PasswordLength`}
              checked={state[group].mustFollowLengthRequirements}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustFollowLengthRequirements: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustFollowLengthRequirements?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustFollowLengthRequirements?.label
                ? replaceInputs(form[group]?.mustFollowLengthRequirements?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}MinLength`}
                        key={`${baseInputId}MinLength`}
                        group="mustAlwaysBeMet"
                        option="minLength"
                        state={state}
                        value={state[group].minLength}
                        onChange={onChange}
                      />
                    ),
                    '{1}': (
                      <FormInput
                        id={`${baseInputId}MaxLength`}
                        key={`${baseInputId}MaxLength`}
                        group="mustAlwaysBeMet"
                        option="maxLength"
                        state={state}
                        value={state[group].maxLength}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustContainUpperCaseLetters?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}Uppercase`}
              checked={state[group].mustContainUpperCaseLetters}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainUpperCaseLetters: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustContainUpperCaseLetters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainUpperCaseLetters?.label
                ? replaceInputs(form[group]?.mustContainUpperCaseLetters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Uppercase`}
                        key={`${baseInputId}Uppercase`}
                        group="mustAlwaysBeMet"
                        option="minUpperCaseLetters"
                        state={state}
                        value={state[group].minUpperCaseLetters}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustContainLowerCaseLetters?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}Lowercase`}
              checked={state[group].mustContainLowerCaseLetters}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainLowerCaseLetters: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustContainLowerCaseLetters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainLowerCaseLetters?.label
                ? replaceInputs(form[group]?.mustContainLowerCaseLetters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Lowercase`}
                        key={`${baseInputId}Lowercase`}
                        group="mustAlwaysBeMet"
                        option="minLowerCaseLetters"
                        state={state}
                        value={state[group].minLowerCaseLetters}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustContainNumericDigits?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}Digit`}
              checked={state[group].mustContainNumericDigits}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainNumericDigits: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustContainNumericDigits?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainNumericDigits?.label
                ? replaceInputs(form[group]?.mustContainNumericDigits?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Digit`}
                        key={`${baseInputId}Digit`}
                        group="mustAlwaysBeMet"
                        option="minNumericDigits"
                        state={state}
                        value={state[group].minNumericDigits}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustContainSpecialCharacters?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}SpecialChars`}
              checked={state[group].mustContainSpecialCharacters}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainSpecialCharacters: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustContainSpecialCharacters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainSpecialCharacters?.label
                ? replaceInputs(form[group]?.mustContainSpecialCharacters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}SpecialChars`}
                        key={`${baseInputId}SpecialChars`}
                        group="mustAlwaysBeMet"
                        option="minSpecialCharacters"
                        state={state}
                        value={state[group].minSpecialCharacters}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}
      </Column>
      <Column lg="12" xl="6">
        {form[group].mustNotContainUserName?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NoUserName`}
              checked={state[group].mustNotContainUserName}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotContainUserName: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustNotContainUserName?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotContainUserName?.label || 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustNotContainNumericSequence?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}Sequence`}
              checked={state[group].mustNotContainNumericSequence}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotContainNumericSequence: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustNotContainNumericSequence?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotContainNumericSequence?.label || 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustNotRepeatCharacters?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NotRepeat`}
              checked={state[group].mustNotRepeatCharacters}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotRepeatCharacters: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustNotRepeatCharacters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotRepeatCharacters?.label
                ? replaceInputs(form[group]?.mustNotRepeatCharacters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}RepeatedChars`}
                        key={`${baseInputId}RepeatedChars`}
                        group="mustAlwaysBeMet"
                        option="maxAllowedRepeatedChars"
                        state={state}
                        value={state[group].maxAllowedRepeatedChars}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustNotReusePasswords?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NotReuse`}
              checked={state[group].mustNotReusePasswords}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotReusePasswords: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustNotReusePasswords?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotReusePasswords?.label
                ? replaceInputs(form[group]?.mustNotReusePasswords?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Variations`}
                        key={`${baseInputId}Variations`}
                        group="mustAlwaysBeMet"
                        option="minPasswordHistoryVariations"
                        state={state}
                        value={state[group].minPasswordHistoryVariations}
                        onChange={onChange}
                      />
                    ),
                  })
                : 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustNotMatchExactDictionaryWord?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NoExactMatch`}
              checked={state[group].mustNotMatchExactDictionaryWord}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotMatchExactDictionaryWord: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustNotMatchExactDictionaryWord?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotMatchExactDictionaryWord?.label || 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}

        {form[group]?.mustNotMatchPartialDictionaryWord?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NoPartialMatch`}
              checked={state[group].mustNotMatchPartialDictionaryWord}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotMatchPartialDictionaryWord: !!checked,
                  },
                })}
            />

            <Text {...(form[group]?.mustNotMatchPartialDictionaryWord?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotMatchPartialDictionaryWord?.label || 'Missing label from form'}
            </Text>
          </StyledDiv>
        )}
      </Column>
    </Row>
  );
};
