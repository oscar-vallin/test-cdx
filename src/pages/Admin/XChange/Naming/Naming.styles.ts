import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const StyledNamingList = styled(DetailsList)`
    .vendor-name {
        background: ${({ theme }) => theme.colors.neutralQuaternaryAlt}; 
    }
`;
