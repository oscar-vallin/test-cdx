/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';

import { SpinnerSize, Panel, PanelType, Spinner } from '@fluentui/react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Separator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';
import { InputText } from 'src/components/inputs/InputText';
import { Collapse } from 'src/components/collapses/Collapse';
import { useQueryHandler } from 'src/hooks/useQueryHandler';

import {
  useFindAccessSpecializationLazyQuery,
  useAccessSpecializationFormLazyQuery,
  useCreateAccessSpecializationMutation,
  useUpdateAccessSpecializationMutation,
  useVendorQuickSearchLazyQuery,
  useOrganizationQuickSearchLazyQuery, AccessSpecializationForm,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TagPicker } from 'src/components/pickers/TagPicker';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';

const INITIAL_STATE = {
  name: '',
};

const groupSpecializations: any = (opts) => {
  const groups = _.groupBy(opts, ({ orgSids }) => orgSids.label);
  const [orgKey, vendorKey] = Object.keys(groups);

  const exchangeStatus = [...groups[orgKey]];
  const accessManagement = [...groups[vendorKey]];

  return [
    { label: 'Exchange Status', labelKey: 'Exchanges', valueKey: orgKey, options: exchangeStatus },
    { label: 'Access Management', labelKey: 'Permission', valueKey: vendorKey, options: accessManagement },
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
  onUpdateSpecialization?: any | null;
  selectedAccessId?: any;
} & typeof defaultProps;

const CreateAccessSpecializationPanel = ({
  isOpen,
  onDismiss,
  onCreateSpecialization = () => {},
  onUpdateSpecialization = () => {},
  selectedAccessId,
}: CreateAccessSpecializationPanelProps): ReactElement => {
  const Toast = useNotification();

  const { orgSid } = useOrgSid();
  const [state, setState]: any = useState({ ...INITIAL_STATE });
  const [accessForm, setAccessForm]: any = useState<AccessSpecializationForm>();
  const [accessFilters, setAccessFilters] = useState([]);
  const [specializations, setSpecializations] = useState({});
  const [currentItem, setCurrentItem]: any = useState(null);

  const [fetchAccessForm, { data: form, loading: isLoadingForm }] = useQueryHandler(
    useAccessSpecializationFormLazyQuery
  );
  const [fetchSpecialization, { data: specialization, loading: isLoadingSpecialization }] = useQueryHandler(
    useFindAccessSpecializationLazyQuery
  );
  const [createSpecialization, { data: createdSpecialization, loading: isCreatingSpecialization }] = useQueryHandler(
    useCreateAccessSpecializationMutation
  );
  const [updateSpecialization, { data: updatedSpecialization, loading: isUpdatingSpecialization }] = useQueryHandler(
    useUpdateAccessSpecializationMutation
  );
  const [fetchVendors, { data: vendors, loading: isFetchingVendors }] = useQueryHandler(useVendorQuickSearchLazyQuery);
  const [fetchOrgs, { data: orgs, loading: isFetchingOrgs }] = useQueryHandler(useOrganizationQuickSearchLazyQuery);

  useEffect(() => {
    if (isOpen && selectedAccessId > 0) {
      fetchSpecialization({
        variables: {
          specializationSid: selectedAccessId,
        },
      });
    }
  }, [selectedAccessId, isOpen]);

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

    if (updatedSpecialization) {
      const { updateAccessSpecialization } = updatedSpecialization;

      if (updateAccessSpecialization?.response && updateAccessSpecialization?.response === 'FAIL') {
        Toast.error({ text: 'Please check the highlighted fields and try again' });
      } else {
        onUpdateSpecialization(updateAccessSpecialization);
        Toast.success({ text: 'Access specialization updated successfully' });
        onDismiss();
      }
    }
  }, [createdSpecialization, updatedSpecialization]);

  useEffect(() => {
    if (isOpen) {
      if (!selectedAccessId) {
        setState({ ...INITIAL_STATE });
        setAccessFilters([]);
        fetchAccessForm({ variables: { orgSid } });
      }
    } else {
      setAccessForm({});
    }
  }, [isOpen, selectedAccessId]);

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

  useEffect(() => {
    if (specialization) {
      const { name, filters, ...form } = specialization.findAccessSpecialization;

      const opts = filters.reduce(
        (obj, item) => ({
          ...obj,
          [item.permission]: item.orgSids.value?.map(({ name, value }) => ({ name, key: value })) || [],
        }),
        {}
      );

      setState({ name: name.value });
      setAccessFilters(groupSpecializations(filters));
      setAccessForm({ name, filters, ...form });
      setSpecializations(opts);
    }
  }, [specialization]);

  return (
    <Panel
      id="create-specialization-panel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Specialization' : 'Update Access Specialization'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            {!accessForm || isLoadingForm || isLoadingSpecialization ? (
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
                        id="specialization-name"
                        label={accessForm.name?.label}
                        minLength={accessForm.name?.min}
                        maxLength={accessForm.name?.max}
                        value={state.name}
                        required={accessForm.name?.required}
                        onChange={(event, newValue) => setState({ ...state, name: newValue })}
                      />
                    )}
                  </Column>
                </Row>

                <Spacing margin={{ top: 'normal' }}>
                  <Row>
                    <Column lg="12">
                      <UIInputTextReadOnly id='__Organization' uiField={accessForm.organization}/>
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
                                            disabled={false}
                                            pickerProps
                                            debounce={500}
                                            onBlur={() => null}
                                            onFocus={() => null}
                                            required={false}
                                            id="__CreateAccessSpecializationPanelId"
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

                                              return null;
                                            }}
                                            options={parseToPickerOpts(
                                              option.orgSids.query === 'vendorQuickSearch'
                                                ? vendors?.vendorQuickSearch
                                                : orgs?.organizationQuickSearch
                                            )}
                                            value={specializations[option.permission]}
                                            onChange={(items) => {
                                              const { permission } = option;

                                              setCurrentItem({
                                                [permission]: items,
                                              });

                                              return null;
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
                      id="__CreateAccessSpecializationBtnId"
                      variant="primary"
                      disabled={isCreatingSpecialization}
                      onClick={() => {
                        const params = {
                          name: state.name,
                          filters: Object.keys(specializations)
                            .map((permission) => ({
                              permission,
                              orgSids: specializations[permission].map((item) => item.key),
                            }))
                            .reduce((arr, item): any => [...arr, item], []),
                        };

                        if (!selectedAccessId) {
                          createSpecialization({
                            variables: {
                              createAccessSpecializationInput: {
                                orgSid,
                                ...params,
                              },
                            },
                          });
                        } else {
                          updateSpecialization({
                            variables: {
                              updateAccessSpecializationInput: {
                                sid: selectedAccessId,
                                ...params,
                              },
                            },
                          });
                        }

                        return null;
                      }}
                    >
                      {!selectedAccessId ? 'Create' : 'Update'} specialization
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
