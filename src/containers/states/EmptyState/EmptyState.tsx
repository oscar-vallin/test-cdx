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
    <StyledDiv filled={filled} id="EmptyState">
      {image && <StyledImg id="EmptyState__image" src={image} />}
      {title && <StyledTitle id="EmptyState__title">{title}</StyledTitle>}
      {description && <StyledText id="EmptyState__description">{description}</StyledText>}
      <StyledActions id="EmptyState__actions">{actions}</StyledActions>
    </StyledDiv>
  );
};

EmptyState.defaultProps = defaultProps;

export default EmptyState;
