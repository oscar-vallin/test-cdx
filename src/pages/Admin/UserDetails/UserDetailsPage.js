import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../components/layouts';
import { Box, Row as Row_, Column as Column_, StyledButtonAction } from './UserDetalisPage.styles';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { Text } from '../../../components/typography/Text';
import { NAV_ITEMS } from './../SideMenu';
import { useCreateUserMutation } from '../../../data/services/graphql';

import { InputText } from '../../../components/inputs/InputText';

const UserDetailsPage = ({ id = 'CurrentActivity' }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [groupIds, setGroupIds] = useState(0);
  const history = useHistory();

  const [_apiCall, { data, loading }] = useCreateUserMutation({
    variables: {
      userInfo: {
        email,
        password,
        orgOwnerId: 1,
        groupIds,
      },
      personInfo: {
        firstNm: firstName,
        lastNm: lastName,
      },
    },
  });

  useEffect(() => {
    if (!loading && data) {
      history.push('/active-users');
    }
  }, [loading]);

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

        <Row_>
          <Column_ center>
            <InputText
              id="Input__First__Name"
              autoFocus
              disabled={false}
              placeholder="Person First Name"
              onChange={(v) => setFirstName(v.target.value)}
            />
          </Column_>
          <Column_ center>
            <InputText
              id="Input__Last__Name"
              autoFocus
              disabled={false}
              placeholder="Person Last Name"
              onChange={(v) => setLastName(v.target.value)}
            />
          </Column_>
        </Row_>
        <Row_>
          <Column_ center>
            <InputText
              id="Input__Email"
              autoFocus
              disabled={false}
              placeholder="Email"
              onChange={(v) => setEmail(v.target.value)}
            />
          </Column_>
          <Column_ center>
            <InputText
              id="Input__Password"
              autoFocus
              disabled={false}
              placeholder="Password"
              type="password"
              onChange={(v) => setPassword(v.target.value)}
            />
          </Column_>
        </Row_>
        <Row_>
          <Column_ center>
            <InputText
              id="Input__Group__Ids"
              autoFocus
              disabled={false}
              placeholder="Group Ids"
              type="number"
              onChange={(v) => setGroupIds(v.target.value)}
            />
          </Column_>
        </Row_>

        <Row_>
          <Column_ center>
            <StyledButtonAction id={`ButtonToday`} onClick={_apiCall} selected>
              Create User
            </StyledButtonAction>
          </Column_>
        </Row_>
      </Spacing>
    </LayoutAdmin>
  );
};

UserDetailsPage.propTypes = {};

export { UserDetailsPage };
