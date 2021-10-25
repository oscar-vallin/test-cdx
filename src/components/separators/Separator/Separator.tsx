import { ReactElement } from 'react';
import { StyledSeparator } from './Separator.styles';

const defaultProps = {
  id: '',
};

type CDXSeparatorProps = {
  id?: string;
} & typeof defaultProps;

const CDXSeparator = ({ id }: CDXSeparatorProps): ReactElement => {
  return <StyledSeparator id={id} />;
};

CDXSeparator.defaultProps = defaultProps;

export { CDXSeparator };
export default CDXSeparator;
