import styled from 'styled-components';

export const InlineLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutralPrimary};
  display: inline-block;
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 'auto';
  line-height: normal;
  padding-right: 5px;
`;
