import { IconButton } from '@fluentui/react';
import { Handle, Position } from "react-flow-renderer";
import React, { memo } from 'react';
import Node,{ contentStyle as style } from './Node';

const DataNode = ({ data }) => {
  return (
    <Node 
      label={data.name}
      content={
        <div style={style.io}>
          <Handle type="target" id="i__data" position={Position.Right} style={{ ...style.handle, ...style.left }} />
          <IconButton iconProps={{ iconName: 'Add' }} />
          <Handle type="source" id="o__data" position={Position.Right} style={{ ...style.handle, ...style.right }} />
        </div>
      }
    />
  );
};

export default memo(DataNode);
