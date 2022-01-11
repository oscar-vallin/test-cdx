import { ReactElement } from 'react';
import { PersonaInitialsColor, PersonaSize } from '@fluentui/react';
import { StyledPersona } from './UserToken.styles';

const defaultProps = {
  id: '',
  name: '',
};

type UserTokenProps = {
  id?: string;
  name?: string;
} & typeof defaultProps;

const UserToken = ({ id, name }: UserTokenProps): ReactElement => {
  return (
    <StyledPersona
      id={id}
      text={name}
      size={PersonaSize.size32}
      imageAlt={name}
      initialsColor={PersonaInitialsColor.darkBlue}
      hidePersonaDetails
    />
  );
};

UserToken.defaultProps = defaultProps;

export { UserToken };
