import { PanelType, Spinner, SpinnerSize } from '@fluentui/react';
import { useEffect } from 'react';
import { Spacing } from 'src/components/spacings/Spacing';
import { ContentType, useContentLazyQuery } from 'src/data/services/graphql';
import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';

type WherePlaceExtractsProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
};

const WherePlaceExtractsPanel = ({ isOpen, closePanel }: WherePlaceExtractsProps) => {
  const [content, { data, loading }] = useContentLazyQuery();

  const fetchContentData = () => {
    content({
      variables: {
        contentType: ContentType.WhereToPlaceExtracts,
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
          <Spinner size={SpinnerSize.large} label="Loading Where to Place your Extracts" />
        </Spacing>
      );
    }

    return (
      <Spacing margin={{ top: 'double' }}>
        <div id="__WherePlaceExtractsPanel" dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}/>
      </Spacing>
    );
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Where to Place your Extracts"
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}
    </ThemedPanel>
  )
};

export { WherePlaceExtractsPanel };
