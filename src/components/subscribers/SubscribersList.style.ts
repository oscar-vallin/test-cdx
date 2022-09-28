import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const StyledList = styled(DetailsList)<StyledListProps>`
  .ms-DetailsHeader {
    height: ${({ title }) => (title ? '42px' : '25px')}
  }
`;

type StyledListProps = {
  title?: boolean;
};
