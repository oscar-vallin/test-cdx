import { useState, memo, useEffect } from 'react';
import { FontIcon, Stack, Text, TooltipHost } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import { BrainCircuit24Regular } from '@fluentui/react-icons';
import { useDeleteXchangeStepMutation } from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { Container, Row } from 'src/components/layouts';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import Node from './Node';
import { StyledQualifier } from '../../XchangeDetailsPage.styles';
import { XchangeStepPanel } from '../../XchangeStepPanel/XchangeStepPanel';

const defaultDialogProps: DialogYesNoProps = {
  open: false,
  title: '',
  message: '',
  messageYes: 'Yes',
  messageNo: 'No',
  onYesNo: () => null,
  onYes: () => {},
  onNo: () => {},
  closeOnNo: true,
  closeOnYes: true,
  highlightNo: true,
  highlightYes: false,
  onClose: () => null,
};

const DataNodeSteps = ({ data, id }) => {
  const { addStep } = data;
  const { handleTrashAndCopyIcons } = data;
  const { refreshDetailsPage } = data;
  const { xchangeFileProcessSid } = data;
  const { sid } = data;
  const { label } = data;

  const Toast = useNotification();
  const [openPanel, setOpenPanel] = useState(false);
  const [hiddeIcon, setHiddeIcon] = useState(true);
  const [showIcons, setShowIcons] = useState<boolean>();
  const [optionXchangeStep, setOptionXchangeStep] = useState<string>();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [deleteXchangeStep, { data: dataDeleteStep, loading: loadingDeeleteStep, error: errorDeleteStep }] =
    useQueryHandler(useDeleteXchangeStepMutation);

  let iconName = data.icon;
  const sourceBottom = id[id.length - 1];
  const { connectors } = data;
  const findFromKey = connectors.find((connector) => connector.fromKey === id);
  const trans = findFromKey.toKey.includes('trans');
  const { qualifier } = data;
  const subTitle: string = data.subTitle ?? '';
  const styles = { lineHeight: subTitle.trim() === '' ? '36px' : '18px' };
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  }
  if (subTitle.trim() !== '') {
    styles['maxWidth'] = '180px';
    styles['maxHeight'] = '45px';
    styles['width'] = '100%';
    styles['height'] = '100%';
    styles['overflow'] = 'hidden';
  }

  let width = '48px';
  let color = 'blue';

  if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE') {
    width = '60px';
  }

  const hanldeSourcePosition = () => {
    if (
      trans ||
      data.position.x === 1 ||
      ((sourceBottom === '1' || sourceBottom === '0') && data.label === 'Semantic Map')
    ) {
      return <Handle type="source" id={id} position={Position['Bottom']} />;
    }

    return <Handle type="source" id={id} position={Position['Left']} />;
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showUnsavedChangesDialog = (title: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.message = `Are you sure you want to delete this Xchange step ${title}?`;

    updatedDialog.onYes = () => {
      hideDialog();
      deleteXchangeStep({
        variables: {
          xchangeFileProcessSid,
          sid,
        },
      });
    };
    updatedDialog.onClose = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const renderNode = () => {
    return (
      <>
        {showIcons && hiddeIcon && (
          <div style={{ display: 'flex', position: 'absolute', bottom: 55, left: 180 }}>
            <TooltipHost content="Copy Step">
              <FontIcon
                iconName="Copy"
                style={{
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpenPanel(true);
                  setHiddeIcon(false);
                  setOptionXchangeStep('copy');
                }}
              />
            </TooltipHost>
            <TooltipHost content="Delete">
              <FontIcon
                iconName="Trash"
                style={{
                  fontSize: '15px',
                  color: 'black',
                  cursor: 'pointer',
                  paddingLeft: '10px',
                }}
                onClick={() => {
                  setOpenPanel(false);
                  setShowDialog(true);
                  showUnsavedChangesDialog(label);
                }}
              />
            </TooltipHost>
          </div>
        )}
        <Handle type="target" id={id} position={Position['Top']} />
        <Container>
          <Row>
            <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
              {iconName === 'Brain Circuit' ? (
                <BrainCircuit24Regular
                  aria-label="Brain"
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '37px',
                    height: '37px',
                    borderRadius: '50%',
                    backgroundColor: '#00a341',
                    padding: '6px 3px 7px 3px',
                    textAlign: 'center',
                  }}
                />
              ) : (
                <FontIcon
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '37px',
                    height: '37px',
                    borderRadius: '50%',
                    backgroundColor: '#00a341',
                    padding: '8px 1px 7px 0px',
                    textAlign: 'center',
                  }}
                  iconName={iconName}
                />
              )}
              <Text style={styles}>
                {data.label} <br /> {subTitle.trim() !== '' && <Text variant="small">{subTitle}</Text>}
              </Text>
            </Stack>
          </Row>
        </Container>
        {hanldeSourcePosition()}
        {qualifier && (
          <StyledQualifier width={width} color={color}>
            {qualifier}
          </StyledQualifier>
        )}
        {data.info && (
          <TooltipHost content={data.info}>
            <FontIcon iconName="InfoSolid" style={{ position: 'absolute', bottom: '18px', fontSize: '18px' }} />
          </TooltipHost>
        )}
        <XchangeStepPanel
          isPanelOpen={openPanel}
          closePanel={setOpenPanel}
          hiddeIconCopyStep={setHiddeIcon}
          setOptionXchangeStep={setOptionXchangeStep}
          optionXchangeStep={optionXchangeStep}
          refreshDetailsPage={refreshDetailsPage}
          xchangeFileProcessSid={xchangeFileProcessSid}
          xchangeStepSid={sid}
          xchangeStepTitle={label}
        />
      </>
    );
  };

  useEffect(() => {
    if (!handleTrashAndCopyIcons) {
      setTimeout(() => setShowIcons(false), 1000);
    }

    if (handleTrashAndCopyIcons) {
      setShowIcons(handleTrashAndCopyIcons);
    }
    if (addStep && !showDialog) {
      setOptionXchangeStep('add');
      setOpenPanel(true);
      setHiddeIcon(false);
      return;
    }

    setHiddeIcon(true);
  }, [addStep, handleTrashAndCopyIcons]);

  useEffect(() => {
    if (!loadingDeeleteStep && dataDeleteStep) {
      refreshDetailsPage(true);
      Toast.success({ text: `Xchange step ${label}` });
    }

    if (!loadingDeeleteStep && errorDeleteStep) {
      Toast.error({ text: `There was an error deleting ${label} ` });
    }
  }, [dataDeleteStep, loadingDeeleteStep, errorDeleteStep])

  return (
    <>
      <Node content={renderNode()} />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export default memo(DataNodeSteps);
