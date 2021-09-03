import React, { useState, useEffect, Fragment } from 'react';

import { Button } from './../../../components/buttons/Button';
import { MessageBar } from './../../../components/notifications/MessageBar';
import { Text } from './../../../components/typography/Text';
import { Row, Column } from './../../../components/layouts';
import { Spacing } from './../../../components/spacings/Spacing';
import { Spinner } from './../../../components/spinners/Spinner';

import { useThemeContext } from './../../../contexts/ThemeContext';
import { useColorPalettes } from './../../../hooks/useColorPalettes';
import Theming from './../../../utils/Theming';
import { useCreateOrUpdateOwnDashThemeMutation, useUserThemeLazyQuery } from './../../../data/services/graphql';

import { StyledDiv, StyledTitle, StyledChoiceGroup } from './../UserSettingsPage.styles';
import { defaultTheme, darkTheme } from '../../../styles/themes';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
import { useNotification } from '../../../contexts/hooks/useNotification';
import { useOrgSid } from '../../../hooks/useOrgSid';

const INITIAL_THEME = {
  data: null,
  loading: false,
  paletteNm: 'Default',
  themeColorMode: 'LIGHT',
  themeFontSize: 'MEDIUM',
};

const ThemeSettings = ({ userTheme = { ...INITIAL_THEME } }) => {
  const [useUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  useEffect(() => {
    useUserThemeQuery({ variables: { themeColorMode: null } });
  }, []);

  const Toast = useNotification();
  const { changeTheme } = useThemeContext();
  const { colorPalettes, isLoadingPalettes, fetchColorPalettes } = useColorPalettes();
  const [createOrUpdateOwnDashTheme, { data: themeResponse, loading: isHandlingTheme, error: themeError }] =
    useCreateOrUpdateOwnDashThemeMutation();
  const [palettes, setPalettes] = useState([
    {
      id: null,
      paletteNm: 'Default',
      allowDark: true,
      defaultPalette: true,
      themeColorMode: 'LIGHT',
      ...defaultTheme,
    },
  ]);
  const { orgSid } = useOrgSid();

  useEffect(() => {
    if (themeResponse) {
      Toast.success({ text: 'Theme saved successfully' });
    }
  }, [themeResponse]);
  // const [selectedPaletteId, setSelectedPaletteId] = useState(null);
  const [palette, setPalette] = useState({});
  // const [themeColorMode, setThemeColorMode] = useState(userTheme?.themeColorMode || 'LIGHT');

  const [selectedPaletteId, setSelectedPaletteId] = useState();
  const [themeColorMode, setThemeColorMode] = useState();

  useEffect(fetchColorPalettes, [orgSid]);
  useEffect(() => {
    if (theme?.userTheme) {
      changeTheme(Theming.getVariant(theme?.userTheme?.dashThemeColor));
      setThemeColorMode(theme?.userTheme?.themeColorMode);
    }
  }, [theme]);

  useEffect(() => {
    if (colorPalettes && !isLoadingPalettes) {
      const defaultPalette = colorPalettes.find(({ defaultPalette }) => defaultPalette);
      const selectedPalette = theme?.userTheme
        ? colorPalettes.find(({ paletteNm }) => paletteNm === theme?.userTheme.dashThemeColor.paletteNm)?.id || null
        : null;

      setPalettes(Array.from(new Set([...palettes, ...colorPalettes])));
      setSelectedPaletteId(selectedPalette);
    }
  }, [colorPalettes, isLoadingPalettes, theme, orgSid]);

  useEffect(() => {
    const palette = palettes.find(({ id }) => id === selectedPaletteId) || {};
    const { themePrimary } = palette;

    const variant = palette.themeColorMode
      ? Theming.getVariant({
          ...(themeColorMode === 'LIGHT' ? defaultTheme : darkTheme),
          themePrimary,
        })
      : palette;

    setPalette(palette);
    changeTheme(variant);
  }, [selectedPaletteId, themeColorMode]);

  return isLoadingPalettes || isLoadingTheme ? (
    <Spacing padding="Double">
      <Spinner size="lg" label="Loading theme settings" />
    </Spacing>
  ) : (
    <Fragment>
      <StyledTitle>Theme</StyledTitle>

      <StyledDiv>
        <Text size="normal" className={`text ${(palettes || []).length > 1 && 'text--centered'}`}>
          Color palettes:
        </Text>
        {!palettes ? (
          <MessageBar content="No color palettes available" />
        ) : (
          <StyledChoiceGroup
            selectedKey={selectedPaletteId}
            options={
              palettes?.map((item) => ({
                key: item.id,
                text: item.paletteNm,
              })) || []
            }
            onChange={(evt, { key }) => setSelectedPaletteId(key)}
          />
        )}
      </StyledDiv>

      <Spacing margin={{ top: 'normal' }}>
        <StyledDiv>
          <Text size="normal" className="text">
            Color modes:
          </Text>

          {!palette.themeColorMode ? (
            <Text>No color modes available for this palette</Text>
          ) : (
            <StyledChoiceGroup
              selectedKey={themeColorMode}
              options={[{ key: 'LIGHT', text: 'Light' }, ...(palette.allowDark ? [{ key: 'DARK', text: 'Dark' }] : [])]}
              disabled={!palette.allowDark}
              onChange={(evt, { key }) => {
                setThemeColorMode(key);
              }}
            />
          )}
        </StyledDiv>
      </Spacing>

      <Row>
        <Column>
          <Spacing margin={{ top: 'normal' }}>
            <Button
              variant="primary"
              text={isHandlingTheme ? 'Processing...' : 'Save theme'}
              onClick={() => {
                createOrUpdateOwnDashTheme({
                  variables: {
                    dashThemeInput: {
                      themeColorSid: selectedPaletteId,
                      themeColorMode,
                    },
                  },
                });
              }}
            />
          </Spacing>
        </Column>
      </Row>
    </Fragment>
  );
};

export default ThemeSettings;
