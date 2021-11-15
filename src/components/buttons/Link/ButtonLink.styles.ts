import styled from 'styled-components';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';

export const StyledLink = styled(Link)`
  font: ${({ theme }) => theme.fontStyles.link};
  font-size: 0.875rem;
`;
