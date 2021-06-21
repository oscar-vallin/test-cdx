import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Button } from '../../../components/buttons/Button';

// const COLOR_MAIN = '#1a8fff';
// const COLOR_TEXT = '#333';
// const COLOR_TEXT_LIGHT = '#CCC';
// const COLOR_BG = '#F9F9F9';
// const COLOR_NEUTRAL = '#FFF';
// const COLOR_BORDER = '#EEE';

const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_BG = ({ theme }) => theme.colors.neutralLighterAlt;
const COLOR_NEUTRAL = ({ theme }) => theme.colors.white;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;

// --main-color: #1a8fff;
// --text-color: #777;
// --text-color-light: #ccc;
// --border-color: #eee;
// --bg-color: #f9f9f9;
// --neutral-color: #fff;

export const Container = styled(LayoutBox)`
  width: 80%;
`;

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
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
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.neutralPrimary)};
  color: ${({ selected, theme }) => (selected ? theme.colors.neutralPrimary : theme.colors.themePrimary)};
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};

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
  border-color: ${({ isSelectedDate }) => (isSelectedDate ? COLOR_MAIN : COLOR_BORDER)};
  border-width: ${({ isSelectedDate }) => (isSelectedDate ? `5px 0px 0px` : `1px`)};
  border-style: solid;
  cursor: pointer;
  background: ${({ isSameDay }) => (isSameDay ? COLOR_BG : COLOR_NEUTRAL)};
  width: calc(100% / 7);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${({ isSameDay, isSameMonth, isSelectedDate }) =>
    isSelectedDate ? COLOR_MAIN : isSameMonth || isSameDay ? COLOR_TEXT : COLOR_TEXT_LIGHT};
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

export const CellItem = styled.div`
  font-size: 0.625rem;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #808080;
  color: white;
  border-radius: 3px;
  margin-left: 5%;
  padding: 0 5%;
  margin-bottom: 5px;
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
  font-size: 1.75rem;
  margin-bottom: 5px;
`;

export const HeaderMonth = styled(HeaderTextLarge)`
  font-weight: bold;
  margin-right: 0.2em;
`;

export const HeaderYear = styled(HeaderTextLarge)`
  font-weight: normal;
`;

export const CalendarBodyCellNumber = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  /* top: 0.75em; */
  /* right: 0.75em; */
  font-weight: 700;
  margin: 5px;
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
