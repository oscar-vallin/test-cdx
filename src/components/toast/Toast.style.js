import styled from 'styled-components';
import { Link, Stack, StackItem, MessageBar, MessageBarType, ChoiceGroup, IStackProps } from '@fluentui/react';
import { MessageBarButton } from '@fluentui/react/lib/Button';

export const MessageCont = styled(MessageBar)`
  top: ${({ top }) => top};
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);
  max-width: 500px;
  width: 100%;
  animation: ${({ animation }) => animation} 1s 1;
  animation-delay: 0.5s;
  display: ${({ hide }) => (hide === true ? 'none' : 'block')};

  @keyframes myfirst {
    from {
      top: -35px;
    }

    to {
      top: 9px;
    }
  }
  @keyframes mySecond {
    from {
      top: 9px;
    }

    to {
      top: -35px;
    }
  }
`;
