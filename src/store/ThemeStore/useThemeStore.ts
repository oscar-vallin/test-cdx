import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ ThemeStore }) => ThemeStore;

export const useThemeStore = (): any => {
  const { themes } = useStoreState(getStoreObj);
  const { setUserTheme, setCurrentTheme, reset } = useStoreActions(getStoreObj);

  return {
    themes,
    setUserTheme,
    setCurrentTheme,
    reset,
  };
};
