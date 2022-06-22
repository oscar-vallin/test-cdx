export function InitialNodes(data) {
  const positions = [
    { x: 0, y: 50 },
    { x: 0, y: 125 },
    { x: 300, y: 210 },
    { x: 0, y: 300 },
    { x: 300, y: 300 },
    { x: 0, y: 400 },
  ];
  const postionTransmissions = [
    { x: 0, y: 530 },
    { x: 300, y: 530 },
    { x: 600, y: 530 },
    { x: 900, y: 530 },
  ];
  const initialSteps = data.steps.map((step, index: number) => {
    const values = {};

    values['id'] = step.key;
    values['type'] = 'dataNodeSteps';
    values['data'] = { label: step['title'], icon: step['icon'], subTitle: step.subTitle, qualifier: step.qualifier };
    values['position'] = { x: positions[index]['x'], y: positions[index]['y'] };

    return values;
  });

  const initialTransmissions = data.transmissions.map((transmission, index: number) => {
    const values = {};
    values['id'] = transmission.key;
    values['type'] = 'dataNodeTransmissions';
    values['data'] = {
      protocol: transmission['protocol'],
      host: transmission['host'],
      qualifier: transmission['qualifier'],
    };
    values['position'] = { x: postionTransmissions[index]['x'], y: postionTransmissions[index]['y'] };

    return values;
  });

  return { initialNodes: [...initialSteps, ...initialTransmissions] };
}
