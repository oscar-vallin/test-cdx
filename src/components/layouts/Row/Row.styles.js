import styled from "styled-components";

export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.left ? "flex-start" : props.right ? "flex-end" : "center")};
  align-items: ${(props) => (props.top ? "flex-start" : props.bottom ? "flex-end" : "center")};
`;
