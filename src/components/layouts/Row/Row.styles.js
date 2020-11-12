import styled from 'styled-components';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.center
      ? 'center'
      : props.right
      ? 'flex-end'
      : props.around
      ? 'space-around'
      : props.evenly
      ? 'space-evenly'
      : props.between
      ? 'space-beween'
      : 'flex-start'
  };
  align-items: ${(props) => (props.center ? 'center' : props.bottom ? 'flex-end' : 'flex-start')};
  width: 100%;
`;
