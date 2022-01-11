import styled from 'styled-components';
import { Link } from '@fluentui/react';

export const StyledLink = styled(Link)`
  font: ${({ theme }) => theme.fontStyles.link};
  font-size: 0.875rem;
`;
