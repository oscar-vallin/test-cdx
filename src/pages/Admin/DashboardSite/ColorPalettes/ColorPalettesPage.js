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

import { ADMIN_NAV } from '../../../../data/constants/AdminConstants';
import { useThemeContext } from '../../../../contexts/ThemeContext';
import { defaultTheme, darkTheme } from '../../../../styles/themes';

const getBaseColorPaletteVariant = (mode) => ({
  id: null,
  defaultTheme: false,
  themeColorMode: mode,
  paletteNm: '',
  ...(mode === 'LIGHT') ? defaultTheme : darkTheme,
  custom: undefined,
});

const getThemeVariant = ({ themePrimary, neutralPrimary, black, white }) => ({
  themePrimary: themePrimary,
  themeLighterAlt: chroma(themePrimary).brighten(3.55).hex(),
  themeLighter: chroma(themePrimary).brighten(3.25).hex(),
  themeLight: chroma(themePrimary).brighten(2.85).hex(),
  themeTertiary: chroma(themePrimary).brighten(1.32).hex(),
  themeSecondary: chroma(themePrimary).brighten(0.29).hex(),
  themeDarkAlt: chroma(themePrimary).brighten(0.065).hex(),
  themeDark: chroma(themePrimary).brighten(-0.7).hex(),
  themeDarker: chroma(themePrimary).brighten(-1.2).hex(),
  neutralLighterAlt: chroma(neutralPrimary).brighten(4.3).hex(),
  neutralLighter: chroma(neutralPrimary).brighten(4.17).hex(),
  neutralLight: chroma(neutralPrimary).brighten(4.04).hex(),
  neutralQuaternaryAlt: chroma(neutralPrimary).brighten(3.81).hex(),
  neutralQuaternary: chroma(neutralPrimary).brighten(3.49).hex(),
  neutralTertiaryAlt: chroma(neutralPrimary).brighten(3.33).hex(),
  neutralTertiary: chroma(neutralPrimary).brighten(2.52).hex(),
  neutralSecondary: chroma(neutralPrimary).brighten(1.1).hex(),
  neutralPrimaryAlt: chroma(neutralPrimary).brighten(0.22).hex(),
  neutralPrimary: chroma(neutralPrimary).brighten(-0.47).hex(),
  neutralDark: chroma(neutralPrimary).brighten(-0.47).hex(),
  black,
  white,
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

    setColors({ themePrimary, neutralPrimary, white, black });
    setActiveColor({ key: 'themePrimary', color: themePrimary });

    changeTheme('CUSTOM', {
      themePrimary,
      neutralPrimary,
      white,
      black,
      ...palette
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
    <LayoutAdmin id="PageDefaultTheme" sidebar={ADMIN_NAV} sidebarOptionSelected="colorPalettes">
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
                          ? 'Neutral color'
                          : key === 'black'
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
                onClick={() => alert('123')}
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

