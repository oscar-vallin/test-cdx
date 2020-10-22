import styled from "styled-components";

export const StyledText = styled.span`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.normal};
  text-align: ${(props) => (props.left ? "start" : props.right ? "end" : "center")};
`;
