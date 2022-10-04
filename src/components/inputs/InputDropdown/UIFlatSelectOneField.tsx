import React from 'react';
import {
  FontIcon,
  IDropdownOption,
  IStackTokens,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { buildDropdownOption } from './DropdownCommon';
import { ThemeDropdown, StyledError } from './InputDropdown.styles';

type UIInputMultiSelectType = {
    id: string;
    uiField?: UiSelectOneField | null;
    options?: Maybe<Array<Maybe<UiOptions>>>;
    value?: string;
    disabled?: boolean;
    onChange?: (newValue?: string) => void | null;
    placeholder?: string;
    optionNumber?: boolean;
  };

export const UIFlatSelectOneField = ({
  id, uiField, options, value, disabled, onChange, placeholder, optionNumber,
}: UIInputMultiSelectType) => {
  const handleChange = (e: React.FormEvent<HTMLDivElement>, newValue?: IDropdownOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  };

  const onRenderTitle = (iconOptions): JSX.Element => {
    const option = iconOptions[0];

    return (
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        {option.data && option.data.infoIcon && (
          <InfoIcon id={`${id}-Info`} tooltip={option.data.infoIcon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  const onRenderError = () => {
    if (uiField?.errMsg) {
      return (
        <StyledError>
          <TooltipHost id={`${id}-error`} content={uiField.errMsg}>
            <FontIcon iconName="Warning" style={{ color: 'red' }} />
          </TooltipHost>
        </StyledError>
      );
    }
    return null;
  }

  if (uiField?.visible === false) {
    return null;
  }

  const stackTokens: IStackTokens = { childrenGap: 20 };
  return (
    <Stack horizontal tokens={stackTokens} verticalAlign="end">
      <ThemeDropdown
        dropdownWidth={!optionNumber ? 'auto' : 80}
        id={id}
        calloutProps={{ calloutMaxHeight: 200 }}
        selectedKey={value}
        disabled={disabled}
        onRenderTitle={onRenderTitle}
        onChange={handleChange}
        multiSelect={false}
        placeholder={placeholder}
        options={buildDropdownOption(uiField, options)}
      />
      {onRenderError()}
    </Stack>
  );
};
