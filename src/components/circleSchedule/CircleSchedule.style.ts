import styled from 'styled-components';

export const StyledCircle = styled.span<StyledCircleProps>`
  height: 50px;
  width: 50px;
  display: inline-block;
  background: ${({ theme, selected }) => (selected ? theme.colors.themePrimary : '#f3f2f1')};
  border-radius: 50%;
  padding: 14px 7px 10px 7px;
  border: none;
  text-align: center;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.black)};

  &:hover {
    cursor: pointer;
  }
`;

type StyledCircleProps = {
    selected: boolean;
};
