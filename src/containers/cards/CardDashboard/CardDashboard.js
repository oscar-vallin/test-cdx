import PropTypes from 'prop-types';
import { Row, Column } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Text } from '../../../components/typography/Text';
import { Spacing } from '../../../components/spacings/Spacing';
import { StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const CardDashboard = ({ id = '__CardDashboard', title, subtitle, value, total }) => {
  const isNotData = (total ?? 0) === 0;

  return (
    <Card id={id} elevation="smallest">
      {isNotData && (
        <Row>
          <Column>
            <Text variant="bold">No data available</Text>
          </Column>
        </Row>
      )}

      {!isNotData && (
        <Row>
          <Column>
            <Row>
              <Column>
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

CardDashboard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  levels: PropTypes.number,
};

export { CardDashboard };
