import { ReactElement } from 'react';
import { PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib-commonjs/Persona';
import { StyledPersona } from './UserToken.styles';

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

type UserTokenProps = {
  id: string;
  name: string;
};

export { UserToken };
