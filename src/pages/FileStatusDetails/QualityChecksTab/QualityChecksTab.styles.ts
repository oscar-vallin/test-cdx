import styled from 'styled-components';

export const MessageBlock = styled.span`
  width: calc(100% - 32px);
  display: inline-block;
  overflow: hidden;
`;
export const Message = styled.span`
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  overflow: hidden;
  line-height: 1.5em;
`;
