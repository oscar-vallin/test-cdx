import { ReactElement } from 'react';
import { Row, Column } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

export const defaultProps = {
  id: '',
  title: '',
  subtitle: '',
  value: 0,
  total: 0,
  color: '#219653',
  noDataLabel: 'No Data',
  loading: false,
};

type CardDashboardProps = {
  id?: string | null;
  title?: string;
  subtitle?: string;
  value?: number;
  total?: number;
  color?: string;
  noDataLabel?: string;
  loading?: boolean;
} & typeof defaultProps;

const CardDashboard = ({ id, title, subtitle, value, total }: CardDashboardProps): ReactElement => {
  const isNotData = (total ?? 0) === 0;

  return (
    <Card id={id} elevation="smallest">
      <Row>
        <Column>
          <Row>
            <Column direction="column">
              <Spacing margin={{ bottom: 'small' }}>
                <StyledTitle>
                  {title} &nbsp;
                  {subtitle && <StyledSubtitle>({subtitle})</StyledSubtitle>}
                </StyledTitle>
              </Spacing>

              <StyledValues>
                {(value ?? -1) >= 0 && (total ?? -1) > 0 ? `${value}/${total}` : <small>None</small>}
              </StyledValues>
            </Column>
          </Row>
        </Column>
      </Row>
    </Card>
  );
};

CardDashboard.defaultProps = defaultProps;

export { CardDashboard };
export default CardDashboard;
