import { ReactElement } from 'react';
import { Row, Column } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Text } from '../../../components/typography/Text';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const defaultProps = {
  id: '',
  title: '',
  subtitle: '',
};

type CardDashboardProps = {
  id?: string;
  title?: string;
  subtitle?: boolean;
  value?: number;
  total?: number;
} & typeof defaultProps;

const CardDashboard = ({ id, title, subtitle, value, total }: CardDashboardProps): ReactElement => {
  const isNotData = (total ?? 0) === 0;

  return (
    <Card id={id} elevation="smallest">
      {isNotData && (
        <Row>
          <Column direction="column">
            <Text variant="bold">No data available</Text>
          </Column>
        </Row>
      )}

      {!isNotData && (
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

                {(value ?? -1) >= 0 && (total ?? -1) > 0 && <StyledValues>{`${value}/${total}`}</StyledValues>}
              </Column>
            </Row>
          </Column>
        </Row>
      )}
    </Card>
  );
};

CardDashboard.defaultProps = defaultProps;

export { CardDashboard };
