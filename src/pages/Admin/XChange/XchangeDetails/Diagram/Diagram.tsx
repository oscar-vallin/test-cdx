import { useState } from 'react';
import { XchangeDiagram } from 'src/data/services/graphql';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Connection, Edge } from 'react-flow-renderer';
import { ButtonAction } from 'src/components/buttons';
import { Column, Container, Row } from 'src/components/layouts';
import { StyledContainer, StyledHorizontalButtons, StyledText, StyledButtonAction } from '../XchangeDetailsPage.styles';
import DataNodeSteps from './CustomDiagramNodes/DataNodeSteps';
import DataNodeTransmissions from './CustomDiagramNodes/DataNodeTransmissions';
import { InitialNodes } from './nodes/nodes';
import { InitialEdges } from './edges/edges';

const nodeTypes = {
  dataNodeSteps: DataNodeSteps,
  dataNodeTransmissions: DataNodeTransmissions,
};

const Diagram = ({ data }) => {
  const { initialNodes } = InitialNodes(data);
  const { initialEdges } = InitialEdges(data);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds));

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
              zoomOnScroll={false}
              panOnScroll={false}
              preventScrolling={false}
              zoomOnDoubleClick={false}
              // elementsSelectable={false}
              // selectionKeyCode={null}
              // multiSelectionKeyCode={null}
              // selectNodesOnDrag={false}
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag={false}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
            ;
          </StyledContainer>
        </Column>
      </Row>
    </Container>
  );
};

export { Diagram };
