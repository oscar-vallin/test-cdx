import { PanelType, Spinner, SpinnerSize } from '@fluentui/react';
import { useEffect } from 'react';
import { Spacing } from 'src/components/spacings/Spacing';
import { ContentType, useContentLazyQuery } from 'src/data/services/graphql';
import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';

type NamingConventionsProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
};

const NamingConventionsPanel = ({ isOpen, closePanel }: NamingConventionsProps) => {
  const [content, { data, loading }] = useContentLazyQuery();

  const nonce = document.getElementById('__nonce')?.getAttribute('content');

  const fetchContentData = () => {
    content({
      variables: {
        nonce,
        contentType: ContentType.NamingConventionsExplained,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchContentData();
    }
  }, [isOpen]);

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading extract naming conventions" />
        </Spacing>
      );
    }

    return (
      <Spacing margin={{ top: 'double' }}>
        <div id="__NamingConventionsPanel" dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
      </Spacing>
    )
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.largeFixed}
      headerText="Extract Naming Convention - Explained"
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}
    </ThemedPanel>
  )
};

export { NamingConventionsPanel };
