import { FontIcon, Stack, Text, TooltipHost } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';
import { StyledQualifier, StyledSFTP } from '../../XchangeDetailsPage.styles';

const DataNodeTransmissions = ({ data, id }) => {
  const { qualifier } = data;
  const { lastTrans } = data;

  let width = '48px';
  let color = 'blue';

  if (qualifier === 'TEST') {
    color = 'orange';
  } else if (qualifier === 'PROD-OE') {
    width = '60px';
  }

  const renderNode = () => {
    if (data.protocol === 'ARCHIVE') {
      return (
        <>
          <Handle type="target" id={id} position={Position['Top']} />
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
      );
    }
    if (lastTrans) {
      return (
        <>
          {/* <div style={{ display: 'flex', marginLeft: '-35px', position: 'relative', bottom: 40, left: 200 }}>
            <TooltipHost content="Copy">
              <FontIcon
                iconName="Copy"
                style={{
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              />
            </TooltipHost>
            <TooltipHost content="Delete">
              <FontIcon
                iconName="Trash"
                style={{
                  fontSize: '18px',
                  color: 'black',
                  cursor: 'pointer',
                }}
              />
            </TooltipHost>
          </div> */}
          <Handle type="target" id={id} position={Position['Top']} />
          <Container>
            <Row>
              <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
                <StyledSFTP>
                  <Text style={{ fontWeight: 700, color: '#666666' }}>{data.protocol}</Text>
                </StyledSFTP>
                <Text style={{ lineHeight: '38px', width: '200px' }} variant="small">
                  {data.host}
                </Text>
              </Stack>
            </Row>
          </Container>
          {qualifier && (
            <StyledQualifier color={color} width={width}>
              {qualifier}
            </StyledQualifier>
          )}
        </>
      );
    }

    return (
      <>
        <Handle type="target" id={id} position={Position['Top']} />
        <Container>
          <Row>
            <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
              <StyledSFTP>
                <Text style={{ fontWeight: 700, color: '#666666' }}>{data.protocol}</Text>
              </StyledSFTP>
              <Text style={{ lineHeight: '38px', width: '200px' }} variant="small">
                {data.host}
              </Text>
            </Stack>
          </Row>
        </Container>
        {qualifier && (
          <StyledQualifier color={color} width={width}>
            {qualifier}
          </StyledQualifier>
        )}
      </>
    );
  };

  return <Node content={renderNode()} />;
};

export default memo(DataNodeTransmissions);
