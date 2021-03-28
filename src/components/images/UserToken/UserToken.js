import React from 'react';
import PropTypes from 'prop-types';
import { Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

const UserToken = ({ id = '__UserToken', name }) => {
  return (
    <Persona
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
