export function InitialNodes(data) {
  const postionTransmissions = [
    { x: 0, y: 530 },
    { x: 270, y: 530 },
    { x: 540, y: 530 },
    { x: 820, y: 530 },
    { x: 10, y: 700 },
    { x: 270, y: 700 },
    { x: 540, y: 700 },
    { x: 820, y: 700 },
    { x: 820, y: 700 },
    { x: 820, y: 700 },
  ];
  const initialSteps = data.steps.map((step, index: number) => {
    const values = {};
    const lastNode = index === data.steps.length - 1;
    let positionX = 0;
    let positionY = 50;

    if (step.position.x === 1 || step.position.x === 2) {
      positionX = 290;
    }

    if (data.steps.length === 3) {
      if (step.position.y === 1) {
        positionY = 185;
      } else if (step.position.y === 2) {
        positionY = 350;
      }
    }

    if (data.steps.length === 4) {
      if (step.position.y === 1) {
        positionY = 150;
      } else if (step.position.y === 2) {
        positionY = 275;
      } else if (step.position.y === 3) {
        positionY = 400;
      }
    }

    if (data.steps.length === 5) {
      if (step.position.y === 1) {
        positionY = 145;
      } else if (step.position.y === 2) {
        positionY = 235;
      } else if (step.position.y === 3) {
        positionY = 335;
      } else if (step.position.y === 4) {
        positionY = 430;
      }
    }

    if (data.steps.length > 5) {
      if (step.position.y === 1 && data.steps.length > 4) {
        positionY = 145;
      } else if (step.position.y === 2 && data.steps.length > 4) {
        positionY = 210;
      } else if (step.position.y === 3 && data.steps.length > 4) {
        positionY = 300;
      } else if (step.position.y === 4 && data.steps.length > 4) {
        positionY = 400;
      }
    }

    values['id'] = step.key;
    values['type'] = 'dataNodeSteps';
    values['data'] = {
      index,
      lastNode,
      sid: step.sid,
      label: step.title,
      icon: step.icon,
      subTitle: step.subTitle,
      qualifier: step.qualifier,
      connectors: data.connectors,
      position: step.position,
      info: step.info,
      hoverOverShowIcons: false,
      updateStep: false,
      refreshDetailsPage: null,
      xchangeFileProcessSid: null,
    };
    values['position'] = { x: positionX, y: positionY };
    return values;
  });

  const initialTransmissions = data.transmissions.map((transmission, index: number) => {
    const values = {};
    const lastTrans = data.transmissions.length - 1 === index;
    values['id'] = transmission.key;
    values['type'] = 'dataNodeTransmissions';
    values['data'] = {
      lastTrans,
      sid: transmission.sid,
      hoverOverShowIcons: false,
      updateTransmission: false,
      position: transmission.position,
      refreshDetailsPage: null,
      xchangeFileProcessSid: null,
      protocol: transmission.protocol,
      host: transmission.host,
      qualifier: transmission.qualifier,
    };

    values['position'] = { x: postionTransmissions[index]['x'], y: postionTransmissions[index]['y'] };

    return values;
  });

  return { initialNodes: [...initialSteps, ...initialTransmissions] };
}
