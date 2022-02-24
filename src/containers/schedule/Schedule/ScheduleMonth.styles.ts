import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from 'src/components/layouts';
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

export const Row = styled(LayoutRow)`
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
  background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.neutralPrimary)};
  color: ${({ selected, theme }) => (selected ? theme.colors.neutralPrimary : theme.colors.themePrimary)};
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};

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
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: ${COLOR_TEXT};
  background: ${COLOR_BG};
  width: 100%;
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

type StyledCalendarBodyCellProps = {
  isSelectedDate?: boolean | undefined;
  isSameDay?: boolean | undefined;
  isSameMonth?: boolean | undefined;
};

export const CalendarBodyCell = styled.div<StyledCalendarBodyCellProps>`
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

export const HeaderTextLarge = styled.span`
  font-family: Segoe UI;
  font-size: 1.75rem;
  margin-bottom: 5px;
`;

export const HeaderYear = styled(HeaderTextLarge)`
  font-weight: normal;
`;

export const CalendarBodyCellNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 1;
  font-weight: 700;
  margin: 5px;
  
  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }
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
