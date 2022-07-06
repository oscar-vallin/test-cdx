import styled from 'styled-components';
import { ButtonAction } from 'src/components/buttons';

export const Indent = styled.div`
  margin-left: 10px;
`;

export const ClassBlock = styled.div`
  padding: 10px 0 15px 0;
`;

export const TruncatedButton = styled(ButtonAction)`
  width: 100%;
  
  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
  }
`;
