import React from 'react';
import PropTypes from 'prop-types';

import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { Text } from '../../../components/typography/Text';
import { NAV_ITEMS } from './../SideMenu';

const UserDetailsPage = ({ id = 'CurrentActivity' }) => {
  return (
    <LayoutAdmin id={id} sidebar={NAV_ITEMS} sidebarOptionSelected="USER_DETAILS">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <Spacing margin={{ top: 'small' }}>
              <Text variant="bold">User Details</Text>
            </Spacing>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
      </Spacing>
    </LayoutAdmin>
  );
};

UserDetailsPage.propTypes = {};

export { UserDetailsPage };
