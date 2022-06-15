import { Checkbox } from '@fluentui/react';
import { ThemedMaskedTextField } from 'src/components/inputs/InputText/InputText.styles';
import { Column, Row } from 'src/components/layouts';
import { Text } from 'src/components/typography';
import { PasswordComplexity, PasswordRules, PasswordRulesForm } from 'src/data/services/graphql';
import { StyledDiv } from './PasswordRulesPage.styles';

export const DEFAULT_FORM: PasswordRules = {
  orgSid: '',
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
    minPasswordComplexity: PasswordComplexity.Strong,
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
  id?: string;
  value?: any;
  state: PasswordRules;
  group?: string;
  option: string;
  disabled?: boolean;
  errorMessage?: string | null;
  onChange: (updated: PasswordRules) => void;
};

export const FormInput = ({
  id,
  value,
  state,
  group,
  option,
  disabled = false,
  errorMessage,
  onChange,
}: FormInputProps) => (
  <ThemedMaskedTextField
    maskFormat={{
      '*': /[0-9_]/,
    }}
    mask="***"
    maskChar=""
    id={id}
    value={value?.toString()}
    errorMessage={errorMessage ?? undefined}
    disabled={disabled}
    onChange={(event, newValue) => {
      const updated: PasswordRules = {
        ...state,
        ...(group
          ? { [group]: { ...state[group], [option]: newValue?.toString() } }
          : { [option]: newValue?.toString() }),
      };
      onChange(updated);
    }}
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

type FormOptionsType = {
  form: PasswordRulesForm;
  group?: string;
  state: PasswordRules;
  disabled?: boolean;
  onChange: (updated: PasswordRules) => void;
};

export const FormOptions = ({ form, group = '_', state, disabled = false, onChange }: FormOptionsType) => {
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
              disabled={disabled}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustFollowLengthRequirements: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustFollowLengthRequirements?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustFollowLengthRequirements?.label
                ? replaceInputs(form[group]?.mustFollowLengthRequirements?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}MinLength`}
                        key={`${baseInputId}MinLength`}
                        disabled={disabled || state[group].mustFollowLengthRequirements == false}
                        group={group}
                        option="minLength"
                        state={state}
                        errorMessage={form[group]?.minLength?.errMsg}
                        value={state[group].minLength}
                        onChange={onChange}
                      />
                    ),
                    '{1}': (
                      <FormInput
                        id={`${baseInputId}MaxLength`}
                        key={`${baseInputId}MaxLength`}
                        disabled={disabled || state[group].mustFollowLengthRequirements == false}
                        group={group}
                        option="maxLength"
                        state={state}
                        errorMessage={form[group]?.maxLength?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainUpperCaseLetters: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustContainUpperCaseLetters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainUpperCaseLetters?.label
                ? replaceInputs(form[group]?.mustContainUpperCaseLetters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Uppercase`}
                        key={`${baseInputId}Uppercase`}
                        disabled={disabled || state[group].mustContainUpperCaseLetters == false}
                        group={group}
                        option="minUpperCaseLetters"
                        state={state}
                        errorMessage={form[group]?.minUpperCaseLetters?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainLowerCaseLetters: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustContainLowerCaseLetters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainLowerCaseLetters?.label
                ? replaceInputs(form[group]?.mustContainLowerCaseLetters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Lowercase`}
                        key={`${baseInputId}Lowercase`}
                        disabled={disabled || state[group].mustContainLowerCaseLetters == false}
                        group={group}
                        option="minLowerCaseLetters"
                        state={state}
                        errorMessage={form[group]?.minLowerCaseLetters?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainNumericDigits: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustContainNumericDigits?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainNumericDigits?.label
                ? replaceInputs(form[group]?.mustContainNumericDigits?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Digit`}
                        key={`${baseInputId}Digit`}
                        disabled={disabled || state[group].mustContainNumericDigits == false}
                        group={group}
                        option="minNumericDigits"
                        state={state}
                        errorMessage={form[group]?.minNumericDigits?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustContainSpecialCharacters: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustContainSpecialCharacters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustContainSpecialCharacters?.label
                ? replaceInputs(form[group]?.mustContainSpecialCharacters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}SpecialChars`}
                        key={`${baseInputId}SpecialChars`}
                        disabled={disabled || state[group].mustContainSpecialCharacters == false}
                        group={group}
                        option="minSpecialCharacters"
                        state={state}
                        errorMessage={form[group]?.minSpecialCharacters?.errMsg}
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
        {form[group]?.mustNotContainUserName?.visible && (
          <StyledDiv>
            <Checkbox
              id={`${baseCheckboxId}NoUserName`}
              checked={state[group].mustNotContainUserName}
              disabled={disabled}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotContainNumericSequence: !!checked,
                  },
                })
              }
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotRepeatCharacters: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustNotRepeatCharacters?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotRepeatCharacters?.label
                ? replaceInputs(form[group]?.mustNotRepeatCharacters?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}RepeatedChars`}
                        key={`${baseInputId}RepeatedChars`}
                        disabled={disabled || state[group].mustNotRepeatCharacters == false}
                        group={group}
                        option="maxAllowedRepeatedChars"
                        state={state}
                        errorMessage={form[group]?.maxAllowedRepeatedChars?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotReusePasswords: !!checked,
                  },
                })
              }
            />

            <Text {...(form[group]?.mustNotReusePasswords?.errMsg ? { variant: 'error' } : {})}>
              {form[group]?.mustNotReusePasswords?.label
                ? replaceInputs(form[group]?.mustNotReusePasswords?.label, {
                    '{0}': (
                      <FormInput
                        id={`${baseInputId}Variations`}
                        key={`${baseInputId}Variations`}
                        disabled={disabled || state[group].mustNotReusePasswords == false}
                        group={group}
                        option="minPasswordHistoryVariations"
                        state={state}
                        errorMessage={form[group]?.minPasswordHistoryVariations?.errMsg}
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotMatchExactDictionaryWord: !!checked,
                  },
                })
              }
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
              disabled={disabled}
              onChange={(event, checked) =>
                onChange({
                  ...state,
                  [group]: {
                    ...state[group],
                    mustNotMatchPartialDictionaryWord: !!checked,
                  },
                })
              }
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
