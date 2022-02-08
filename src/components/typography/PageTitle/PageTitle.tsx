import { FontIcon } from '@fluentui/react';
import React from 'react';
import { Text } from '../Text';
import { SubTitle } from './PageTitle.styles';
import { theme } from 'src/styles/themes/theme';

type PageTitleParams = {
  id: string;
  title: string;
  subTitle?: string;
  icon?: string;
};

const PageTitle = ({ id, title, subTitle, icon }: PageTitleParams) => {
  const renderIcon = () => {
    if (icon) {
      return <FontIcon style={{fontSize: theme.fontSizes.large}} iconName={icon} />;
    }
    return '';
  };

  const renderSubTitle = () => {
    if (subTitle) {
      return (
        <SubTitle>
          &nbsp;—&nbsp;<Text size="large" id={`${id}_SubTitle`}>{subTitle}</Text>
        </SubTitle>
      );
    }
    return '';
  };

  return (
    <>
      {renderIcon()}
      <Text id={id} size="large" variant="bold" >
        {title}
      </Text>
      {renderSubTitle()}
    </>
  );
};

export { PageTitle };
