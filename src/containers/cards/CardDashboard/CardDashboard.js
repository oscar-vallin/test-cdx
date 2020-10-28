import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../../components/cards/Card';
import { ChartDonut } from '../../../components/charts/ChartDonut';
import { StyledRow, StyledColumn, StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const CardDashboard = ({ id = '__CardDashboard', title, subtitle, data }) => {
  const total = data ? data.reduce((accumulator = 0, item) => accumulator + item.value, 0) : 0;
  const percentage = data ? (data[0].value * 100) / total : 0;
  // const levels = data ? data.length : 0;

  return (
    <Card id={id}>
      <StyledRow line>
        <StyledColumn>
          <StyledRow left>
            <StyledColumn left>
              <StyledTitle>{title}</StyledTitle>
              <StyledSubtitle>{subtitle}</StyledSubtitle>
              <StyledValues>{`${data[0].value}/${total}`}</StyledValues>
            </StyledColumn>
          </StyledRow>
        </StyledColumn>
        <StyledColumn>
          <ChartDonut label={`${percentage.toFixed(0)}%`} size={70} data={data} />
        </StyledColumn>
      </StyledRow>
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
