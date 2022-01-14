/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Button } from 'src/components/buttons';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { Text } from 'src/components/typography';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Spinner } from 'src/components/spinners/Spinner';

import { useThemeContext } from 'src/contexts/ThemeContext';
import { useColorPalettes } from 'src/hooks/useColorPalettes';
import Theming from 'src/utils/Theming';
import { useCreateOrUpdateOwnDashThemeMutation, useUserThemeLazyQuery } from 'src/data/services/graphql';

import { defaultTheme, darkTheme } from 'src/styles/themes';
import { useNotification } from 'src/hooks/useNotification';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { StyledDiv, StyledTitle, StyledChoiceGroup } from '../UserSettingsPage.styles';

const ThemeSettings = () => {
  const [apiUserThemeQuery, { data: theme, loading: isLoadingTheme }]: any = useUserThemeLazyQuery();

  useEffect(() => {
    apiUserThemeQuery({ variables: { themeColorMode: null } });
  }, []);

  const Toast = useNotification();
  const { changeTheme }: any = useThemeContext();
  const { colorPalettes, isLoadingPalettes, fetchColorPalettes } = useColorPalettes();
  const [createOrUpdateOwnDashTheme, { data: themeResponse, loading: isHandlingTheme }] =
    useCreateOrUpdateOwnDashThemeMutation();
  const [palettes, setPalettes]: any = useState([
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
  const [palette, setPalette]: any = useState({});

  const [selectedPaletteId, setSelectedPaletteId]: any = useState();
  const [themeColorMode, setThemeColorMode]: any = useState();

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
        ? colorPalettes.find(({ paletteNm }: any) => paletteNm === theme?.userTheme.dashThemeColor.paletteNm)?.id ||
          null
        : null;

      setPalettes(Array.from(new Set([...palettes, ...colorPalettes])));
      setSelectedPaletteId(selectedPalette);
    }
  }, [colorPalettes, isLoadingPalettes, theme, orgSid]);

  useEffect(() => {
    const finalPalette = palettes.find(({ id }): any => id === selectedPaletteId) || {};
    const { themePrimary }: any = finalPalette;

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
      <StyledTitle id="__userSettings_Theme">Theme</StyledTitle>

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
            onChange={(evt, { key }: any) => setSelectedPaletteId(key)}
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
              options={[
                { key: 'LIGHT', text: 'Light', id: '__userSetting_Light_Theme' },
                ...(palette.allowDark ? [{ key: 'DARK', text: 'Dark', id: '__userSetting_Dark_Theme' }] : []),
              ]}
              disabled={!palette.allowDark}
              onChange={(evt, { key }: any) => {
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
              id="__userSetting_Save_Theme"
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
                return null;
              }}
            />
          </Spacing>
        </Column>
      </Row>
    </>
  );
};

export default ThemeSettings;
