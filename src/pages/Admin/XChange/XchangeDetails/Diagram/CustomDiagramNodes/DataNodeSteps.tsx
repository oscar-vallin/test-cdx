import { useState, memo, useEffect } from 'react';
import { DirectionalHint, FontIcon, Stack, Text, TooltipHost } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import { BrainCircuit24Regular } from '@fluentui/react-icons';
import {
  useDeleteXchangeStepMutation,
  DiagramConnector,
  DiagramCoordinates,
  useMoveUpXchangeStepMutation,
  useMoveDownXchangeStepMutation,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { Container, Row } from 'src/components/layouts';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import Node from './Node';
import { StyledQualifier, StyledSubTitleText } from '../../XchangeDetailsPage.styles';
import { XchangeStepPanel } from '../../XchangeStepPanel/XchangeStepPanel';

const defaultDialogProps: DialogYesNoProps = {
  id: '__DiagramStep_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

type DataProps = {
  index: number;
  lastNode: boolean;
  sid?: string;
  label?: string;
  subTitle?: string;
  icon?: string;
  qualifier?: string;
  connectors: DiagramConnector[];
  position: DiagramCoordinates;
  info?: string;
  hoverOverShowIcons: boolean;
  updateStep: boolean;
  refreshDetailsPage: (data: boolean) => void;
  xchangeFileProcessSid?: string;
};

type DataNodeProps = {
  data: DataProps;
  id: string | undefined;
};

const DataNodeSteps = ({ data, id }: DataNodeProps) => {
  const {
    index,
    lastNode,
    sid,
    label,
    qualifier,
    connectors,
    info,
    hoverOverShowIcons,
    updateStep,
    refreshDetailsPage,
    xchangeFileProcessSid,
  } = data;

  const Toast = useNotification();
  const [openPanel, setOpenPanel] = useState(false);
  const [hiddeIcon, setHiddeIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [updateStepPanel, setUpdateStepPanel] = useState(false);
  const [optionXchangeStep, setOptionXchangeStep] = useState<string>();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [deleteXchangeStep, { data: dataDeleteStep, loading: loadingDeleteStep, error: errorDeleteStep }] =
    useQueryHandler(useDeleteXchangeStepMutation);

  const [moveUpXchangeStep, { data: dataMoveUp, loading: loadingMoveUp }] =
    useQueryHandler(useMoveUpXchangeStepMutation);

  const [moveDownxchangeStep, { data: dataMoveDown, loading: loadingMoveDown, error: errorMoveDown }] =
    useQueryHandler(useMoveDownXchangeStepMutation);

  let iconName = data.icon;
  const subTitle = data.subTitle ?? '';
  const sourceBottom = id && id[id.length - 1];
  const findFromKey = connectors && connectors.find((connector) => connector.fromKey === id);
  const trans = findFromKey && findFromKey.toKey.includes('trans');
  const styles = { lineHeight: subTitle.trim() === '' ? '36px' : '18px' };
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  }
  if (subTitle && subTitle.trim() !== '') {
    styles['maxWidth'] = '250px';
    styles['maxHeight'] = '45px';
    styles['marginBottom'] = '-15px';
    styles['width'] = '70%';
    styles['height'] = '100%';
  }

  let width = '48px';
  let color = 'blue';

  if (qualifier === 'StructErrors') {
    width = '65px';
  } else if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE') {
    width = '60px';
  }

  const styleMoveUp = {
    cursor: index > 0 ? 'pointer' : 'auto',
    color: index > 0 ? '#000000' : '#dddddd',
    padding: '10px',
    fontSize: '10px',
    marginBottom: '-2px',
  };

  const styleMoveDown = {
    cursor: !lastNode ? 'pointer' : 'auto',
    color: !lastNode ? '#000000' : '#dddddd',
    padding: '10px',
    fontSize: '10px',
    marginTop: '-2px',
  };

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
    updatedDialog.onNo = () => {
      hideDialog();
    };

    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const renderHoverIcons = () => {
    if (showIcons && hiddeIcon) {
      return (
        <>
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
          </div>
          <div style={{ display: 'flex', position: 'absolute', bottom: 55, left: 210 }}>
            <TooltipHost content="Delete">
              <FontIcon
                iconName="Trash"
                style={{
                  fontSize: '15px',
                  color: 'black',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpenPanel(false);
                  setShowDialog(true);
                  showUnsavedChangesDialog(label ?? '');
                }}
              />
            </TooltipHost>
          </div>
          <div style={{ position: 'absolute', left: 251, bottom: 30 }}>
            <TooltipHost content={index > 0 ? 'Move up' : ''}>
              <FontIcon
                aria-disabled={index === 0}
                iconName="ChevronUp"
                style={styleMoveUp}
                onClick={() => {
                  setOpenPanel(false);
                  setHiddeIcon(true);
                  if (index > 0) {
                    moveUpXchangeStep({
                      variables: {
                        xchangeFileProcessSid,
                        sid,
                      },
                    });
                  }
                }}
                onMouseMove={() => setHoverIcon(true)}
              />
            </TooltipHost>
          </div>
          <div style={{ position: 'absolute', left: 251, top: 30 }}>
            <TooltipHost content={lastNode ? '' : 'Move down'} directionalHint={DirectionalHint['bottomCenter']}>
              <FontIcon
                aria-disabled={lastNode}
                iconName="ChevronDown"
                style={styleMoveDown}
                onClick={() => {
                  setOpenPanel(false);
                  setHiddeIcon(true);
                  if (!lastNode) {
                    moveDownxchangeStep({
                      variables: {
                        xchangeFileProcessSid,
                        sid,
                      },
                    });
                  }
                }}
                onMouseMove={() => setHoverIcon(true)}
              />
            </TooltipHost>
          </div>
        </>
      );
    }

    return null;
  };

  const renderNode = () => {
    return (
      <>
        {renderHoverIcons()}
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
                    padding: '6px 0px 6px 0px',
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
                {data.label}{' '}
                {subTitle && subTitle.trim() !== '' && subTitle.length > 28 ? (
                  <StyledSubTitleText>
                    <span style={{ fontSize: '10px' }}>{subTitle.substring(0, 28)}</span>
                    <span style={{ position: 'relative', fontSize: '10px', bottom: '8px' }}>
                      {subTitle.substring(28, subTitle.length)}
                    </span>
                  </StyledSubTitleText>
                ) : (
                  <span style={{ fontSize: '10px' }}>{subTitle}</span>
                )}
              </Text>
            </Stack>
          </Row>
        </Container>
        {hanldeSourcePosition()}
        {qualifier && (
          <StyledQualifier position={true} left={true} top={true} width={width} color={color}>
            {qualifier}
          </StyledQualifier>
        )}
        {info && (
          <TooltipHost content={info}>
            <FontIcon
              iconName="InfoSolid"
              style={{ position: 'absolute', bottom: '18px', fontSize: '18px', cursor: 'pointer' }}
            />
          </TooltipHost>
        )}
        <XchangeStepPanel
          isPanelOpen={openPanel}
          closePanel={setOpenPanel}
          setOptionXchangeStep={setOptionXchangeStep}
          optionXchangeStep={optionXchangeStep}
          refreshDetailsPage={refreshDetailsPage}
          setShowIcons={setShowIcons}
          xchangeFileProcessSid={xchangeFileProcessSid}
          xchangeStepSid={sid}
          xchangeStepTitle={label}
        />
      </>
    );
  };

  useEffect(() => {
    if (updateStepPanel && !showDialog && !hoverIcon) {
      setOptionXchangeStep('update');
      setOpenPanel(true);
      setHiddeIcon(false);
      setUpdateStepPanel(false);
      return;
    }

    setHiddeIcon(true);
  }, [updateStepPanel]);

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

    if (updateStep) {
      setUpdateStepPanel(true);
    }

    return () => {
      isMounted = false;
    };
  }, [hoverOverShowIcons, hoverIcon, updateStep]);

  useEffect(() => {
    if (!loadingDeleteStep && dataDeleteStep) {
      refreshDetailsPage(true);
      Toast.success({ text: `Xchange step ${label} has been deleted` });
    }

    if (!loadingDeleteStep && errorDeleteStep) {
      Toast.error({ text: `There was an error deleting ${label} ` });
    }
  }, [dataDeleteStep, loadingDeleteStep, errorDeleteStep]);

  useEffect(() => {
    if (!loadingMoveUp && dataMoveUp) {
      refreshDetailsPage(true);
    }

    if (!loadingMoveDown && dataMoveDown) {
      refreshDetailsPage(true);
    }

    if (!loadingMoveDown && errorMoveDown) {
      console.log(errorMoveDown);
    }
  }, [dataMoveUp, loadingMoveUp, dataMoveDown, loadingMoveDown, errorMoveDown]);

  return (
    <>
      <Node content={renderNode()} />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </>
  );
};

export default memo(DataNodeSteps);
