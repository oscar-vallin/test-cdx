import { ReactElement } from 'react';
import { ChoiceGroup } from '@fluentui/react';
import { StyledColorPreview, StyledPreview } from '../ColorPalettesPage.styles';

const labels = ['Primary color', 'Text color', 'Background color'];

const defaultProps = {
  type: '',
  onChange: () => null,
};

type PaletteColorsProps = {
  type?: string;
  colors?: any;
  selected?: any;
  onChange?: any | null;
} & typeof defaultProps;

const PaletteColors = ({
  type, colors, selected, onChange,
}: PaletteColorsProps): ReactElement => {
  const renderField = (props, render) => {
    const colorKey = props.id.split('-').pop();

    return (
      <StyledPreview>
        {render(props)}

        <StyledColorPreview color={colors[colorKey]} />

        <span>{props.label}</span>
      </StyledPreview>
    );
  };
  return (
    <ChoiceGroup
      label="Color Palette"
      selectedKey={selected}
      options={Object.keys(colors)
        .filter((key) => (type === 'EXTEND' ? key === 'themePrimary' : true))
        .map((key, index) => ({
          text: '',
          key,
          label: labels[index],
          onRenderField: renderField,
        }))}
      onChange={(evt, { key }: any) => onChange({ key, color: colors[key] })}
    />
  )
};

PaletteColors.defaultProps = defaultProps;

export default PaletteColors;
