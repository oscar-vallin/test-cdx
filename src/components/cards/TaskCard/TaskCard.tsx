import {
  IButtonStyles,
  IconButton,
  IStackItemStyles,
  Stack,
} from '@fluentui/react';
import { ReactElement, useState } from 'react';
import { useThemeStore } from 'src/store/ThemeStore';
import { ButtonLink } from 'src/components/buttons';
import { Text } from 'src/components/typography';
import { GrayRoundDiv } from './TaskCard.styles';

type TaskCardType = {
  id: string,
  title: string;
  onClickTitle?: () => void;
  icon?: JSX.Element | null;
  commands?: JSX.Element | null;
  children?: any | null;
};

export const TaskCard = ({
  id,
  title,
  onClickTitle,
  icon = null,
  commands = null,
  children,
}: TaskCardType): ReactElement => {
  const theme = useThemeStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      height: 30,
      overflow: 'hidden',
    },
  };

  const toggleStyles: IButtonStyles = {
    root: {
      color: theme.userTheme.colors.neutralPrimary,
    },
  };

  const renderTitleText = () => {
    if (onClickTitle) {
      return (
        <ButtonLink id={`${id}_Title`} onClick={onClickTitle} title={title}>
          <Text variant="bold">{title}</Text>
        </ButtonLink>
      );
    }
    return <Text id={`${id}_Title`} title={title} variant="bold">{title}</Text>
  };

  const renderTitle = () => (
    <Stack horizontal tokens={{ childrenGap: 5 }}>
      {icon && (
        <Stack.Item styles={stackItemStyles}>{icon}</Stack.Item>
      )}
      <Stack.Item grow styles={stackItemStyles}>{renderTitleText()}</Stack.Item>
      {commands && (
        <Stack.Item styles={stackItemStyles}>{commands}</Stack.Item>
      )}
      <Stack.Item align="end" styles={stackItemStyles}>
        <IconButton
          id={`${id}_Toggle`}
          iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
          title={isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => setIsExpanded((prevState) => !prevState)}
          styles={toggleStyles}
        />
      </Stack.Item>
    </Stack>
  );

  const renderBody = () => {
    if (!isExpanded) {
      return null;
    }
    return (
      <div>
        {children}
      </div>
    );
  };

  return (
    <GrayRoundDiv id={id}>
      {renderTitle()}
      {renderBody()}
    </GrayRoundDiv>
  );
};
