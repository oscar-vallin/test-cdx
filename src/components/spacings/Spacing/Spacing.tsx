import { ReactElement } from 'react';
import { StyledDiv } from './Spacing.styles';

const defaultProps = {
  id: '',
  children: [],
  margin: {},
  padding: {},
  block: '',
  inline: false,
};

type CDXSpacingProps = {
  id?: string;
  children?: any;
  margin?: any;
  padding?: any;
  block?: string;
  inline?: boolean;
} & typeof defaultProps;

const CDXSpacing = ({
  id, children, margin, padding, block, inline, ...props
}: CDXSpacingProps): ReactElement => (
  <StyledDiv id={`${id}`} margin={margin} padding={padding} block={block} inline={inline} {...props}>
    {children}
  </StyledDiv>
);

CDXSpacing.defaultProps = defaultProps;

export { CDXSpacing };
export default CDXSpacing;
