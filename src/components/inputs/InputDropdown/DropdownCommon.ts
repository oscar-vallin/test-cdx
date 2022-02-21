import { IComboBoxOption } from '@fluentui/react';
import { Maybe, UiOptions, UiSelectManyField, UiSelectOneField } from 'src/data/services/graphql';

export const buildComboBoxOptions = (
  uiField?: UiSelectOneField | UiSelectManyField | null,
  options?: Maybe<Array<Maybe<UiOptions>>>
): IComboBoxOption[] => {
  if (uiField && uiField.options && options) {
    // first find the matching UiOption array
    const uiOptions = options.find((value) => value?.key === uiField.options);
    if (uiOptions?.values) {
      return uiOptions.values.map((value): IComboBoxOption => {
        return {
          key: value?.value ?? '',
          text: value?.label ?? '',
        };
      });
    }
  }
  return [
    {
      key: '',
      text: '<No Options available>',
      disabled: true,
    },
  ];
};
