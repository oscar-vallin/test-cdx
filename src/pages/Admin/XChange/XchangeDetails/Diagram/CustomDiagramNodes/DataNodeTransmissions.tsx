import React, { memo, useEffect, useState } from 'react';
import {
  DirectionalHint, FontIcon, Stack, Text, TooltipHost,
} from '@fluentui/react';
import { useDeleteXchangeFileTransmissionMutation } from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { Handle, Position } from 'react-flow-renderer';
import { Container, Row } from 'src/components/layouts';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import Node from './Node';
import { StyledQualifier, StyledSFTP } from '../../XchangeDetailsPage.styles';
import { XchangeTransmissionPanel } from '../../XchangeTransmissionPanel/XchangeTransmissionPanel';

const defaultDialogProps: DialogYesNoProps = {
  id: '__DiagramTransmission_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const DataNodeTransmissions = ({ data, id }) => {
  const {
    sid,
    qualifier,
    protocol,
    host,
    hoverOverShowIcons,
    updateTransmission,
    xchangeFileProcessSid,
    refreshDetailsPage,
  } = data;

  const Toast = useNotification();
  const [showIcons, setShowIcons] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [updateTransmissionPanel, setUpdateTransmissionPanel] = useState(false);
  const [optionXchangeTransmission, setOptionXchangeTransmission] = useState<string>();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [deleteXchangeFileTransmission, { data: dataDelete, loading: loadingDelete }] = useQueryHandler(
    useDeleteXchangeFileTransmissionMutation,
  );

  let width = '48px';
  let color = 'blue';

  if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE' || qualifier === 'TEST-OE') {
    width = '60px';
  }
  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = (filenameHost: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.message = `Are you sure you want to delete this File Transmission ${filenameHost}?`;

    updatedDialog.onYes = () => {
      hideDialog();
      deleteXchangeFileTransmission({
        variables: {
          xchangeFileProcessSid,
          sid,
        },
      });
    };
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const renderHoverIcons = () => {
    if (showIcons) {
      return (
        <>
          <div style={{
            display: 'flex', position: 'absolute', bottom: 55, left: 180,
          }}
          >
            <TooltipHost content="Copy Step">
              <FontIcon
                iconName="Copy"
                style={{
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpenPanel(true);
                  setOptionXchangeTransmission('copy');
                }}
              />
            </TooltipHost>
          </div>
          <div style={{
            display: 'flex', position: 'absolute', bottom: 55, left: 210,
          }}
          >
            <TooltipHost content="Delete" directionalHint={DirectionalHint['rightCenter']}>
              <FontIcon
                iconName="Trash"
                style={{
                  fontSize: '15px',
                  color: 'black',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowDialog(true);
                  setOpenPanel(false);
                  setShowIcons(false);
                  showUnsavedChangesDialog(host ?? '');
                }}
              />
            </TooltipHost>
          </div>
        </>
      );
    }

    return null;
  };

  const renderNode = () => {
    if (data.protocol === 'ARCHIVE') {
      return (
        <>
          {renderHoverIcons()}
          <Handle type="target" id={id} position={Position['Top']} />
          <Container>
            <Row>
              <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
                <FontIcon
                  style={{
                    color: '#757575',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '35px',
                    height: '35px',
                    border: '2px solid #757575',
                    borderRadius: '10px',
                    padding: '8px 1px 7px 0px',
                    textAlign: 'center',
                  }}
                  iconName="Archive"
                />
                <Text style={{ lineHeight: '36px' }}>[archive]</Text>
              </Stack>
            </Row>
            <XchangeTransmissionPanel
              isPanelOpen={openPanel}
              closePanel={setOpenPanel}
              setOptionXchangeTransmission={setOptionXchangeTransmission}
              optionXchangeTransmission={optionXchangeTransmission}
              refreshDetailsPage={refreshDetailsPage}
              setShowIcons={setShowIcons}
              xchangeFileProcessSid={xchangeFileProcessSid}
              xchangeFileTransmissionSid={sid}
            />
          </Container>
        </>
      );
    }

    return (
      <>
        {renderHoverIcons()}
        <Handle type="target" id={id} position={Position['Top']} />
        <Container>
          <Row>
            <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
              <StyledSFTP>
                <Text style={{ fontWeight: 700, color: '#666666' }}>{protocol}</Text>
              </StyledSFTP>
              <Text style={{ lineHeight: '38px', width: '200px' }} variant="small">
                {host}
              </Text>
            </Stack>
          </Row>
        </Container>
        {qualifier && (
          <StyledQualifier position={true} left={true} top={true} color={color} width={width}>
            {qualifier}
          </StyledQualifier>
        )}
        {openPanel && (
          <XchangeTransmissionPanel
            isPanelOpen={openPanel}
            closePanel={setOpenPanel}
            setOptionXchangeTransmission={setOptionXchangeTransmission}
            optionXchangeTransmission={optionXchangeTransmission}
            refreshDetailsPage={refreshDetailsPage}
            setShowIcons={setShowIcons}
            xchangeFileProcessSid={xchangeFileProcessSid}
            xchangeFileTransmissionSid={sid}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    if (updateTransmissionPanel && !showDialog) {
      setOptionXchangeTransmission('update');
      setOpenPanel(true);
      setUpdateTransmissionPanel(false);
    }
  }, [updateTransmissionPanel]);

  useEffect(() => {
    let isMounted = true;
    if (!hoverOverShowIcons) {
      setTimeout(() => {
        if (isMounted) {
          setShowIcons(false);
        }
      }, 1000);
    }

    if (hoverOverShowIcons) {
      setShowIcons(hoverOverShowIcons);
    }

    if (updateTransmission) {
      setUpdateTransmissionPanel(true);
    }

    return () => {
      isMounted = false;
    };
  }, [hoverOverShowIcons, updateTransmission]);

  useEffect(() => {
    if (!loadingDelete && dataDelete) {
      refreshDetailsPage(true);
      Toast.success({ text: `Xchange step ${host} has been deleted` });
    }
  }, [dataDelete, loadingDelete]);

  return (
    <>
      <Node content={renderNode()} />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export default memo(DataNodeTransmissions);
