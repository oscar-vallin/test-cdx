import { ReactElement } from 'react';
import { StyledIcon } from '../UserSettingsPage.styles';
import { PasswordValidationRule } from '../../../data/services/graphql';

type RuleItemParam = {
  item: PasswordValidationRule;
};

type RuleItemsParam = {
  items: PasswordValidationRule[];
};

const RuleItems = ({ items }: RuleItemsParam) => {
  const rows: ReactElement[] = [];
  for (const item of items) {
    rows.push(RuleItem({ item }));
  }

  return <div>{rows}</div>;
};

const RuleItem = ({ item }: RuleItemParam) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {item.passes ? <StyledIcon iconName="StatusCircleCheckmark" /> : <StyledIcon iconName="StatusCircleErrorX" />}
      {item.label}
    </div>
  );
};

export { RuleItems, RuleItem };
