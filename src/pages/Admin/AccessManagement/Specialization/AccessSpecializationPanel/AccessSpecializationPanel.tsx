/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect } from 'react';

import { SpinnerSize, Panel, PanelType, Spinner, ITag, Stack } from '@fluentui/react';
import _ from 'lodash';

import { useNotification } from 'src/hooks/useNotification';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { LightSeparator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';
import { UIInputText } from 'src/components/inputs/InputText';
import { Collapse } from 'src/components/collapses/Collapse';
import { useQueryHandler } from 'src/hooks/useQueryHandler';

import {
  useFindAccessSpecializationLazyQuery,
  useAccessSpecializationFormLazyQuery,
  useCreateAccessSpecializationMutation,
  useUpdateAccessSpecializationMutation,
  AccessSpecializationForm,
  CdxWebCommandType,
  UiSelectManyField,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { PanelHeader, PanelTitle } from 'src/layouts/Panels/Panels.styles';
import { orgQuickSearch, vendorQuickSearch } from 'src/hooks/useQuickSearch';
import { useApolloClient } from '@apollo/client';
import { ErrorHandler } from 'src/utils/ErrorHandler';

type SpecializationOption = {
  label: string;
  permission: string;
  orgSids: UiSelectManyField;
};

type SpecializationGroup = {
  label: string;
  labelKey: string;
  valueKey: string;
  options: SpecializationOption[];
};

const INITIAL_STATE = {
  name: '',
};

const groupSpecializations = (opts): SpecializationGroup[] => {
  const groups = _.groupBy(opts, ({ orgSids }) => orgSids.label);
  const [orgKey, vendorKey] = Object.keys(groups);

  const exchangeStatus = [...groups[orgKey]];
  const accessManagement = [...groups[vendorKey]];

  return [
    { label: 'Exchange Status', labelKey: 'Exchanges', valueKey: orgKey, options: exchangeStatus },
    { label: 'Access Management', labelKey: 'Permission', valueKey: vendorKey, options: accessManagement },
  ];
};

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

const AccessSpecializationPanel = ({
  isOpen,
  onDismiss,
  onCreateSpecialization = () => {},
  onUpdateSpecialization = () => {},
  selectedAccessId,
}: CreateAccessSpecializationPanelProps): ReactElement => {
  const Toast = useNotification();
  const client = useApolloClient();
  const handleError = ErrorHandler();
  const { orgSid } = useOrgSid();
  const [state, setState]: any = useState({ ...INITIAL_STATE });
  const [showDialog, setShowDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [accessForm, setAccessForm] = useState<AccessSpecializationForm | null>();
  const [accessFilters, setAccessFilters] = useState<SpecializationGroup[]>([]);
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
  const [updateSpecialization, { data: updatedSpecialization }] = useQueryHandler(
    useUpdateAccessSpecializationMutation
  );

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
        setAccessForm(createAccessSpecialization);
        const errorMsg = createAccessSpecialization.errMsg ?? 'Please, check the highlighted fields and try again';
        Toast.error({ text: errorMsg });
      } else {
        onCreateSpecialization(createAccessSpecialization);
        Toast.success({ text: 'Access specialization created successfully' });
        doClosePanel();
      }
    }
  }, [createdSpecialization]);

  useEffect(() => {
    if (updatedSpecialization) {
      const { updateAccessSpecialization } = updatedSpecialization;

      if (updateAccessSpecialization?.response && updateAccessSpecialization?.response === 'FAIL') {
        setAccessForm(updateAccessSpecialization);
        const errorMsg = updateAccessSpecialization.errMsg ?? 'Please, check the highlighted fields and try again';
        Toast.error({ text: errorMsg });
      } else {
        onUpdateSpecialization(updateAccessSpecialization);
        Toast.success({ text: 'Access specialization updated successfully' });
        doClosePanel();
      }
    }
  }, [updatedSpecialization]);

  useEffect(() => {
    if (isOpen) {
      if (!selectedAccessId) {
        setState({ ...INITIAL_STATE });
        setAccessFilters([]);
        fetchAccessForm({ variables: { orgSid } });
      }
    } else {
      setAccessForm(null);
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

  const onPanelClose = () => {
    if (unsavedChanges) {
      setShowDialog(true);
    } else {
      doClosePanel();
    }
  };

  const doClosePanel = () => {
    setState({ ...INITIAL_STATE });

    // Reset the form
    setAccessForm(null);
    setShowDialog(false);
    setUnsavedChanges(false);
    onDismiss();
  };

  const doOrgSearch = async (option: SpecializationOption, text: string): Promise<ITag[]> => {
    if (option.orgSids.query === 'vendorQuickSearch') {
      return vendorQuickSearch(client, handleError, text, orgSid);
    } else {
      return orgQuickSearch(client, handleError, text, orgSid);
    }
  };

  const renderBody = () => {
    return (
      <>
        <FormRow>
          <Column lg="12">
            <UIInputText
              id="__Specialization_Name"
              uiField={accessForm?.name}
              value={state.name}
              onChange={(event, newValue) => {
                setUnsavedChanges(true);
                setState({ ...state, name: newValue });
              }}
            />
          </Column>
        </FormRow>

        <FormRow>
          <Column lg="12">
            <UIInputTextReadOnly id="__Organization" uiField={accessForm?.organization} />
          </Column>
        </FormRow>

        <FormRow>
          <Column lg="12">
            <Spacing margin={{ top: 'small' }}>
              <Text variant="bold">Specializations</Text>
            </Spacing>
          </Column>
        </FormRow>

        <FormRow>
          <Column lg="12">
            {accessFilters.map((group: SpecializationGroup, groupIndex) => (
              <Collapse label={group.label} expanded key={groupIndex}>
                <Card elevation="none" spacing="none" key={`card_${groupIndex}`}>
                  <Spacing padding="normal" key={`space_${groupIndex}`}>
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
                          <Spacing margin={{ top: 'small', bottom: 'small' }} key={`group_${optIndex}`}>
                            <Row center>
                              <Column lg="3" key={`${groupIndex}-${optIndex}-left`}>
                                {option.label}
                              </Column>

                              <Column lg="9" key={`${groupIndex}-${optIndex}-right`}>
                                <TagPicker
                                  disabled={option.orgSids.readOnly}
                                  debounce={500}
                                  id={`__Specialization_${option.permission}`}
                                  doSearch={(searchText) => doOrgSearch(option, searchText)}
                                  value={specializations[option.permission]}
                                  onChange={(items) => {
                                    setUnsavedChanges(true);

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
        </FormRow>
      </>
    );
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Column lg="12">
        <Stack horizontal styles={{ root: { height: 44 } }}>
          <PanelTitle id="__CreateSpec_Panel_Title" variant="bold" size="large">
            {!selectedAccessId ? 'New Access Specialization' : 'Update Access Specialization'}
          </PanelTitle>
        </Stack>
      </Column>
    </PanelHeader>
  );

  const renderPanelFooter = () => {
    const commands = accessForm?.commands;
    const command = commands?.find(
      (cmd) => cmd?.commandType === CdxWebCommandType.Create || cmd?.commandType === CdxWebCommandType.Update
    );
    if (command) {
      return (
        <div>
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
            }}
          >
            {command.label}
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Panel
        id="create-specialization-panel"
        closeButtonAriaLabel="Close"
        type={PanelType.large}
        headerText={!selectedAccessId ? 'New Access Specialization' : 'Update Access Specialization'}
        onRenderHeader={renderPanelHeader}
        onRenderFooterContent={renderPanelFooter}
        isOpen={isOpen}
        onDismiss={onPanelClose}
        onOuterClick={() => {}}
      >
        <>
          <Row>
            <Column lg="12">
              {!accessForm || isLoadingForm || isLoadingSpecialization ? (
                <>
                  <Spacing margin={{ top: 'normal', bottom: 'double' }}>
                    <LightSeparator />
                  </Spacing>

                  <Spacing>
                    <Spinner size={SpinnerSize.large} label="Loading policy form" />
                  </Spacing>
                </>
              ) : (
                renderBody()
              )}
            </Column>
          </Row>
        </>
      </Panel>
      <DialogYesNo
        open={showDialog}
        highlightNo
        title="You have unsaved changes"
        message="You are about lose all changes made to this Access Specialization. Are you sure you want to continue?"
        onYes={() => {
          setShowDialog(false);
          doClosePanel();
          return null;
        }}
        onClose={() => {
          setShowDialog(false);
          return null;
        }}
      />
    </>
  );
};

AccessSpecializationPanel.defaultProps = defaultProps;

export default AccessSpecializationPanel;
