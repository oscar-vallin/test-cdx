import { useThemeStore } from 'src/store/ThemeStore';

export function NodeParent(nodes, stepGroups) {
  const ThemeStore = useThemeStore();
  const semanticMapNodes = nodes.filter((node) => node.data.label === 'Semantic Map');
  const allNodes = nodes.filter((node) => node.data.label !== 'Semantic Map');
  if (stepGroups.length > 0) {
    const parentBackground: any[] = [];
    stepGroups.forEach((group) => {
      const parent = {
        id: 'parent-1',
        type: 'group',
        data: { sid: '' },
        position: { x: group.start.x * 290, y: (group.start.y) * 110 },
        className: 'light',
        style: {
          backgroundColor: ThemeStore.userTheme.colors.neutralTertiary,
          height: 0,
          width: 0,
          border: 'none',
          borderRadius: '10px',
          zIndex: -1,
        },
      };
      if (group.end.x === group.start.x) {
        parent.style.width = 275;
      } else {
        parent.style.width = ((group.end.x + 1) * 250) + 72;
      }
      if (group.end.y === group.start.y) {
        parent.style.height = 95;
      } else {
        parent.style.height = 1 * 55 + 155;
      }
      parentBackground.push(parent);
      parentBackground.push(semanticMapNodes[0]);
      parentBackground.push(semanticMapNodes[1]);
    });

    return {
      nodeWithParents: [...parentBackground, ...allNodes],
    }
  }

  return {
    nodeWithParents: nodes,
  }
}
