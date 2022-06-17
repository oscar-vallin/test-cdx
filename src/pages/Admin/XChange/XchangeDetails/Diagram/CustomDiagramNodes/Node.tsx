import React, { memo } from 'react';

export const contentStyle = {
  contentHeader: {
    padding: '8px 0px',
    flexGrow: 1,
    backgroundColor: '#eee',
  },
  io: {
    padding: '8px 16px',
    flexGrow: 1,
  },
  left: { left: '-8px' },
  textLeft: { textAlign: 'left' },
  right: { right: '-8px' },
  textRight: { textAlign: 'right' },
  handle: {
    widht: '10px', // Does not work
    height: '10px',
    margin: 'auto',
    background: '#ddd',
    borderRadius: '50',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
  },
};

type BodyProps = {
  display?: string;
  backgroundColor?: string;
  transition?: string;
  border?: string;
  width?: string;
  borderRadius?: string;
};

type SelectedProps = {
  boxShadow?: string;
};

type TitleProps = {
  position?: string;
  padding?: string;
  flexGrow?: number;
  backgroundColor?: string;
};

type ContentWrapperProps = {
  padding?: string;
};

type StyledProps = {
  body: BodyProps;
};

const style: StyledProps | undefined = {
  body: {
    backgroundColor: '#fff',
    borderRadius: '50px',
    border: '2px solid gray',
    width: '220px',
  },
//   title: {
//     position: 'relative',
//     padding: '8px 32px',
//     flexGrow: 1,
//     backgroundColor: '#eee',
//   },
//   contentWrapper: {
//     padding: '8px 0px',
//   },
};

interface NodeProps {
  label: string;
  content: React.ReactNode;
}
const Node: React.FC<NodeProps> = ({ label, content }: NodeProps) => {
  // Collapse contentWrapper on icon click
  return (
    <div style={{ ...style.body }}>
      <div>{label}</div>
      <div>{content}</div>
    </div>
  );
};

export default memo(Node);
