import { ReactElement } from 'react';
import { LightSeparator } from './Separator.styles';

const defaultProps = {
  id: '',
};

type CDXSeparatorProps = {
  id?: string;
} & typeof defaultProps;

const CDXSeparator = ({ id }: CDXSeparatorProps): ReactElement => {
  return <LightSeparator id={id} />;
};

CDXSeparator.defaultProps = defaultProps;

export { CDXSeparator };
export default CDXSeparator;
