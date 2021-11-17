import { ReactElement, ReactNode } from 'react';
import { useConst } from '@uifabric/react-hooks';
import { StyledButton } from './ButtonContextual.styles';

const defaultProps = {
  id: '',
  items: [
    {
      id: '',
      key: '',
      text: '',
      onClick: () => null,
    },
  ],
};

type itemsProps = {
  id?: string;
  key?: string;
  text?: string;
  onClick?: () => void;
};

type ButtonContextualProps = {
  id?: string;
  children?: ReactNode;
  items?: itemsProps[];
} & typeof defaultProps;

const ButtonContextual = ({ id, children, items }: ButtonContextualProps): ReactElement => {
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

ButtonContextual.defaultProps = defaultProps;

export { ButtonContextual };
