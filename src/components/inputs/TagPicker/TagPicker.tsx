import { ReactElement, useCallback, useRef } from 'react';
import { StyledTagPicker } from 'src/components/inputs/TagPicker/TagPicker.styles';
import { UiField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { ITag } from '@fluentui/react';

type CDXTagPickerProps = {
  id?: string;
  uiField?: UiField | null;
  disabled?: any;
  pickerProps?: any;
  value?: ITag[];
  options?: ITag[];
  onChange?: (items?: ITag[]) => void | null;
  doSearch?: (filter: string, selectedItems?: ITag[]) => ITag[] | PromiseLike<ITag[]>;
  debounce?: number;
  onBlur?: any | null;
  onFocus?: any | null;
};

const CDXTagPicker = ({
  uiField,
  disabled,
  pickerProps,
  value,
  options,
  onChange,
  doSearch,
  debounce = 500,
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
        onResolveSuggestions={doSearch ? doSearch : () => options ?? []}
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
          placeholder: disabled ? '' : 'Type to Search'
        }}
      />
    </>
  );
};

export { CDXTagPicker };
