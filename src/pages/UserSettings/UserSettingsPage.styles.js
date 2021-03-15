import styled from 'styled-components';
import { Box as LayoutBox } from '../../components/layouts';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export const StyledBox = styled(LayoutBox)`
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  transform: ${({ theme }) => `translateY(-${theme.spacing.triple})`};
`;

export const StyledTitle = styled.h3`
  margin: ${({ theme }) => `0 0 ${theme.spacing.normal}`};
`

export const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutralSecondary};
  margin: ${({ theme }) => `0 0 ${theme.spacing.normal}`};
`

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-end;
    display: flex;

    .ms-ChoiceField {
      &:not(:last-child) {
        margin: 0 ${({ theme }) => theme.spacing.normal} 0 0;
      }
    }
  }
`;