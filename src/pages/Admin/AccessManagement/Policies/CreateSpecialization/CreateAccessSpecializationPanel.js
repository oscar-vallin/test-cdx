/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { SpinnerSize, Checkbox, Panel, PanelType, Spinner } from 'office-ui-fabric-react';
import _ from 'lodash';

import { access } from 'fs';
import { Spacing } from '../../../../../components/spacings/Spacing';
import { Card } from '../../../../../components/cards';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';
import { Collapse } from '../../../../../components/collapses/Collapse';
import { useQueryHandler } from '../../../../../hooks/useQueryHandler';
import { Label } from '../../../../../components/labels/Label';

import {
  useAccessSpecializationFormLazyQuery,
  useCreateAccessSpecializationMutation,
  useUpdateAccessSpecializationMutation,
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';
import { TagPicker } from '../../../../../components/pickers/TagPicker';

const INITIAL_STATE = {
  name: '',
};

const groupSpecializations = (opts) => {
  const { values } = opts.find((opt) => opt.key === 'Permission');
  const { K2U, COLORPALETTE, ACCESS, ORG, PASSWORD, PROD, SSOIDP, TEST, THEME, UAT, USER } = _.groupBy(
    values,
    (item) => {
      return item.value.split('_').shift();
    }
  );

  // const exchangeStatus = [
  //   { label: 'K2U Exchanges', options: K2U },
  //   { label: 'Test Exchanges', options: TEST },
  //   { label: 'UAT Exchanges', options: UAT },
  //   { label: 'Production Exchanges', options: PROD },
  // ];

  // const accessManagement = [
  //   { label: 'Users', options: USER },
  //   { label: 'Access Management', options: ACCESS },
  //   { label: 'Organization', options: ORG },
  // ];

  // const siteSettings = [
  //   { label: 'Password', options: PASSWORD },
  //   { label: 'Color Palettes', options: COLORPALETTE },
  //   { label: 'Theme', options: THEME },
  //   { label: 'SSO', options: SSOIDP },
  // ];

  // return [
  //   { label: 'Exchange Status', permissions: [] },
  //   { label: 'Access Management', permissions: [] },
  //   { label: 'Site Settings', permissions: siteSettings },
  // ];
};

const CreateAccessSpecializationPanel = ({ isOpen, onDismiss, onCreateSpecialization, selectedAccessId }) => {
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [accessForm, setAccessForm] = useState({});
  const [accessFilters, setAccessFilters] = useState([]);

  const [fetchAccessForm, { data: form, loading: isLoadingForm }] = useQueryHandler(
    useAccessSpecializationFormLazyQuery
  );
  const [createSpecialization, { data: createdSpecialization, loading: isCreatingSpecialization }] = useQueryHandler(
    useCreateAccessSpecializationMutation
  );

  // const [updateSpecialization] = useQueryHandler(useUpdateAccessSpecializationMutation);

  useEffect(() => {
    if (createdSpecialization) {
      onCreateSpecialization(createdSpecialization.createAccessSpecialization);
      onDismiss();
    }
  }, [createdSpecialization]);

  useEffect(() => {
    if (isOpen) {
      fetchAccessForm({ variables: { orgSid } });
    } else {
      setState({ ...INITIAL_STATE });
      setAccessFilters([]);
      setAccessForm({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && form) {
      setAccessForm(form.accessSpecializationForm);
      // setAccessFilters(groupSpecializations(form.accessSpecializationForm.options));
    }
  }, [form, isOpen]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Specialization' : 'Update Access Specialization'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });
        // setOptions({ ...INITIAL_OPTIONS });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            {isLoadingForm ? (
              <>
                <Spacing margin={{ top: 'normal', bottom: 'double' }}>
                  <Separator />
                </Spacing>

                <Spacing>
                  <Spinner size={SpinnerSize.large} label="Loading policy form" />
                </Spacing>
              </>
            ) : (
              <Spacing margin={{ top: 'normal' }}>
                <Row bottom>
                  <Column lg="12">
                    {accessForm.name?.visible && (
                      <InputText
                        label={accessForm.name?.label}
                        minLength={accessForm.name?.min}
                        maxLength={accessForm.name?.max}
                        value={state.name}
                        required={accessForm.name?.required}
                        onChange={({ target }) => setState({ ...state, name: target.value })}
                      />
                    )}
                  </Column>
                </Row>

                <Spacing margin={{ top: 'normal' }}>
                  <Row>
                    <Column lg="12">
                      <Label>Organization</Label>
                      <p>{accessForm.organization?.label}</p>
                    </Column>
                  </Row>
                </Spacing>

                {accessForm.permissions?.visible && (
                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <Row>
                      <Column lg="12">
                        <Spacing margin={{ top: 'small' }}>
                          <Text variant="bold">Permissions</Text>
                        </Spacing>
                      </Column>
                    </Row>

                    <Row>
                      <Column lg="12">
                        {accessFilters}
                        {accessFilters.map((group, groupIndex) => (
                          <Collapse label={group.label} expanded key={groupIndex}>
                            <Spacing padding={{ top: 'normal', bottom: 'normal' }}>
                              <Row>
                                <Column lg="12">
                                  <Card elevation="none" spacing="none">
                                    <Row top>
                                      {group.permissions?.map((permission, pIndex) => (
                                        <Column lg="3" key={`${groupIndex}-${pIndex}`}>
                                          <Card elevation="none">
                                            <Spacing margin={{ bottom: 'normal' }}>
                                              <Label>{permission.label}</Label>
                                            </Spacing>

                                            {permission.options?.map((option, optIndex) => (
                                              <Spacing
                                                margin={{ top: 'small' }}
                                                key={`${groupIndex}-${pIndex}-${optIndex}`}
                                              >
                                                <Checkbox
                                                  label={option.label}
                                                  checked={state.permissions.includes(option.value)}
                                                  onChange={(event, checked) =>
                                                    setState({
                                                      ...state,
                                                      permissions: checked
                                                        ? [...state.permissions, option.value]
                                                        : state.permissions.filter((value) => value !== option.value),
                                                    })
                                                  }
                                                />
                                              </Spacing>
                                            ))}
                                          </Card>
                                        </Column>
                                      ))}
                                    </Row>
                                  </Card>
                                </Column>
                              </Row>
                            </Spacing>
                          </Collapse>
                        ))}
                      </Column>
                    </Row>
                  </Spacing>
                )}

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Separator />
                </Spacing>

                <Row>
                  <Column lg="12">
                    <Button
                      variant="primary"
                      disabled={isCreatingSpecialization}
                      onClick={() => {
                        createSpecialization({
                          variables: {
                            createAccessSpecializationInput: {
                              orgSid,
                              name: state.name,
                              filters: accessFilters.map(({ key }) => key),
                            },
                          },
                        });
                      }}
                    >
                      Create policy
                    </Button>
                  </Column>
                </Row>
              </Spacing>
            )}
          </Column>
        </Row>
      </>
    </Panel>
  );
};

export default CreateAccessSpecializationPanel;
