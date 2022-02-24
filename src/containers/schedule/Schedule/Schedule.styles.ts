import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';

/* VARIABLES */
const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_DARK = ({ theme }) => theme.colors.themeDark;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_BG = ({ theme }) => theme.colors.neutralLighterAlt;
const COLOR_NEUTRAL = ({ theme }) => theme.colors.white;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;
const COLOR_DARK_BORDER = ({ theme }) => theme.colors.neutralTertiary;

const COLOR_BACKGROUND = () => 'transparent';

export const Container = styled(LayoutBox)`
  width: 100vw;
  background-color: ${COLOR_BACKGROUND};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10vw;
  padding-right: 10vw;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
`;

export const Column = styled(LayoutColumn)`
  width: 40%;
  max-width: 300px;
`;

export const StyledRow = styled(LayoutRow)`
  transform: translateY(-25px);
`;

/* GENERAL */
export const Body = styled.div`
  line-height: 1.5;
  color: ${COLOR_TEXT};
  background: ${COLOR_BG};

  width: 100%;
`;

/* Calendar */
export const Calendar = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: ${COLOR_BORDER};
  border: ${`1px solid ${COLOR_BORDER}`};
`;

type StyledDayOfWeekContainerProps = {
  isSameMonth?: boolean | undefined;
  isSameDay?: boolean | undefined;
};

export const DayOfWeekContainer = styled.div<StyledDayOfWeekContainerProps>`
  border: ${`1px solid ${COLOR_BORDER}`};
  /* border-bottom-style: dashed; */
  cursor: pointer;
  background: ${COLOR_NEUTRAL};
  width: calc((100% - 14px) / 7);
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${({ isSameMonth }) => (isSameMonth ? COLOR_TEXT : COLOR_TEXT_LIGHT)};

  &:hover {
    background: ${COLOR_BORDER};
  }
`;

type CalendarBodyCellProps = {
  isSelectedDate?: boolean | undefined;
  isSameDay?: boolean | undefined;
  isSameMonth?: boolean | undefined;
};

export const CalendarBodyCell = styled.div<CalendarBodyCellProps>`
  border-color: ${({ isSelectedDate }) => (isSelectedDate ? COLOR_MAIN : COLOR_BORDER)};
  border-width: ${({ isSelectedDate }) => (isSelectedDate ? `5px 0px 0px` : `1px`)};
  padding-top: ${({ isSelectedDate }) => (isSelectedDate ? `0px` : `5px`)};
  border-style: solid;
  cursor: pointer;
  background: ${({ isSameDay }) => (isSameDay ? COLOR_BG : COLOR_NEUTRAL)};
  width: calc(100% / 7);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${({ isSameDay, isSameMonth, isSelectedDate }) => {
    if (isSelectedDate) {
      return COLOR_MAIN;
    }

    if (isSameMonth || isSameDay) return COLOR_TEXT;

    return COLOR_TEXT_LIGHT;
  }};
  &:hover {
    background: ${COLOR_BORDER};
  }
`;

export const MonthBodyRow = styled.div`
  border-bottom: ${`1px solid ${COLOR_BORDER}`};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(80vh / 5);
`;

export const CellItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${COLOR_DARK};
  color: ${COLOR_NEUTRAL};
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 5px;
  margin-bottom: 5px;
`;

export const HeaderYear = styled.span`
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  margin-bottom: 5px;
`;

export const CalendarBodyCellNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 1;
  font-weight: 700;
  margin: 5px;

  @media ${device.tablet} {
    margin: 10px;
  }
`;

export const CalendarBodyDisabled = styled.div`
  color: ${COLOR_TEXT_LIGHT};
  pointer-events: none;
`;

export const DayContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CalendarBodyCellBg = styled.span`
  font-weight: 700;
  line-height: 1;
  color: ${COLOR_MAIN};
  opacity: 0;
  font-size: 8em;
  top: -0.2em;
  right: -0.05em;
  transition: 0.25s ease-out;
  letter-spacing: -0.07em;
`;

/* Week View Specific Styles */

export const SWeekHourContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: -10px;
  min-height: 40px;
  background: transparent;
  width: 50px;
`;

export const SWeekHour = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutralSecondary};
  height: 100%;
  margin-right: 5px;
  margin-top: -8px;
`;

export const WeekBodyCellNumber = styled.span`
  margin-top: 10px;
  justify-content: flex-start;
  width: 100%;
  background: none;
`;

export const WeekBodyRow = styled.div`
  border-bottom: ${`1px solid ${COLOR_BORDER}`};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

export const WeekDaysWrapper = styled.div`
  border-bottom: 1px dashed ${COLOR_DARK_BORDER};
  width: 100%;
  display: flex;
  flex-direction: row;
`;

/* Day View Specific Styles */

export const WeekRow = styled(LayoutRow)`
  width: 100%;
  /* height: calc(80vh); */
  background-color: #fff;
  /* margin-left: --50px; */
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  margin-bottom: 50px;
`;

export const OccurrenceDetail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  width: 100%;
  background: ${COLOR_MAIN};
  color: ${COLOR_NEUTRAL};
  border-radius: 3px;
  margin: 5px;
  padding: 5px;
`;
