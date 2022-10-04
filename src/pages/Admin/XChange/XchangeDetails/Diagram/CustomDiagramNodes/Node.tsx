import React, { memo } from 'react';
import { StyledNode } from './Node.styles';

interface NodeProps {
  content: React.ReactNode;
}
const Node: React.FC<NodeProps> = ({ content }: NodeProps) => (
  <StyledNode>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '6px',
      }}
    >
      {content}
    </div>
  </StyledNode>
);
export default memo(Node);
