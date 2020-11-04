import styled from 'styled-components';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.left
      ? 'flex-start'
      : props.right
      ? 'flex-end'
      : props.around
      ? 'space-around'
      : props.evenly
      ? 'space-evenly'
      : props.between
      ? 'space-beween'
      : 'center'};
  align-items: ${(props) => (props.top ? 'flex-start' : props.bottom ? 'flex-end' : 'center')};
`;
