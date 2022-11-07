import { XchangeDiagram, XchangeDiagramFileTransmission, XchangeDiagramStep } from 'src/data/services/graphql';

export function InitialNodes(data: XchangeDiagram) {
  const xchangeSteps = data.steps ? data.steps : [];
  const xhcnageTransmissions = data.transmissions ? data.transmissions : [];
  const initialSteps = xchangeSteps.map((step: XchangeDiagramStep, index: number) => {
    const values = {};
    const lastNode = index === xchangeSteps.length - 1;
    const positionX = step.position.x * 300;
    let positionY = 0;
    if (step.position.y === 0) {
      positionY = 50;
    } else {
      positionY = (step.position.y + 0.2) * 120;
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
      stepCommads: null,
    };
    values['position'] = { x: positionX, y: positionY };
    return values;
  });

  const initialTransmissions = xhcnageTransmissions
    .map((transmission:XchangeDiagramFileTransmission, index: number) => {
      const values = {};
      const positionX = transmission.position.x * 265;
      const positionY = (transmission.position.y + 0.2) * 120;
      const lastTrans = xhcnageTransmissions.length - 1 === index;
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
        transmissionCommands: null,
      };

      values['position'] = { x: positionX, y: positionY };

      return values;
    });

  return { initialNodes: [...initialSteps, ...initialTransmissions] };
}
