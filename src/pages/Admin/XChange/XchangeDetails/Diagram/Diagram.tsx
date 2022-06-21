import { useState } from 'react';
import { XchangeDiagram } from 'src/data/services/graphql';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Connection, Edge } from 'react-flow-renderer';
import { ButtonAction } from 'src/components/buttons';
import { Column, Container, Row } from 'src/components/layouts';
import { StyledContainer, StyledHorizontalButtons, StyledText } from '../XchangeDetailsPage.styles';
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
            <ButtonAction>
              <StyledText>Xchange Steps +</StyledText>
            </ButtonAction>
            <ButtonAction>
              <StyledText>File Transmissions +</StyledText>
            </ButtonAction>
          </StyledHorizontalButtons>
        </Column>
        <Column lg="10">
          <StyledContainer>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              zoomOnScroll={false}
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
