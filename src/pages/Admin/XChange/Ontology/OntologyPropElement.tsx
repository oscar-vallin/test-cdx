import React, { useState } from 'react';
import { Callout, DirectionalHint, FontIcon, IconButton, List, Sticky, StickyPositionType } from '@fluentui/react';
import { OntologyPath, OntologyProperty } from 'src/data/services/graphql';
import { ButtonLink } from 'src/components/buttons';
import { Text } from 'src/components/typography/Text';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { useNotification } from 'src/hooks/useNotification';

type OntologyPropertyType = {
  property?: OntologyProperty;
  renderCopyButton: (id: string) => JSX.Element;
};

export const OntologyPropElement = ({ property, renderCopyButton }: OntologyPropertyType) => {
  const [showDetails, setShowDetails] = useState(false);
  const Toast = useNotification();

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const deriveButtonId = () => `__Prop_${property?.name}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      Toast.info({ text: 'Path Copied to clipboard', duration: 2000 });
    });
  };

  const renderCopyPathButton = (path: OntologyPath, index?: number) => {
    let fullPath = path.propertyPath.map((p) => p.id).join('\n');
    fullPath = `${path.ontologyClass.id}\n${fullPath}\n${property?.id}`;
    return (
      <IconButton
        id={`__CopyPath_${index}`}
        iconProps={{ iconName: 'Copy' }}
        title="Copy Path to Clipboard"
        onClick={() => {
          copyToClipboard(fullPath);
        }}
      />
    );
  };

  const renderPath = (path?: OntologyPath, index?: number) => {
    if (!path) {
      return null;
    }
    return (
      <div key={`path_${index}`} style={{ whiteSpace: 'nowrap' }}>
        {renderCopyPathButton(path, index)}
        <Text variant="bold">{path.ontologyClass.name}</Text>
        {path.propertyPath.map((p, index) => (
          <span key={`path_${index}`}>
            <FontIcon
              key={`chevron_${index}`}
              iconName="ChevronRight"
              style={{ paddingLeft: '.5em', paddingRight: '.5em', fontSize: '.65em' }}
            />
            <Text key={`name_${index}`}>{p.name}</Text>
          </span>
        ))}
      </div>
    );
  };

  const renderCallout = () => {
    if (!showDetails) {
      return null;
    }
    const hasPaths: boolean = (property?.paths?.length ?? 0) > 0;
    return (
      <Callout
        role="dialog"
        gapSpace={5}
        target={`#${deriveButtonId()}`}
        onDismiss={() => setShowDetails(false)}
        directionalHint={DirectionalHint.rightCenter}
        styles={{
          root: {
            minWidth: 320,
            maxWidth: 800,
            padding: '20px',
          },
        }}
      >
        <Sticky stickyPosition={StickyPositionType.Header}>
          <Text variant="muted">{property?.description}</Text>
        </Sticky>
        {hasPaths && (
          <>
            <FormRow>
              <Text variant="normal" size="large">
                Paths to {property?.name}
              </Text>
            </FormRow>
            <FormRow>
              <List items={property?.paths} onRenderCell={renderPath} />
            </FormRow>
          </>
        )}
      </Callout>
    );
  };

  if (!property) {
    return null;
  }

  return (
    <>
      {renderCopyButton(property.id)}
      <ButtonLink id={deriveButtonId()} onClick={toggleShowDetails}>
        {property.name}
      </ButtonLink>
      {renderCallout()}
    </>
  );
};
