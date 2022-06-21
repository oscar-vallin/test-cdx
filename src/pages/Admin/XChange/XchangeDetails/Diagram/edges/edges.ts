import { MarkerType } from 'react-flow-renderer';

export function InitialEdges(data) {
  const initialEdges = data.connectors.map((connector) => {
    const values = {};

    values['id'] = `${connector.fromKey}-${connector.toKey}`;
    values['source'] = connector.fromKey;
    values['target'] = connector.toKey;
    values['markerEnd'] = { type: MarkerType.ArrowClosed, color: '#0078D4' };
    values['type'] = 'smoothstep';
    values['style'] = { strokeWidth: 2, stroke: '#0078D4' };

    return values;
  });

  return { initialEdges };
}
