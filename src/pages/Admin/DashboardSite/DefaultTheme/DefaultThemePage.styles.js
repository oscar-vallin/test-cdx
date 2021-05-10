import styled from 'styled-components';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

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