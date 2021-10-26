import { ReactElement, useCallback, useRef } from 'react';
import { TagPicker } from '@fluentui/react/lib/Pickers';
import { Label } from '@fluentui/react/lib-commonjs/Label';

const defaultProps = {
  label: '',
  disabled: '',
  itemLimit: '',
  pickerProps: '',
  value: [],
  options: [],
  onItemSelected: () => {},
  onRemoveItem: () => {},
  onResolveSuggestions: () => null,
  debounce: 300,
  onBlur: () => null,
  onFocus: () => null,
  required: true,
  id: '',
};

type CDXTagPickerProps = {
  label?: string;
  disabled?: any;
  itemLimit?: any;
  pickerProps?: any;
  value?: string[];
  options?: string[];
  onItemSelected?: any | null;
  onRemoveItem?: ReactElement;
  onResolveSuggestions?: any | null;
  debounce?: number;
  onBlur?: any | null;
  onFocus?: any | null;
  required?: boolean;
  id?: string;
  diseable?: any;
  name?: string;
} & typeof defaultProps;

const CDXTagPicker = ({
  label,
  disabled,
  itemLimit,
  pickerProps,
  value = [],
  options = [],
  onItemSelected = () => {},
  onRemoveItem = () => {},
  onResolveSuggestions,
  debounce = 300,
  onBlur,
  onFocus,
  required,
  id,
}: CDXTagPickerProps): ReactElement => {
  const picker = useRef(null);
  const getTextFromItem = ({ name }) => name;
  const filterSelectedTags = (filterText) =>
    filterText ? options.filter((tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];

  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const handleItemSelection = useCallback((item) => {
    onItemSelected(item);

    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }

    return item;
  }, []);

  return (
    <>
      {label && <Label required={required}>{label}</Label>}

      <TagPicker
        onResolveSuggestions={onResolveSuggestions || filterSelectedTags}
        onItemSelected={handleItemSelection}
        onRemoveItem={onRemoveItem}
        getTextFromItem={getTextFromItem}
        componentRef={picker}
        itemLimit={itemLimit}
        disabled={disabled}
        selectedItems={value}
        resolveDelay={debounce}
        pickerSuggestionsProps={
          pickerProps || {
            suggestionsHeaderText: 'Suggested tags',
            noResultsFoundText: 'No color tags found',
          }
        }
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
