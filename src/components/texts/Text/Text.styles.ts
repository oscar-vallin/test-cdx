import styled from 'styled-components';

export const StyledText = styled.span<StyledTextProps>`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.normal};
  text-align: ${({ left, right }) => {
    if (left) return 'start';
    if (right) return 'end';

    return 'center';
  }};
`;

type StyledTextProps = {
  left: string;
  right: boolean;
  variant: string;
  top: string;
  bottom: string;
};
