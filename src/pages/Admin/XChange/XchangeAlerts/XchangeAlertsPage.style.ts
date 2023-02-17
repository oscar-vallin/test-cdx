import styled from 'styled-components';
import { ButtonAction } from 'src/components/buttons';

export const StyledEnvironment = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 105px;
  height: 22px;
  border-top-left-radius: 5em 5em;
  border-top-right-radius: 5em 5em;
  border-bottom-right-radius: 5em 5em;
  border-bottom-left-radius: 5em 5em;
  border: solid 1px ${({ theme }) => theme.colors.themePrimary};
  text-align: center;
  color: ${({ theme }) => theme.colors.themePrimary};
  font-size: 12px;
  font-weight: 500;
`;

export const StyledAlertTypes = styled.div`
  display: inline;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.colors.black};
  text-align: center;
  padding: 2px 5px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  white-space: nowrap;
  margin-right: 5px;
`;

export const StyledButtonAction = styled(ButtonAction)`
  color: black;
  padding-bottom: 20px;
  margin-bottom: -7px;
  [data-icon-name*='add'] {
    font-size: 0.75em;
    font-weight: 600;
  }
`;
