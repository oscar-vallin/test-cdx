import { useState } from 'react';
import PropTypes from 'prop-types';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useLocation } from 'react-router-dom';

import queryString from 'query-string';
import { Column, Container } from 'src/components/layouts';
import { Card } from 'src/components/cards';
import { StyledRow } from './Schedule.styles';

import { ScheduleHeader } from './ScheduleHeader';
import { ScheduleWeek } from './ScheduleWeek';
import { ScheduleSubHeader } from './ScheduleSubHeader';
import { isCurrentViewWeek, isCurrentViewMonth, isCurrentViewDay } from './helpers';
import { ScheduleMonth } from './ScheduleMonth';
import { ScheduleDay } from './ScheduleDay';
import { useScheduleItems } from './Schedule.service';

import { PageHeader } from '../../headers/PageHeader';

// https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3b27cc08-ebdc-42ea-b144-f91ae83b752e/dcc2mld-1481803c-ebe8-41c7-9e7c-ba8c37f8c47d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvM2IyN2NjMDgtZWJkYy00MmVhLWIxNDQtZjkxYWU4M2I3NTJlXC9kY2MybWxkLTE0ODE4MDNjLWViZTgtNDFjNy05ZTdjLWJhOGMzN2Y4YzQ3ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.I7WhA1T1xVSbcDQ7NHjdboU6FuUje3jD5C-chv4bt98
// Add hours.  Week and Day, and dashed lines.
const Schedule = ({ id }) => {
  const location = useLocation();
  const [urlParams] = useState(queryString.parse(location.search));
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const { items } = useScheduleItems(urlParams?.orgSid, {
    rangeStart: startOfMonth(selectedDate),
    rangeEnd: endOfMonth(selectedDate),
  });

  //
  const handleChangeView = (_newView: string) => {
    setCurrentView(_newView);
    return null;
  };

  //
  const handleChangeDate = (_newDate: Date) => {
    setSelectedDate(_newDate);
    return null;
  };

  return (
    <>
      <PageHeader id={`${id}_PageHeader`} spacing="0">
        <Container>
          <ScheduleHeader
            id={id}
            currentDate={currentDate}
            selectedDate={selectedDate}
            currentView={currentView}
            onChangeView={handleChangeView}
            onChangeDate={handleChangeDate}
          />
        </Container>
      </PageHeader>

      <Container>
        <StyledRow>
          <Column lg="12">
            <Card elevation="smallest">
              <ScheduleSubHeader
                id={`${id}_SubHeader`}
                currentDate={currentDate}
                currentView={currentView}
                selectedDate={selectedDate}
              />
              {isCurrentViewMonth(currentView) && (
                <ScheduleMonth
                  id={`${id}-Month`}
                  selectedDate={selectedDate}
                  currentDate={currentDate}
                  items={items}
                  onChangeDate={handleChangeDate}
                  onChangeView={handleChangeView}
                />
              )}
              {isCurrentViewWeek(currentView) && (
                <ScheduleWeek
                  selectedDate={selectedDate}
                  currentDate={currentDate}
                  items={items}
                  onChangeDate={handleChangeDate}
                  onChangeView={handleChangeView}
                />
              )}
              {isCurrentViewDay(currentView) && (
                <ScheduleDay selectedDate={selectedDate} currentDate={currentDate} items={items} />
              )}
            </Card>
          </Column>
        </StyledRow>
      </Container>
    </>
  );
};

Schedule.propTypes = {
  id: PropTypes.string,
  _orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { Schedule };
