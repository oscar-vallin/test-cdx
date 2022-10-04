import React from 'react';
import {
  FontIcon,
  IDropdownOption,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { buildDropdownTimeOption } from './DropdownCommon';
import { StyledError, ThemeDropdown } from './InputDropdown.styles';
import { TIME } from './TimeValues';

type UIInputMultiSelectType = {
    id: string;
    uiFieldHour?: UiSelectOneField | null;
    uiFieldMinute?: UiSelectOneField | null;
    value?: string;
    placeholder?: string;
    options?: Maybe<Array<Maybe<UiOptions>>>;
    onChange?: (newValue?: string) => void | null;
  };

export const UITimeSelectOneField = ({
  id, value, uiFieldHour, uiFieldMinute, placeholder, onChange,
}: UIInputMultiSelectType) => {
  const handleChange = (e: React.FormEvent<HTMLDivElement>, newValue?: IDropdownOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  };

  const onRenderError = () => {
    if (uiFieldHour?.errMsg) {
      return (
        <StyledError>
          <TooltipHost id={`${id}-error`} content={uiFieldHour.errMsg}>
            <FontIcon iconName="Warning" style={{ color: 'red' }} />
          </TooltipHost>
        </StyledError>
      );
    }
    if (uiFieldMinute?.errMsg) {
      return (
        <StyledError>
          <TooltipHost id={`${id}-error`} content={uiFieldMinute.errMsg}>
            <FontIcon iconName="Warning" style={{ color: 'red' }} />
          </TooltipHost>
        </StyledError>
      );
    }
    return null;
  }

  if (uiFieldMinute?.visible === false || uiFieldHour?.visible === false) {
    return null;
  }

  return (
    <Stack>
      <ThemeDropdown
        id={id}
        dropdownWidth="auto"
        calloutProps={{ calloutMaxHeight: 200 }}
        selectedKey={value}
        placeholder={placeholder}
        onChange={handleChange}
        multiSelect={false}
        options={buildDropdownTimeOption(TIME)}
      />
      {onRenderError()}
    </Stack>
  );
};
