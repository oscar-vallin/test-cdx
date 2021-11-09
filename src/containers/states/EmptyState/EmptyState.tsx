import { ReactElement } from 'react';
import { StyledDiv, StyledImg, StyledTitle, StyledText, StyledActions } from './EmptyState.styles';

type EmptyStateProps = {
  id?: string;
  filled?: boolean;
  title?: string;
  image?: string;
  description?: string;
  actions?: any;
};

const EmptyState = ({ title, description, actions, image, filled = true }: EmptyStateProps): ReactElement => {
  return (
    <StyledDiv filled={filled}>
      {image && <StyledImg src={image} />}
      {title && <StyledTitle>{title}</StyledTitle>}
      {description && <StyledText>{description}</StyledText>}
      <StyledActions>{actions}</StyledActions>
    </StyledDiv>
  );
};

export default EmptyState;
