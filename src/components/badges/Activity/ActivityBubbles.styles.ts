import styled from 'styled-components';

export const ActivityBubble = styled.div<ActivityBubbleProps>`
  border-radius: 50%;
  width: ${({ large }) => (large ? '1.5rem' : '1.25rem')};
  height: ${({ large }) => (large ? '1.5rem' : '1.25rem')};;
  background: ${({ theme }) => theme.colors.white};
  border: ${({ large, color }) => (large ? `2px solid ${color}` : `1.5px solid ${color}`)};
  color: ${({ color }) => color};
  text-align: center;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  font-size: 0.75rem;
  cursor: ${({ color }) => (color === 'gray' ? 'default' : 'pointer')};
`;

type ActivityBubbleProps = {
  color: string;
  large?: boolean;
};
