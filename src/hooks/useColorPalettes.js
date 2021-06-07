import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

import {
  useCreateDashThemeColorMutation,
  useUpdateDashThemeColorMutation,
  useRemoveDashThemeColorMutation,
  useDashThemeColorForOrgLazyQuery
} from '../data/services/graphql';

export const useColorPalettes = () => {
  const { authData } = useAuthContext();
  const { id, orgId } = authData;
  const ownedInput = { orgSid: orgId, ownerId: id };

  const [
    getDashThemeColorForOrg,
    { data: palettes, loading: isLoadingPalettes }
  ] = useDashThemeColorForOrgLazyQuery();
  const [
    createDashThemeColorMutation,
    { data: createdPalette, loading: isCreatingPalette }
  ] = useCreateDashThemeColorMutation();
  const [
    updateDashThemeColorMutation,
    { data: updatedPalette, loading: isUpdatingPalette }
  ] = useUpdateDashThemeColorMutation();
  const [
    removeDashThemeColorMutation,
    { data: removedPalette, loading: isRemovingPalette }
  ] = useRemoveDashThemeColorMutation();
  
  const [palettesUpdated, setPalettesUpdated] = useState(false);
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isProcessingPalettes, setIsProcessingPalettes] = useState(false);

  useEffect(() => {
    if (palettes && !isLoadingPalettes) {
      setColorPalettes(palettes?.dashThemeColorForOrg?.nodes);
      setPalettesUpdated(false);
    }
  }, [palettes, isLoadingPalettes]);

  useEffect(() => {
    setIsProcessingPalettes(isCreatingPalette || isUpdatingPalette || isRemovingPalette);
  }, [isCreatingPalette, isUpdatingPalette, isRemovingPalette]);

  useEffect(() => {
    setPalettesUpdated(!isProcessingPalettes && (!!createdPalette || !!updatedPalette || !!removedPalette))
  }, [createdPalette, updatedPalette, removedPalette, isProcessingPalettes]);

  const fetchColorPalettes = () => {
    console.log('Called');
    getDashThemeColorForOrg({
      variables: {
        ownedInput,
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      }
    });
  };

  const createColorPalette = params => {
    createDashThemeColorMutation({
      variables: {
        createDashThemeColorInput: { ...ownedInput, ...params }
      }
    });
  }

  const updateColorPalette = (sid, params) => {
    updateDashThemeColorMutation({
      variables: {
        updateDashThemeColorInput: { ...ownedInput, sid, ...params }
      }
    })
  }

  const removeColorPalette = sid => {
    removeDashThemeColorMutation({
      variables: {
        ownedInputSid: { ...ownedInput, sid }
      }
    });
  }

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
  }
};
