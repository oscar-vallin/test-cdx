import { FontIcon, SpinnerSize } from '@fluentui/react';
import React from 'react';
import { theme } from 'src/styles/themes/theme';
import { Text } from '../Text';
import { PaddedSpinner, SubTitle, Title } from './PageTitle.styles';

type PageTitleParams = {
  id: string;
  title: string;
  subTitle?: string;
  icon?: string;
  loading?: boolean;
};

const PageTitle = ({
  id, title, subTitle, icon, loading,
}: PageTitleParams) => {
  const renderIcon = () => {
    if (icon) {
      if (loading) {
        return <PaddedSpinner id={`${id}_Loading`} size={SpinnerSize.medium} />;
      }
      return <FontIcon style={{ fontSize: theme.fontSizes.large }} iconName={icon} />;
    }
    return '';
  };

  const renderSubTitle = () => {
    if (subTitle) {
      return (
        <SubTitle>
          &nbsp;—&nbsp;
          <Text size="large" id={`${id}_SubTitle`}>
            {subTitle}
          </Text>
        </SubTitle>
      );
    }
    return '';
  };

  const renderTitle = () => {
    if (title.includes('(')) {
      const index = title.indexOf('(');
      return (
        <Title id={id}>
          <Text id={id} size="large" variant="bold">
            {title.slice(0, index)}
          </Text>
          <Text>
            {title.slice(index, title.length)}
          </Text>
        </Title>
      );
    }

    return <Text id={id} size="large" variant="bold">{title}</Text>
  };

  return (
    <>
      {renderIcon()}
      {renderTitle()}
      {renderSubTitle()}
    </>
  );
};

export { PageTitle };
