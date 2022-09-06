import React, { useState } from 'react';
import { Callout, DirectionalHint } from '@fluentui/react';
import { Maybe } from 'src/data/services/graphql';
import { BlueInfo } from 'src/components/badges/InfoIcon/InfoIcon.styles';
import { Text } from 'src/components/typography';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Message, MessageBlock } from './QualityChecksTab.styles';

type QualityCheckMessageType = {
  rowIndex?: number;
  messages?: Maybe<Maybe<string>[]>;
  value?: string;
  transformedValue?: string;
};

export const QualityCheckMessage = ({
  rowIndex, messages, value, transformedValue,
}: QualityCheckMessageType) => {
  const [showCallout, setShowCallout] = useState(false);

  const renderValue = () => {
    if (value) {
      return (
        <FormRow>
          <FormLabel label="Value" />
          <Text>{value}</Text>
        </FormRow>
      );
    }
    return null;
  };

  const renderTransformedValue = () => {
    if (transformedValue) {
      return (
        <FormRow>
          <FormLabel label="Transformed Value" />
          <Text>{transformedValue}</Text>
        </FormRow>
      );
    }
    return null;
  };

  const renderCallout = () => {
    if (showCallout) {
      return (
        <Callout
          gapSpace={5}
          target={`#__Quality_msg_info_${rowIndex}`}
          onDismiss={() => {
            setShowCallout(false);
          }}
          directionalHint={DirectionalHint.bottomRightEdge}
          styles={{
            root: {
              minWidth: 200,
              maxWidth: 500,
              padding: '20px',
            },
          }}
        >
          {messages?.map((message, _index) => (
            <Text key={_index}>{message}</Text>
          ))}
          {renderValue()}
          {renderTransformedValue()}
        </Callout>
      );
    }
    return null;
  };

  return (
    <div>
      <MessageBlock id={`__Quality_msg_${rowIndex}`}>
        {messages?.map((message, _index) => (
          <Message key={_index}>{message}</Message>
        ))}
      </MessageBlock>
      <BlueInfo
        id={`__Quality_msg_info_${rowIndex}`}
        iconName="Info"
        onClick={() => setShowCallout(!showCallout)}
        style={{ cursor: 'pointer' }}
      />
      {renderCallout()}
    </div>
  );
};
