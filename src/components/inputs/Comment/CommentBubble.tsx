import { useState } from 'react';
import { Callout, DirectionalHint } from '@fluentui/react';
import { useThemeStore } from 'src/store/ThemeStore';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { UiStringField } from 'src/data/services/graphql';
import { CommentIcon } from './CommentBubble.styles';

type CommentBubbleType = {
  id: string;
  value?: string | null;
  title?: string;
  uiField?: UiStringField;
  onChange: (comments: string) => void;
};

const yellow = '#fada82';

export const CommentBubble = ({
  id,
  value,
  title,
  uiField,
  onChange,
}: CommentBubbleType) => {
  const { userTheme } = useThemeStore();
  const [showBubble, setShowBubble] = useState(false);

  const iconColor = value ? userTheme.colors.yellow : userTheme.colors.neutralTertiaryAlt

  const renderCallout = () => {
    if (showBubble) {
      return (
        <Callout
          id={`${id}_Callout`}
          role="dialog"
          gapSpace={10}
          onDismiss={() => setShowBubble(false)}
          directionalHint={DirectionalHint.topCenter}
          target={`#${id}_Icon`}
          styles={{
            root: {
              borderRadius: userTheme.radius.large,
            },
            beak: { background: yellow },
            beakCurtain: {
              background: yellow,
              borderRadius: userTheme.radius.large,
            },
            calloutMain: {
              background: yellow,
              padding: '5px 15px 10px 15px',
              borderRadius: userTheme.radius.large,
              width: 300,
            },
          }}
        >
          <UIInputTextArea
            id={`${id}_TextField`}
            uiField={uiField}
            value={value ?? ''}
            onChange={(event, newValue: any) => onChange(newValue)}
            resizable={false}
            rows={12}
          />
        </Callout>
      );
    }

    return null;
  };

  if (!uiField?.visible) {
    return null;
  }

  return (
    <>
      <CommentIcon
        id={`${id}_Icon`}
        style={{
          color: iconColor,
        }}
        onClick={() => {
          setShowBubble(!showBubble);
        }}
        title={title}
      />
      {renderCallout()}
    </>
  );
};
