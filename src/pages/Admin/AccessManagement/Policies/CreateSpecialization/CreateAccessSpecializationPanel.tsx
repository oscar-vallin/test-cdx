/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';

import { SpinnerSize, Checkbox, Panel, PanelType, Spinner } from 'office-ui-fabric-react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { useSessionStore } from 'src/store/SessionStore';
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
  useVendorQuickSearchLazyQuery,
  useOrganizationQuickSearchLazyQuery,
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';
import { TagPicker } from '../../../../../components/pickers/TagPicker';

const INITIAL_STATE = {
  name: '',
};

const groupSpecializations: any = (opts) => {
  const groups = _.groupBy(opts, ({ orgSids }) => orgSids.label);
  const [orgKey, vendorKey] = Object.keys(groups);

  const exchangeStatus = [...groups[orgKey]];
  const accessManagement = [...groups[vendorKey]];

  return [
    { label: 'Exchange Status', labelKey: 'Exchanges', valueKey: vendorKey, options: exchangeStatus },
    { label: 'Access Management', labelKey: 'Permission', valueKey: orgKey, options: accessManagement },
  ];
};

const parseToPickerOpts = (arr = []) => arr.map(({ name, sid }) => ({ name, key: sid }));

const defaultProps = {
  isOpen: false,
  onDismiss: () => null,
  onCreateSpecialization: () => null,
};

type CreateAccessSpecializationPanelProps = {
  isOpen?: boolean;
  onDismiss?: any | null;
  onCreateSpecialization?: any | null;
  selectedAccessId?: any;
} & typeof defaultProps;

const CreateAccessSpecializationPanel = ({
  isOpen,
  onDismiss,
  onCreateSpecialization,
  selectedAccessId,
}: CreateAccessSpecializationPanelProps): ReactElement => {
  const Toast = useNotification();
  const SessionStore = useSessionStore();

  const { orgSid } = useOrgSid();
  const [state, setState]: any = useState({ ...INITIAL_STATE });
  const [accessForm, setAccessForm]: any = useState({});
  const [accessFilters, setAccessFilters] = useState([]);
  const [specializations, setSpecializations] = useState({});
  const [currentItem, setCurrentItem]: any = useState(null);

  const [fetchAccessForm, { data: form, loading: isLoadingForm }] = useQueryHandler(
    useAccessSpecializationFormLazyQuery
  );

  const [createSpecialization, { data: createdSpecialization, loading: isCreatingSpecialization }] = useQueryHandler(
    useCreateAccessSpecializationMutation
  );

  const [fetchVendors, { data: vendors, loading: isFetchingVendors }] = useQueryHandler(useVendorQuickSearchLazyQuery);

  const [fetchOrgs, { data: orgs, loading: isFetchingOrgs }] = useQueryHandler(useOrganizationQuickSearchLazyQuery);

  // const [updateSpecialization] = useQueryHandler(useUpdateAccessSpecializationMutation);

  useEffect(() => {
    if (createdSpecialization) {
      const { createAccessSpecialization } = createdSpecialization;

      if (createAccessSpecialization.response === 'FAIL') {
        Toast.error({ text: 'Please, check the highlighted fields and try again' });
      } else {
        onCreateSpecialization(createAccessSpecialization);
        Toast.success({ text: 'Access specialization created successfully' });
        onDismiss();
      }
    }
  }, [createdSpecialization]);

  useEffect(() => {
    if (isOpen) {
      fetchAccessForm({ variables: { orgSid } });
      fetchOrgs({ variables: { searchText: '', orgOwnerSid: SessionStore.user.id } });
      fetchVendors({ variables: { searchText: '', orgOwnerSid: SessionStore.user.id } });
    } else {
      setState({ ...INITIAL_STATE });
      setAccessFilters([]);
      setAccessForm({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && form) {
      const { filters } = form.accessSpecializationForm;

      setAccessForm(form.accessSpecializationForm);
      setAccessFilters(groupSpecializations(filters));
      setSpecializations(filters.reduce((obj, item) => ({ ...obj, [item.permission]: [] }), {}));
    }
  }, [form, isOpen]);

  useEffect(() => {
    const value = { ...specializations, ...currentItem };

    setSpecializations(value);
  }, [currentItem]);

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

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Row>
                    <Column lg="12">
                      <Spacing margin={{ top: 'small' }}>
                        <Text variant="bold">Specializations</Text>
                      </Spacing>
                    </Column>
                  </Row>

                  <Row>
                    <Column lg="12">
                      {accessFilters.map((group: any, groupIndex) => (
                        <Collapse label={group.label} expanded key={groupIndex}>
                          <Card elevation="none" spacing="none">
                            <Spacing padding="normal">
                              <Row>
                                <Column lg="12">
                                  <Spacing margin={{ bottom: 'normal' }}>
                                    <Row>
                                      <Column lg="3">
                                        <Text variant="bold">{group.labelKey}</Text>
                                      </Column>
                                      <Column lg="9">
                                        <Text variant="bold">{group.valueKey}</Text>
                                      </Column>
                                    </Row>
                                  </Spacing>

                                  {group.options?.map((option, optIndex) => (
                                    <Spacing margin={{ top: 'small', bottom: 'small' }}>
                                      <Row center>
                                        <Column lg="3" key={`${groupIndex}-${optIndex}-left`}>
                                          {option.label}
                                        </Column>

                                        <Column lg="9" key={`${groupIndex}-${optIndex}-right`}>
                                          <TagPicker
                                            label
                                            disabled={false}
                                            itemLimit
                                            pickerProps
                                            debounce={500}
                                            onBlur={() => null}
                                            onFocus={() => null}
                                            required={false}
                                            id="__CreateAccessSpecializationPanelId"
                                            onResolveSuggestions={() => null}
                                            apiQuery={(text) => {
                                              const isVendor = option.orgSids.query === 'vendorQuickSearch';

                                              const data = {
                                                variables: {
                                                  searchText: text,
                                                  ...(!isVendor ? { orgOwnerSid: orgSid } : {}),
                                                },
                                              };

                                              option.orgSids.query === 'vendorQuickSearch'
                                                ? fetchVendors(data)
                                                : fetchOrgs(data);
                                            }}
                                            options={parseToPickerOpts(
                                              option.orgSids.query === 'vendorQuickSearch'
                                                ? vendors?.vendorQuickSearch
                                                : orgs?.organizationQuickSearch
                                            )}
                                            value={specializations[option.permission]}
                                            // disabled={isFetchingVendors || isFetchingOrgs}
                                            onRemoveItem={({ key }) => {
                                              const { permission } = option;

                                              setCurrentItem({
                                                [permission]: specializations[permission].filter(
                                                  (item) => item.key === key
                                                ),
                                              });
                                            }}
                                            onItemSelected={(item) => {
                                              const { permission } = option;

                                              setCurrentItem({
                                                [permission]: [...specializations[permission], item],
                                              });
                                            }}
                                          />
                                        </Column>
                                      </Row>
                                    </Spacing>
                                  ))}
                                </Column>
                              </Row>
                            </Spacing>
                          </Card>
                        </Collapse>
                      ))}
                    </Column>
                  </Row>
                </Spacing>

                <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                  <Separator />
                </Spacing>

                <Row>
                  <Column lg="12">
                    <Button
                      id="__CreateAccessSpecializationPanelId"
                      variant="primary"
                      disabled={isCreatingSpecialization}
                      onClick={() => {
                        createSpecialization({
                          variables: {
                            createAccessSpecializationInput: {
                              orgSid,
                              name: state.name,
                              filters: Object.keys(specializations)
                                .map((permission) => ({
                                  permission,
                                  orgSids: specializations[permission].map((item) => item.key),
                                }))
                                .reduce((arr, item): any => [...arr, item], []),
                            },
                          },
                        });
                        return null;
                      }}
                    >
                      Create specialization
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

CreateAccessSpecializationPanel.defaultProps = defaultProps;

export default CreateAccessSpecializationPanel;
