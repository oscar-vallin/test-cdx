import styled from 'styled-components';

export const Container = styled.div<ContainerProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 36px;
  left: 0;
  background: ${({ theme }) => theme.colors.white};
  z-index: 1;
  border: solid;
  border-color: ${({ theme }) => theme.colors.themePrimary};
  border-width: 2px;
  padding: 5px;
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  box-shadow: ${({ theme }) => theme.boxShadows.normal};
`;

type ContainerProps = {
  show?: boolean;
  value?: string;
};
