import { FontIcon, Stack, Text } from '@fluentui/react';
import { Handle, Position } from 'react-flow-renderer';
import React, { memo } from 'react';
import { Container, Row } from 'src/components/layouts';
import Node from './Node';

const DataNodeSteps = ({ data, id }) => {
  let iconName = data.icon;
  const subTitle: string = data.subTitle ?? '';
  if (iconName === 'Column Arrow Right') {
    iconName = 'PaddingRight';
  } else if (iconName === 'Brain Circuit') {
    iconName = 'AccessTime';
  }

  const styles = {
    lineHeight: subTitle.trim() === '' ? '36px' : '18px',
  };
  return (
    <Node
      content={
        <>
        <Handle style={{width: '0px'}} type='target' id={id} position={Position.Top} />
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
          <Handle style={{width: '2px'}} type="source" id={id} position={Position.Bottom} />
        </>
      }
    />
  );
};

export default memo(DataNodeSteps);
