import { Text } from 'src/components/typography';
import React from 'react';
import { InlineLabel } from './LabelValue.styles';

export type LabelValueProps = {
  label: string;
  value?: any;
  title?: string | null;
};
export const LabelValue = ({ label, value, title }: LabelValueProps) => (
  <div className="label-value">
    <InlineLabel>{`${label}:`}</InlineLabel>
    {value ? (
      <Text size="small" title={title ?? undefined}>
        {value}
      </Text>
    ) : (
      <Text size="small" variant="muted" title={title ?? undefined}>
        &lt;empty&gt;
      </Text>
    )}
  </div>
);
