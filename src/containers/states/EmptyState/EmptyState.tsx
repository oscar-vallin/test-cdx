import { ReactElement } from 'react';
import { StyledDiv, StyledImg, StyledTitle, StyledText, StyledActions } from './EmptyState.styles';

const defaultProps = {
  id: '',
  filled: true,
};

type EmptyStateProps = {
  id?: string;
  filled?: boolean;
  title?: string;
  image?: string;
  description?: string;
  actions?: any;
} & typeof defaultProps;

const EmptyState = ({ title, description, actions, image, filled }: EmptyStateProps): ReactElement => {
  return (
    <StyledDiv filled={filled}>
      {image && <StyledImg src={image} />}
      {title && <StyledTitle>{title}</StyledTitle>}
      {description && <StyledText>{description}</StyledText>}
      <StyledActions>{actions}</StyledActions>
    </StyledDiv>
  );
};

EmptyState.defaultProps = defaultProps;

export default EmptyState;
