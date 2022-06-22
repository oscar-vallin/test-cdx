import { FontIcon, Spinner, SpinnerSize } from '@fluentui/react';
import React from 'react';
import { theme } from 'src/styles/themes/theme';
import { Text } from '../Text';
import { SubTitle } from './PageTitle.styles';

type PageTitleParams = {
  id: string;
  title: string;
  subTitle?: string;
  icon?: string;
  loading?: boolean;
};

const PageTitle = ({ id, title, subTitle, icon, loading }: PageTitleParams) => {
  const renderIcon = () => {
    if (icon) {
      if (loading) {
        return <Spinner id={`${id}_Loading`} size={SpinnerSize.large} />;
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

  return (
    <>
      {renderIcon()}
      <Text id={id} size="large" variant="bold">
        {title}
      </Text>
      {renderSubTitle()}
    </>
  );
};

export { PageTitle };
