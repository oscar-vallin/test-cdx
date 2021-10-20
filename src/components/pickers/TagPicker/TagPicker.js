import { useEffect, useState, useCallback, useRef } from 'react';
import { TagPicker } from '@fluentui/react/lib/Pickers';
import { Label } from '@fluentui/react/lib-commonjs/Label';

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
}) => {
  const [selectedItems, setSelectedItems] = useState(value);
  const [items, setItems] = useState(options);
  const picker = useRef(null);
  const getTextFromItem = ({ name }) => name;
  const filterSelectedTags = (filterText) =>
    filterText ? items.filter((tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];

  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }

    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  useEffect(() => setItems(options), [options]);
  useEffect(() => setSelectedItems(value), [value]);

  return (
    <>
      {label && <Label required={required}>{label}</Label>}

      <TagPicker
        onResolveSuggestions={onResolveSuggestions || filterSelectedTags}
        onItemSelected={(item) => {
          if (!listContainsTagList(item, value)) {
            onItemSelected(item);
          }
        }}
        // onRemoveItem={onRemoveItem}
        getTextFromItem={getTextFromItem}
        componentRef={picker}
        itemLimit={itemLimit}
        disabled={disabled}
        selectedItems={selectedItems}
        resolveDelay={debounce}
        pickerSuggestionsProps={
          pickerProps || {
            suggestionsHeaderText: 'Suggestions',
            noResultsFoundText: 'No items found',
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
