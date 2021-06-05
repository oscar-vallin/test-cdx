import React, { useState, useEffect, useCallback, Fragment }  from 'react';

import { ChoiceGroup, Checkbox } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
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

  const [wantsReset, setWantsReset] = useState(false);

  const [selectedPalette, setSelectedPalette] = useState(
    (themeConfig.themeColorPalettes || [])[0]?.id
  );

  const [isCreatingPalette, setIsCreatingPalette] = useState(!themeConfig.themeColorPalettes);
  const [isProcessingPalette, setIsProcessingPalette] = useState(false);

  const [paletteType, setPaletteType] = useState('EXTEND');
  const [enableDarkMode, setEnableDarkMode] = useState(true);

  const [paletteName, setPaletteName] = useState(''); /* Should come from color palette */
  const [defaultPalette, setDefaultPalette] = useState(false);
  const [paletteVariant, setPaletteVariant] = useState('LIGHT'); /* Should come from color palette */

  const [colors, setColors] = useState({
    themePrimary: (themeConfig.themeColorPalettes || [])[0]
  });

  const [activeColor, setActiveColor] = useState({
    key: 'themePrimary',
    color: colors.themePrimary
  });

  /* PALETTE TYPE -------------- */
    useEffect(() => {
      const isExtendingPalette = paletteType === 'EXTEND';
      const { themePrimary, neutralPrimary, white } = defaultTheme;

        setColors({ themePrimary, neutralPrimary, white });
        setActiveColor({ key: 'themePrimary', color: themePrimary });

        setPaletteVariant('LIGHT');

      setEnableDarkMode(isExtendingPalette);
    }, [paletteType])

  /* --------------------------- */

  useEffect(() => {
    // setIsProcessingPalette(true);

  }, [selectedPalette]);

  useEffect(() => {
    const { themePrimary } = selectedPalette
      ? themeConfig.themeColorPalettes.find(({ id }) => id === selectedPalette)
      : defaultTheme;

    setColors({ themePrimary });
    setActiveColor({ key: 'themePrimary', color: themePrimary });

    changeTheme('CUSTOM', {
      ...selectedPalette
        ? defaultTheme
        : paletteVariant === 'LIGHT' ? defaultTheme : darkTheme,
      themePrimary,
    });
  }, [selectedPalette, paletteVariant]);

  useEffect(() => {
    if (wantsReset) {
      setSelectedPalette(themeConfig.themeColorPalettes[0].id);

      /* TODO: Review name variables */
      setIsCreatingPalette(false);
      setPaletteName('');
      setPaletteVariant('LIGHT');
      
      setWantsReset(false);
    }
  }, [wantsReset]);

  const onColorChange = (evt, { hex }) => {
    const variant = getThemeVariant({ [activeColor.key]: `#${hex}` });
    
    setColors({ ...colors, [activeColor.key]: `#${hex}` });
    setActiveColor({ ...activeColor, color: `#${hex}` });

    changeTheme('CUSTOM', variant);
  };

  useEffect(() => {
    const {
      themePrimary,
      neutralPrimary,
      white,
      ...palette
    } = (paletteVariant === 'LIGHT') ? defaultTheme : darkTheme;

    setColors({ themePrimary, neutralPrimary, white });
    setActiveColor({ key: 'themePrimary', color: themePrimary });

    changeTheme('CUSTOM', {
      ...palette,
      themePrimary,
      neutralPrimary,
      white,
    });
  }, [paletteVariant]);

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="COLOR_PALETTES">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <StyledDiv>
              {
                themeConfig.themeColorPalettes
                  ? (
                    <StyledChoiceGroup
                      label="Color palettes"
                      selectedKey={selectedPalette}
                      disabled={isCreatingPalette}
                      options={themeConfig.themeColorPalettes?.map(item => ({
                          key: item.id,
                          text: `Palette #${item.id}`
                        })) || []
                      }
                      onChange={(evt, { key }) => setSelectedPalette(key)}
                    />
                  )
                  : <MessageBar type="warning" content="No color palettes found" />
              }

              {
                !isCreatingPalette && (
                  <StyledCommandButton
                    iconProps={{ iconName: 'Add' }}
                    onClick={() => {
                      setSelectedPalette(null);
                      setIsCreatingPalette(true);
                    }}
                  >
                    New palette
                  </StyledCommandButton>
                )
              }
            </StyledDiv>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        {
          isCreatingPalette && (
            <Fragment>
              <Row>
                <Column>
                  <Spacing margin={{ bottom: 'normal' }}>
                    <Text variant="bold">Create new palette</Text>
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

                    <Spacing margin={{ top: 'normal' }}>
                      <Checkbox
                        label="Set as the default palette for the organization"
                        checked={defaultPalette}
                        onChange={(event, isDefault) => setDefaultPalette(isDefault)}
                      />
                    </Spacing>
                  </Spacing>
                </Column>
              </Row>

              <Spacing margin={{ top: 'small', bottom: 'normal' }}>
                <Separator />
              </Spacing>

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
                        label="Enable Dark color mode for this palette"
                        checked={enableDarkMode}
                        onChange={(event, enabled) => setEnableDarkMode(enabled)}
                      />
                    </Column>
                  )
                }
              </Row>
            </Fragment>
          )
        }

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
                text={isCreatingPalette ? "Create palette" : "Save changes"}
                onClick={() => {
                  const params = {
                    ownerId: id,
                    orgSid: orgId,
                    themeColorMode: paletteVariant,
                    defaultTheme: defaultPalette,
                    paletteNm: paletteName,
                    ...getThemeVariant({ paletteVariant, themePrimary: colors.themePrimary }),
                    custom: undefined,
                  }

                  if (!selectedPalette) {
                    createDashThemeColorMutation({
                      variables: {
                        createDashThemeColorInput: { ...params }
                      }
                    });
                  } else {
                    updateDashThemeColorMutation({
                      variables: {
                        updateDashThemeColorInput: {
                          sid: selectedPalette,
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

              {
                isCreatingPalette && themeConfig.themeColorPalettes !== null && (
                  <Spacing margin={{ left: 'normal' }}>
                    <Button
                      text="Discard changes"
                      disabled={isProcessingPalette}
                      onClick={() => {
                        setWantsReset(true);
                      }}
                    />
                  </Spacing>
                )
              }
            </StyledDiv>
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const ColorPalettesPage = React.memo(_ColorPalettesPage);

export { ColorPalettesPage };

