import PropTypes from 'prop-types';
import { useConst } from '@uifabric/react-hooks';
import { StyledButton } from './ButtonContextual.styles';

const ButtonContextual = ({ id, children, items }) => {
  const menuProps = useConst(() => ({
    shouldFocusOnMount: true,
    items,
  }));

  return (
    <StyledButton id={id} menuProps={menuProps} items={items}>
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
