import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Button } from '../../../components/buttons/Button';

const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_BG = ({ theme }) => theme.colors.neutralLighterAlt;
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

export const RowWeek = styled(Row)`
  border-bottom-width: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${COLOR_BORDER};
`;

export const Column = styled(LayoutColumn)`
  width: 40%;
  max-width: 300px;
`;

export const RightColumn = styled(LayoutColumn)`
  width: 40%;
`;

export const CalendarColumn = styled(LayoutColumn)`
  width: calc(100% / 7);
`;

export const HeaderButtonView = styled(Button)`
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

export const ScheduleColumn = styled.img`
  /* font-family: 'Material Icons', serif; */
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
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

export const General = styled.div`
  box-sizing: border-box;
`;

export const Body = styled.div`
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: ${COLOR_TEXT};
  background: ${COLOR_BG};

  /* background-color: cyan; */
  width: 100%;
  /* color: ${COLOR_TEXT}; */
`;

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

export const HeaderLogoIcon = styled(HeaderLogo)`
  padding-right: 0.25em;
`;

export const Main = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 5em;
  max-width: 50em;
`;

/* GRID */
export const GridRow = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
export const GridRowMiddle = styled.div`
  align-items: center;
`;

export const GridCol = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
`;

export const GridColStart = styled.div`
  justify-content: flex-start;
  text-align: left;
`;

export const GridColCenter = styled.div`
  justify-content: center;
  text-align: center;
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

export const CalendarHeader = styled(Calendar)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  border-bottom: 1px solid var(--border-color);
`;

export const CalendarHeaderIcon = styled.div`
  cursor: pointer;
  transition: 0.15s ease-out;

  &:focus {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: ${COLOR_MAIN};
  }
`;

// .calendar .header .icon:first-of-type {
//   margin-left: 1em;
// }

// .calendar .header .icon:last-of-type {
//   margin-right: 1em;
// }

export const CalendarDays = styled.div`
  text-transform: uppercase;
  font-weight: 400;
  color: ${COLOR_TEXT_LIGHT};
  font-size: 70%;
  padding: 0.75em 0;
  border-bottom: 1px solid var(--border-color);
`;

export const CalendarBodyCell = styled.div`
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

export const RowHeader = styled(LayoutBase)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 1em;
`;

export const RowHeaderItem = styled(LayoutBase)`
  flex-direction: row;
`;

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

export const WeekViewContainer = styled.div`
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

export const WeekViewDayName = styled(HeaderTextLarge)`
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
