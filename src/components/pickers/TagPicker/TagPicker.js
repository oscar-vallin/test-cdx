import { useCallback, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { StyledTagPicker } from './TagPicker.styles';

const CDXTagPicker = ({
  label,
  disabled,
  pickerProps,
  value = [],
  options = [],
  onChange = (param) => null,
  apiQuery = (param) => null,
  debounce = 500,
  onBlur,
  onFocus,
  required,
  id,
}) => {
  const picker = useRef(null);

  const handleItemSelection = useCallback((item) => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }

    return item;
  }, []);

  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const filterSelectedTags = (filterText, tagList) => {
    return filterText ? options.filter((tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  };

  const getTextFromItem = (item) => item.name;

  return (
    <>
      {label && <Label required={required}>{label}</Label>}

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

CDXTagPicker.propTypes = {};

export { CDXTagPicker };
