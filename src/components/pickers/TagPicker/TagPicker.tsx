import { ReactElement, useCallback, useRef } from 'react';
import { Label } from '@fluentui/react';
import { StyledTagPicker } from './TagPicker.styles';

const defaultProps = {
  value: [],
  options: [],
  // onChange: (param) => null,
  // apiQuery: (param) => null,
  debounce: 500,
};

type CDXTagPickerProps = {
  id?: string;
  label?: string;
  disabled?: any;
  pickerProps?: any;
  value?: any[];
  options?: any;
  onChange?: any | null;
  apiQuery?: any | null;
  debounce?: number;
  onBlur?: any | null;
  onFocus?: any | null;
  required?: any;
} & typeof defaultProps;

const CDXTagPicker = ({
  label,
  disabled,
  pickerProps,
  value,
  options,
  onChange,
  apiQuery,
  debounce,
  onBlur,
  onFocus,
  required,
  id,
}: CDXTagPickerProps): ReactElement => {
  const picker: any = useRef(null);

  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const handleItemSelection = useCallback((item) => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }

    return item;
  }, []);

  const filterSelectedTags: any = (filterText) => {
    return filterText ? options.filter((tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  };

  const getTextFromItem = (item) => item.name;

  return (
    <>
      {label && (
        <Label id="__TagPickerLabel" required={required}>
          {label}
        </Label>
      )}

      <StyledTagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onResolveSuggestions={(text) => {
          if (apiQuery) {
            apiQuery(text);
          }

          return filterSelectedTags(text);
        }}
        selectedItems={value}
        onItemSelected={handleItemSelection}
        onChange={onChange}
        resolveDelay={debounce}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={
          pickerProps || {
            suggestionsHeaderText: 'Search',
            noResultsFoundText: 'No results found',
          }
        }
        disabled={disabled}
        inputProps={{
          ...(onBlur ? { onBlur } : {}),
          ...(onFocus ? { onFocus } : {}),
          ...(id ? { id } : {}),
        }}
      />
    </>
  );
};

CDXTagPicker.defaultProps = defaultProps;

export { CDXTagPicker };
