import { useState } from 'react';
import ReactFlow, { MarkerType } from 'react-flow-renderer';
import { StyledContainer } from '../XchangeDetailsPage.styles';
import DataNode from './CustomDiagramNodes/DataNode';

const nodeTypes = {
  dataNode: DataNode,
};

const newElements = [
  {
    id: 'A-1',
    type: 'dataNode',
    data: { label: 'OSIPI' },
    position: { x: 100, y: 50 },
  },
  {
    id: 'A-2',
    type: 'dataNode',
    data: { label: 'some_source_data' },
    position: { x: 100, y: 125 },
  },
  //   {
  //     id: '3',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 350, y: 210 },
  //   },
  //   {
  //     id: '4',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 100, y: 300 },
  //   },
  //   {
  //     id: '5',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 350, y: 300 },
  //   },
  //   {
  //     id: '6',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 100, y: 400 },
  //   },
  //   {
  //     id: '7',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 100, y: 490 },
  //   },
  //   {
  //     id: '8',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 350, y: 490 },
  //   },
  //   {
  //     id: '9',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 625, y: 490 },
  //   },
  //   {
  //     id: '10',
  //     type: 'dataNode',
  //     data: { name: 'some_source_data' },
  //     position: { x: 900, y: 490 },
  //   },
];

const newEdges = [
  {
    id: 'a1-a2',
    source: 'A-1',
    target: 'A-2',
    labelBgBorderRadius: 4,
    labelStyle: { fill: 'red', fontWeight: 700 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const Diagram = () => {
  const [edges, setEdges] = useState(newEdges);

  return (
    <StyledContainer>
      <ReactFlow nodes={newElements} edges={edges} nodeTypes={nodeTypes} zoomOnScroll={false} />;
    </StyledContainer>
  );
};

export { Diagram };
