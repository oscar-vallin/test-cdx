import styled from 'styled-components';

export const DialogMessageWrapper = styled.div`
  min-height: 66px;
`;

export const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.custom.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
