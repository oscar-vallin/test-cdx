import styled from "styled-components";
import { Card as uiFabricCard } from "@uifabric/react-cards";

export const CardStyled = styled(uiFabricCard)`
  background: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.margins.normal};
  box-shadow: ${(props) => props.theme.boxShadows.normal};
  width: 100%;
  padding-bottom: ${(props) => props.theme.margins.double};
`;

export const Stylesheet = {
  CardSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};
