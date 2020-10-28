import styled from 'styled-components';
import { Link } from 'office-ui-fabric-react/lib/Link';

export const StyledLink = styled(Link)`
  font: ${({ theme }) => theme.fontStyles.link};
`;
