import { FontIcon, Stack, Text } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';
import { StyledSFTP } from '../../XchangeDetailsPage.styles';

const DataNodeTransmissions = ({ data, id }) => {
  if (data.protocol === 'ARCHIVE') {
    return (
      <Node
        content={
          <>
            <Handle style={{ width: '2px' }} type="target" id={id} position={Position.Top} />
            <Container>
              <Row>
                <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
                  <FontIcon
                    style={{
                      color: '#757575',
                      fontSize: '18px',
                      cursor: 'pointer',
                      width: '35px',
                      height: '35px',
                      border: '2px solid #757575',
                      borderRadius: '10px',
                      padding: '8px 1px 7px 0px',
                      textAlign: 'center',
                    }}
                    iconName="Archive"
                  />
                  <Text style={{ lineHeight: '36px' }}>[archive]</Text>
                </Stack>
              </Row>
            </Container>
          </>
        }
      />
    );
  }
  return (
    <Node
      content={
        <>
          <Handle style={{ width: '2px' }} type="target" id={id} position={Position.Top} />
          <Container>
            <Row>
              <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
                <StyledSFTP>
                  <Text style={{ fontWeight: 'bold', color: '#666666' }}>{data.protocol}</Text>
                </StyledSFTP>
                <Text style={{ lineHeight: '36px' }}>{data.host}</Text>
              </Stack>
            </Row>
          </Container>
        </>
      }
    />
  );
};

export default memo(DataNodeTransmissions);
