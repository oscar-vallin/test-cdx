import styled from 'styled-components';

export const StyledText = styled.span`
  width: 100%;
  font: ${({ theme }) => theme.fontStyles.normal};
  text-transform: uppercase;
  text-align: ${({ left, right }) => (left ? 'start' : right ? 'end' : 'center')};
`;
