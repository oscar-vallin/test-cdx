/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { InputText } from '../../../../components/inputs/InputText';

import { useCreateUserMutation } from '../../../../data/services/graphql';

import { useOrgSid } from '../../../../hooks/useOrgSid';

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreateUser: () => null,
};

type CreateUsersPanelProps = {
  isOpen?: boolean;
  onDismiss?: any | null;
  onCreateUser?: any | null;
  selectedUserId?: any | null;
} & typeof defaultProps;

const CreateUsersPanel = ({ isOpen, onDismiss, onCreateUser }: CreateUsersPanelProps): ReactElement => {
  const { orgSid } = useOrgSid();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [groupIds, setGroupIds]: any = useState(0);

  const [_apiCall, { data, loading }] = useCreateUserMutation({
    variables: {
      userInfo: {
        email,
        password,
        orgSid,
        // orgOwnerId: orgSid,
        // groupIds,
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
                  id="__CreateUsersPanelId"
                  variant="primary"
                  disabled={loading}
                  onClick={() => {
                    if (firstName && lastName && password && email && groupIds !== 0) {
                      _apiCall();
                    } else {
                      // eslint-disable-next-line no-alert
                      alert('Please check the provided data');
                    }

                    return null;
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

CreateUsersPanel.defaultProps = defaultProps;

export default CreateUsersPanel;
