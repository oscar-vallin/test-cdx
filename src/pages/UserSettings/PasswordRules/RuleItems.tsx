import { ReactElement } from 'react';
import { PasswordValidationRule } from 'src/data/services/graphql';
import { StyledIcon } from '../UserSettingsPage.styles';

type RuleItemParam = {
  item: PasswordValidationRule;
};

type RuleItemsParam = {
  items: PasswordValidationRule[];
};

const RuleItems = ({ items }: RuleItemsParam) => {
  const rows: ReactElement[] = [];
  let idx = 0;
  for (const item of items) {
    rows.push(RuleItem(idx++, { item }));
  }

  return <div>{rows}</div>;
};

const RuleItem = (idx: number, { item }: RuleItemParam) => {
  return (
    <div key={`ruleItem_${idx}`} style={{ display: 'flex', alignItems: 'center' }}>
      {item.passes ? <StyledIcon iconName="StatusCircleCheckmark" /> : <StyledIcon iconName="StatusCircleErrorX" />}
      {item.label}
    </div>
  );
};

export { RuleItems, RuleItem };
