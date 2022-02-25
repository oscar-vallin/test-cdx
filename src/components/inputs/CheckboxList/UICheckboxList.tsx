import { UiField, UiOption } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { CheckboxList } from 'src/components/inputs/CheckboxList/CheckboxList';
import { Text } from 'src/components/typography';
import { OptionRow, PaddedIcon } from './CheckboxList.styles';

type UICheckboxListType = {
  id: string;
  uiField?: UiField;
  options?: UiOption[];
  value?: string[];
  onChange: (selectedValues: string[]) => void;
  emptyMessage?: string;
};

export const UICheckboxList = ({
  id,
  uiField,
  options,
  value,
  onChange,
  emptyMessage = 'No options available',
}: UICheckboxListType) => {
  const renderReadOnlyValues = () => {
    if (value?.length === 0) {
      return (
        <OptionRow>
          <Text variant="muted">No values selected</Text>
        </OptionRow>
      );
    }
    return options
      ?.filter((opt) => value?.find((o) => o === opt?.value))
      ?.map((opt, index) => (
        <OptionRow key={`checkbox_list-${index}`}>
          <Text>
            <PaddedIcon iconName="RadioBullet" />
            {opt.label}
          </Text>
        </OptionRow>
      ));
  };

  return (
    <>
      <UIFormLabel id={`${id}_lbl`} uiField={uiField} />
      {!uiField?.readOnly ? (
        <CheckboxList
          id={id}
          items={options ?? []}
          value={value ?? []}
          onChange={onChange}
          emptyMessage={emptyMessage}
        />
      ) : (
        <div>{renderReadOnlyValues()}</div>
      )}
    </>
  );
};
