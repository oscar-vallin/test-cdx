import React from 'react';
import PropTypes from 'prop-types';
import { StyledPersona } from './UserToken.styles';
import { PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

const UserToken = ({ id = '__UserToken', name }) => {
  return (
    <StyledPersona
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