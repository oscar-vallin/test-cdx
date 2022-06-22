import React, { memo } from 'react';

type BodyProps = {
  backgroundColor?: string;
  transition?: string;
  border?: string;
  width?: string;
  height: string;
  borderRadius?: string;
};

type StyledProps = {
  body: BodyProps;
};

const style: StyledProps | undefined = {
  body: {
    backgroundColor: '#fff',
    borderRadius: '50px',
    border: '2px solid #8f8f8f',
    width: '250px',
    height: '55px',
  },
};

interface NodeProps {
  content: React.ReactNode;
}
const Node: React.FC<NodeProps> = ({ content }: NodeProps) => {
  // Collapse contentWrapper on icon click
  return (
    <div style={{ ...style.body }}>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>{content}</div>
    </div>
  );
};

export default memo(Node);
