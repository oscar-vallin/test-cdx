export function NodeParent(nodes) {
  const semanticMapNodes = nodes.filter((node) => node.data.label === 'Semantic Map');
  const allNodes = nodes.filter((node) => node.data.label !== 'Semantic Map');

  if (semanticMapNodes.length === 2) {
    const parentBackground: any[] = [];
    const parent = {
      id: 'parent-1',
      type: 'group',
      data: { sid: '' },
      position: { x: 0, y: 0 },
      // className: 'light',
      style: {
        backgroundColor: '#B2BEB5',
        height: 85,
        width: 550,
        border: 'none',
        borderRadius: '10px',
      },
    };
    const y = (semanticMapNodes[0]['position']['y'] - 15);
    if (semanticMapNodes[0]['position']['y'] !== semanticMapNodes[1]['position']['y']) {
      parent.style.width = 275;
      parent.style.height = 187;
    }

    parent.position.y = y;
    parentBackground.push(parent);
    parentBackground.push(semanticMapNodes[0]);
    parentBackground.push(semanticMapNodes[1]);
    return {
      nodeWithParents: [...parentBackground, ...allNodes],
    }
  }

  return {
    nodeWithParents: nodes,
  }
}
