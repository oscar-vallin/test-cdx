import React, { useState, useEffect, Fragment } from 'react';

import { Button } from './../../../components/buttons/Button';
import { MessageBar } from './../../../components/notifications/MessageBar';
import { Text } from './../../../components/typography/Text';
import { Row, Column } from './../../../components/layouts';
import { Spacing } from './../../../components/spacings/Spacing';

import { useThemeContext } from './../../../contexts/ThemeContext';
import { useCreateOrUpdateOwnDashThemeMutation } from './../../../data/services/graphql';

import {
  StyledDiv,
  StyledTitle,
  StyledChoiceGroup,
} from './../UserSettingsPage.styles';

const ThemeSettings = ({ }) => {
  const { changeTheme, themeConfig } = useThemeContext();
  const { theme = { themeColorMode: 'LIGHT' } } = themeConfig;

  const [themeFontSize, setThemeFontSize] = useState(theme.themeFontSize || 'MEDIUM');
  const [themeColorMode, setThemeColorMode] = useState(theme.themeColorMode || 'LIGHT');

  useEffect(() => {
    setThemeFontSize(themeFontSize);
    setThemeColorMode(themeColorMode);

    changeTheme(themeColorMode);
  }, [themeFontSize, themeColorMode]);

  const [
    createOrUpdateOwnDashTheme,
    {
      data: themeResponse,
      loading: isHandlingTheme,
      error: themeError
    }
  ] = useCreateOrUpdateOwnDashThemeMutation();

  return (
    <Fragment>
      <StyledTitle>Theme</StyledTitle>

      <StyledDiv>
        <Text
          size="normal"
          className={`text ${(themeConfig.themeColorPalettes || []).length > 1 && 'text--centered'}`}
        >
          Color palettes:
  </Text>

        {
          !themeConfig.themeColorPalettes
            ? <MessageBar content="No color palettes available" />
            : themeConfig.themeColorPalettes.length === 1
              ? <MessageBar content="Organization (default)" />
              : (
                <StyledChoiceGroup
                  defaultSelectedKey={theme}
                  options={themeConfig.themeColorPalettes?.map(item => ({
                    key: item.id,
                    text: `Palette #${item.id}`
                  })) || []
                  }
                  onChange={(evt, { key }) => {
                    alert(key);
                  }}
                />
              )
        }
      </StyledDiv>

      <StyledDiv>
        <Text
          size="normal"
          className={`text ${(themeConfig.themeColorModes || []).length && 'text--centered'}`}
        >
          Color modes:
  </Text>

        {
          !(themeConfig.themeColorModes || []).length
            ? <MessageBar content="No color modes available" />
            : (
              <StyledChoiceGroup
                selectedKey={themeColorMode}
                options={themeConfig.themeColorModes?.map(item => ({
                  key: item,
                  text: `${item.charAt(0)}${item.slice(1).toLowerCase()}`
                })) || []
                }
                onChange={(evt, { key }) => {
                  setThemeColorMode(key);
                }}
              />
            )
        }
      </StyledDiv>

      <Row>
        <Column>
          <Spacing margin={{ top: "normal" }}>
            <Button
              variant="primary"
              text={isHandlingTheme ? "Processing..." : "Save theme"}
              // disabled={isFormInvalid(state) || !validations[0].isValid || isUpdatingPassword}
              onClick={() => {
                createOrUpdateOwnDashTheme({
                  variables: {
                    dashThemeInput: {
                      themeFontSize,
                      themeColorMode,
                    }
                  }
                })
              }}
            />
          </Spacing>
        </Column>
      </Row>
    </Fragment>
  )
}

export default ThemeSettings;