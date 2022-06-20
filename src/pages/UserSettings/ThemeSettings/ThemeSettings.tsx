/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import {
  DashThemeColor,
  useCreateOrUpdateOwnDashThemeMutation,
  useDashThemeColorForOrgQuery,
  useUserThemeQuery,
} from 'src/data/services/graphql';

import { defaultTheme } from 'src/styles/themes';
import { useNotification } from 'src/hooks/useNotification';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  StyledDiv,
  StyledTitle,
  StyledChoiceGroup,
} from 'src/pages/Admin/DashboardSite/DefaultTheme/DefaultThemePage.styles';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useThemeStore } from 'src/store/ThemeStore';

const ThemeSettings = () => {
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const { changeThemeColors } = useThemeStore();

  const { orgSid } = useOrgSid();
  const {
    data: dataUserTheme,
    loading: loadingUserTheme,
    error: errorUserTheme,
  } = useUserThemeQuery({
    variables: { themeColorMode: null },
  });
  const {
    data: dataThemesForOrg,
    loading: loadingThemesForOrg,
    error: errorThemesForOrg,
  } = useDashThemeColorForOrgQuery({
    variables: {
      ownedInput: {
        orgSid,
      },
    },
  });

  useEffect(() => {
    handleError(errorUserTheme);
  }, [handleError, errorUserTheme]);
  useEffect(() => {
    handleError(errorThemesForOrg);
  }, [handleError, errorThemesForOrg]);

  const [palettes, setPalettes] = useState<DashThemeColor[]>([
    {
      id: null,
      paletteNm: 'Default',
      allowDark: true,
      defaultPalette: true,
      ...defaultTheme,
    },
  ]);

  useEffect(() => {
    if (!loadingThemesForOrg && dataThemesForOrg?.dashThemeColorForOrg?.nodes) {
      setPalettes(dataThemesForOrg.dashThemeColorForOrg?.nodes);
    }
    return () => {
      setPalettes([]);
    };
  }, [dataThemesForOrg, loadingThemesForOrg]);

  const [createOrUpdateOwnDashTheme, { data: themeResponse, loading: isHandlingTheme }] =
    useCreateOrUpdateOwnDashThemeMutation();

  useEffect(() => {
    if (themeResponse) {
      Toast.success({ text: 'Theme saved successfully' });
    }
  }, [themeResponse]);

  const [selectedPaletteId, setSelectedPaletteId] = useState<string>();

  useEffect(() => {
    if (!loadingUserTheme && dataUserTheme?.userTheme) {
      setSelectedPaletteId(dataUserTheme.userTheme?.dashThemeColor?.id ?? undefined);
    }

    return () => {
      setSelectedPaletteId(undefined);
    };
  }, [dataUserTheme, loadingUserTheme]);

  const selectTheme = (paletteId: string) => {
    setSelectedPaletteId(paletteId);
    const finalPalette = palettes.find(({ id }): any => id === paletteId) || defaultTheme;
    changeThemeColors(finalPalette);
  };

  return (
    <>
      <StyledTitle id="__userSettings_Theme">Theme</StyledTitle>

      <StyledDiv>
        <StyledChoiceGroup
          selectedKey={selectedPaletteId}
          options={
            palettes?.map((item) => ({
              key: item.id ?? '',
              text: item.paletteNm ?? '',
            })) ?? []
          }
          onChange={(evt, { key }: any) => {
            selectTheme(key);
          }}
        />
      </StyledDiv>

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
                    },
                  },
                }).then();
              }}
            />
          </Spacing>
        </Column>
      </Row>
    </>
  );
};

export default ThemeSettings;
