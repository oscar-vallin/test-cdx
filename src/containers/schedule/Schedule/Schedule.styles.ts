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
const COLOR_NEUTRAL_LIGHTER = ({ theme }) => theme.colors.neutralLighter;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;
const COLOR_DARK_BORDER = ({ theme }) => theme.colors.neutralTertiary;

const COLOR_BACKGROUND = () => 'transparent';

const FONT_SMALL = ({ theme }) => theme.fontSizes.small;
const FONT_NORMAL = ({ theme }) => theme.fontSizes.normal;
const FONT_LARGE = ({ theme }) => theme.fontSizes.large;
const FONT_XLARGE = ({ theme }) => theme.fontSizes.xlarge;

const background = (status: string, theme: any) => {
  switch (status) {
    case 'RAN_NOT_SCHEDULED':
    case 'RAN_IN_WINDOW':
      return COLOR_MAIN;
    case 'RAN_LATE':
      return theme.colors.custom.error;
    case 'SCHEDULED':
      return theme.colors.themeTertiary;
    case 'ERRORED':
    case 'ERRORED_LATE':
    case 'ERRORED_EARLY':
      return theme.colors.custom.error;
    case 'MISSED':
      return theme.colors.custom.warning;
    default:
      return null;
  }
};

const color = (status: string, theme: any) => {
  let c: any;
  if (status !== 'RAN_LATE') {
    c = COLOR_NEUTRAL;
  } else {
    c = theme.colors.black;
  }
  return c;
};

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
  border-width: ${({ isSelectedDate }) => (isSelectedDate ? '5px 0px 0px' : '1px')};
  padding-top: ${({ isSelectedDate }) => (isSelectedDate ? '0px' : '5px')};
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
  font-size: ${FONT_SMALL};
  width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${COLOR_DARK};
  color: ${COLOR_NEUTRAL_LIGHTER};
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 5px;
  margin-bottom: 5px;
`;

export const DesktopCellItem = styled.div<DesktopCellItemProps>`
  font-size: ${FONT_SMALL};
  width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${({ status, theme }) => background(status ?? '', theme)};
  color: ${({ status, theme }) => color(status ?? '', theme)};
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 5px;
  margin-bottom: 5px;
  display: none;
  
  @media ${device.tablet} {
    display: block;
  }
`;

type DesktopCellItemProps = {
  status?: string;
}

export const MobileCellItem = styled.div`
  font-size: ${FONT_SMALL};
  width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${COLOR_DARK};
  color: ${COLOR_NEUTRAL_LIGHTER};
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  display: block;
  text-align: center;
  
  @media ${device.tablet} {
    display: none;
  }
`;

export const HeaderYear = styled.span`
  font-weight: normal;
  font-size: ${FONT_XLARGE};
  margin-bottom: 5px;
`;

export const CalendarBodyCellNumber = styled.span`
  font-size: ${FONT_NORMAL};
  line-height: 1;
  font-weight: 700;
  margin: 5px;

  @media ${device.tablet} {
    margin: 10px;
    font-size: ${FONT_LARGE};
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

export const DayRow = styled(LayoutRow)`
  width: 100%;
  background-color: ${COLOR_NEUTRAL};
  margin: 0 0 20px 0;
`;

export const DayBodyRow = styled.div`
  border-bottom: ${`1px solid ${COLOR_BORDER}`};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

export const DayHourWrapper = styled.div`
  border-bottom: 1px dashed ${COLOR_DARK_BORDER};
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;

export const OccurrenceDetail = styled.div<OccurrenceDetailProps>`
  font-size: ${FONT_NORMAL};
  width: calc(100% - 5px);
  background: ${({ status, theme }) => background(status ?? '', theme)};
  color: ${({ status, theme }) => color(status ?? '', theme)};
  border-radius: 3px;
  margin: 5px 5px 0 5px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: ${COLOR_MAIN};
  }
`;

type OccurrenceDetailProps = {
  status?: string;
};

export const OccurrenceItem = styled.span`
  font-size: ${FONT_NORMAL};
`;

export const OccurrencePattern = styled.span`
  font-size: ${FONT_NORMAL};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
