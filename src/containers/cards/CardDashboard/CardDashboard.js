import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Text } from '../../../components/typography/Text';
import { Spacing } from '../../../components/spacings/Spacing';
import { ChartDonut } from '../../../components/charts/ChartDonut';
import { StyledRow, StyledColumn, StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const CardDashboard = ({ id = '__CardDashboard', title, subtitle, value, total, color, noDataLabel, loading }) => {
  const percentage = (value ?? -1) < 0 ? 0 : (value / total) * 100;
  const leftValue = !value || value === 0 ? total : total - value;

  const data = [
    { key: 0, name: title, value: percentage < 1 ? value * 10 : value, color },
    { key: 1, name: subtitle, value: leftValue, color: '#D0D0D0' },
  ];

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
          {/* <StyledColumn>
            {(value ?? -1) >= 0 && (total ?? -1) > 0 && (
              <ChartDonut label={`${percentage.toFixed(percentage < 1 ? 2 : 0)}%`} size={70} data={data} />
            )}
          </StyledColumn> */}
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
