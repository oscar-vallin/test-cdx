import styled from 'styled-components';
import { ComboBox } from '@fluentui/react';
import { Column } from 'src/components/layouts';

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }
`;

export const StyledComboBox = styled(ComboBox)`
  margin: 0 5px;
  width: 150px;
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  margin: 8px 0;

  .Text {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    font-size: 0.875rem;
    white-space: nowrap;

    .ms-TextField {
      margin: 0 5px;
      width: 60px;
    }
  }
`;
