import styled from 'styled-components';

const getSpacingValues = ({ spacing }, attr) => {
  if (typeof attr === 'string') {
    return spacing[attr];
  }

  const {
    top = 'none', right = 'none', bottom = 'none', left = 'none',
  } = attr;

  return `${spacing[top]} ${spacing[right]} ${spacing[bottom]} ${spacing[left]}`;
};

export const StyledDiv = styled.div<StyledDivProps>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  margin: ${({ theme, margin }) => getSpacingValues(theme, margin)};
  padding: ${({ theme, padding }) => getSpacingValues(theme, padding)};
  width: ${({ inline }) => (inline ? 'auto' : '100%')};
`;

type StyledDivProps = {
  inline: boolean;
  margin: string;
  padding: string;
  block: string;
};
