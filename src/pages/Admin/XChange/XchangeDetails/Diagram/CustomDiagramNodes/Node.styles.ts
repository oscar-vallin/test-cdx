import { FontIcon } from '@fluentui/react';
import styled from 'styled-components';

export const StyledNode = styled.div`
    background-color: ${({ theme }) => theme.colors.white}; 
    border-radius: 50px;
    border: 2px solid #8f8f8f;
    width: 250px;
    height: 55px;

    &:hover {
        background: ${({ theme }) => theme.colors.neutralLighter};
        border: 2px solid ${({ theme }) => theme.colors.themeDark};
    }
`;

export const StyledTrashIcon = styled(FontIcon)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    padding: 3.5px;
    border-radius: 50px;
    &:hover {
        background-color: ${({ theme }) => theme.colors.neutralTertiary};
        color: ${({ theme }) => theme.colors.white};
    }
`;
export const StyledCopyIcon = styled(FontIcon)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    padding: 3.5px;
    border-radius: 50px;
    &:hover {
        background-color: ${({ theme }) => theme.colors.neutralTertiary};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const StyledChevronUpIcon = styled(FontIcon)<StyledChevronUpProps>`
    font-size: 10px;
    color: ${({ firstIndex }) => (!firstIndex ? '#000000' : '#dddddd')};
    cursor: ${({ firstIndex }) => (firstIndex ? 'auto' : 'pointer')};
    border-radius: 50px;
    background-color: #f3f2f1;
    padding: 4px;
    margin-bottom: -2px;
    &:hover {
      background-color: ${({ theme, firstIndex }) => (firstIndex ? '' : theme.colors.neutralTertiary)};
      color: ${({ theme }) => theme.colors.white};
    }
`;
export const StyledChevronDownIcon = styled(FontIcon)<StyledChevronDownProps>`
    font-size: 10px;
    color: ${({ lastNode }) => (!lastNode ? '#000000' : '#dddddd')};
    cursor: ${({ lastNode }) => (lastNode ? 'auto' : 'pointer')};
    border-radius: 50px;
    background-color: #f3f2f1;
    padding: 4px;
    margin-bottom: -2px;
    &:hover {
      background-color: ${({ theme, lastNode }) => (lastNode ? '' : theme.colors.neutralTertiary)};
      color: ${({ theme }) => theme.colors.white};
    }
`;

type StyledChevronUpProps = {
    firstIndex?: boolean;
};

type StyledChevronDownProps = {
    lastNode?: boolean;
};
