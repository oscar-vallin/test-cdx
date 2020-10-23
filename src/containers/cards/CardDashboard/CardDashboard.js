import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../../components/cards/Card';
import { ChartDonut } from '../../../components/charts/ChartDonut';
import { StyledRow, StyledColumn, StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const CardDashboard = ({ id = '__CardDashboard', title, subtitle, levels, data }) => {
  const total = data.reduce((accumulator = 0, item) => accumulator + item.value, 0);
  const percentage = `${(data[0].value * 100) / total}%`;

  return (
    <Card>
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
          <ChartDonut label={percentage} size={70} data={data} />
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
