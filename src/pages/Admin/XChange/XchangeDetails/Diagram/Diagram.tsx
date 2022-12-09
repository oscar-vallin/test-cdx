import { useEffect, useState } from 'react';
import ReactFlow, {
  useNodesState, useEdgesState, addEdge, Connection, Edge,
} from 'react-flow-renderer';
import { Column, Container, Row } from 'src/components/layouts';
import { CdxWebCommandType, WebCommand, XchangeDiagram } from 'src/data/services/graphql';
import {
  StyledContainer, StyledHorizontalButtons, StyledText, StyledButtonAction,
} from '../XchangeDetailsPage.styles';
import DataNodeSteps from './CustomDiagramNodes/DataNodeSteps';
import DataNodeTransmissions from './CustomDiagramNodes/DataNodeTransmissions';
import { InitialNodes } from './nodes/nodes';
import { NodeParent } from './nodes/parentNode';
import { InitialEdges } from './edges/edges';
import { XchangeStepPanel } from '../XchangeStepPanel/XchangeStepPanel';
import { XchangeTransmissionPanel } from '../XchangeTransmissionPanel/XchangeTransmissionPanel';

const nodeTypes = {
  dataNodeSteps: DataNodeSteps,
  dataNodeTransmissions: DataNodeTransmissions,
};

type DiagramProps = {
  data: XchangeDiagram;
  refreshDetailsPage: (data: boolean) => void;
  xchangeFileProcessSid?: string;
  commands: WebCommand[] | null;
};

const Diagram = ({
  data, refreshDetailsPage, xchangeFileProcessSid, commands,
}: DiagramProps) => {
  const { initialNodes, largestCoordinate, largestCoordinateX } = InitialNodes(data);
  const { nodeWithParents } = NodeParent(initialNodes, data.stepGroups);
  const { initialEdges } = InitialEdges(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeWithParents);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openStepPanel, setOpenStepPanel] = useState(false);
  const [openFilePanel, setOpenFilePanel] = useState(false);
  const [stepCommands, setStepCommands] = useState<WebCommand[] | undefined>([]);
  const [totalHeight, setTotalHeight] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [transmissionCommands, setTransmissionCommands] = useState<WebCommand[] | undefined>([]);
  const [createStepCmd, setCreateStepCmd] = useState<WebCommand | null>();
  const [createTransmissionCmd, setCreateTransmissionCmd] = useState<WebCommand | null>();
  const [optionXchangeStep, setOptionXchangeStep] = useState<string>();
  const [optionXchangeFileTransmission, setOptionXchangeFileTransmission] = useState<string>();
  const [showIcons, setShowIcons] = useState(false);

  const onConnect = (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds));

  const updateStep = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (n.data.transIndex === node.data.transIndex && node.type === 'dataNodeTransmissions') {
        n.data = {
          ...node.data,
          hoverOverShowIcons: false,
          updateTransmission: true,
          refreshDetailsPage,
          xchangeFileProcessSid,
          stepCommands,
        };
      }
      if (n.data.stepIndex === node.data.stepIndex && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: false,
          updateStep: true,
          refreshDetailsPage,
          xchangeFileProcessSid,
          transmissionCommands,
        };
      }
      return n;
    }));
  };

  const hideIcons = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (n.data.sid && n.data.transIndex === node.data.transIndex && node.type === 'dataNodeTransmissions') {
        n.data = {
          ...node.data,
          hoverOverShowIcons: false,
          updateTransmission: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
          transmissionCommands,
        };
      }
      if (n.data.sid && n.data.stepIndex === node.data.stepIndex && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: false,
          updateStep: false,
          refreshDetailsPage,
          xchangeFileProcessSid: null,
          stepCommands,
        };
      }
      return n;
    }));
  };

  const handleIcons = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (n.data.transIndex === node.data.transIndex && node.type === 'dataNodeTransmissions') {
        n.data = {
          ...node.data,
          hoverOverShowIcons: true,
          updateTransmission: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
          transmissionCommands,
        };
      }
      if (n.data.stepIndex === node.data.stepIndex && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: true,
          updateStep: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
          stepCommands,
        };
      }
      return n;
    }));
  };

  const getCommands = () => {
    commands?.forEach((cmd) => {
      const step = cmd.endPoint?.slice(-4);
      const transmission = cmd.endPoint?.slice(-12);

      if (cmd.commandType === CdxWebCommandType.Add && cmd.endPoint === 'createXchangeStep') {
        setCreateStepCmd(cmd);
      }

      if (cmd.commandType === CdxWebCommandType.Add && cmd.endPoint === 'createXchangeFileTransmission') {
        setCreateTransmissionCmd(cmd);
      }

      if (step === 'Step') {
        setStepCommands((prevState) => prevState?.concat(cmd));
      }
      if (transmission === 'Transmission') {
        setTransmissionCommands((prevState) => prevState?.concat(cmd))
      }
    });
  };

  useEffect(() => {
    getCommands();
    setTotalHeight(0);
    let height = largestCoordinate;
    let width = largestCoordinateX + 1;
    height = height === 1 ? 2 : height;
    height *= 165;
    width *= 280;
    setTotalHeight(height);
    setTotalWidth(width);
  }, [data]);

  useEffect(() => {
    setNodes(nodeWithParents);
    setEdges(initialEdges);
  }, [data, showIcons]);

  return (
    <Container>
      <Row>
        <Column lg="1">
          <StyledHorizontalButtons>
            <StyledButtonAction
              fontSize={24}
              id="__Add_XchangeSteps"
              disabled={!createStepCmd}
              title="Add Step"
              onClick={() => {
                setOpenStepPanel(true);
                setOptionXchangeStep('add');
              }}
            >
              <StyledText>
                Xchange Steps {createStepCmd && <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>}
              </StyledText>
            </StyledButtonAction>
            <StyledButtonAction
              fontSize={24}
              id="__Add_FileTransmission"
              disabled={!createTransmissionCmd}
              title="Add File Transmission"
              onClick={() => {
                setOpenFilePanel(true);
                setOptionXchangeFileTransmission('add');
              }}
            >
              <StyledText>
                File Transmissions {createTransmissionCmd && <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>}
              </StyledText>
            </StyledButtonAction>
          </StyledHorizontalButtons>
        </Column>
        <Column lg="10">
          <StyledContainer height={totalHeight} width={totalWidth}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeMouseLeave={hideIcons}
              onNodeMouseEnter={handleIcons}
              onNodeClick={updateStep}
              zoomOnScroll={false}
              panOnScroll={false}
              preventScrolling={false}
              zoomOnDoubleClick={false}
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag={false}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
          </StyledContainer>
        </Column>
      </Row>
      <XchangeStepPanel
        isPanelOpen={openStepPanel}
        closePanel={setOpenStepPanel}
        refreshDetailsPage={refreshDetailsPage}
        setShowIcons={setShowIcons}
        setOptionXchangeStep={setOptionXchangeStep}
        optionXchangeStep={optionXchangeStep}
        xchangeFileProcessSid={xchangeFileProcessSid}
        xchangeStepTitle="New Xchange Step"
      />
      {openFilePanel && (
        <XchangeTransmissionPanel
          isPanelOpen={openFilePanel}
          closePanel={setOpenFilePanel}
          refreshDetailsPage={refreshDetailsPage}
          setShowIcons={setShowIcons}
          setOptionXchangeTransmission={setOptionXchangeFileTransmission}
          optionXchangeTransmission={optionXchangeFileTransmission}
          xchangeFileProcessSid={xchangeFileProcessSid}
        />
      )}
    </Container>
  );
};

export { Diagram };
