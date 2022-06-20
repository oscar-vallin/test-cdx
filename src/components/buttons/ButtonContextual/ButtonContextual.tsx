import { ReactElement, ReactNode } from 'react';
import { useConst } from '@uifabric/react-hooks';
import { IContextualMenuProps, IContextualMenuItem } from '@fluentui/react';
import { StyledButton } from './ButtonContextual.styles';

type ButtonContextualProps = {
  id?: string;
  children?: ReactNode;
  title: string;
  items: IContextualMenuItem[];
};

const ButtonContextual = ({ id, children, title, items }: ButtonContextualProps): ReactElement => {
  const menuProps: IContextualMenuProps = useConst(() => ({
    shouldFocusOnMount: true,
    items,
  }));

  return (
    <StyledButton id={id} menuProps={menuProps} title={title} ariaLabel={title} items={items}>
      {children}
    </StyledButton>
  );
};

export { ButtonContextual };
