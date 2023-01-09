import React, { useState, useEffect } from 'react';
import { ChoiceGroup, PanelType } from '@fluentui/react';
import {
  DashThemeColor,
  useCreateOrUpdateOwnDashThemeMutation,
  useDashThemeColorForOrgQuery,
  useUserThemeQuery,
} from 'src/data/services/graphql';
import { defaultTheme } from 'src/styles/themes';
import { useNotification } from 'src/hooks/useNotification';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ThemedPanel, WizardButtonRow } from 'src/layouts/Panels/Panels.styles'
import { Button } from 'src/components/buttons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useThemeStore } from 'src/store/ThemeStore';
import { Spacing } from 'src/components/spacings/Spacing';

type ChangeThemePanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
};
const ChangeThemePanel = ({ closePanel, isOpen }: ChangeThemePanelProps) => {
  const Toast = useNotification();
  const { orgSid } = useOrgSid();
  const handleError = ErrorHandler();
  const { changeThemeColors } = useThemeStore();
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
  const [createOrUpdateOwnDashTheme,
    { data: themeResponse, loading: isHandlingTheme },
  ] = useCreateOrUpdateOwnDashThemeMutation();

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
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('');
  const [currentPaletteId, setCurrentPaletteId] = useState('');

  useEffect(() => {
    if (!loadingThemesForOrg && dataThemesForOrg?.dashThemeColorForOrg?.nodes) {
      setPalettes(dataThemesForOrg.dashThemeColorForOrg?.nodes);
    }
    return () => {
      setPalettes([]);
    };
  }, [dataThemesForOrg, loadingThemesForOrg]);

  useEffect(() => {
    const paletteId = dataUserTheme?.userTheme?.dashThemeColor?.id
    if (!loadingUserTheme && paletteId) {
      setSelectedPaletteId(paletteId);
      setCurrentPaletteId(paletteId);
    }
  }, [dataUserTheme, loadingUserTheme]);

  useEffect(() => {
    if (themeResponse) {
      closePanel(false);
      Toast.success({ text: 'Theme changed' });
    }
  }, [themeResponse]);

  useEffect(() => {
    if (selectedPaletteId && palettes) {
      const finalPalette = palettes.find(({ id }): any => id === selectedPaletteId) || defaultTheme;
      changeThemeColors(finalPalette)
    }
  }, [selectedPaletteId, palettes]);

  const selectTheme = (paletteId: string) => {
    setSelectedPaletteId(paletteId);
    const finalPalette = palettes.find(({ id }): any => id === paletteId) || defaultTheme;
    changeThemeColors(finalPalette);
  };
  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="Change Theme"
      type={PanelType.smallFixedFar}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => {
        const finalPalette = palettes
          .find(({ id }): any => id === currentPaletteId) || defaultTheme;
        changeThemeColors(finalPalette);
        setPalettes([]);
        closePanel(false);
      }}
    >
      <ChoiceGroup
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
      <Spacing margin={{ top: 'double' }}>
        <WizardButtonRow>
          <span>
            <Button
              id="__ChangeTheme_Save_Button"
              variant="primary"
              onClick={() => {
                createOrUpdateOwnDashTheme({
                  variables: {
                    dashThemeInput: {
                      themeColorSid: selectedPaletteId,
                    },
                  },
                }).then();
              }}
            >
              Save
            </Button>
          </span>
        </WizardButtonRow>
      </Spacing>
    </ThemedPanel>
  )
};

export { ChangeThemePanel };
