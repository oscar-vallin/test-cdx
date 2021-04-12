import styled from 'styled-components';

export const Container = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  top: 0;
  left: 0;
  background: white;
  z-index: 1;
  border: solid;
  border-color: ${({ theme }) => theme.colors.themePrimary};
  border-width: 2px;
  padding: 10px;
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
`;
