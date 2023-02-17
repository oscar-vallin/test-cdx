import styled from 'styled-components';

type QBadgeProps = {
  color?: string;
  absolute?: boolean;
};

export const QBadge = styled.div<QBadgeProps>`
  display: inline;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 5em 5em;
  border-top-right-radius: 5em 5em;
  border-bottom-right-radius: 5em 5em;
  border-bottom-left-radius: 5em 5em;
  text-align: center;
  padding: 2px 8px;
  border: solid 1px ${({ color }) => color};
  color: ${({ color }) => color};
  position: ${({ absolute }) => (absolute ? 'absolute' : null)};
  top: ${({ absolute }) => (absolute ? '43px' : null)};
  left: ${({ absolute }) => (absolute ? '180px' : null)};
  text-align: center;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
`;
