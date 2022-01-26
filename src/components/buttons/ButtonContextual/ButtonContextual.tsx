import { ReactElement, ReactNode } from 'react';
import { useConst } from '@uifabric/react-hooks';
import { StyledButton } from './ButtonContextual.styles';
import { IContextualMenuProps, IContextualMenuItem } from '@fluentui/react';

type ButtonContextualProps = {
  id?: string;
  children?: ReactNode;
  items: IContextualMenuItem[];
}

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
