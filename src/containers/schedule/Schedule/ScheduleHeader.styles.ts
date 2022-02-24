import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';
import { Button } from 'src/components/buttons';
import { ButtonAction } from 'src/components/buttons';

const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_NEUTRAL = ({ theme }) => theme.colors.white;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;

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

export const HeaderButtonView = styled(Button)<HeaderButtonViewProps>`
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.infoBackground)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${({ selected, theme }) => (selected ? theme.colors.white : theme.colors.themePrimary)};
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  transition: all 0.15s ease-out;
  width: 100%;

  && {
    border: none;
  }
`;

export const HeaderButtonTitle = styled(Button)<HeaderButtonTitleProps>`
  /* background-color: ${({ selected }) => (selected ? 'gray' : 'white')}; */
  background: transparent;
  border: none;
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

/* GRID */
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


export const CalendarBodyCell = styled.div<CalendarBodyCellProps>`
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

export const FillerHours = styled.div`
  height: 100%;
  width: 50px;
`;

export const RowHeaderItem = styled(LayoutBase)`
  flex-direction: row;
  justify-content: space-between;
`;

export const UpDownContainer = styled(LayoutBase)`
  flex-direction: row;
  margin-right: 10px;
`;

export const MonthYearContainer = styled(LayoutBase)`
  flex-direction: row;
  height: 40px;
  align-items: center;
  position: relative;
`;

export const HeaderTextLarge = styled.span`
  font-family: Segoe UI;
  font-size: 0.875rem;
  color: ${COLOR_MAIN};
`;

export const HeaderMonth = styled(HeaderTextLarge)`
  margin-right: 0.2em;
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

export const StyledButtonAction = styled(ButtonAction)`
  color: #005a9e;
`;

type HeaderButtonViewProps = {
  selected?: boolean;
  text?: string;
};

type HeaderButtonTitleProps = {
  selected?: boolean;
};

type CalendarBodyCellProps = {
  isSameMonth?: boolean;
};
