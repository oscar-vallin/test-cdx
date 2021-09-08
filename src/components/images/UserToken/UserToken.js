import React from 'react';
import PropTypes from 'prop-types';
import { PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { StyledPersona } from './UserToken.styles';

const UserToken = ({ id = '__UserToken', name }) => {
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

UserToken.propTypes = {
  id: PropTypes.string,
};

export { UserToken };
