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
import { defaultTheme, darkTheme } from '../../../styles/themes';

const ThemeSettings = ({ userTheme }) => {
  const { changeTheme } = useThemeContext();
  const {
    colorPalettes,
    isLoadingPalettes,
    fetchColorPalettes,
  } = useColorPalettes();

  const [palettes, setPalettes] = useState([
    {
      id: null,
      paletteNm: 'Default',
      allowDark: true,
      defaultPalette: true,
      themeColorMode: 'LIGHT',
      ...defaultTheme,
    }
  ]);

  const [selectedPaletteId, setSelectedPaletteId] = useState(null);
  const [palette, setPalette] = useState({});
  const [themeColorMode, setThemeColorMode] = useState(userTheme?.themeColorMode || 'LIGHT');
  const [themeFontSize, setThemeFontSize] = useState(userTheme?.themeFontSize || 'MEDIUM');
  
  useEffect(fetchColorPalettes, []);
  useEffect(() => {
    if (userTheme.data) {
      changeTheme(userTheme.data);
    }
  }, [userTheme]);

  useEffect(() => {
    if (colorPalettes && !isLoadingPalettes) {
      const defaultPalette = colorPalettes.find(({ defaultPalette }) => defaultPalette);
      const selectedPalette = (userTheme && userTheme.data)
        ? colorPalettes.find(({ paletteNm }) => paletteNm === userTheme.data.dashThemeColor.paletteNm)
        : defaultPalette;

      setPalettes([...palettes, ...colorPalettes]);
      setSelectedPaletteId(selectedPalette?.id || null);
    }
  }, [colorPalettes, isLoadingPalettes, userTheme]);

  useEffect(() => {
    const palette = palettes.find(({ id }) => id === selectedPaletteId) || {};
    const { themePrimary } = palette;
    
    const variant = palette.themeColorMode
      ? Theming.getVariant({
        ...(themeColorMode === 'LIGHT')
          ? defaultTheme
          : darkTheme,
          themePrimary
        })
      : palette;
    
    setPalette(palette);
    setThemeColorMode((palette.themeColorMode !== null && palette.allowDark)
      ? themeColorMode
      : 'LIGHT'
    );
    
    changeTheme(variant);
  }, [selectedPaletteId, themeColorMode]);

  const [
    createOrUpdateOwnDashTheme,
    {
      data: themeResponse,
      loading: isHandlingTheme,
      error: themeError
    }
  ] = useCreateOrUpdateOwnDashThemeMutation();

  return (
    isLoadingPalettes
      ? <Spacing padding="Double">
          <Spinner size="lg" label="Loading theme settings" />
        </Spacing>
      : (
        <Fragment>
          <StyledTitle>Theme</StyledTitle>

          <StyledDiv>
            <Text
              size="normal"
              className={`text ${(palettes || []).length > 1 && 'text--centered'}`}
            >
              Color palettes:
            </Text>
            {!palettes
              ? <MessageBar content="No color palettes available" />
              : (
                  <StyledChoiceGroup
                    selectedKey={selectedPaletteId}
                    options={palettes?.map(item => ({
                      key: item.id,
                      text: item.paletteNm
                    })) || []}
                    onChange={(evt, { key }) => setSelectedPaletteId(key)}
                  />
                )
            }
          </StyledDiv>

          <Spacing margin={{ top: 'normal' }}>
            <StyledDiv>
              <Text size="normal" className="text">
                Color modes:
              </Text>

              {(!palette.themeColorMode)
                ? <Text>No color modes available for this palette</Text>
                : <StyledChoiceGroup
                  selectedKey={themeColorMode}
                  options={[
                    { key: 'LIGHT', text: 'Light' },
                    ...(palette.allowDark) ? [{ key: 'DARK', text: 'Dark' }] : []
                  ]}
                  disabled={!palette.allowDark}
                  onChange={(evt, { key }) => {
                    setThemeColorMode(key);
                  }}
                />
              }
            </StyledDiv>
          </Spacing>

          <Row>
            <Column>
              <Spacing margin={{ top: "normal" }}>
                <Button
                  variant="primary"
                  text={isHandlingTheme ? "Processing..." : "Save theme"}
                  onClick={() => {
                    createOrUpdateOwnDashTheme({
                      variables: {
                        dashThemeInput: {
                          // TODO: Ask matt to include this in gql mutation
                          // dashThemeColor: {
                          //   id: palette.id,
                          //   themePrimary: palette.themePrimary,
                          //   neutralPrimary: palette.neutralPrimary,
                          //   white: palette.white,
                          // },
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
  )
}

export default ThemeSettings;