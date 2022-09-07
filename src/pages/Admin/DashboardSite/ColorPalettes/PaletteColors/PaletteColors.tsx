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
}: PaletteColorsProps): ReactElement => (
  <ChoiceGroup
    label="Color Palette"
    selectedKey={selected}
    options={Object.keys(colors)
      .filter((key) => (type === 'EXTEND' ? key === 'themePrimary' : true))
      .map((key, index) => ({
        text: '',
        key,
        label: labels[index],
        onRenderField: (props: any, render: any) => {
          const colorKey = props.id.split('-').pop();

          return (
            <StyledPreview>
              {render(props)}

              <StyledColorPreview color={colors[colorKey]} />

              <span>{props.label}</span>
            </StyledPreview>
          );
        },
      }))}
    onChange={(evt, { key }: any) => onChange({ key, color: colors[key] })}
  />
);

PaletteColors.defaultProps = defaultProps;

export default PaletteColors;
