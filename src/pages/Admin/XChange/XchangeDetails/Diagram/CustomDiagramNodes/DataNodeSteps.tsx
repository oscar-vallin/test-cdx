import { FontIcon, Stack, Text, TooltipHost } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import { BrainCircuit24Regular } from '@fluentui/react-icons';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';
import { StyledQualifier } from '../../XchangeDetailsPage.styles';

const DataNodeSteps = ({ data, id }) => {
  console.log(data)
  let iconName = data.icon;
  const sourceBottom = id[id.length - 1];
  const { connectors } = data;
  const findFromKey = connectors.find((connector) => connector.fromKey === id);
  const trans = findFromKey.toKey.includes('trans');
  const { qualifier } = data;
  const subTitle: string = data.subTitle ?? '';
  const styles = { lineHeight: subTitle.trim() === '' ? '36px' : '18px' };
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  }
  if (subTitle.trim() !== '') {
    styles['maxWidth'] = '180px';
    styles['maxHeight'] = '45px';
    styles['width'] = '100%';
    styles['height'] = '100%';
    styles['overflow'] = 'hidden';
  }

  let width = '48px';
  let color = 'blue';

  if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE') {
    width = '60px';
  }
  const hanldeSourcePosition = () => {
    if (
      trans ||
      data.position.x === 1 ||
      ((sourceBottom === '1' || sourceBottom === '0') && data.label === 'Semantic Map')
    ) {
      return <Handle type="source" id={id} position={Position['Bottom']} />;
    }

    return <Handle type="source" id={id} position={Position['Left']} />;
  };

  const renderNode = () => {
    return (
      <>
        <Handle type="target" id={id} position={Position['Top']} />
        <Container>
          <Row>
            <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
              {iconName === 'Brain Circuit' ? (
                <BrainCircuit24Regular
                  aria-label="Brain"
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '37px',
                    height: '37px',
                    borderRadius: '50%',
                    backgroundColor: '#00a341',
                    padding: '6px 3px 7px 3px',
                    textAlign: 'center',
                  }}
                />
              ) : (
                <FontIcon
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '37px',
                    height: '37px',
                    borderRadius: '50%',
                    backgroundColor: '#00a341',
                    padding: '8px 1px 7px 0px',
                    textAlign: 'center',
                  }}
                  iconName={iconName}
                />
              )}
              <Text style={styles}>
                {data.label} <br /> {subTitle.trim() !== '' && <Text variant="small">{subTitle}</Text>}
              </Text>
            </Stack>
          </Row>
        </Container>
        {hanldeSourcePosition()}
        {qualifier && (
          <StyledQualifier width={width} color={color}>
            {qualifier}
          </StyledQualifier>
        )}
        {data.info && (
          <TooltipHost content={data.info}>
            <FontIcon iconName="InfoSolid" style={{ position: 'absolute', bottom: '18px', fontSize: '18px' }} />
          </TooltipHost>
        )}
      </>
    );
  };

  return <Node content={renderNode()} />;
};

export default memo(DataNodeSteps);
