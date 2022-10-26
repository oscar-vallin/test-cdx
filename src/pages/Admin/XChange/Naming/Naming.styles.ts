import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const StyledNamingList = styled(DetailsList)`
    .ms-DetailsRow-fields {
        & div:nth-child(1) {
            background: ${({ theme }) => theme.colors.neutralQuaternaryAlt};
        }     
    }
    .ms-DetailsRow-cell  {
        background: white;
        & div:nth-child(2) {
            background: white;
        }                
    }
    
`;
