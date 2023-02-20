import {
  DefaultButton,
  FontIcon,
  MessageBar,
  MessageBarType,
  PanelType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { UIInputText } from 'src/components/inputs/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text as PanelTitle } from 'src/components/typography';
import {
  useVendorSpecFormLazyQuery,
  useCreateVendorSpecMutation,
  useUpdateVendorSpecMutation,
  useActivateVendorSpecMutation,
  useVendorSpecQuickSearchLazyQuery,
  VendorSpecForm,
  ExtractType,
  WebCommand,
  CdxWebCommandType,
  GqOperationResponse, UiOption,
} from 'src/data/services/graphql';
import { UIInputSearchOne, UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import {
  PanelBody, PanelHeader, ThemedPanel, WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';
import { Column } from 'src/components/layouts';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { CommentBubble } from 'src/components/inputs/Comment';

const defaultDialogProps: DialogYesNoProps = {
  id: '__SpecVendor_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

type SpecPanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
    refreshPage: (data: boolean) => void;
    sid?: string;
    orgSid: string;
};

const SpecPanel = ({
  closePanel, isOpen, sid, orgSid, refreshPage,
}: SpecPanelProps) => {
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const [vendorSpecForm, setVendorSpecForm] = useState<VendorSpecForm | null>();
  const [specOptions, setSpecOptions] = useState<UiOption[]>([]);
  const [name, setName] = useState('');
  const [legacyName, setLegacyName] = useState('');
  const [version, setVersion] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [supportsFullFile, setSupportsFullFile] = useState('');
  const [supportsChangesOnly, setSupportsChangesOnly] = useState('');
  const [comments, setComments] = useState('');
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [currentSpecVendor, setCurrentSpecVendor] = useState<UiOption>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);
  const [message, setMessage] = useState<string | null>();
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [fetchVendorSpec, {
    data: dataForm,
    loading: loadingForm,
    error: errorForm,
  }] = useVendorSpecFormLazyQuery();
  const [createVendor, {
    data: createVendorData,
    loading: isLoadingCreate,
    error: createVendorError,
  }] = useCreateVendorSpecMutation();
  const [updateVendorSpec, {
    data: updateVendorData,
    loading: isLoadingUpdate,
    error: updateVendorError,
  }] = useUpdateVendorSpecMutation();
  const [activateVendorSpec,
    {
      data: activateVendorData,
      loading: isLoadingActivateVendor,
      error: activateVendorError,
    },
  ] = useActivateVendorSpecMutation();

  const [vendorSpecQuickSearch,
    {
      data: vendorSpecSearchData,
      loading: isLoadingVendorSpecQuickSearch,
      error: vendorSpecSearchError
    }] = useVendorSpecQuickSearchLazyQuery();

  useEffect(() => {
    handleError(errorForm);
  }, [errorForm]);
  useEffect(() => {
    handleError(createVendorError);
  }, [createVendorError]);
  useEffect(() => {
    handleError(updateVendorError);
  }, [updateVendorError]);
  useEffect(() => {
    handleError(activateVendorError);
  }, [activateVendorError]);
  useEffect(() => {
    handleError(vendorSpecSearchError);
  }, [vendorSpecSearchError]);

  const fetchData = () => {
    fetchVendorSpec({
      variables: {
        orgSid,
        sid,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!loadingForm && dataForm) {
      setVendorSpecForm(dataForm.vendorSpecForm);

      if (dataForm.vendorSpecForm?.commands) {
        const pageCommands = dataForm.vendorSpecForm.commands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
      }
    }
  }, [dataForm, loadingForm]);

  useEffect(() => {
    if (vendorSpecForm) {
      setName(vendorSpecForm.name.value ?? '');
      setLegacyName(vendorSpecForm.legacyName.value ?? '');
      setCurrentSpecVendor(vendorSpecForm.parentSpec.value ?? undefined);
      setVersion(vendorSpecForm.version.value ?? '');
      setFileContents(vendorSpecForm.fileContents.value?.value ?? '');
      setSupportsChangesOnly(vendorSpecForm.supportsChangesOnly.value?.value ?? '');
      setSupportsFullFile(vendorSpecForm.supportsFullFile.value?.value ?? '');
      setComments(vendorSpecForm.comments.value ?? '');
    }
  }, [vendorSpecForm]);

  useEffect(() => {
    const response = createVendorData?.createVendorSpec;
    if (createVendorData) {
      const responseCode = response?.response;
      const { createVendorSpec } = createVendorData;
      setVendorSpecForm(createVendorSpec);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = createVendorSpec?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        refreshPage(true);
        closePanel(false);
        setMessage(null);
        Toast.success({ text: 'Vendor Spec Saved' });
      }
    }
  }, [createVendorData, isLoadingCreate]);
  useEffect(() => {
    const response = updateVendorData?.updateVendorSpec;
    if (updateVendorData) {
      const responseCode = response?.response;
      const { updateVendorSpec } = updateVendorData;
      setVendorSpecForm(updateVendorSpec);
      if (responseCode === GqOperationResponse.Fail) {
        const errorMsg = updateVendorSpec?.errMsg
        ?? 'Error occurred, please verify the information and try again.';
        setMessageType(MessageBarType.error);
        setMessage(errorMsg);
      }

      if (responseCode === GqOperationResponse.Success) {
        refreshPage(true);
        closePanel(false);
        setMessage(null);
        Toast.success({ text: 'Vendor Spec Saved' });
      }
    }
  }, [updateVendorData, isLoadingUpdate]);

  useEffect(() => {
    if (!isLoadingActivateVendor && activateVendorData) {
      refreshPage(true);
      closePanel(false);
      setMessage(null);
      Toast.success({ text: `${name} has been activated` });
    }
  }, [activateVendorData, isLoadingActivateVendor]);

  const searchVendorSpecs = (searchText?: string) => {
    vendorSpecQuickSearch({
      variables: {
        searchText: searchText ?? '',
      },
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'You have unsaved changes';
    updatedDialog.message = 'Changes made will be discarded?  Are you sure you wish to continue and lose your changes?';

    updatedDialog.onYes = () => {
      hideDialog();
      closePanel(false);
      setMessage(null);
      setUnsavedChanges(false);
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const showActivateDialog = () => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Activate Vendor Spec';
    updatedDialog.message = 'Are you sure you want to activate this Vendor Spec? This will make it available for new Xchanges to use it';

    updatedDialog.onYes = () => {
      hideDialog();
      activateVendorSpec({
        variables: {
          sid: sid ?? '',
        },
      }).then();
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  }

  const onPanelClose = () => {
    if (unsavedChanges) {
      showUnsavedChangesDialog();
    } else {
      closePanel(false);
      setMessage(null);
    }
  };

  const getFileContent = () => {
    let fc = '';
    if (fileContents === ExtractType.Census) {
      fc = 'Census';
    } else if (fileContents === ExtractType.CensusWithEnrollment) {
      fc = 'CensusWithEnrollment';
    } else if (fileContents === ExtractType.CobraIr) {
      fc = 'CobraIr'
    } else if (fileContents === ExtractType.CobraQe) {
      fc = 'CobraQe';
    } else if (fileContents === ExtractType.Enrollment) {
      fc = 'Enrollment';
    } else if (fileContents === ExtractType.Payroll) {
      fc = 'Payroll';
    }
    return fc;
  }

  const saveSpecVendor = () => {
    const fCs = getFileContent();
    if (sid) {
      updateVendorSpec({
        variables: {
          specInput: {
            sid,
            comments,
            fileContents: ExtractType[fCs],
            supportsChangesOnly: supportsChangesOnly === 'true',
            supportsFullFile: supportsFullFile === 'true',
            legacyName,
            version,
            name,
            parentSpec: currentSpecVendor?.value,
          },
        },
      }).then();
      return;
    }
    createVendor({
      variables: {
        specInput: {
          name,
          version,
          legacyName,
          fileContents: ExtractType[fCs],
          supportsChangesOnly: supportsChangesOnly === 'true',
          supportsFullFile: supportsFullFile === 'true',
          comments,
          vendorSid: orgSid,
          parentSpec: currentSpecVendor?.value,
        },
      },
    }).then();
  };

  useEffect(() => {
    if (!isLoadingVendorSpecQuickSearch && vendorSpecSearchData) {
      const specs = vendorSpecSearchData.vendorSpecQuickSearch?.map((spec) => {
        const opt: UiOption = {
          label: `${spec.vendor?.name}: ${spec.name}`,
          value: spec.sid ?? '',
        };
        return opt;
      });
      setSpecOptions(specs ?? []);
    }
  }, [vendorSpecSearchData, isLoadingVendorSpecQuickSearch]);

  const renderBody = () => {
    if (loadingForm) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Spec Vendor Panel" />
        </Spacing>
      );
    }
    return (
      <PanelBody>
        {message && (
          <Spacing margin={{ bottom: 'normal' }}>
            <MessageBar
              id="__SpecVendorPanel_Msg"
              messageBarType={messageType}
              isMultiline
              onDismiss={() => setMessage(undefined)}
            >
              {message}
            </MessageBar>
          </Spacing>
        )}
        <FormRow>
          {vendorSpecForm?.name.visible && (
            <UIInputText
              id="__vendorSpecName"
              uiField={vendorSpecForm.name}
              value={name}
              onChange={(event, _newValue) => {
                setUnsavedChanges(true);
                setName(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          {vendorSpecForm?.legacyName.visible && (
            <UIInputText
              id="__legacyName"
              uiField={vendorSpecForm.legacyName}
              value={legacyName}
              onChange={(event, _newValue) => {
                setUnsavedChanges(true);
                setLegacyName(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          {vendorSpecForm?.version.visible && (
            <UIInputText
              id="__vendorSpecVersion"
              uiField={vendorSpecForm.version}
              value={version}
              onChange={(event, _newValue) => {
                setUnsavedChanges(true);
                setVersion(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          {vendorSpecForm?.fileContents.visible && (
            <UIInputSelectOne
              id="__fileContents"
              uiField={vendorSpecForm.fileContents}
              options={vendorSpecForm.options}
              value={fileContents}
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setFileContents(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          {vendorSpecForm?.supportsFullFile.visible && (
            <UIInputSelectOne
              id="__supportsFullFile"
              uiField={vendorSpecForm.supportsFullFile}
              options={vendorSpecForm.options}
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setSupportsFullFile(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          {vendorSpecForm?.supportsChangesOnly.visible && (
            <UIInputSelectOne
              id="__supportsChangesOnly"
              uiField={vendorSpecForm.supportsChangesOnly}
              options={vendorSpecForm.options}
            //   value={}
              onChange={(_newValue) => {
                setUnsavedChanges(true);
                setSupportsChangesOnly(_newValue ?? '');
              }}
            />
          )}
        </FormRow>
        <FormRow>
          <UIInputSearchOne
            id="__ParentSpec"
            uiField={vendorSpecForm?.parentSpec}
            value={currentSpecVendor}
            onType={searchVendorSpecs}
            onSelectValue={(newValue) => {
              setUnsavedChanges(true);
              setCurrentSpecVendor(newValue);
            }}
            options={specOptions}
            placeholder="Type to search for a parent vendor spec"
            emptyText="No vendor specs were found"
          />
        </FormRow>
        <WizardButtonRow>
          <Spacing margin={{ top: 'double' }}>
            {(createCmd || updateCmd) && (
              <Stack horizontal>
                <PrimaryButton
                  id="__saveSpecVendor"
                  onClick={() => saveSpecVendor()}
                >
                  Save
                </PrimaryButton>
                {updateCmd && vendorSpecForm?.active.value === 'false' && (
                  <DefaultButton
                    style={{
                      marginLeft: '10px',
                    }}
                    iconProps={{
                      iconName: 'CompletedSolid',
                    }}
                    text="Activate"
                    onClick={() => {
                      showActivateDialog();
                    }}
                  />
                )}
              </Stack>
            )}
          </Spacing>
        </WizardButtonRow>
      </PanelBody>
    )
  };

  const onChangeComments = (_comments: string) => {
    setComments(_comments);
    if (!vendorSpecForm?.comments.value) {
      if (_comments.trim() !== '') {
        setUnsavedChanges(true);
      } else {
        setUnsavedChanges(false);
      }
    } else if (vendorSpecForm.comments.value?.trim() !== _comments?.trim()) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__SpecVendor_PanelHeader">
      <Column lg="12">
        <Stack
          horizontal
          horizontalAlign="center"
          styles={{ root: { height: 44, marginTop: '5px' } }}
        >
          <Stack.Item grow>
            <PanelTitle id="__SpecVendor_Panel_Title" variant="bold" size="large">
              {!sid ? 'Create Spec' : vendorSpecForm?.name.value}
            </PanelTitle>
          </Stack.Item>
          <Stack.Item align="end">
            <CommentBubble
              id="__SpecComments"
              title={
                comments ? 'This Spec has comments. Click to see them.' : 'Click to add a comment'
              }
              value={comments}
              uiField={vendorSpecForm?.comments}
              onChange={onChangeComments}
            />
          </Stack.Item>
          {updateCmd && vendorSpecForm?.active.value === 'false' && (
            <Stack.Item>
              <TooltipHost content="This spec is inactive">
                <FontIcon
                  id="specInactive"
                  style={{
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginLeft: '15px',
                  }}
                  iconName="StatusCircleBlock"
                />
              </TooltipHost>

            </Stack.Item>
          )}
        </Stack>
      </Column>
    </PanelHeader>
  );

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      onRenderHeader={renderPanelHeader}
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => {
        onPanelClose();
      }}
    >
      {renderBody()}
      <DialogYesNo {...dialogProps} open={showDialog} />
    </ThemedPanel>
  )
};

export { SpecPanel };
