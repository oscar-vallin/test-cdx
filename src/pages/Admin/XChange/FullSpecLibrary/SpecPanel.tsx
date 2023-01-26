import {
  DirectionalHint,
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
import {
  useVendorSpecFormLazyQuery,
  useCreateVendorSpecMutation,
  useUpdateVendorSpecMutation,
  useActivateVendorSpecMutation,
  VendorSpecForm,
  ExtractType,
  WebCommand,
  CdxWebCommandType,
  GqOperationResponse,
} from 'src/data/services/graphql';
import { UIInputSelectOne } from 'src/components/inputs/InputDropdown';
import {
  PanelBody, PanelHeader, PanelTitle, ThemedPanel, WizardButtonRow,
} from 'src/layouts/Panels/Panels.styles';
import { Column, Row } from 'src/components/layouts';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { Comment20Filled } from '@fluentui/react-icons';
import { ThemeStore } from 'src/store/ThemeStore';
import { useNotification } from 'src/hooks/useNotification';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { ErrorHandler } from 'src/utils/ErrorHandler';

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
  const [name, setName] = useState('');
  const [legacyName, setLegacyName] = useState('');
  const [version, setVersion] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [supportsFullFile, setSupportsFullFile] = useState('');
  const [supportsChangesOnly, setSupportsChangesOnly] = useState('');
  const [comments, setComments] = useState('');
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [activateCmd, setActivateCmd] = useState<WebCommand | null>();
  const [openUpdateComments, setOpenUpdateComments] = useState(false);
  const [closeTooltipHost, setCloseTooltipHost] = useState(true);
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
  const [updateVendor, {
    data: updateVendorData,
    loading: isLoadingupdate,
    error: updateVendorError,
  }] = useUpdateVendorSpecMutation();
  const [activateVendorSpec,
    {
      data: activateVendorData,
      loading: isLoadingActivateVendor,
      error: activateVendorError,
    },
  ] = useActivateVendorSpecMutation();

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
        const _activateCmd = pageCommands
          .find((cmd) => cmd.commandType === CdxWebCommandType.Activate);
        setActivateCmd(_activateCmd);
      }
    }
  }, [dataForm, loadingForm]);

  useEffect(() => {
    if (vendorSpecForm) {
      setName(vendorSpecForm.name.value ?? '');
      setLegacyName(vendorSpecForm.legacyName.value ?? '');
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
  }, [updateVendorData, isLoadingupdate]);

  useEffect(() => {
    if (!isLoadingActivateVendor && activateVendorData) {
      refreshPage(true);
      closePanel(false);
      setMessage(null);
      Toast.success({ text: `${name} has been activated` });
    }
  }, [activateVendorData, isLoadingActivateVendor]);

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
    updatedDialog.message = 'Are you sure want to activate this Vendor Spec? This will make it available for new Xchanges to use it';

    updatedDialog.onYes = () => {
      hideDialog();
      activateVendorSpec({
        variables: {
          sid: sid ?? '',
        },
      });
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
      updateVendor({
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
          },
        },
      });
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
        },
      },
    })
  }

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
        <WizardButtonRow>
          <Spacing margin={{ top: 'double' }}>
            {(createCmd || updateCmd) && (
            <PrimaryButton
              id="__saveSpecVendor"
              onClick={() => saveSpecVendor()}
            >
              Save
            </PrimaryButton>
            )}
          </Spacing>
        </WizardButtonRow>
      </PanelBody>
    )
  };
  const tooltipHostComments = () => {
    if (!openUpdateComments && vendorSpecForm) {
      return (
        <>
          {closeTooltipHost && (
            <TooltipHost
              directionalHint={DirectionalHint['rightBottomEdge']}
              content={comments ? 'This Spec has comments. Click to see them.' : 'Click to add a comment'}
            >
              <Comment20Filled
                style={comments ? {
                  color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
                } : {
                  color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
                }}
                onClick={() => {
                  setOpenUpdateComments(true);
                }}
              />
            </TooltipHost>
          )}
          {!closeTooltipHost && (
            <Comment20Filled
              style={comments ? {
                color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
              } : {
                color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
              }}
              onClick={() => {
                setOpenUpdateComments(true);
              }}
            />
          )}
        </>
      );
    }

    const updateComment = () => (
      <UIInputTextArea
        id="SpecVendorComment"
        uiField={vendorSpecForm?.comments}
        value={comments}
        onChange={(event, newValue: any) => {
          setComments(newValue ?? '');
          if (!vendorSpecForm?.comments.value) {
            if (newValue.trim() !== '') {
              setUnsavedChanges(true);
            } else {
              setUnsavedChanges(false);
            }
          } else if (vendorSpecForm.comments.value?.trim() !== newValue?.trim()) {
            setUnsavedChanges(true);
          } else {
            setUnsavedChanges(false);
          }
        }}
        resizable={false}
        rows={12}
      />
    );

    if (openUpdateComments) {
      return (
        <TooltipHost
          directionalHintForRTL={DirectionalHint['bottomAutoEdge']}
          closeDelay={5000000}
          style={{ background: ThemeStore.userTheme.colors.yellow, width: '400px', padding: '0 10px 10px 10px' }}
          tooltipProps={{
            calloutProps: {
              styles: {
                beak: { background: ThemeStore.userTheme.colors.yellow },
                beakCurtain: { background: ThemeStore.userTheme.colors.yellow },
                calloutMain: { background: ThemeStore.userTheme.colors.yellow },
              },
            },
          }}
          content={updateComment()}
        >
          <Comment20Filled
            style={comments ? {
              color: ThemeStore.userTheme.colors.yellow, cursor: 'pointer',
            } : {
              color: ThemeStore.userTheme.colors.neutralTertiaryAlt, cursor: 'pointer',
            }}
          />
        </TooltipHost>
      );
    }
    return null;
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__SpecVendor_PanelHeader">
      <Row>
        <Column lg="3">
          <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
            <PanelTitle id="__SpecVendor_Panel_Title" variant="bold" size="large">
              {!sid ? 'Create Spec' : vendorSpecForm?.name.value}
            </PanelTitle>
          </Stack>
        </Column>
        <Column lg="2">
          <Stack horizontal>
            <Spacing margin={{ top: 'normal' }}>
              {tooltipHostComments()}
            </Spacing>
            {activateCmd && (
            <Spacing margin={{ top: 'normal' }}>
              <TooltipHost content="This spec is inactive">
                <FontIcon
                  id="specInactive"
                  style={{
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                  iconName="StatusCircleBlock"
                  onClick={() => {
                    showActivateDialog();
                  }}
                />
              </TooltipHost>
            </Spacing>
            )}
          </Stack>
        </Column>
      </Row>
    </PanelHeader>
  );

  return (
    <ThemedPanel
      onClick={() => {
        if (openUpdateComments) {
          setOpenUpdateComments(false);
          setCloseTooltipHost(false);
          setTimeout(() => {
            setCloseTooltipHost(true);
          }, 0.001);
        }
      }}
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
