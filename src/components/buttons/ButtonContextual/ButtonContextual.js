import React from 'react';
import PropTypes from 'prop-types';
import { useConst } from '@uifabric/react-hooks';
import { StyledButton } from './ButtonContextual.styles';

const ButtonContextual = ({ id = '__ButtonContext', children, items }) => {
  const menuProps = useConst(() => ({
    shouldFocusOnMount: true,
    items,
  }));

  return (
    <StyledButton menuProps={menuProps} items={items}>
      {children}
    </StyledButton>
  );
};

ButtonContextual.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  items: PropTypes.array,
};

export { ButtonContextual };
