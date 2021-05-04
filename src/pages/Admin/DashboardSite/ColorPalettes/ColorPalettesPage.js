import React, { useState, useEffect, useCallback }  from 'react';
import chroma from 'chroma-js';

import { ChoiceGroup } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { StyledChoiceGroup, StyledColorPicker } from './ColorPalettesPage.styles';

import { ADMIN_NAV } from '../../../../data/constants/AdminConstants';
import { useThemeContext } from '../../../../contexts/ThemeContext';
import {
  useDashThemeColorByNameQuery,
  useCurrentUserDashThemePageQuery
} from '../../../../data/services/graphql';

const getThemeVariant = ({
  themePrimary,
  neutralPrimary = '#323130',
  black = '#000',
  white = '#fff',
}) => {
  return {
    themeColors: {
      themePrimary: themePrimary,
      themeLighterAlt: chroma(themePrimary).brighten(3.55).hex(),
      themeLighter: chroma(themePrimary).brighten(3.25).hex(),
      themeLight: chroma(themePrimary).brighten(2.85).hex(),
      themeTertiary: chroma(themePrimary).brighten(1.32).hex(),
      themeSecondary: chroma(themePrimary).brighten(0.29).hex(),
      themeDarkAlt: chroma(themePrimary).brighten(0.065).hex(),
      themeDark: chroma(themePrimary).brighten(-0.7).hex(),
      themeDarker: chroma(themePrimary).brighten(-1.2).hex(),
      neutralLighterAlt: chroma(neutralPrimary).brighten(4.3).hex(),
      neutralLighter: chroma(neutralPrimary).brighten(4.17).hex(),
      neutralLight: chroma(neutralPrimary).brighten(4.04).hex(),
      neutralQuaternaryAlt: chroma(neutralPrimary).brighten(3.81).hex(),
      neutralQuaternary: chroma(neutralPrimary).brighten(3.49).hex(),
      neutralTertiaryAlt: chroma(neutralPrimary).brighten(3.33).hex(),
      neutralTertiary: chroma(neutralPrimary).brighten(2.52).hex(),
      neutralSecondary: chroma(neutralPrimary).brighten(1.1).hex(),
      neutralPrimaryAlt: chroma(neutralPrimary).brighten(0.22).hex(),
      neutralPrimary: neutralPrimary,
      neutralDark: chroma(neutralPrimary).brighten(-0.47).hex(),
      black,
      white,
    }
  };
}

const _ColorPalettesPage = () => {
  const [theme, setTheme] = useState('LIGHT');

  const activeTheme = localStorage.getItem('CURRENT_THEME');
  const { changeTheme } = useThemeContext();

  const {
    data,
    loading,
    error
  } = useCurrentUserDashThemePageQuery({ variables: {}});

  // const {
  //   data: userThemeResult,
  //   loading: isLoadingTheme,
  //   error: userThemeError,
  // } = useUserThemeQuery({
  //   variables: {}
  // });

  // useEffect(() => {
  //   if (!isLoadingTheme) {
  //     console.log(userThemeResult);
  //     console.log(userThemeError);
  //   }
  // }, [isLoadingTheme])

  // const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'LIGHT');
  
  const [themeVariant, setThemeVariant] = useState(
    activeTheme ? JSON.parse(activeTheme) : getThemeVariant({ themePrimary: '#0078d4' })
  );

  const [colors, setColors] = useState({
    themePrimary: themeVariant.themeColors.themePrimary,
    neutralPrimary: themeVariant.themeColors.neutralPrimary,
    white: themeVariant.themeColors.white,
    black: themeVariant.themeColors.black,
  });
  
  const [activeColor, setActiveColor] = useState({ key: 'themePrimary', color: colors.themePrimary });
  
  const onColorChange = useCallback((evt, { hex }) => {
    const variant = getThemeVariant({ ...colors, [activeColor.key]: `#${hex}` });
  
    setColors({ ...colors, [activeColor.key]: `#${hex}` });
    setActiveColor({ ...activeColor, color: `#${hex}` });

    setThemeVariant(variant);
    changeTheme('custom', variant.themeColors);
  });

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebar={ADMIN_NAV} sidebarOptionSelected="colorPalettes">
      <Spacing margin="double">
        <Row>
          <Column lg="12">
            <StyledChoiceGroup
              label="Color Palettes"
              defaultSelectedKey={theme}
              options={[
                { key: 'LIGHT', text: 'Default' },
                { key: 'DARK', text: 'Dark' },
                { key: 'ORGANIZATION', text: 'Organization' },
              ]}
              onChange={(evt, { key }) => setTheme(key)}
            />

            <br />
            <br />

            <Row>
              <Column lg="3">
                <ChoiceGroup
                  label="Colors"
                  defaultSelectedKey={activeColor.key}
                  options={
                    Object
                      .keys(colors)
                      .map(key => ({
                        key,
                        label: key === 'themePrimary'
                          ? 'Primary color'
                          : key === 'neutralPrimary'
                            ? 'Neutral color'
                            : key === 'black'
                              ? 'Text color'
                              : 'Background color',
                        onRenderField: (props, render) => {
                          const key = props.id.split('-').pop();

                          return (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {render(props)}

                              <div style={{
                                height: 30,
                                width: 30,
                                margin: `0 15px`,
                                border: '1px solid #d0d0d0',
                                background: colors[key]
                              }} />

                              <span>{props.label}</span>
                            </div>
                          )
                        }
                      }))
                  }
                  onChange={(evt, { key }) => setActiveColor({ ...activeColor, key })}
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

            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Separator />
            </Spacing>

            <Button
              variant="primary"
              text="Save palette"
              onClick={() => alert('123')}
            />
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const ColorPalettesPage = React.memo(_ColorPalettesPage);

export { ColorPalettesPage };

