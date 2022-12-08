import { useState, memo, useEffect } from 'react';
import {
  DirectionalHint,
  FontIcon,
  Stack,
  TooltipHost,
  Dialog,
  DialogFooter,
  DefaultButton,
} from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import { BrainCircuit24Regular } from '@fluentui/react-icons';
import {
  useDeleteXchangeStepMutation,
  DiagramConnector,
  DiagramCoordinates,
  useMoveUpXchangeStepMutation,
  useMoveDownXchangeStepMutation,
  WebCommand,
  CdxWebCommandType,
  XchangeDiagramStep,
} from 'src/data/services/graphql';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { Container, Row } from 'src/components/layouts';
import { useNotification } from 'src/hooks/useNotification';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ButtonLink } from 'src/components/buttons';
import { theme } from 'src/styles/themes/theme';
import { Spacing } from 'src/components/spacings/Spacing';
import Node from './Node';
import { StyledQualifier, StyledSubTitleText } from '../../XchangeDetailsPage.styles';
import { XchangeStepPanel } from '../../XchangeStepPanel/XchangeStepPanel';
import {
  StyledCopyIcon,
  StyledTrashIcon,
  StyledChevronUpIcon,
  StyledChevronDownIcon,
} from './Node.styles';

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
  stepIndex: number;
  lastNode: boolean;
  sid?: string;
  label?: string;
  subTitle?: string;
  icon?: string;
  qualifier?: string;
  connectors: DiagramConnector[];
  position: DiagramCoordinates;
  coordinates: XchangeDiagramStep[];
  info?: string;
  hoverOverShowIcons: boolean;
  updateStep: boolean;
  refreshDetailsPage: (data: boolean) => void;
  xchangeFileProcessSid?: string;
  stepCommands: WebCommand[] | undefined;
};

type DataNodeProps = {
  data: DataProps;
  id: string | undefined;
};

const DataNodeSteps = ({ data, id }: DataNodeProps) => {
  const {
    stepIndex,
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
    stepCommands,
    coordinates,
  } = data;

  const Toast = useNotification();
  const [openPanel, setOpenPanel] = useState(false);
  const [hiddeIcon, setHiddeIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [updateStepPanel, setUpdateStepPanel] = useState(false);
  const [optionXchangeStep, setOptionXchangeStep] = useState<string>();
  const [addCmd, setAddCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [updateMoveUpCmd, setUpdateMoveUpCmd] = useState<WebCommand | null>();
  const [updateMoveDownCmd, setUpdateMoveDownCmd] = useState<WebCommand | null>();
  const [showDialog, setShowDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [deleteXchangeStep,
    { data: dataDeleteStep, loading: loadingDeleteStep, error: errorDeleteStep },
  ] = useQueryHandler(useDeleteXchangeStepMutation);

  const [moveUpXchangeStep,
    { data: dataMoveUp, loading: loadingMoveUp },
  ] = useQueryHandler(useMoveUpXchangeStepMutation);

  const [moveDownxchangeStep,
    { data: dataMoveDown, loading: loadingMoveDown, error: errorMoveDown },
  ] = useQueryHandler(useMoveDownXchangeStepMutation);

  let iconName = data.icon;
  const subTitle = data.subTitle ?? '';
  const sourceBottom = id && id[id.length - 1];
  const findFromKey = connectors && connectors.find((connector) => connector.fromKey === id);
  const trans = findFromKey && findFromKey.toKey.includes('trans');
  const styles = { lineHeight: subTitle.trim() === '' ? '' : '18px' };
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
  let color = theme.colors.themePrimary;

  if (qualifier === 'StructErrors') {
    width = '75px';
  } else if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE') {
    width = '60px';
  }

  const hanldeSourcePosition = () => {
    if (
      trans
      || stepIndex === 0
      || data.position.x === 1
      || ((sourceBottom === '1' || sourceBottom === '0') && data.label === 'Semantic Map')
    ) {
      return (
        <Handle
          type="source"
          id={id}
          position={Position['Bottom']}
          style={{ background: 'none', border: theme.colors.white }}
        />
      );
    }
    if (coordinates[2] && (coordinates[2].position.x === 0 || coordinates[3].position.x === 0)) {
      return (
        <Handle
          type="source"
          id={id}
          position={Position['Bottom']}
          style={{ background: 'none', border: theme.colors.white }}
        />
      );
    }
    if (stepIndex > 0) {
      return (
        <Handle
          type="source"
          id={id}
          position={Position['Right']}
          style={{ background: 'none', border: theme.colors.white }}
        />
      )
    }

    return null;
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeleteStepDialog = (title: string) => {
    const updatedDialog = { ...defaultDialogProps };
    updatedDialog.title = 'Delete Step';
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

  const getCommands = () => {
    const _copyStep = stepCommands?.find((cmd) => cmd.endPoint === 'copyXchangeStep' && cmd.commandType === CdxWebCommandType.Add);
    setAddCmd(_copyStep);
    const _moveUp = stepCommands?.find((cmd) => cmd.endPoint === 'moveUpXchangeStep' && cmd.commandType === CdxWebCommandType.Update);
    setUpdateMoveUpCmd(_moveUp);
    const _moveDown = stepCommands?.find((cmd) => cmd.endPoint === 'moveDownXchangeStep' && cmd.commandType === CdxWebCommandType.Update);
    setUpdateMoveDownCmd(_moveDown);
    const _deleteCmd = stepCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
    setDeleteCmd(_deleteCmd);
  };

  const renderHoverIcons = () => {
    if (showIcons && hiddeIcon) {
      return (
        <>
          <div style={{
            display: 'flex', position: 'absolute', bottom: 55, left: 180,
          }}
          >
            {addCmd && (
            <TooltipHost content="Copy Step">
              <StyledCopyIcon
                iconName="Copy"
                onClick={() => {
                  setOpenPanel(true);
                  setHiddeIcon(false);
                  setOptionXchangeStep('copy');
                }}
              />
            </TooltipHost>
            )}
          </div>
          <div style={{
            display: 'flex', position: 'absolute', bottom: 55, left: 210,
          }}
          >
            {deleteCmd && (
            <TooltipHost content="Delete">
              <StyledTrashIcon
                iconName="Trash"
                onClick={() => {
                  setOpenPanel(false);
                  setShowDialog(true);
                  showDeleteStepDialog(label ?? '');
                }}
              />
            </TooltipHost>
            )}
          </div>
          <div style={{ position: 'absolute', left: 251, bottom: 30 }}>
            {updateMoveUpCmd && (
              <TooltipHost content={stepIndex > 0 ? 'Move up' : ''}>
                <StyledChevronUpIcon
                  aria-disabled={stepIndex === 0}
                  iconName="ChevronUp"
                  firstIndex={stepIndex === 0}
                  onClick={() => {
                    setOpenPanel(false);
                    setHiddeIcon(true);
                    if (stepIndex > 0) {
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
            )}
          </div>
          <div style={{ position: 'absolute', left: 251, top: 30 }}>
            {updateMoveDownCmd && (
              <TooltipHost content={lastNode ? '' : 'Move down'} directionalHint={DirectionalHint['bottomCenter']}>
                <StyledChevronDownIcon
                  aria-disabled={lastNode}
                  iconName="ChevronDown"
                  lastNode={lastNode}
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
            )}
          </div>
        </>
      );
    }

    return null;
  };

  const renderNode = () => (
    <>
      {renderHoverIcons()}
      <Handle type="target" id={id} position={Position['Top']} style={{ background: 'none', border: 'white' }} />
      <Container>
        <Row>
          <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            {iconName === 'Brain Circuit' ? (
              <BrainCircuit24Regular
                aria-label="Brain"
                style={{
                  color: theme.colors.white,
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
                  color: theme.colors.white,
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
            <ButtonLink underline style={styles}>
              {data.label}{' '}
              {subTitle && subTitle.trim() !== '' && subTitle.length > 28 ? (
                <StyledSubTitleText>
                  <span style={{ fontSize: '10px' }}>{subTitle.substring(0, 28)}{' '}</span>
                  <span style={{ position: 'absolute', fontSize: '10px', top: '25px' }}>
                    {subTitle.substring(28, subTitle.length)}
                  </span>
                </StyledSubTitleText>
              ) : (
                <span style={{ fontSize: '10px' }}>{subTitle}</span>
              )}
            </ButtonLink>
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
          style={{
            position: 'absolute', bottom: '18px', fontSize: '18px', cursor: 'pointer',
          }}
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

  useEffect(() => {
    getCommands();
  }, [stepCommands]);

  useEffect(() => {
    if (updateStepPanel && !showDialog && !hoverIcon) {
      if (!sid) {
        setShowMessageDialog(true);
        return;
      }
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
  }, [dataMoveUp, loadingMoveUp, dataMoveDown, loadingMoveDown, errorMoveDown]);

  return (
    <>
      <Node content={renderNode()} />
      <DialogYesNo {...dialogProps} open={showDialog} />
      <Dialog hidden={!showMessageDialog} minWidth="300px">
        <Spacing>
          <span>
            The Xchange Profile requires conversion.
            Convert this Xchange Profile to see its details
          </span>
        </Spacing>
        <DialogFooter>
          <DefaultButton
            id="__StepMessage_confirm_ok"
            text="Close"
            onClick={() => setShowMessageDialog(false)}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default memo(DataNodeSteps);
