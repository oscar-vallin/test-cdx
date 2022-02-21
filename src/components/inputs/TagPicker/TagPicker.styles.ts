import styled from 'styled-components';
import { TagPicker } from '@fluentui/react';

export const StyledTagPicker = styled(TagPicker)`
  width: 100%;

  & .ms-TagItem {
    background-color: ${({ theme }) => theme.colors.themePrimary};
    color: ${({ theme }) => theme.colors.white};

    & .ms-Button {
      background-color: ${({ theme }) => theme.colors.themePrimary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
