import styled from 'styled-components';

/* TODO: Review theme neutral colors */
export const LightSeparator = styled.hr`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralLight};
  margin: 0;
  width: 100%;
`;

// Neutral tertiary alt
export const DarkSeparator = styled.hr`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralTertiaryAlt};
  margin: 0;
  width: 100%;
`;
