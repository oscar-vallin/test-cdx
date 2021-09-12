import styled from 'styled-components';

export const StyledText = styled.span`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.normal};
  text-align: ${({ left, right }) => {
    if (left) return 'start';
    if (right) return 'end';

    return 'center';
  }};
`;
