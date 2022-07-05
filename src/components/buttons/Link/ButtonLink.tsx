import { useHistory } from 'react-router-dom';
import { ILinkProps } from '@fluentui/react';
import { OverflowLink } from './ButtonLink.styles';

interface ButtonLinkProps extends ILinkProps {
  to?: string;
}

export const ButtonLink = (props: ButtonLinkProps) => {
  const history = useHistory();

  let { onClick } = props;
  const { to: whereTo } = props;
  if (!onClick && whereTo) {
    onClick = () => {
      history.push(whereTo);
    };
  }
  return <OverflowLink {...props} onClick={onClick} />;
};
