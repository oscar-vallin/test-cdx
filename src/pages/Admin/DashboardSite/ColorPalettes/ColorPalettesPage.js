import React, { useState, useEffect, useCallback, Fragment }  from 'react';
import chroma from 'chroma-js';

import { ChoiceGroup } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { InputText } from '../../../../components/inputs/InputText';
import { StyledDiv, StyledChoiceGroup, StyledColorPicker, StyledCommandButton } from './ColorPalettesPage.styles';

import { useThemeContext } from '../../../../contexts/ThemeContext';
import { defaultTheme, darkTheme } from '../../../../styles/themes';

import Theming from './../../../../utils/Theming';

const getBaseColorPaletteVariant = (mode) => ({
  id: null,
  defaultTheme: false,
  themeColorMode: mode,
  paletteNm: '',
  ...(mode === 'LIGHT') ? defaultTheme : darkTheme,
  custom: undefined,
});

const getThemeVariant = ({ themePrimary, neutralPrimary, white }) => ({
  ...Theming.generate.primary(themePrimary),
  ...Theming.generate.foreground(neutralPrimary, white),
  ...Theming.generate.background(white),
})

const _ColorPalettesPage = () => {
  const { changeTheme, themeConfig } = useThemeContext();
  const [theme, setTheme] = useState('LIGHT');

  const [isCreatingPalette, setIsCreatingPalette] = useState(false);
  const [isProcessingPalette, setIsProcessingPalette] = useState(false);

  const [paletteVariant, setPaletteVariant] = useState('LIGHT');
  const [paletteName, setPaletteName] = useState('');

  const [colors, setColors] = useState({});
  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary
  });

  useEffect(() => {
    const {
      themePrimary,
      neutralPrimary,
      white,
      black,
      ...palette
    } = (paletteVariant === 'LIGHT') ? defaultTheme : darkTheme;

    setColors({ themePrimary, neutralPrimary, white });
    setActiveColor({ key: 'themePrimary', color: themePrimary });

    changeTheme('CUSTOM', {
      ...palette,
      themePrimary,
      neutralPrimary,
      white,
    });
  }, [paletteVariant]);

  /* -------------------------- */

  // const [themeVariant, setThemeVariant] = useState(
  //   activeTheme ? JSON.parse(activeTheme) : getThemeVariant({ themePrimary: '#0078d4' })
  // );

  // const [colors, setColors] = useState({
  //   themePrimary: themeVariant.themeColors.themePrimary,
  //   neutralPrimary: themeVariant.themeColors.neutralPrimary,
  //   white: themeVariant.themeColors.white,
  //   black: themeVariant.themeColors.black,
  // });
  
  
  const onColorChange = useCallback((evt, { hex }) => {
    const variant = getThemeVariant({ ...colors, [activeColor.key]: `#${hex}` });
  
    setColors({ ...colors, [activeColor.key]: `#${hex}` });
    setActiveColor({ ...activeColor, color: `#${hex}` });

    // setThemeVariant(variant);
    changeTheme('CUSTOM', variant);
  });

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="COLOR_PALETTES">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <StyledDiv>
              <StyledChoiceGroup
                label="Color Palettes"
                defaultSelectedKey={theme}
                disabled={isCreatingPalette}
                options={themeConfig.themeColorModes?.map(item => ({
                    key: item,
                    text: `${item.charAt(0)}${item.slice(1).toLowerCase()}`
                  })) || []
                }
                onChange={(evt, { key }) => setTheme(key)}
              />

              <StyledCommandButton
                iconProps={{ iconName: 'Add' }}
                onClick={() => setIsCreatingPalette(true)}
              >
                New palette
              </StyledCommandButton>
            </StyledDiv>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        {
          isCreatingPalette && (
            <Fragment>
              <Row>
                <Column lg="2">
                  <InputText
                    required
                    label="Palette name"
                    value={paletteName}
                    onChange={({ target }) => setPaletteName(target.value)}
                  />
                </Column>

                <Column lg="3">
                  <Spacing margin={{ left: 'normal' }}>
                    <StyledChoiceGroup
                      label="Color mode"
                      defaultSelectedKey={theme}
                      options={[
                        { key: 'LIGHT', text: 'Light' },
                        { key: 'DARK', text: 'Dark' },
                      ]}
                      onChange={(evt, { key }) => setPaletteVariant(key)}
                    />
                  </Spacing>
                </Column>
              </Row>
            </Fragment>
          )
        }

        <Spacing margin={{ top: 'normal' }}>
          <Row>
            <Column lg="4">
              <ChoiceGroup
                label="Color Palette"
                defaultSelectedKey={activeColor.key}
                options={
                  Object
                    .keys(colors)
                    .map(key => ({
                      key,
                      label: key === 'themePrimary'
                        ? 'Primary color'
                        : key === 'neutralPrimary'
                          ? 'Text color'
                          : 'Background color',
                      onRenderField: (props, render) => {
                        const key = props.id.split('-').pop();

                        return (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {render(props)}

                            <div style={{
                              height: 30,
                              width: 30,
                              margin: `0 15px`,
                              border: '1px solid #d0d0d0',
                              background: colors[key]
                            }} />

                            <span>{props.label}</span>
                          </div>
                        )
                      }
                    }))
                }
                onChange={(evt, { key }) => setActiveColor({ ...activeColor, key })}
              />
            </Column>
            <Column lg="4" right={true}>
              <StyledColorPicker
                showPreview={false}
                alphaType={'none'}
                color={activeColor.color}
                onChange={onColorChange}
              />
            </Column>
          </Row>
        </Spacing>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <Row>
          <Column lg="9">
            <StyledDiv>
              <Button
                variant="primary"
                disabled={isProcessingPalette}
                text={isCreatingPalette ? "Create palette" : "Save changes"}
                onClick={() => {
                  Theming.generate.foreground('#fff', '#16004d');
                }}
              />

              {
                isCreatingPalette && (
                  <Spacing margin={{ left: 'normal' }}>
                    <Button
                      text="Discard changes"
                      disabled={isProcessingPalette}
                      onClick={() => {
                        setPaletteName('');
                        setIsCreatingPalette(false);
                        setPaletteVariant('LIGHT');
                      }}
                    />
                  </Spacing>
                )
              }
            </StyledDiv>
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const ColorPalettesPage = React.memo(_ColorPalettesPage);

export { ColorPalettesPage };

