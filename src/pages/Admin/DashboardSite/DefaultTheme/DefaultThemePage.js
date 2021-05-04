import React, { useState, useEffect, Fragment }  from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Separator } from '../../../../components/separators/Separator';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { MessageBar } from '../../../../components/notifications/MessageBar';
import { Spinner } from '../../../../components/spinners/Spinner';
import { StyledChoiceGroup } from './DefaultThemePage.styles';

import { ADMIN_NAV } from '../../../../data/constants/AdminConstants';
import { useCurrentUserDashThemePageLazyQuery } from '../../../../data/services/graphql';

const _DefaultThemePage = () => {
  const [theme, setTheme] = useState('LIGHT');
  const [availableColorModes, setAvailableColorModes] = useState([]);
  // const [theme, setTheme] = useState(activeTheme ? JSON.parse(activeTheme).name : 'LIGHT');

  const [
    useDashThemeQuery,
    {
      data: currentUserThemeParams,
      loading: isLoadingCurrentUserThemeParams,
    }
  ] = useCurrentUserDashThemePageLazyQuery({ variables: {}});

  // useEffect(useDashThemeQuery, []);

  useEffect(() => {
    if (currentUserThemeParams) {
      const {
        themeColorModes,
        themeColorPalettes,
        themeFontSizes,
        dashTheme
      } = currentUserThemeParams.currentUserDashThemePage;

      setAvailableColorModes(currentUserThemeParams.themeColorModes);
    }
  })

  return (
    <LayoutAdmin id="PageDefaultTheme" sidebar={ADMIN_NAV} sidebarOptionSelected="defaultTheme">
      <Spacing margin="double">
        <Row>
          <Column lg="12">
            {
              isLoadingCurrentUserThemeParams
                ? <Spinner label="Loading themes" size="lg"/>
                : (!currentUserThemeParams || currentUserThemeParams.errors)
                  ? <MessageBar
                      type="error"
                      content={"An error occurred while fetching the available themes"}
                    />
                  : (
                      <Fragment>
                        <StyledChoiceGroup
                          label="Default organization theme"
                          defaultSelectedKey={theme}
                          options={[
                            { key: 'LIGHT', text: 'Default' },
                            { key: 'DARK', text: 'Dark' },
                            { key: 'ORGANIZATION', text: 'Organization' },
                          ]}
                          onChange={(evt, { key }) => setTheme(key)}
                        />
    
                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Separator />
                        </Spacing>
    
                        <Button
                          variant="primary"
                          text="Set theme"
                          onClick={() => alert('123')}
                        />
                      </Fragment>
                    )
            }
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const DefaultThemePage = React.memo(_DefaultThemePage);

export { DefaultThemePage };
