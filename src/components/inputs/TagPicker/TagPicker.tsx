import { ReactElement, useCallback, useRef } from 'react';
import { StyledTagPicker } from 'src/components/inputs/TagPicker/TagPicker.styles';
import { UiField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';

const defaultProps = {
  value: [],
  options: [],
  // onChange: (param) => null,
  // apiQuery: (param) => null,
  debounce: 500,
};

type CDXTagPickerProps = {
  id?: string;
  uiField?: UiField;
  disabled?: any;
  pickerProps?: any;
  value?: any[];
  options?: any;
  onChange?: any | null;
  apiQuery?: (searchText: string) => void | null;
  debounce?: number;
  onBlur?: any | null;
  onFocus?: any | null;
  required?: any;
} & typeof defaultProps;

const CDXTagPicker = ({
  uiField,
  disabled,
  pickerProps,
  value,
  options,
  onChange,
  apiQuery,
  debounce,
  onBlur,
  onFocus,
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
      {uiField && (
        <UIFormLabel id="__TagPickerLabel"
                     uiField={uiField}/>
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
            loadingText: 'Searching...',
            searchingText: 'Searching...',
          }
        }
        disabled={disabled}
        inputProps={{
          id,
          onBlur,
          onFocus,
        }}
      />
    </>
  );
};

CDXTagPicker.defaultProps = defaultProps;

export { CDXTagPicker };
