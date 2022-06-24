import { FontIcon, Stack, Text } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import { BrainCircuit24Regular } from '@fluentui/react-icons';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';
import { StyledQualifier } from '../../XchangeDetailsPage.styles';

const DataNodeSteps = ({ data, id }) => {
  let iconName = data.icon;
  const sourceBottom = id[id.length - 1];
  const { connectors } = data;
  const findFromKey = connectors.find((connector) => connector.fromKey === id);
  const trans = findFromKey.toKey.includes('trans');
  const { qualifier } = data;
  const subTitle: string = data.subTitle ?? '';
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  }

  const styles = {
    lineHeight: subTitle.trim() === '' ? '36px' : '18px',
  };
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
      return <Handle style={{ width: '2px', bottom: 1 }} type="source" id={id} position={Position.Bottom} />;
    }

    return <Handle style={{ width: '2px', bottom: 1 }} type="source" id={id} position={Position.Left} />;
  };

  const renderNode = () => {
    return (
      <>
        <Handle
          style={{ width: '2px', top: 1 }}
          type="target"
          id={id}
          position={Position['Top'] || Position['Right']}
        />
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
                    padding: '6px 1px 7px 0px',
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
                {data.label} <br /> <span>{subTitle.trim() !== '' && <Text variant="small">{subTitle}</Text>}</span>
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
      </>
    );
  };

  return <Node content={renderNode()} />;
};

export default memo(DataNodeSteps);
