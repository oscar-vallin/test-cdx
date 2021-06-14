import React, { useState, useEffect, Fragment } from 'react';

import { Checkbox } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Spinner } from '../../../../components/spinners/Spinner';
import { Row, Column } from '../../../../components/layouts';
import { InputText } from '../../../../components/inputs/InputText';
import { MessageBar } from '../../../../components/notifications/MessageBar';
import { Text } from '../../../../components/typography/Text';
import { PaletteColors } from './PaletteColors';

import { StyledDiv, StyledChoiceGroup, StyledColorPicker } from './ColorPalettesPage.styles';

import { useThemeContext } from '../../../../contexts/ThemeContext';
import { useCurrentUserTheme } from '../../../../hooks/useCurrentUserTheme';
import { useColorPalettes } from '../../../../hooks/useColorPalettes';
import { defaultTheme } from '../../../../styles/themes';

import Theming from './../../../../utils/Theming';

const getThemeVariant = ({ themePrimary, neutralPrimary, white }) => ({
  ...Theming.generate.primary(themePrimary),
  ...Theming.generate.foreground(neutralPrimary, white),
  ...Theming.generate.background(white),
});

const _ColorPalettesPage = () => {
  const { userTheme } = useCurrentUserTheme();
  const { changeTheme, themeConfig } = useThemeContext();
  const {
    colorPalettes,
    isLoadingPalettes,
    isProcessingPalettes,
    palettesUpdated,
    fetchColorPalettes,
    createColorPalette,
    updateColorPalette,
    removeColorPalette,
  } = useColorPalettes();

  const [wantsReset, setWantsReset] = useState(false);
  const [selectedPaletteId, setSelectedPaletteId] = useState(null);

  const [paletteType, setPaletteType] = useState('EXTEND');
  const [enableDarkMode, setEnableDarkMode] = useState(true);

  const [paletteName, setPaletteName] = useState('');
  const [isDefaultPalette, setIsDefaultPalette] = useState(false);
  // const [paletteVariant, setPaletteVariant] = useState('LIGHT'); /* Should come from color palette */

  const [colors, setColors] = useState({
    themePrimary: (themeConfig.themeColorPalettes || [])[0]
  });

  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary
  });

  useEffect(fetchColorPalettes, []);

  useEffect(() => {
    if (palettesUpdated) {
      fetchColorPalettes();
    }
  }, [palettesUpdated]);

  /* PALETTE TYPE -------------- */
  useEffect(() => {
    const defaultVariant = defaultTheme;
    const currentVariant = colorPalettes.find(({ id }) => id === selectedPaletteId) || {};

    const isExtendingPalette = paletteType === 'EXTEND';
    const colors = {
      ...(selectedPaletteId)
        ? {
            themePrimary: currentVariant.themePrimary,
            neutralPrimary: (isExtendingPalette)
              ? defaultVariant.neutralPrimary
              : currentVariant.neutralPrimary,
            white: (isExtendingPalette)
              ? defaultVariant.white
              : currentVariant.white,
          }
        : {
            themePrimary: defaultVariant.themePrimary,
            neutralPrimary: defaultVariant.neutralDark,
            white: defaultVariant.white
          },
    }

    const variant = {
      ...(selectedPaletteId) ? currentVariant : defaultVariant,
      ...colors
    };

    setColors(colors);
    setActiveColor({ key: 'themePrimary', color: variant.themePrimary });
    changeTheme(getThemeVariant({ ...variant, ...colors }));

    setEnableDarkMode(selectedPaletteId
      ? Boolean(currentVariant.allowDark)
      : isExtendingPalette
    );
  }, [paletteType, selectedPaletteId, colorPalettes])

  /* --------------------------- */

  useEffect(() => {
    if (selectedPaletteId) {
      const {
        paletteNm,
        allowDark,
        defaultPalette,
        themePrimary,
        neutralPrimary,
        white,
        themeColorMode,
      } = colorPalettes.find(({ id }) => id === selectedPaletteId);

      setPaletteName(paletteNm);
      setPaletteType(themeColorMode !== null ? 'EXTEND' : 'CUSTOM');
      setEnableDarkMode(Boolean(allowDark));
      setIsDefaultPalette(defaultPalette);
      setColors({ themePrimary, neutralPrimary, white });

      setActiveColor({ key: 'themePrimary', color: themePrimary });
    }
  }, [selectedPaletteId]);

  useEffect(() => {
    if (wantsReset) {
      const variant = getThemeVariant(defaultTheme);
      const { themePrimary, neutralPrimary, white } = defaultTheme;

      setPaletteName('');
      setPaletteType('EXTEND');
      setEnableDarkMode(true);
      setIsDefaultPalette(false);
      setSelectedPaletteId(null);
      setColors({ themePrimary, neutralPrimary, white });
      setActiveColor({ key: 'themePrimary', color: themePrimary });

      changeTheme(variant);
      setWantsReset(false);
    }
  }, [wantsReset]);

  const onColorChange = (evt, { str }) => {
    const variant = getThemeVariant({
      ...colors,
      [activeColor.key]: str,
    });

    setColors({ ...colors, [activeColor.key]: str });
    setActiveColor({ ...activeColor, color: str });

    changeTheme(variant);
  };

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="COLOR_PALETTES">
      <Spacing margin="double">
        {
          isLoadingPalettes
            ? <Spacing margin={{ top: 'double' }}>
                <Spinner size="lg" label="Loading color palettes" />
              </Spacing>
            : (
              <Fragment>
                <Row>
                  <Column xxl="6" xl="9" lg="12">
                    <StyledDiv>
                      {
                        colorPalettes?.length > 0
                          ? (
                            <StyledChoiceGroup
                              inline={true}
                              label="Color palettes"
                              selectedKey={selectedPaletteId}
                              disabled={false}
                              onChange={(evt, { key }) => setSelectedPaletteId(key)}
                              options={colorPalettes?.map(item => ({ key: item.id, text: item.paletteNm })) || []}
                            />
                          )
                          : <MessageBar type="warning" content="No color palettes found" />
                      }
                    </StyledDiv>
                  </Column>
                </Row>

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Separator />
                </Spacing>

                {
                  false
                    ? <Spacing margin={{ top: 'double' }}>
                      <Spinner size="lg" label="Loading color palette" />
                    </Spacing>
                    : (
                      <Fragment>
                        <Row>
                          <Column>
                            <Spacing margin={{ bottom: 'normal' }}>
                              <Text variant="bold">
                                {!selectedPaletteId
                                  ? 'Create new palette'
                                  : 'Update palette'
                                }
                              </Text>
                            </Spacing>
                          </Column>
                        </Row>

                        <Row>
                          <Column xxl="6" xl="12">
                            <Spacing margin={{ bottom: 'normal' }}>
                              <InputText
                                required
                                label="Palette name"
                                value={paletteName}
                                onChange={({ target }) => setPaletteName(target.value)}
                              />

                              <Spacing margin={{ top: 'normal' }}>
                                <Checkbox
                                  label="Set as the default palette for the organization"
                                  checked={isDefaultPalette}
                                  onChange={(event, isDefault) => setIsDefaultPalette(isDefault)}
                                />
                              </Spacing>
                            </Spacing>
                          </Column>
                        </Row>
                        
                        <br />

                        <Row>
                          <Column xxl="3" xl="6" lg="12">
                            <Spacing margin={{ bottom: 'small' }}>
                              <Text size="small" variant="semiBold">
                                What would you like to do?
                              </Text>
                            </Spacing>

                            <StyledChoiceGroup
                              selectedKey={paletteType}
                              options={[
                                { key: 'EXTEND', text: 'Customize the original palette' },
                                { key: 'CUSTOM', text: 'Create a palette from scratch' },
                              ]}
                              onChange={(evt, { key }) => setPaletteType(key)}
                            />
                          </Column>

                          {
                            paletteType === 'EXTEND' && (
                              <Column xxl="3" xl="6" lg="12">
                                <Spacing margin={{ bottom: 'normal' }}>
                                  <Text size="small" variant="semiBold">Color modes</Text>
                                </Spacing>

                                <Checkbox
                                  label="Enable dark mode for this palette"
                                  checked={enableDarkMode}
                                  onChange={(event, enabled) => setEnableDarkMode(enabled)}
                                />
                              </Column>
                            )
                          }
                        </Row>

                        <Spacing margin={{ top: 'normal' }}>
                          <Row>
                            <Column xxl="3" xl="6" lg="12">
                              <PaletteColors
                                colors={colors}
                                type={paletteType}
                                selected={activeColor.key}
                                onChange={setActiveColor}
                              />
                            </Column>
                            <Column xxl="3" xl="6" lg="12" right={true}>
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
                                disabled={isProcessingPalettes}
                                text={!selectedPaletteId ? "Create palette" : "Update palette"}
                                onClick={() => {
                                  const params = {
                                    themeColorMode: paletteType === 'EXTEND' ? 'LIGHT' : null,
                                    defaultPalette: isDefaultPalette,
                                    allowDark: enableDarkMode,
                                    paletteNm: paletteName,
                                    ...getThemeVariant({ ...colors }),
                                  }

                                  if (!selectedPaletteId) {
                                    createColorPalette(params);
                                    setWantsReset(true);
                                  } else {
                                    updateColorPalette(selectedPaletteId, params);
                                  }
                                }}
                              />

                              <span>&nbsp;</span>

                              <Button
                                variant="secondary"
                                text="Discard changes"
                                disabled={isProcessingPalettes}
                                onClick={() => setWantsReset(true)}
                              />

                              <span>&nbsp;</span>

                              {
                                selectedPaletteId && (
                                  <Button
                                    variant="danger"
                                    disabled={isProcessingPalettes}
                                    text="Delete palette"
                                    onClick={() => {
                                      removeColorPalette(selectedPaletteId);
                                      setWantsReset(true);
                                    }}
                                  />
                                )
                              }
                            </StyledDiv>
                          </Column>
                        </Row>
                      </Fragment>
                    )
                }
              </Fragment>
            )
        }
      </Spacing>
    </LayoutAdmin>
  );
};

const ColorPalettesPage = React.memo(_ColorPalettesPage);

export { ColorPalettesPage };

