import React from 'react';

import { ChoiceGroup } from '@fluentui/react';
import { StyledColorPreview, StyledPreview } from './../ColorPalettesPage.styles';

const labels = ['Primary color', 'Text color', 'Background color'];

const PaletteColors = ({ type, colors, selected, onChange }) => {
  return (
    <ChoiceGroup
      label="Color Palette"
      selectedKey={selected}
      options={
        Object
          .keys(colors)
          .filter(key => (type === 'EXTEND') ? key === 'themePrimary' : true)
          .map((key, index) => ({
            key,
            label: labels[index],
            onRenderField: (props, render) => {
              const key = props.id.split('-').pop();

              return (
                <StyledPreview>
                  {render(props)}

                  <StyledColorPreview color={colors[key]} />

                  <span>{props.label}</span>
                </StyledPreview>
              )
            }
          }))
      }
      onChange={(evt, { key }) => onChange({ key, color: colors[key] })}
    />
  )
}

export default PaletteColors;