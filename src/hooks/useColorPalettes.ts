import { useState, useEffect } from 'react';

import {
  useCreateDashThemeColorMutation,
  useUpdateDashThemeColorMutation,
  useRemoveDashThemeColorMutation,
  useDashThemeColorForOrgLazyQuery,
  DashThemeColor,
  Maybe,
} from '../data/services/graphql';
import { useSessionStore } from '../store/SessionStore';
import { useOrgSid } from './useOrgSid';

export const useColorPalettes = () => {
  const SessionStore = useSessionStore();

  const { orgSid } = useOrgSid();
  const ownedInput = { orgSid, ownerId: SessionStore.user.id };

  const [getDashThemeColorForOrg, { data: palettes, loading: isLoadingPalettes }] = useDashThemeColorForOrgLazyQuery();
  const [createDashThemeColorMutation, { data: createdPalette, loading: isCreatingPalette }] =
    useCreateDashThemeColorMutation();
  const [updateDashThemeColorMutation, { data: updatedPalette, loading: isUpdatingPalette }] =
    useUpdateDashThemeColorMutation();
  const [removeDashThemeColorMutation, { data: removedPalette, loading: isRemovingPalette }] =
    useRemoveDashThemeColorMutation();

  const [palettesUpdated, setPalettesUpdated] = useState(false);
  const [colorPalettes, setColorPalettes] = useState<
    Maybe<
      Array<
        Maybe<
          { __typename?: 'DashThemeColor' } & Pick<
            DashThemeColor,
            | 'id'
            | 'defaultPalette'
            | 'themeColorMode'
            | 'allowDark'
            | 'paletteNm'
            | 'themePrimary'
            | 'themeLighterAlt'
            | 'themeLighter'
            | 'themeLight'
            | 'themeTertiary'
            | 'themeSecondary'
            | 'themeDarkAlt'
            | 'themeDark'
            | 'themeDarker'
            | 'neutralLighterAlt'
            | 'neutralLighter'
            | 'neutralLight'
            | 'neutralQuaternaryAlt'
            | 'neutralQuaternary'
            | 'neutralTertiaryAlt'
            | 'neutralTertiary'
            | 'neutralSecondary'
            | 'neutralPrimaryAlt'
            | 'neutralPrimary'
            | 'neutralDark'
            | 'black'
            | 'white'
          >
        >
      >
    >
  >([]);
  const [isProcessingPalettes, setIsProcessingPalettes] = useState(false);

  useEffect(() => {
    if (palettes && !isLoadingPalettes) {
      setColorPalettes([] || palettes?.dashThemeColorForOrg?.nodes);
      setPalettesUpdated(false);
    }
  }, [palettes, isLoadingPalettes]);

  useEffect(() => {
    setIsProcessingPalettes(isCreatingPalette || isUpdatingPalette || isRemovingPalette);
  }, [isCreatingPalette, isUpdatingPalette, isRemovingPalette]);

  useEffect(() => {
    setPalettesUpdated(!isProcessingPalettes && (!!createdPalette || !!updatedPalette || !!removedPalette));
  }, [createdPalette, updatedPalette, removedPalette, isProcessingPalettes]);

  const fetchColorPalettes = () => {
    if (orgSid) {
      getDashThemeColorForOrg({
        variables: {
          ownedInput,
          pageableInput: {
            pageNumber: 0,
            pageSize: 100,
          },
        },
      });
    }
  };

  const createColorPalette = (params) => {
    createDashThemeColorMutation({
      variables: {
        createDashThemeColorInput: { ...ownedInput, ...params },
      },
    });
  };

  const updateColorPalette = (sid, params) => {
    updateDashThemeColorMutation({
      variables: {
        updateDashThemeColorInput: { ...ownedInput, sid, ...params },
      },
    });
  };

  const removeColorPalette = (sid) => {
    removeDashThemeColorMutation({
      variables: {
        ownedInputSid: { ...ownedInput, sid },
      },
    });
  };

  return {
    colorPalettes,
    isLoadingPalettes,
    createdPalette,
    updatedPalette,
    removedPalette,
    isCreatingPalette,
    isUpdatingPalette,
    isRemovingPalette,
    isProcessingPalettes,
    palettesUpdated,
    fetchColorPalettes,
    createColorPalette,
    updateColorPalette,
    removeColorPalette,
  };
};
