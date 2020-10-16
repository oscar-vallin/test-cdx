import styled from "styled-components";

export const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.top ? "flex-start" : props.bottom ? "flex-end" : "center")};
  align-items: ${(props) => (props.left ? "flex-start" : props.right ? "flex-end" : "center")};
`;
