import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';
import { Button } from 'src/components/buttons/Button';

const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_NEUTRAL = ({ theme }) => theme.colors.white;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;

const COLOR_BACKGROUND = ({ theme }) => theme.colors.neutralLighter;

export const Container = styled(LayoutBox)`
  width: 80%;
`;

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
  background-color: ${COLOR_BACKGROUND};
`;

export const SubHeaderRow = styled(LayoutRow)`
  width: 100%;
  margin-bottom: 5px;
  background-color: ${COLOR_BACKGROUND};
`;

export const RowWeek = styled(Row)`
  border-bottom-width: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${COLOR_BORDER};
`;

export const Column = styled(LayoutColumn)`
  width: 40%;
  max-width: 300px;
`;

type StyledHeaderButtonViewProps = {
  selected?: boolean | undefined;
};

export const HeaderButtonView = styled(Button)<StyledHeaderButtonViewProps>`
  /* background-color: ${({ selected }) => (selected ? 'gray' : 'white')}; */
  &&& {
    background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.neutralLight)};
    color: ${({ selected, theme }) => (selected ? theme.colors.neutralLight : theme.colors.themePrimary)};
    font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.themePrimary};
  }
`;

/* VARIABLES */

export const Root = styled.div`
  --main-color: #1a8fff;
  --text-color: #777;
  --text-color-light: #ccc;
  --border-color: #eee;
  --bg-color: #f9f9f9;
  --neutral-color: #fff;
`;

/* GENERAL */
export const Header = styled.div`
  display: block;
  width: 100%;
  padding: 1.75em 0;
  border-bottom: ${`1px solid ${'blue'}`};
  background: ${COLOR_BORDER};
`;

export const HeaderLogo = styled(Header)`
  font-size: 175%;
  text-align: center;
  color: ${COLOR_MAIN};
  line-height: 1;
`;

export const GridRowMiddle = styled.div`
  align-items: center;
`;

export const GridColEnd = styled.div`
  justify-content: flex-end;
  text-align: right;
`;

/* Calendar */
export const Calendar = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: ${COLOR_BORDER};
  border: ${`1px solid ${COLOR_BORDER}`};
`;


type StyledCalendarBodyCellProps = {
  isSameMonth?: boolean | undefined;
};

export const CalendarBodyCell = styled.div<StyledCalendarBodyCellProps>`
  /* position: relative;
  height: 5em;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  background: ${COLOR_BORDER};
  transition: 0.25s ease-out;

  &:hover {
    background: var(--bg-color);
    transition: 0.5s ease-out;
  } */

  /* background-color: blue; */
  border-right: ${`1px solid ${COLOR_BORDER}`};
  cursor: pointer;
  background: ${COLOR_NEUTRAL};
  width: calc(100% / 7);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  color: ${({ isSameMonth }) => (isSameMonth ? COLOR_TEXT : COLOR_TEXT_LIGHT)};
`;

export const CalendarBodySelected = styled.div`
  border-left: 10px solid transparent;
  border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
  border-image-slice: 1;
`;

export const CalendarBodyRow = styled.div`
  border-bottom: ${`1px solid ${COLOR_BORDER}`};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(80vh / 5);
`;

export const LayoutBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ColumnHeader = styled(LayoutBase)``;

export const HeaderTextLarge = styled.span`
  font-family: Segoe UI;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 0.75rem;
  letter-spacing: -0.1px;
`;

export const DayOfWeek = styled(HeaderTextLarge)`
  margin: 0 0 0 15px;
  width: calc((100% - 110px) / 7);
`;

export const WeekHourSpace = styled.div`
  width: 48px;
  background: transparent;
  height: 48px;
`;

type StyledWeekViewContainerProps = {
  isSameDay?: boolean | undefined;
  isSameMonth?: boolean | undefined;
};

export const WeekViewContainer = styled.div<StyledWeekViewContainerProps>`
  width: calc((100% - 62px) / 7);
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  color: ${({ isSameDay }) => (isSameDay ? COLOR_MAIN : COLOR_BORDER)};
  border-top-color: ${({ isSameDay }) => (isSameDay ? COLOR_MAIN : COLOR_BORDER)};
  border-top-width: ${({ isSameDay }) => (isSameDay ? `5px 0px 0px` : `1px`)};
  border-left-color: ${COLOR_BORDER};
  border-right-color: ${COLOR_BORDER};
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-style: solid;
  border-left-style: solid;
  border-right-style: solid;

  color: ${({ isSameDay, isSameMonth }) => {
    if (isSameDay) return COLOR_MAIN;

    if (isSameMonth) return COLOR_TEXT;

    return COLOR_TEXT_LIGHT;
  }};
  font-weight: ${({ isSameDay }) => (isSameDay ? '600' : '400')};
  background-color: ${COLOR_NEUTRAL};
`;

export const DayViewContainer = styled(WeekViewContainer)`
  width: 100%;
`;

export const WeekViewNumber = styled(HeaderTextLarge)`
  margin: 0 0 6px 10px;
  font-size: 1.25rem;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

type StyledWeekViewDayNameProps = {
  isSameMonth?: boolean | undefined;
};

export const WeekViewDayName = styled(HeaderTextLarge)<StyledWeekViewDayNameProps>`
  margin: 0 0 8px 5px;
  font-size: 0.875rem;
  color: ${({ isSameMonth }) => (isSameMonth ? COLOR_TEXT : COLOR_TEXT_LIGHT)};
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const HeaderYear = styled(HeaderTextLarge)`
  font-weight: normal;
`;

export const CalendarBodyCellNumber = styled.span`
  font-size: 82.5%;
  line-height: 1;
  top: 0.75em;
  right: 0.75em;
  font-weight: 700;
  margin: 10px 10px 0 0;
`;

export const CalendarBodyDisabled = styled.div`
  color: ${COLOR_TEXT_LIGHT};
  pointer-events: none;
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

// .calendar .body .cell:hover .bg, .calendar .body .selected .bg  {
//   opacity: 0.05;
//   transition: .5s ease-in;
// }

export const CalendarBodyCol = styled.div`
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
`;
