import styled from 'styled-components';
import { Link, Stack, StackItem, MessageBar, MessageBarType, ChoiceGroup, IStackProps } from '@fluentui/react';
import { MessageBarButton } from '@fluentui/react/lib/Button';

export const StyledMessageBar = styled(MessageBar)`
  animation: ${({ visible }) => visible ? 'fadeInDown' : 'fadeInUp'} 1s forwards;
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);
  border-radius: 5px;
  left: 50%;
  max-width: 500px;
  position: fixed;
  top: -35px;
  transform: translateX(-50%);
  transition: opacity 1s ease-out;
  width: 100%;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      top: -35px;
    }

    to {
      opacity: 1;
      top: 10px;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 1;
      top: 10px;
    }

    to {
      opacity: 0;
      top: -35px;
    }
  }
`;
