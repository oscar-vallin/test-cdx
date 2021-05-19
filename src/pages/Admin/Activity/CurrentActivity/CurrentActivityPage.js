import React from 'react';
import PropTypes from 'prop-types';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography/Text';
import { TablesCurrentActivity } from './../../../../containers/tables/TableCurrentActivity';
import { RouteLink } from './../../AdminPage.styles';
import { NAV_ITEMS } from './../../SideMenu';

export const CurrentActivityPage = ({ id = 'CurrentActivity' }) => {
  return (
    <LayoutAdmin id={id} sidebar={NAV_ITEMS} sidebarOptionSelected="ORG_ACTIVITY">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <Spacing margin={{ top: 'small' }}>
              <Text variant="bold">Current Activity</Text>
            </Spacing>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        <TablesCurrentActivity />
      </Spacing>
    </LayoutAdmin>
  );
};

CurrentActivityPage.propTypes = {};

export default CurrentActivityPage;
