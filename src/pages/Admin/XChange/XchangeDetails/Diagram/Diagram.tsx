import { useEffect, useState } from 'react';
import ReactFlow, {
  useNodesState, useEdgesState, addEdge, Connection, Edge,
} from 'react-flow-renderer';
import { Column, Container, Row } from 'src/components/layouts';
import { XchangeDiagram } from 'src/data/services/graphql';
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
  allowedCommands: boolean;
};

const Diagram = ({
  data, refreshDetailsPage, xchangeFileProcessSid, allowedCommands,
}: DiagramProps) => {
  const { initialNodes } = InitialNodes(data);
  const { nodeWithParents } = NodeParent(initialNodes);
  const { initialEdges } = InitialEdges(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeWithParents);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openStepPanel, setOpenStepPanel] = useState(false);
  const [openFilePanel, setOpenFilePanel] = useState(false);
  const [optionXchangeStep, setOptionXchangeStep] = useState<string>();
  const [optionXchangeFileTransmission, setOptionXchangeFileTransmission] = useState<string>();
  const [showIcons, setShowIcons] = useState(false);

  const onConnect = (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds));

  const updateStep = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (node.type === 'dataNodeTransmissions' && n.data.sid && n.data.sid === node.data.sid) {
        n.data = {
          ...node.data,
          hoverOverShowIcons: false,
          updateTransmission: true,
          refreshDetailsPage,
          xchangeFileProcessSid,
        };
      }
      if (n.data.sid && n.data.index === node.data.index && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: false,
          updateStep: true,
          refreshDetailsPage,
          xchangeFileProcessSid,
        };
      }
      return n;
    }));
  };

  // const showIconsEachNode = (event, node) => {
  //   setNodes((nds) =>
  //     nds.map((n) => {
  //       if (node.type === 'dataNodeTransmissions' && n.data.sid && n.data.sid === node.data.sid) {
  //         n.data = {
  //           ...node.data,
  //           hoverOverShowIcons: true,
  //           updateTransmission: false,
  //           refreshDetailsPage,
  //           xchangeFileProcessSid,
  //         };
  //       }
  //       if (n.data.sid && n.data.index === node.data.index && node.type === 'dataNodeSteps') {
  //         n.data = {
  //           ...node.data,
  //           qualifier: node.data.qualifier,
  //           hoverOverShowIcons: true,
  //           updateStep: false,
  //           refreshDetailsPage,
  //           xchangeFileProcessSid,
  //         };
  //       }
  //       return n;
  //     })
  //   );
  // };

  const hideIcons = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (node.type === 'dataNodeTransmissions' && n.data.sid && n.data.sid === node.data.sid) {
        n.data = {
          ...node.data,
          hoverOverShowIcons: false,
          updateTransmission: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
        };
      }
      if (n.data.sid && n.data.index === node.data.index && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: false,
          updateStep: false,
          refreshDetailsPage,
          xchangeFileProcessSid: null,
        };
      }
      return n;
    }));
  };

  const handleIcons = (event, node) => {
    setNodes((nds) => nds.map((n) => {
      if (node.type === 'dataNodeTransmissions' && n.data.sid && n.data.sid === node.data.sid) {
        n.data = {
          ...node.data,
          hoverOverShowIcons: true,
          updateTransmission: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
        };
      }
      if (n.data.sid && n.data.index === node.data.index && node.type === 'dataNodeSteps') {
        n.data = {
          ...node.data,
          qualifier: node.data.qualifier,
          hoverOverShowIcons: true,
          updateStep: false,
          refreshDetailsPage,
          xchangeFileProcessSid,
        };
      }
      return n;
    }));
  };

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
              disabled={!allowedCommands}
              title="Add Step"
              onClick={() => {
                setOpenStepPanel(true);
                setOptionXchangeStep('add');
              }}
            >
              <StyledText>
                Xchange Steps {allowedCommands && <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>}
              </StyledText>
            </StyledButtonAction>
            <StyledButtonAction
              fontSize={24}
              id="__Add_FileTransmission"
              disabled={!allowedCommands}
              title="Add File Transmission"
              onClick={() => {
                setOpenFilePanel(true);
                setOptionXchangeFileTransmission('add');
              }}
            >
              <StyledText>
                File Transmissions {allowedCommands && <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>}
              </StyledText>
            </StyledButtonAction>
          </StyledHorizontalButtons>
        </Column>
        <Column lg="10">
          <StyledContainer>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeMouseLeave={hideIcons}
              onNodeMouseEnter={handleIcons}
              // onNodeMouseMove={showIconsEachNode}
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
