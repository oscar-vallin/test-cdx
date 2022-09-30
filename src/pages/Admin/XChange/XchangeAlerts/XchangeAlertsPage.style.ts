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

export const StyledAlertTypes = styled.div<StyledAlertTypesProps>`
  background-color: ${({ theme }) => theme.colors.white};
  width: ${({ width }) => width};
  height: 22px;
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.colors.black};
  text-align: center;
  padding-top: 2px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 5px;
`;

type StyledAlertTypesProps = {
  width: string;
};

export const StyledButtonAction = styled(ButtonAction)`
  color: black;
  padding-bottom: 20px;
  margin-bottom: -7px;
  [data-icon-name*='add'] {
    font-size: 0.75em;
    font-weight: 600;
  }
`;

export const StyledSeparator = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  margin-bottom: 10px;
`;
