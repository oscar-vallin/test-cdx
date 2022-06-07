import { ReactElement } from 'react';
import { Row, Column } from 'src/components/layouts';

import { StyledBox } from './PageHeader.styles';

const defaultProps = {
  id: '',
  spacing: 'primary',
  children: '',
};

type PageHeaderProps = {
  id?: string;
  spacing?: string;
  children?: any;
} & typeof defaultProps;

const PageHeader = ({ id, spacing, children }: PageHeaderProps): ReactElement => {
  return (
    <StyledBox id={id} spacing={spacing}>
      <Row id={`${id}__Nav`} left>
        <Column id={`${id}__Col-Left`} sm={12}>
          {children}
        </Column>
      </Row>
    </StyledBox>
  );
};

PageHeader.defaultProps = defaultProps;

export { PageHeader };
