import { FontIcon } from '@fluentui/react';
import React from 'react';
import { Text } from '../Text';

type PageTitleParams = {
  id: string;
  title: string;
  subTitle?: string;
  icon?: string;
};

const PageTitle = ({ id, title, subTitle, icon }: PageTitleParams) => {
  const renderIcon = () => {
    if (icon) {
      return <FontIcon iconName={icon} />;
    }
    return '';
  };

  const renderSubTitle = () => {
    if (subTitle) {
      return (
        <>
          &nbsp;—&nbsp;<Text id={`${id}_SubTitle`}>{subTitle}</Text>
        </>
      );
    }
    return '';
  };

  return (
    <>
      {renderIcon()}
      <Text id={id} variant="bold" >
        {title}
      </Text>
      {renderSubTitle()}
    </>
  );
};

export { PageTitle };
