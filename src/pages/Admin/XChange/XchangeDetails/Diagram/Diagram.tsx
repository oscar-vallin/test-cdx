import { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Connection, Edge } from 'react-flow-renderer';
import { Column, Container, Row } from 'src/components/layouts';
import { XchangeDiagram } from 'src/data/services/graphql';
import { StyledContainer, StyledHorizontalButtons, StyledText, StyledButtonAction } from '../XchangeDetailsPage.styles';
import DataNodeSteps from './CustomDiagramNodes/DataNodeSteps';
import DataNodeTransmissions from './CustomDiagramNodes/DataNodeTransmissions';
import { InitialNodes } from './nodes/nodes';
import { InitialEdges } from './edges/edges';

const nodeTypes = {
  dataNodeSteps: DataNodeSteps,
  dataNodeTransmissions: DataNodeTransmissions,
};

type DiagramProps = {
  data: XchangeDiagram;
  refreshDetailsPage: (data: boolean) => void;
  xchangeFileProcessSid?: string;
};

const Diagram = ({ data, refreshDetailsPage, xchangeFileProcessSid }: DiagramProps) => {
  const { initialNodes } = InitialNodes(data);
  const { initialEdges } = InitialEdges(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds));

  const addNewStep = (event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.data.sid && n.data.index === node.data.index && !n.id.includes('trans')) {
          n.data = {
            ...node.data,
            handleTrashAndCopyIcons: false,
            addStep: true,
            refreshDetailsPage,
            xchangeFileProcessSid,
          };
        }
        return n;
      })
    );
  };

  const showIcons = (event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.data.sid && n.data.index === node.data.index && !n.id.includes('trans')) {
          n.data = {
            ...node.data,
            handleTrashAndCopyIcons: true,
            addStep: false,
            refreshDetailsPage,
            xchangeFileProcessSid,
          };
        }
        return n;
      })
    );
  };

  const hideIcons = (event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.data.sid && n.data.index === node.data.index && !n.id.includes('trans')) {
          n.data = {
            ...node.data,
            handleTrashAndCopyIcons: false,
            addStep: false,
            refreshDetailsPage,
            xchangeFileProcessSid: null,
          };
        }
        return n;
      })
    );
  };

  const handleIcons = (event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.data.sid && n.data.index === node.data.index && !n.id.includes('trans')) {
          n.data = {
            ...node.data,
            handleTrashAndCopyIcons: true,
            addStep: false,
            refreshDetailsPage,
            xchangeFileProcessSid: null,
          };
        }
        return n;
      })
    );
  };

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data]);

  return (
    <Container>
      <Row>
        <Column lg="1">
          <StyledHorizontalButtons>
            <StyledButtonAction fontSize={24} id="__Add_XchangeSteps" title="Add Step">
              <StyledText>
                Xchange Steps <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>
              </StyledText>
            </StyledButtonAction>
            <StyledButtonAction fontSize={24} id="__Add_FileTransmission" title="Add File Transmission">
              <StyledText>
                File Transmissions <span style={{ color: '#0078D4', fontSize: '22px' }}>+</span>
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
              onNodeMouseMove={showIcons}
              onNodeClick={addNewStep}
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
    </Container>
  );
};

export { Diagram };
