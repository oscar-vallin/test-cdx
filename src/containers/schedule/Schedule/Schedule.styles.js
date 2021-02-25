import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';

export const Container = styled(LayoutBox)`
  width: 80%;
`;

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
  margin: 10vh 0;
`;

export const Column = styled(LayoutColumn)`
  width: 40%;
  max-width: 300px;
`;

export const RightColumn = styled(LayoutColumn)`
  width: 40%;
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
  /* font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; */
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: var(--text-color);
  background: var(--bg-color);
  position: relative;
`;

export const Header = styled.div`
  display: block;
  width: 100%;
  padding: 1.75em 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--neutral-color);
`;

export const HeaderLogo = styled(Header)`
  font-size: 175%;
  text-align: center;
  color: var(--main-color);
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
  background: var(--neutral-color);
  border: 1px solid var(--border-color);
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
    color: var(--main-color);
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
  color: var(--text-color-light);
  font-size: 70%;
  padding: 0.75em 0;
  border-bottom: 1px solid var(--border-color);
`;

export const CalendarBodyCell = styled.div`
  position: relative;
  height: 5em;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  background: var(--neutral-color);
  transition: 0.25s ease-out;

  &:hover {
    background: var(--bg-color);
    transition: 0.5s ease-out;
  }
`;

export const CalendarBodySelected = styled.div`
  border-left: 10px solid transparent;
  border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
  border-image-slice: 1;
`;

export const CalendarBodyRow = styled.div`
  border-bottom: 1px solid var(--border-color);
`;

// .calendar .body .row:last-child {
//   border-bottom: none;
// }

// .calendar .body .cell:last-child {
//   border-right: none;
// }

export const CalendarBodyCellNumber = styled.div`
  position: absolute;
  font-size: 82.5%;
  line-height: 1;
  top: 0.75em;
  right: 0.75em;
  font-weight: 700;
`;

export const CalendarBodyDisabled = styled.div`
  color: var(--text-color-light);
  pointer-events: none;
`;

export const CalendarBodyCellBg = styled.div`
  font-weight: 700;
  line-height: 1;
  color: var(--main-color);
  opacity: 0;
  font-size: 8em;
  position: absolute;
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
