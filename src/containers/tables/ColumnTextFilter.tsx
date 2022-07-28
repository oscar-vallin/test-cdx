import { useBoolean } from '@fluentui/react-hooks';
import { FontIcon, Callout, SearchBox, DirectionalHint, PrimaryButton, Stack } from '@fluentui/react';
import { useState } from 'react';

type ColumnTextFilterType = {
  id: string;
  filteredValue: string;
  onFilter: (filterText?: string) => void;
};

export const ColumnTextFilter = ({ id, filteredValue, onFilter }: ColumnTextFilterType) => {
  const [text, setText] = useState<string>(filteredValue);
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);

  const doFilter = (filterText?: string) => {
    onFilter(filterText);
    toggleIsCalloutVisible();
  };

  const renderCallout = () => {
    if (!isCalloutVisible) {
      return null;
    }
    return (
      <Callout
        id={`${id}_callout`}
        style={{
          width: 320,
          maxWidth: '90%',
          padding: '20px 24px',
        }}
        role="dialog"
        gapSpace={0}
        target={`#${id}_icon`}
        onDismiss={toggleIsCalloutVisible}
        directionalHint={DirectionalHint.bottomAutoEdge}
        setInitialFocus
      >
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item>
            <SearchBox
              id={`${id}_filter`}
              placeholder="Filter"
              iconProps={{ iconName: 'Filter' }}
              value={text}
              onChange={(ev, newValue) => {
                setText(newValue ?? '');
              }}
              onSearch={doFilter}
              onClear={() => setText('')}
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton
              id={`${id}_apply`}
              onClick={() => {
                doFilter(text);
              }}
              text="Apply"
            />
          </Stack.Item>
        </Stack>
      </Callout>
    );
  };

  return (
    <>
      <FontIcon
        id={`${id}_icon`}
        style={{ cursor: 'pointer' }}
        iconName={filteredValue ? 'FilterSolid' : 'Filter'}
        aria-label={filteredValue ? `Filtered by "${filteredValue}"` : 'Filter'}
        title={filteredValue ? `Filtered by "${filteredValue}"` : 'Filter'}
        onClick={toggleIsCalloutVisible}
      />
      {renderCallout()}
    </>
  );
};
