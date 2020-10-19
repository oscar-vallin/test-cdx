import styled from 'styled-components';

export const ComponentStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
  padding: 0px;
`;
