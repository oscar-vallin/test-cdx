import { useCallback, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { StyledTagPicker } from './TagPicker.styles';

const CDXTagPicker = ({
  label,
  disabled,
  itemLimit,
  pickerProps,
  value = [],
  options = [],
  onItemSelected = (param) => null,
  onRemoveItem = (param) => null,
  onResolveSuggestions,
  apiQuery = (param) => null,
  debounce = 500,
  onBlur,
  onFocus,
  required,
  id,
}) => {
  const picker = useRef(null);
  const getTextFromItem = ({ name }) => name;

  const filterSelectedTags = (filterText) => {
    return options.filter(({ key }) => !value.includes(key));
  };

  const listContainsTag = (tag, tagList) => {
    if (!tagList || !tagList.length) {
      return false;
    }

    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const handleItemSelection = useCallback(
    (item) => {
      if (!listContainsTag(item, value)) {
        onItemSelected(item);
      }
    },
    [value]
  );

  return (
    <>
      {label && <Label required={required}>{label}</Label>}

      <StyledTagPicker
        onItemSelected={handleItemSelection}
        onRemoveItem={(x) => console.log(x)}
        getTextFromItem={getTextFromItem}
        componentRef={picker}
        itemLimit={itemLimit}
        disabled={disabled}
        selectedItems={value}
        resolveDelay={debounce}
        onResolveSuggestions={(text) => {
          if (apiQuery) {
            apiQuery(text);
          }

          return filterSelectedTags(text);
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
