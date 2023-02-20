/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons/Button';
import { LightSeparator } from 'src/components/separators/Separator';
import { Spacing } from 'src/components/spacings/Spacing';
import { Row, Column, Container } from 'src/components/layouts';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { Spinner } from 'src/components/spinners/Spinner';
import { Text } from 'src/components/typography/Text';

import { useColorPalettes } from 'src/hooks/useColorPalettes';
import Theming from 'src/utils/Theming';
import { darkTheme } from 'src/styles/themes';

import {
  useCreateDefaultDashThemeMutation,
  useUpdateDefaultDashThemeMutation,
  useDefaultDashThemeForSiteLazyQuery,
} from 'src/data/services/graphql';
import { useNotification } from 'src/hooks/useNotification';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useSessionStore } from 'src/store/SessionStore';
import { ROUTE_DEFAULT_THEME } from 'src/data/constants/RouteConstants';
import { useThemeStore } from 'src/store/ThemeStore';
import { StyledChoiceGroup, StyledDiv } from './DefaultThemePage.styles';

const _DefaultThemePage = () => {
  const SessionStore = useSessionStore();
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const ownedInput = { orgSid, ownerId: SessionStore.user.id };

  const [apiDefaultDashThemeQuery, {
    data: defaultTheme,
    loading: isLoadingDefaultTheme,
  }] = useDefaultDashThemeForSiteLazyQuery();

  const { colorPalettes, isLoadingPalettes, fetchColorPalettes } = useColorPalettes();

  useEffect(() => {
    fetchColorPalettes();
    apiDefaultDashThemeQuery({ variables: { ownedInput } });
  }, []);

  const { changeThemeColors } = useThemeStore();

  const [palettes, setPalettes]: any = useState([
    {
      id: null,
      paletteNm: 'Default',
      allowDark: true,
      defaultPalette: true,
      themeColorMode: 'LIGHT',
      ...(defaultTheme?.defaultDashThemeForSite || {}),
    },
  ]);

  const [palette, setPalette]: any = useState({});
  const [selectedPaletteId, setSelectedPaletteId]: any = useState(null);
  const [themeColorMode, setThemeColorMode]: any = useState(null);

  const [createDefaultDashThemeMutation, {
    data: themeCreated,
    loading: isCreatingTheme,
  }]: any = useCreateDefaultDashThemeMutation();

  const [updateDefaultDashThemeMutation, {
    data: themeUpdated,
    loading: isUpdatingTheme,
  }]: any = useUpdateDefaultDashThemeMutation();

  useEffect(() => {
    if (themeCreated || themeUpdated) {
      Toast.success({ text: 'Default theme saved successfully' });
    }
  }, [themeCreated, themeUpdated]);

  useEffect(() => {
    if (colorPalettes && !isLoadingPalettes && !isLoadingDefaultTheme) {
      const { defaultDashThemeForSite } = defaultTheme || {};

      const finalPalette = defaultDashThemeForSite
        ? { ...defaultDashThemeForSite, ...defaultDashThemeForSite.dashThemeColor }
        : colorPalettes.find(({ defaultPalette }: any) => defaultPalette);

      setPalettes([...palettes, ...colorPalettes]);
      setSelectedPaletteId(finalPalette?.id);
      setThemeColorMode(finalPalette?.themeColorMode);
    }
  }, [colorPalettes, defaultTheme]);

  useEffect(() => {
    const selectedPalette: any = palettes
      .find(({ palleteId }) => palleteId === selectedPaletteId) || {};
    const { themePrimary } = selectedPalette;

    const variant = themeColorMode
      ? Theming.getVariant({
        themePrimary,
        neutralPrimary:
            themeColorMode === 'LIGHT'
              ? defaultTheme?.defaultDashThemeForSite?.dashThemeColor?.neutralPrimary
              : darkTheme.neutralPrimary,
        white:
            themeColorMode === 'LIGHT' ? defaultTheme?.defaultDashThemeForSite?.dashThemeColor?.white : darkTheme.white,
      })
      : selectedPalette;

    setPalette(selectedPalette);
    setThemeColorMode(themeColorMode);

    changeThemeColors(variant);
  }, [selectedPaletteId, themeColorMode]);

  return (
    <LayoutDashboard id="PageDefaultTheme" menuOptionSelected={ROUTE_DEFAULT_THEME.API_ID}>
      <Container>
        <Row>
          <Column lg="12">
            {isLoadingPalettes || isLoadingDefaultTheme ? (
              <Spacing margin={{ top: 'double' }}>
                <Spinner size="lg" label="Loading theme settings" />
              </Spacing>
            ) : (
              <>
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

                {selectedPaletteId && (
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
                          disabled={palette.themeColorMode && !palette.allowDark}
                          options={[
                            { key: 'LIGHT', text: 'Light' },
                            ...(palette.allowDark ? [{ key: 'DARK', text: 'Dark' }] : []),
                          ]}
                          onChange={(evt, { key }: any) => {
                            setThemeColorMode(key);
                          }}
                        />
                      )}
                    </StyledDiv>
                  </Spacing>
                )}

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <LightSeparator />
                </Spacing>

                <Button
                  id="__DefaultThemePageId"
                  variant="primary"
                  text={
                    !(isCreatingTheme || isUpdatingTheme)
                      ? `${!defaultTheme?.defaultDashThemeForSite ? 'Set' : 'Update'} default theme`
                      : 'Processing...'
                  }
                  disabled={isCreatingTheme || isUpdatingTheme}
                  onClick={() => {
                    const params = {
                      ...ownedInput,
                      themeFontSize: 'MEDIUM',
                      themeColorMode,
                      themeColorSid: selectedPaletteId,
                    };

                    if (!defaultTheme?.defaultDashThemeForSite) {
                      createDefaultDashThemeMutation({
                        variables: {
                          createDefaultDashThemeInput: {
                            ...params,
                          },
                        },
                      });
                    } else {
                      updateDefaultDashThemeMutation({
                        variables: {
                          updateDefaultDashThemeInput: {
                            ...params,
                            sid: defaultTheme.defaultDashThemeForSite.id,
                          },
                        },
                      });
                    }
                  }}
                />
              </>
            )}
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
};

const DefaultThemePage = memo(_DefaultThemePage);

export { DefaultThemePage };
