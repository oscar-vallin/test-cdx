import styled from 'styled-components';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.center ? 'center' : props.bottom ? 'flex-end' : 'flex-start')};
  align-items: ${(props) => (props.centerV ? 'center' : props.right ? 'flex-end' : 'flex-start')};
`;
