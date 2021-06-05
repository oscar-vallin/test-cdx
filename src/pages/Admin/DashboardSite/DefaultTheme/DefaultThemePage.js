import React, { useState, useEffect, Fragment }  from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { MessageBar } from '../../../../components/notifications/MessageBar';
import { Spinner } from '../../../../components/spinners/Spinner';
import { StyledChoiceGroup } from './DefaultThemePage.styles';
import { useThemeContext } from '../../../../contexts/ThemeContext';

const _DefaultThemePage = () => {
  const [theme, setTheme] = useState('LIGHT');

  const { themeConfig } = useThemeContext();

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebarOptionSelected="THEME">
      <Spacing margin="double">
        <Row>
          <Column lg="12">
            {
              <Fragment>
                <StyledChoiceGroup
                  label="Default organization theme"
                  defaultSelectedKey={theme}
                  options={themeConfig.themeColorModes?.map(item => ({
                      key: item,
                      text: `${item.charAt(0)}${item.slice(1).toLowerCase()}`
                    })) || []
                  }
                  onChange={(evt, { key }) => setTheme(key)}
                />

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Separator />
                </Spacing>

                <Button
                  variant="primary"
                  text="Set theme"
                  onClick={() => alert(theme)}
                />
              </Fragment>
            }
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const DefaultThemePage = React.memo(_DefaultThemePage);

export { DefaultThemePage };
