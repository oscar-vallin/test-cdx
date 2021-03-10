import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../../components/cards/Card';
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
    <Card id={id}>
      {isNotData && (
        <StyledRow line>
          <StyledColumn>
            <StyledTitle noData>{noDataLabel}</StyledTitle>
          </StyledColumn>
        </StyledRow>
      )}
      {!isNotData && (
        <StyledRow line>
          <StyledColumn>
            <StyledRow left>
              <StyledColumn left>
                <StyledTitle>{title}</StyledTitle>
                <StyledSubtitle>{subtitle}</StyledSubtitle>
                {(value ?? -1) >= 0 && (total ?? -1) > 0 && <StyledValues>{`${value}/${total}`}</StyledValues>}
              </StyledColumn>
            </StyledRow>
          </StyledColumn>
          {/* <StyledColumn>
            {(value ?? -1) >= 0 && (total ?? -1) > 0 && (
              <ChartDonut label={`${percentage.toFixed(percentage < 1 ? 2 : 0)}%`} size={70} data={data} />
            )}
          </StyledColumn> */}
        </StyledRow>
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
