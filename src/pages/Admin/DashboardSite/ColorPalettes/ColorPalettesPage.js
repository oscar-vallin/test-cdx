import React, { useState, useEffect, useCallback, Fragment } from 'react';

import { ChoiceGroup, Checkbox, getTheme } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Spinner } from '../../../../components/spinners/Spinner';
import { Row, Column } from '../../../../components/layouts';
import { InputText } from '../../../../components/inputs/InputText';
import { MessageBar } from '../../../../components/notifications/MessageBar';
import { Text } from '../../../../components/typography/Text';
import { PaletteColors } from './PaletteColors';

import { StyledDiv, StyledChoiceGroup, StyledColorPicker, StyledCommandButton, StyledColorPreview, StyledPreview } from './ColorPalettesPage.styles';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { useThemeContext } from '../../../../contexts/ThemeContext';
import { defaultTheme, darkTheme } from '../../../../styles/themes';

import {
  useCreateDashThemeColorMutation,
  useUpdateDashThemeColorMutation,
  useRemoveDashThemeColorMutation,
  useDashThemeColorByNameLazyQuery,
  useDashThemeColorForOrgLazyQuery
} from './../../../../data/services/graphql';

import Theming from './../../../../utils/Theming';

const getBaseColorPaletteVariant = (mode) => ({
  id: null,
  defaultTheme: false,
  themeColorMode: mode,
  paletteNm: '',
  ...(mode === 'LIGHT') ? defaultTheme : darkTheme,
  custom: undefined,
});


/*
  PROPOSALS
  
  Allow theme color mode to be null or find a new value
  Change variable defaultTheme to defaultPalette
  change black variable to neutralPrimary
*/

const getThemeVariant = ({ themePrimary, neutralPrimary, white }) => ({
  ...Theming.generate.primary(themePrimary),
  ...Theming.generate.foreground(neutralPrimary, white),
  ...Theming.generate.background(white),
})

const _ColorPalettesPage = () => {
  const { authData } = useAuthContext();
  const { id, orgId } = authData;

  const { changeTheme, themeConfig } = useThemeContext();

  const [createDashThemeColorMutation] = useCreateDashThemeColorMutation();
  const [updateDashThemeColorMutation] = useUpdateDashThemeColorMutation();
  const [removeDashThemeColorMutation] = useRemoveDashThemeColorMutation();
  const [
    getDashThemeColorForOrg,
    { data: orgPalettes, loading: isLoadingPalettes }
  ] = useDashThemeColorForOrgLazyQuery();

  const [wantsReset, setWantsReset] = useState(false);
  const [colorPalettes, setColorPalettes] = useState([]);

  const [selectedPaletteId, setSelectedPaletteId] = useState(null);

  const [isCreatingPalette, setIsCreatingPalette] = useState(!themeConfig.themeColorPalettes);
  const [isProcessingPalette, setIsProcessingPalette] = useState(false);

  const [paletteType, setPaletteType] = useState('EXTEND');
  const [enableDarkMode, setEnableDarkMode] = useState(true);

  const [paletteName, setPaletteName] = useState('');
  const [isDefaultPalette, setIsDefaultPalette] = useState(false);
  // const [paletteVariant, setPaletteVariant] = useState('LIGHT'); /* Should come from color palette */

  const [colors, setColors] = useState({
    themePrimary: (themeConfig.themeColorPalettes || [])[0]
  });

  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary
  });

  useEffect(() => {
    getDashThemeColorForOrg({
      variables: {
        ownedInput: {
          orgSid: orgId,
          ownerId: id,
        },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      }
    });
  }, []);

  useEffect(() => {
    if (orgPalettes && !isLoadingPalettes) {
      setColorPalettes(orgPalettes?.dashThemeColorForOrg?.nodes);
    }
  }, [orgPalettes, isLoadingPalettes]);

  /* PALETTE TYPE -------------- */
  useEffect(() => {
    const defaultVariant = getThemeVariant(defaultTheme);
    const currentVariant = colorPalettes.find(({ id }) => id === selectedPaletteId) || {};

    const isExtendingPalette = paletteType === 'EXTEND';
    const colors = {
      ...(selectedPaletteId)
        ? {
            themePrimary: currentVariant.themePrimary,
            neutralPrimary: (isExtendingPalette)
              ? defaultVariant.neutralPrimary
              : currentVariant.neutralPrimary,
            white: (isExtendingPalette)
              ? defaultVariant.white
              : currentVariant.white,
          }
        : {
            themePrimary: defaultVariant.themePrimary,
            neutralPrimary: defaultVariant.neutralDark,
            white: defaultVariant.white
          },
    }

    const variant = {
      ...(selectedPaletteId) ? currentVariant : defaultVariant,
      ...colors
    };

    setColors(colors);
    setActiveColor({ key: 'themePrimary', color: variant.themePrimary });
    changeTheme('CUSTOM', { ...variant, ...colors });

    setEnableDarkMode(isExtendingPalette);
  }, [paletteType, selectedPaletteId, colorPalettes])

  /* --------------------------- */

  useEffect(() => {
    if (selectedPaletteId) {
      const {
        paletteNm,
        allowDark,
        defaultTheme,
        themePrimary,
        neutralPrimary,
        white,
      } = colorPalettes.find(({ id }) => id === selectedPaletteId);

      setPaletteName(paletteNm);
      setPaletteType('EXTEND'); //EXTEND or CUSTOM
      setEnableDarkMode(Boolean(allowDark));
      setIsDefaultPalette(defaultTheme);
      setColors({ themePrimary, neutralPrimary, white });

      setActiveColor({ key: 'themePrimary', color: themePrimary });
    }
  }, [selectedPaletteId]);

  useEffect(() => {
    if (wantsReset) {
      const variant = getThemeVariant(defaultTheme);
      const { themePrimary, neutralPrimary, white } = defaultTheme;

      setPaletteName('');
      setPaletteType('EXTEND');
      setEnableDarkMode(true);
      setIsDefaultPalette(false);
      setSelectedPaletteId(null);
      setColors({ themePrimary, neutralPrimary, white });
      setActiveColor({ key: 'themePrimary', color: themePrimary });

      changeTheme('CUSTOM', variant);
      setWantsReset(false);
    }
  }, [wantsReset]);

  const onColorChange = (evt, { str }) => {
    const variant = getThemeVariant({
      ...colors,
      [activeColor.key]: str,
    });

    setColors({ ...colors, [activeColor.key]: str });
    setActiveColor({ ...activeColor, color: str });

    changeTheme('CUSTOM', variant);
  };

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="COLOR_PALETTES">
      <Spacing margin="double">
        {
          isLoadingPalettes
            ? <Spacing margin={{ top: 'double' }}>
              <Spinner size="lg" label="Loading color palettes" />
            </Spacing>
            : (
              <Fragment>
                <Row>
                  <Column lg="8">
                    <StyledDiv>
                      {
                        themeConfig.themeColorPalettes
                          ? (
                            <StyledChoiceGroup
                              inline={true}
                              label="Color palettes"
                              selectedKey={selectedPaletteId}
                              disabled={false}
                              onChange={(evt, { key }) => setSelectedPaletteId(key)}
                              options={colorPalettes?.map(item => ({ key: item.id, text: item.paletteNm })) || []}
                            />
                          )
                          : <MessageBar type="warning" content="No color palettes found" />
                      }
                    </StyledDiv>
                  </Column>
                </Row>

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Separator />
                </Spacing>

                {
                  false
                    ? <Spacing margin={{ top: 'double' }}>
                      <Spinner size="lg" label="Loading color palette" />
                    </Spacing>
                    : (
                      <Fragment>
                        <Row>
                          <Column>
                            <Spacing margin={{ bottom: 'normal' }}>
                              <Text variant="bold">
                                {!selectedPaletteId
                                  ? 'Create new palette'
                                  : 'Update palette'
                                }
                              </Text>
                            </Spacing>
                          </Column>
                        </Row>

                        <Row>
                          <Column lg="8">
                            <Spacing margin={{ bottom: 'normal' }}>
                              <InputText
                                required
                                label="Palette name"
                                value={paletteName}
                                onChange={({ target }) => setPaletteName(target.value)}
                              />

                              {/* <Spacing margin={{ top: 'normal' }}>
                <Checkbox
                  label="Set as the default palette for the organization"
                  checked={isDefaultPalette}
                  onChange={(event, isDefault) => setIsDefaultPalette(isDefault)}
                />
              </Spacing> */}
                            </Spacing>
                          </Column>
                        </Row>

                        <Row>
                          <Column lg="4">
                            <Spacing margin={{ bottom: 'small' }}>
                              <Text size="small" variant="semiBold">
                                What would you like to do?
                </Text>
                            </Spacing>

                            <StyledChoiceGroup
                              selectedKey={paletteType}
                              options={[
                                { key: 'EXTEND', text: 'Customize the original palette' },
                                { key: 'CUSTOM', text: 'Create a palette from scratch' },
                              ]}
                              onChange={(evt, { key }) => setPaletteType(key)}
                            />
                          </Column>

                          {
                            paletteType === 'EXTEND' && (
                              <Column lg="4">
                                <Spacing margin={{ bottom: 'normal' }}>
                                  <Text size="small" variant="semiBold">Color modes</Text>
                                </Spacing>

                                <Checkbox
                                  label="Enable dark mode for this palette"
                                  checked={enableDarkMode}
                                  onChange={(event, enabled) => setEnableDarkMode(enabled)}
                                />
                              </Column>
                            )
                          }
                        </Row>

                        <Spacing margin={{ top: 'normal' }}>
                          <Row>
                            <Column lg="4">
                              <PaletteColors
                                colors={colors}
                                type={paletteType}
                                selected={activeColor.key}
                                onChange={setActiveColor}
                              />
                            </Column>
                            <Column lg="4" right={true}>
                              <StyledColorPicker
                                showPreview={false}
                                alphaType={'none'}
                                color={activeColor.color}
                                onChange={onColorChange}
                              />
                            </Column>
                          </Row>
                        </Spacing>

                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Separator />
                        </Spacing>

                        <Row>
                          <Column lg="9">
                            <StyledDiv>
                              <Button
                                variant="primary"
                                disabled={isProcessingPalette}
                                text={!selectedPaletteId ? "Create palette" : "Update palette"}
                                onClick={() => {
                                  const params = {
                                    ownerId: id,
                                    orgSid: orgId,
                                    themeColorMode: 'LIGHT',
                                    // defaultTheme: isDefaultPalette,
                                    allowDark: enableDarkMode,
                                    paletteNm: paletteName,
                                    ...getThemeVariant({ ...colors }),
                                  }

                                  if (!selectedPaletteId) {
                                    createDashThemeColorMutation({
                                      variables: {
                                        createDashThemeColorInput: { ...params }
                                      }
                                    });
                                  } else {
                                    updateDashThemeColorMutation({
                                      variables: {
                                        updateDashThemeColorInput: {
                                          sid: selectedPaletteId,
                                          ...params,
                                        }
                                      }
                                    })
                                  }
                                }}
                              />

                              {
                                !isCreatingPalette && themeConfig.themeColorPalettes.length > 1 && (
                                  <Spacing margin={{ left: 'normal' }}>
                                    <Button
                                      variant="danger"
                                      disabled={isProcessingPalette}
                                      text="Delete palette"
                                      onClick={() => {
                                        removeDashThemeColorMutation({
                                          variables: {
                                            ownedInputSid: {
                                              orgSid: orgId,
                                              ownerId: id,
                                              sid: selectedPalette,
                                            }
                                          }
                                        })
                                      }}
                                    />
                                  </Spacing>
                                )
                              }

                              <Spacing margin={{ left: 'normal' }}>
                                <Button
                                  text="Discard changes"
                                  disabled={isProcessingPalette}
                                  onClick={() => {
                                    setWantsReset(true);
                                  }}
                                />
                              </Spacing>
                            </StyledDiv>
                          </Column>
                        </Row>
                      </Fragment>
                    )
                }
              </Fragment>
            )
        }
      </Spacing>
    </LayoutAdmin>
  );
};

const ColorPalettesPage = React.memo(_ColorPalettesPage);

export { ColorPalettesPage };

