import styled from 'styled-components';
import { Button, ButtonAction } from 'src/components/buttons';
import { Text } from 'src/components/typography';
import { Row as LayoutRow } from 'src/components/layouts';

export const StyledRow = styled(LayoutRow)<StyledRowProps>`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};

    padding: 0px 8px;
  }
`;

type StyledRowProps = {
  marginTop?: boolean;
};

export const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing.normal};

  width: 100%;
`;

// type StyledButtonProps = {
//   onClick?: () => null;
// };

export const StyledButtonIcon = styled(ButtonAction)``;

// type StyledButtonIconProps = {
//   onClick?: () => null;
// };

export const StyledText = styled(Text)`
  width: 100%;
`;
