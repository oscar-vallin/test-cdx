import styled from 'styled-components';
import { Pivot } from 'office-ui-fabric-react/lib/Pivot';

export const StyledPivot = styled(Pivot)`
  width: 100%;

  [role="tablist"] {
    border-bottom: 1px solid #edebe9;
    margin: ${({ theme }) => `0 0 0 ${theme.spacing.normal}`};
  }
`

export const StyledSpan = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;

  #__CDXBadge {
    line-height: .8;
    margin: ${({ theme }) => `0 0 0 ${theme.spacing.small}`};
  }
`;