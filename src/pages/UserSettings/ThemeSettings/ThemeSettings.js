/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Button } from '../../../components/buttons/Button';
import { MessageBar } from '../../../components/notifications/MessageBar';
import { Text } from '../../../components/typography/Text';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';

import { useThemeContext } from '../../../contexts/ThemeContext';
import { useColorPalettes } from '../../../hooks/useColorPalettes';
import Theming from '../../../utils/Theming';
import { useCreateOrUpdateOwnDashThemeMutation, useUserThemeLazyQuery } from '../../../data/services/graphql';

import { StyledDiv, StyledTitle, StyledChoiceGroup } from '../UserSettingsPage.styles';
import { defaultTheme, darkTheme } from '../../../styles/themes';
import { useNotification } from '../../../hooks/useNotification';
import { useOrgSid } from '../../../hooks/useOrgSid';

const ThemeSettings = () => {
  const [apiUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  useEffect(() => {
    apiUserThemeQuery({ variables: { themeColorMode: null } });
  }, []);

  const Toast = useNotification();
  const { changeTheme } = useThemeContext();
  const { colorPalettes, isLoadingPalettes, fetchColorPalettes } = useColorPalettes();
  const [createOrUpdateOwnDashTheme, { data: themeResponse, loading: isHandlingTheme }] =
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
  const [palette, setPalette] = useState({});

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
      const selectedPalette = theme?.userTheme
        ? colorPalettes.find(({ paletteNm }) => paletteNm === theme?.userTheme.dashThemeColor.paletteNm)?.id || null
        : null;

      setPalettes(Array.from(new Set([...palettes, ...colorPalettes])));
      setSelectedPaletteId(selectedPalette);
    }
  }, [colorPalettes, isLoadingPalettes, theme, orgSid]);

  useEffect(() => {
    const finalPalette = palettes.find(({ id }) => id === selectedPaletteId) || {};
    const { themePrimary } = finalPalette;

    const variant = finalPalette.themeColorMode
      ? Theming.getVariant({
          ...(themeColorMode === 'LIGHT' ? defaultTheme : darkTheme),
          themePrimary,
        })
      : finalPalette;

    setPalette(finalPalette);
    changeTheme(variant);
  }, [selectedPaletteId, themeColorMode]);

  return isLoadingPalettes || isLoadingTheme ? (
    <Spacing padding="Double">
      <Spinner size="lg" label="Loading theme settings" />
    </Spacing>
  ) : (
    <>
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
    </>
  );
};

export default ThemeSettings;
