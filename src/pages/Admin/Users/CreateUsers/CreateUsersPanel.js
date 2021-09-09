import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { InputText } from '../../../../components/inputs/InputText';

import { useCreateUserMutation } from '../../../../data/services/graphql';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { useOrgSid } from '../../../../hooks/useOrgSid';

const CreateUsersPanel = ({ isOpen, onDismiss, onCreateUser, selectedUserId }) => {
  const { orgSid } = useOrgSid();
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
        orgOwnerId: orgSid,
        groupIds,
      },
      personInfo: {
        firstNm: firstName,
        lastNm: lastName,
      },
    },
  });

  useEffect(() => {
    if (data) {
      onCreateUser(data.createUser);
      onDismiss();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setGroupIds(0);
    }
  }, [data]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Update user"
      isOpen={isOpen}
      onDismiss={() => {
        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Person First Name"
                    value={firstName}
                    onChange={({ target }) => setFirstName(target.value)}
                  />
                </Column>
              </Row>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Person Last Name"
                    value={lastName}
                    onChange={({ target }) => setLastName(target.value)}
                  />
                </Column>
              </Row>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Email"
                    value={email}
                    type="email"
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </Column>
              </Row>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Password"
                    value={password}
                    type="password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Column>
              </Row>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Group Ids"
                    value={groupIds}
                    type="number"
                    onChange={({ target }) => setGroupIds(target.value)}
                  />
                </Column>
              </Row>
            </Spacing>

            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Separator />
            </Spacing>

            <Row>
              <Column lg="12">
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => {
                    if (firstName && lastName && password && email && groupIds !== 0) {
                      _apiCall();
                    } else {
                      alert('Please check the provided data');
                    }
                  }}
                >
                  Save user
                </Button>
              </Column>
            </Row>
          </Column>
        </Row>
      </>
    </Panel>
  );
};

export default CreateUsersPanel;
