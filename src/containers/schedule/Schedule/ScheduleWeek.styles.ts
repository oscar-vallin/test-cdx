import styled from 'styled-components';
import { Box as LayoutBox, Column as LayoutColumn } from 'src/components/layouts';
import { Button } from 'src/components/buttons';

const COLOR_MAIN = ({ theme }) => theme.colors.themePrimary;
const COLOR_TEXT = ({ theme }) => theme.colors.neutralPrimary;
const COLOR_TEXT_LIGHT = ({ theme }) => theme.colors.neutralTertiaryAlt;
const COLOR_BG = ({ theme }) => theme.colors.neutralLighterAlt;
const COLOR_NEUTRAL = ({ theme }) => theme.colors.white;
const COLOR_BORDER = ({ theme }) => theme.colors.neutralLight;

export const Container = styled(LayoutBox)`
  width: 80%;
`;

export const Box = styled(LayoutBox)`
  width: 100%;
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
  border-bottom: ${`1px solid ${COLOR_MAIN}`};
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

type StyledDayOfWeekContainerProps = {
  isSameMonth?: boolean | undefined;
  isSameDay: boolean | undefined;
};

export const DayOfWeekContainer = styled.div<StyledDayOfWeekContainerProps>`
  border: ${`1px solid ${COLOR_BORDER}`};
  border-bottom-style: dashed;
  cursor: pointer;
  background: ${COLOR_NEUTRAL};
  width: calc((100% - 14px) / 7);
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${({ isSameMonth }) => (isSameMonth ? COLOR_TEXT : COLOR_TEXT_LIGHT)};

  &:hover {
    background: ${COLOR_BORDER};
  }
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
  height: 80px;
`;

export const SWeekHourContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: -10px;
  height: 80px;
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

export const LayoutBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ColumnHeader = styled(LayoutBase)``;

export const HeaderTextLarge = styled.span`
  font-family: Segoe UI;
  font-size: 0.75rem;
  margin-bottom: 5px;
  color: #c2c2c2;
`;

export const HeaderYear = styled(HeaderTextLarge)`
  font-weight: normal;
`;

export const CalendarBodyCellNumber = styled.span`
  margin-top: 10px;
  justify-content: flex-start;
  width: calc(100% - 20px);
  background: none;
`;

export const CellItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  /*width: 100%;*/
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.neutralSecondary};
  color: ${COLOR_NEUTRAL};
  border-radius: 3px;
  padding: 0 5%;
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

export const CalendarBodyCol = styled.div`
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
`;
