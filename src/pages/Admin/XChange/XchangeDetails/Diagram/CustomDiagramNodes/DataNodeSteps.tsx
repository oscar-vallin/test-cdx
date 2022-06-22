import { FontIcon, Stack, Text } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';
import { StyledQualifier } from '../../XchangeDetailsPage.styles';

const DataNodeSteps = ({ data, id }) => {
  let iconName = data.icon;
  const { qualifier } = data;
  const subTitle: string = data.subTitle ?? '';
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  } else if (iconName === 'Brain Circuit') {
    iconName = 'BrainCircuit';
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
  return (
    <Node
      content={
        <>
        <Handle style={{width: '2px', top: 1}} type='target' id={id} position={Position.Top} />
        <Container>
          <Row>
            <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            <FontIcon
              style={{
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
                width: "37px",
                height: "37px",
                borderRadius: '50%',
                backgroundColor: '#00a341',
                padding: "8px 1px 7px 0px",
                textAlign: "center"
              }}
              iconName={iconName}
            />
            <Text style={styles}>{data.label} <br /> <span>{subTitle.trim() !== '' && <Text>{subTitle}</Text>}</span></Text>
            </Stack>
          </Row>
        </Container>
          <Handle style={{width: '2px', bottom: 1}} type="source" id={id} position={Position.Bottom} />
          {qualifier && (<StyledQualifier width={width} color={color}>
          {qualifier}
                         </StyledQualifier>)}
        </>
      }
    />
  );
};

export default memo(DataNodeSteps);
