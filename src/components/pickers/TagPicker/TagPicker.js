import { useCallback, useRef } from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { StyledTagPicker } from './TagPicker.styles';

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
  apiQuery = null,
  debounce = 500,
  onBlur,
  onFocus,
  required,
  id,
}) => {
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

      <StyledTagPicker
        style={{ width: '100%' }}
        onResolveSuggestions={onResolveSuggestions || filterSelectedTags}
        onItemSelected={handleItemSelection}
        onRemoveItem={onRemoveItem}
        getTextFromItem={getTextFromItem}
        componentRef={picker}
        itemLimit={itemLimit}
        disabled={disabled}
        selectedItems={value}
        resolveDelay={debounce}
        onResolveSuggestions={(text, selectedItems) => {
          if (apiQuery) {
            apiQuery(text);
          }

          return selectedItems;
        }}
        pickerSuggestionsProps={
          pickerProps || {
            suggestionsHeaderText: 'Search',
            noResultsFoundText: 'No results found',
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

CDXTagPicker.propTypes = {};

export { CDXTagPicker };
