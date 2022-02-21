/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';

import { Checkbox } from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { LightSeparator } from 'src/components/separators/Separator';
import { Spacing } from 'src/components/spacings/Spacing';
import { Spinner } from 'src/components/spinners/Spinner';
import { Row, Column, Container } from 'src/components/layouts';
import { InputText } from 'src/components/inputs/InputText';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { PageTitle, Text } from 'src/components/typography';

import { useThemeContext } from 'src/contexts/ThemeContext';
import { useColorPalettes } from 'src/hooks/useColorPalettes';
import { defaultTheme } from 'src/styles/themes';

import Theming from 'src/utils/Theming';
import { useNotification } from 'src/hooks/useNotification';
import { StyledDiv, StyledChoiceGroup, StyledColorPicker } from './ColorPalettesPage.styles';
import { PaletteColors } from './PaletteColors';
import { ROUTE_COLOR_PALETTES } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

const getThemeVariant = ({ themePrimary, neutralPrimary, white }) => ({
  ...Theming.generate.primary(themePrimary),
  ...Theming.generate.foreground(neutralPrimary, white),
  ...Theming.generate.background(white),
});

const _ColorPalettesPage = () => {
  const Toast = useNotification();
  const { changeTheme, themeConfig }: any = useThemeContext();
  const {
    colorPalettes,
    isLoadingPalettes,
    isCreatingPalette,
    isProcessingPalettes,
    palettesUpdated,
    fetchColorPalettes,
    createColorPalette,
    updateColorPalette,
    removeColorPalette,
  }: any = useColorPalettes();

  const [wantsReset, setWantsReset] = useState(false);
  const [selectedPaletteId, setSelectedPaletteId]: any = useState(null);

  const [paletteType, setPaletteType] = useState('EXTEND');
  const [enableDarkMode, setEnableDarkMode] = useState(true);

  const [paletteName, setPaletteName] = useState('');
  const [isDefaultPalette, setIsDefaultPalette] = useState(false);

  const [colors, setColors]: any = useState({
    themePrimary: (themeConfig.themeColorPalettes || [])[0],
  });

  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary,
  });

  useEffect(fetchColorPalettes, []);

  useEffect(() => {
    if (palettesUpdated) {
      fetchColorPalettes();

      Toast.success({ text: 'Palette saved successfully' });
    }
  }, [palettesUpdated]);

  /* PALETTE TYPE -------------- */
  useEffect(() => {
    const defaultVariant = defaultTheme;
    const currentVariant = colorPalettes.find(({ id }: any) => id === selectedPaletteId) || {};

    const isExtendingPalette = paletteType === 'EXTEND';
    const paletteColors = {
      ...(selectedPaletteId
        ? {
            themePrimary: currentVariant.themePrimary,
            neutralPrimary: isExtendingPalette ? defaultVariant.neutralPrimary : currentVariant.neutralPrimary,
            white: isExtendingPalette ? defaultVariant.white : currentVariant.white,
          }
        : {
            themePrimary: defaultVariant.themePrimary,
            neutralPrimary: defaultVariant.neutralDark,
            white: defaultVariant.white,
          }),
    };

    const variant = {
      ...(selectedPaletteId ? currentVariant : defaultVariant),
      ...paletteColors,
    };

    setColors(paletteColors);
    setActiveColor({ key: 'themePrimary', color: variant.themePrimary });
    changeTheme(getThemeVariant({ ...variant, ...paletteColors }));

    setEnableDarkMode(selectedPaletteId ? Boolean(currentVariant.allowDark) : isExtendingPalette);
  }, [paletteType, selectedPaletteId, colorPalettes]);

  /* --------------------------- */

  useEffect(() => {
    if (selectedPaletteId) {
      const { paletteNm, allowDark, defaultPalette, themePrimary, neutralPrimary, white, themeColorMode } =
        colorPalettes.find(({ id }) => id === selectedPaletteId);

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
    <LayoutDashboard id="PageDefaultTheme" menuOptionSelected={ROUTE_COLOR_PALETTES.API_ID}>
      <Container>
        {isLoadingPalettes ? (
          <Spacing margin={{ top: 'double' }}>
            <Spinner size="lg" label="Loading color palettes" />
          </Spacing>
        ) : (
          <>
            <Row>
              <Column xxl="6" xl="9" lg="12">
                <StyledDiv>
                  {colorPalettes?.length > 0 ? (
                    <StyledChoiceGroup
                      inline
                      label="Color palettes"
                      selectedKey={selectedPaletteId}
                      disabled={false}
                      onChange={(evt, { key }: any) => setSelectedPaletteId(key)}
                      options={colorPalettes?.map((item) => ({ key: item.id, text: item.paletteNm })) || []}
                    />
                  ) : (
                    <MessageBar type="warning" content="No color palettes found" />
                  )}
                </StyledDiv>
              </Column>
            </Row>

            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <LightSeparator />
            </Spacing>

            {isCreatingPalette ? (
              <Spacing margin={{ top: 'double' }}>
                <Spinner size="lg" label="Loading color palette" />
              </Spacing>
            ) : (
              <>
                <PageHeader id="__ActiveUsersHeader">
                  <Row>
                    <Column lg="6" direction="row">
                      <PageTitle
                        id="__Page_Title"
                        title={!selectedPaletteId ? 'Create new palette' : 'Update palette'}
                      />
                    </Column>
                  </Row>
                </PageHeader>

                <Row>
                  <Column xxl="6" xl="12">
                    <Spacing margin={{ bottom: 'normal' }}>
                      <InputText
                        required
                        label="Palette name"
                        value={paletteName}
                        onChange={(event, newValue) => setPaletteName(newValue ?? '')}
                      />

                      <Spacing margin={{ top: 'normal' }}>
                        <Checkbox
                          label="Set as the default palette for the organization"
                          checked={isDefaultPalette}
                          onChange={(event, isDefault: any) => setIsDefaultPalette(isDefault)}
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
                      onChange={(evt, { key }: any) => setPaletteType(key)}
                    />
                  </Column>

                  {paletteType === 'EXTEND' && (
                    <Column xxl="3" xl="6" lg="12">
                      <Spacing margin={{ bottom: 'normal' }}>
                        <Text size="small" variant="semiBold">
                          Color modes
                        </Text>
                      </Spacing>

                      <Checkbox
                        label="Enable dark mode for this palette"
                        checked={enableDarkMode}
                        onChange={(event, enabled: any) => setEnableDarkMode(enabled)}
                      />
                    </Column>
                  )}
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
                    <Column xxl="3" xl="6" lg="12" right>
                      <StyledColorPicker
                        showPreview={false}
                        alphaType="none"
                        color={activeColor.color}
                        onChange={onColorChange}
                      />
                    </Column>
                  </Row>
                </Spacing>

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <LightSeparator />
                </Spacing>

                <Row>
                  <Column lg="9">
                    <StyledDiv>
                      <Button
                        id="__ColorPalettesPageId"
                        variant="primary"
                        disabled={isProcessingPalettes}
                        text={!selectedPaletteId ? 'Create palette' : 'Update palette'}
                        onClick={() => {
                          const params = {
                            themeColorMode: paletteType === 'EXTEND' ? 'LIGHT' : null,
                            defaultPalette: isDefaultPalette,
                            allowDark: enableDarkMode,
                            paletteNm: paletteName,
                            ...getThemeVariant({ ...colors }),
                          };

                          if (!selectedPaletteId) {
                            createColorPalette(params);
                            setWantsReset(true);
                          } else {
                            updateColorPalette(selectedPaletteId, params);
                          }
                          return null;
                        }}
                      />

                      <span>&nbsp;</span>

                      <Button
                        id="__ColorPalettesPageId"
                        variant="secondary"
                        text="Discard changes"
                        disabled={isProcessingPalettes}
                        onClick={() => {
                          setWantsReset(true);
                          return null;
                        }}
                      />

                      <span>&nbsp;</span>

                      {selectedPaletteId && (
                        <Button
                          id="__ColorPalettesPageId"
                          variant="danger"
                          disabled={isProcessingPalettes}
                          text="Delete palette"
                          onClick={() => {
                            removeColorPalette(selectedPaletteId);
                            setWantsReset(true);
                            return null;
                          }}
                        />
                      )}
                    </StyledDiv>
                  </Column>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </LayoutDashboard>
  );
};

const ColorPalettesPage = memo(_ColorPalettesPage);

export { ColorPalettesPage };
