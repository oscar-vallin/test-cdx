import { ReactElement, ReactNode } from 'react';
import { useConst } from '@uifabric/react-hooks';
import { IContextualMenuProps, IContextualMenuItem } from '@fluentui/react';
import { StyledButton } from './ButtonContextual.styles';

type ButtonContextualProps = {
  id?: string;
  children?: ReactNode;
  items: IContextualMenuItem[];
};

const ButtonContextual = ({ id, children, items }: ButtonContextualProps): ReactElement => {
  const menuProps: IContextualMenuProps = useConst(() => ({
    shouldFocusOnMount: true,
    items: items,
  }));

  return (
    <StyledButton id={id} menuProps={menuProps} items={items}>
      {children}
    </StyledButton>
  );
};

export { ButtonContextual };
