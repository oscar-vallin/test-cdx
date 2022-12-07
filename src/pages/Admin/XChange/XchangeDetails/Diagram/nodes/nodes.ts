import { XchangeDiagram, XchangeDiagramFileTransmission, XchangeDiagramStep } from 'src/data/services/graphql';

export function InitialNodes(data: XchangeDiagram) {
  const xchangeSteps = data.steps ? data.steps : [];
  const xhcnageTransmissions = data.transmissions ? data.transmissions : [];
  const initialSteps = xchangeSteps.map((step: XchangeDiagramStep, stepIndex: number) => {
    const values = {};
    const lastNode = stepIndex === xchangeSteps.length - 1;
    let positionX = step.position.x * 300;
    if (step.position.x === 0) {
      positionX = 10;
    }
    let positionY = (step.position.y + 0.2) * 110;
    if (step.position.y === 0) {
      positionY = 30;
    }

    values['id'] = step.key;
    values['type'] = 'dataNodeSteps';
    values['data'] = {
      stepIndex,
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
      stepCommads: null,
      coordinates: data.steps,
    };
    values['position'] = { x: positionX, y: positionY };
    return values;
  });
  let largestCoordinate = 0;
  let largestCoordinateX = 0;
  const initialTransmissions = xhcnageTransmissions
    .map((transmission:XchangeDiagramFileTransmission, transIndex: number) => {
      const values = {};
      if (transmission.position.y > largestCoordinate) largestCoordinate = transmission.position.y;
      if (transmission.position.x > largestCoordinateX) {
        largestCoordinateX = transmission.position.x;
      }
      let positionX = transmission.position.x * 265;
      if (transmission.position.x === 0) {
        positionX = 10;
      }
      const positionY = (transmission.position.y + 0.2) * 120;
      const lastTrans = xhcnageTransmissions.length - 1 === transIndex;
      values['id'] = transmission.key;
      values['type'] = 'dataNodeTransmissions';
      values['data'] = {
        transIndex,
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
        transmissionCommands: null,
      };

      values['position'] = { x: positionX, y: positionY };

      return values;
    });

  return {
    initialNodes: [...initialSteps, ...initialTransmissions],
    largestCoordinate,
    largestCoordinateX,
  };
}
