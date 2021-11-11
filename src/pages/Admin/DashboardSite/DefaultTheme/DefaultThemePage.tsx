/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { MessageBar } from '../../../../components/notifications/MessageBar';
import { Spinner } from '../../../../components/spinners/Spinner';
import { Text } from '../../../../components/typography/Text';
import { StyledChoiceGroup, StyledDiv } from './DefaultThemePage.styles';

import { useThemeContext } from '../../../../contexts/ThemeContext';
import { useColorPalettes } from '../../../../hooks/useColorPalettes';
import Theming from '../../../../utils/Theming';
import { darkTheme } from '../../../../styles/themes';

import {
  useCreateDefaultDashThemeMutation,
  useUpdateDefaultDashThemeMutation,
  useDefaultDashThemeForSiteLazyQuery,
} from '../../../../data/services/graphql';
import { useNotification } from '../../../../hooks/useNotification';
import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useSessionStore } from '../../../../store/SessionStore';

const _DefaultThemePage = () => {
  const SessionStore = useSessionStore();
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const ownedInput = { orgSid, ownerId: SessionStore.user.id };

  const [apiDefaultDashThemeQuery, { data: defaultTheme, loading: isLoadingDefaultTheme }] =
    useDefaultDashThemeForSiteLazyQuery();

  const { colorPalettes, isLoadingPalettes, fetchColorPalettes } = useColorPalettes();

  useEffect(() => {
    fetchColorPalettes();
    apiDefaultDashThemeQuery({ variables: { ownedInput } });
  }, []);

  const { changeTheme }: any = useThemeContext();
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

  const [createDefaultDashThemeMutation, { data: themeCreated, loading: isCreatingTheme }]: any =
    useCreateDefaultDashThemeMutation();

  const [updateDefaultDashThemeMutation, { data: themeUpdated, loading: isUpdatingTheme }]: any =
    useUpdateDefaultDashThemeMutation();

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
    const selectedPalette: any = palettes.find(({ palleteId }) => palleteId === selectedPaletteId) || {};
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

    changeTheme(variant);
  }, [selectedPaletteId, themeColorMode]);

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="THEME">
      <Spacing margin="double">
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
                  <Separator />
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

                    return null;
                  }}
                />
              </>
            )}
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const DefaultThemePage = memo(_DefaultThemePage);

export { DefaultThemePage };
