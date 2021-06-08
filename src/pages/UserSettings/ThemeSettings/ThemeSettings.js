import React, { useState, useEffect, Fragment } from 'react';

import { Button } from './../../../components/buttons/Button';
import { MessageBar } from './../../../components/notifications/MessageBar';
import { Text } from './../../../components/typography/Text';
import { Row, Column } from './../../../components/layouts';
import { Spacing } from './../../../components/spacings/Spacing';
import { Spinner } from './../../../components/spinners/Spinner';

import { useThemeContext } from './../../../contexts/ThemeContext';
import { useColorPalettes } from './../../../hooks/useColorPalettes';
import { useCreateOrUpdateOwnDashThemeMutation } from './../../../data/services/graphql';
import Theming from './../../../utils/Theming';

import {
  StyledDiv,
  StyledTitle,
  StyledChoiceGroup,
} from './../UserSettingsPage.styles';
import { defaultTheme } from '../../../styles/themes';

const getThemeVariant = ({ themePrimary, neutralPrimary, white }) => ({
  ...Theming.generate.primary(themePrimary),
  ...Theming.generate.foreground(neutralPrimary, white),
  ...Theming.generate.background(white),
})

const ThemeSettings = ({ }) => {
  const {
    colorPalettes,
    isLoadingPalettes,
    fetchColorPalettes,
  } = useColorPalettes();

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const { changeTheme, themeConfig } = useThemeContext();
  const { theme = { themeColorMode: 'LIGHT' } } = themeConfig;

  const [selectedPaletteId, setSelectedPaletteId] = useState(null);
  const [palette, setPalette] = useState({});
  const [colorMode, setColorMode] = useState(null);

  useEffect(() => {
    if (colorPalettes && !isLoadingPalettes) {
      const defaultPalette = colorPalettes.find(({ defaultPalette }) => defaultPalette);

      setSelectedPaletteId(defaultPalette?.id || null);
    }
  }, [colorPalettes, isLoadingPalettes]);

  useEffect(() => {
    const palette = colorPalettes.find(({ id }) => id === selectedPaletteId) || {};

    setPalette(palette);
    setColorMode(palette?.colorMode);
    changeTheme('CUSTOM', getThemeVariant(palette));
  }, [selectedPaletteId]);

  const [
    createOrUpdateOwnDashTheme,
    {
      data: themeResponse,
      loading: isHandlingTheme,
      error: themeError
    }
  ] = useCreateOrUpdateOwnDashThemeMutation();

  return (
    <Fragment>
      <StyledTitle>Theme</StyledTitle>

      <StyledDiv>
        <Text
          size="normal"
          className={`text ${(themeConfig.themeColorPalettes || []).length > 1 && 'text--centered'}`}
        >
          Color palettes:
        </Text>

        {
          isLoadingPalettes
            ? <Spacing margin={{ top: 'double' }}>
              <Spinner size="lg" label="Loading theme settings" />
            </Spacing>
            : !themeConfig.themeColorPalettes
              ? <MessageBar content="No color palettes available" />
              : themeConfig.themeColorPalettes.length === 1
                ? <MessageBar content="Organization (default)" />
                : (
                  <StyledChoiceGroup
                    selectedKey={selectedPaletteId}
                    options={colorPalettes?.map(item => ({
                      key: item.id,
                      text: item.paletteNm
                    })) || []}
                    onChange={(evt, { key }) => setSelectedPaletteId(key)}
                  />
                )
        }
      </StyledDiv>
      
      {selectedPaletteId && (
        <Spacing margin={{ top: 'normal' }}>
          <StyledDiv>
            <Text size="normal" className="text">
              Color modes:
            </Text>

            {(!palette.themeColorMode || !palette.allowDark)
              ? <Text>No color modes available for this palette</Text>
              : <StyledChoiceGroup
                  selectedKey={palette.themeColorMode || 'LIGHT'}
                  options={[
                    { key: 'LIGHT', text: 'Light' },
                    ...(palette.allowDark) ? [{ key: 'DARK', text: 'Dark' }] : []
                  ]}
                  onChange={(evt, { key }) => {
                    setThemeColorMode(key);
                  }}
                />
            }
          </StyledDiv>
        </Spacing>
      )}

      <Row>
        <Column>
          <Spacing margin={{ top: "normal" }}>
            <Button
              variant="primary"
              text={isHandlingTheme ? "Processing..." : "Save theme"}
              // disabled={isFormInvalid(state) || !validations[0].isValid || isUpdatingPassword}
              onClick={() => {
                createOrUpdateOwnDashTheme({
                  variables: {
                    dashThemeInput: {
                      themeFontSize,
                      themeColorMode,
                    }
                  }
                })
              }}
            />
          </Spacing>
        </Column>
      </Row>
    </Fragment>
  )
}

export default ThemeSettings;