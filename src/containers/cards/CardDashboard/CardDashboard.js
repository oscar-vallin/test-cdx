import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../../components/cards/Card';
import { StyledRow, StyledColumn, StyledTitle, StyledSubtitle, StyledValues } from './CardDashboard.styles';

const CardDashboard = ({ id = '__CardDashboard', title, subtitle, percentage, value, maxValue }) => {
  return (
    <Card>
      <StyledRow>
        <StyledColumn>
          <StyledRow left>
            <StyledColumn left>
              <StyledTitle>{title}</StyledTitle>
              <StyledSubtitle>{subtitle}</StyledSubtitle>
              <StyledValues>{`${value}/${maxValue}`}</StyledValues>
            </StyledColumn>
          </StyledRow>
        </StyledColumn>
        <StyledColumn>Right</StyledColumn>
      </StyledRow>
      <StyledRow>----------</StyledRow>
    </Card>
  );
};

CardDashboard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  percentage: PropTypes.number,
  value: PropTypes.number,
  maxValue: PropTypes.number,
};

export { CardDashboard };
