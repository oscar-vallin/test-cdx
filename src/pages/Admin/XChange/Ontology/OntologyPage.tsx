import React, { useEffect, useState } from 'react';
import { IconButton, List, Stack } from '@fluentui/react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_ONTOLOGY_BROWSER } from 'src/data/constants/RouteConstants';
import {
  OntologyClass,
  OntologyElement,
  OntologyProperty,
  useFindOntologyClassLazyQuery,
  useSearchOntologyLazyQuery,
  useTopLevelOntologyClassesLazyQuery,
} from 'src/data/services/graphql';
import { PageBody } from 'src/components/layouts/Column';
import { Text } from 'src/components/typography/Text';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Collapse } from 'src/components/collapses/Collapse';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { useNotification } from 'src/hooks/useNotification';
import { DarkSeparator, LightSeparator } from 'src/components/separators/Separator';
import { ButtonAction } from 'src/components/buttons';
import { EmptyState } from 'src/containers/states';
import { Spacing } from 'src/components/spacings/Spacing';
import { Card } from 'src/components/cards';
import { OntologyPropElement } from 'src/pages/Admin/XChange/Ontology/OntologyPropElement';
import { ClassBlock, Indent, TruncatedButton } from './OntologyPage.styles';

const OntologyPage = () => {
  const [ontologyClasses, setOntologyClasses] = useState<OntologyClass[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);

  const [
    callTopLevelClasses,
    { data: dataTopLevelClasses, loading: loadingTopLevelClasses, error: errorTopLevelClasses },
  ] = useTopLevelOntologyClassesLazyQuery();
  const [callSearchOntology, { data: dataSearchOntology, loading: loadingSearchOntology, error: errorSearchOntology }] = useSearchOntologyLazyQuery();
  const [
    callFindOntologyById,
    { data: dataFindOntologyById, loading: loadingFindOntologyById, error: errorFindOntologyById },
  ] = useFindOntologyClassLazyQuery();
  const [searchText, setSearchText] = useState<string>('');

  const handleError = ErrorHandler();
  const Toast = useNotification();

  useEffect(() => {
    handleError(errorSearchOntology);
  }, [errorSearchOntology, handleError]);
  useEffect(() => {
    handleError(errorFindOntologyById);
  }, [errorFindOntologyById, handleError]);
  useEffect(() => {
    handleError(errorTopLevelClasses);
  }, [errorTopLevelClasses, handleError]);

  useEffect(() => {
    if (dataTopLevelClasses && !loadingTopLevelClasses) {
      setOntologyClasses(dataTopLevelClasses.topLevelOntologyClasses);
    }
  }, [dataTopLevelClasses, loadingTopLevelClasses]);
  useEffect(() => {
    if (dataSearchOntology && !loadingSearchOntology) {
      setOntologyClasses(dataSearchOntology.searchOntology);
    }
  }, [dataSearchOntology, loadingSearchOntology]);
  useEffect(() => {
    if (dataFindOntologyById && !loadingFindOntologyById) {
      const _ontologyClasses: OntologyClass[] = [];
      if (dataFindOntologyById.findOntologyClass) {
        _ontologyClasses.push(dataFindOntologyById.findOntologyClass);
      }
      setOntologyClasses(_ontologyClasses);
    }
  }, [dataFindOntologyById, loadingFindOntologyById]);

  useEffect(() => {
    // load top level classes on page load
    callTopLevelClasses();
  }, [callTopLevelClasses]);

  const updateRecent = (text: string) => {
    if (text && recentItems.indexOf(text) < 0) {
      const _recentItems = [text, ...recentItems];
      if (_recentItems.length > 20) {
        _recentItems.splice(20);
      }
      setRecentItems(_recentItems);
    }
  };

  const doSearch = (text?: string) => {
    if (text) {
      updateRecent(text);
      callSearchOntology({
        variables: {
          searchText: text,
        },
      });
    }
  };
  const doFind = (id: string) => {
    const name = id.split('#').pop() ?? '';
    setSearchText(id.split('#').pop() ?? '');
    updateRecent(name);
    callFindOntologyById({
      variables: {
        id,
      },
    });
  };
  const reset = () => {
    setSearchText('');
    callTopLevelClasses();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      Toast.info({ text: 'ID Copied to clipboard', duration: 2000 });
    });
  };

  const renderCopyButton = (id: string) => {
    const buttonId = id.split('/').pop()?.replace('#', '_');
    return (
      <IconButton
        id={`__CopyButton_${buttonId}`}
        key={buttonId}
        iconProps={{ iconName: 'Copy' }}
        title="Copy Id to Clipboard"
        onClick={() => {
          copyToClipboard(id);
        }}
      />
    );
  };

  const renderProperty = (property?: OntologyProperty) => {
    if (!property) {
      return null;
    }
    return <OntologyPropElement property={property} renderCopyButton={renderCopyButton} />;
  };

  const renderOntologyElement = (element?: OntologyElement) => {
    if (!element) {
      return null;
    }
    return (
      <div key={element.id}>
        {renderCopyButton(element.id)}
        <ButtonAction onClick={() => doFind(element.id)}>{element.name}</ButtonAction>
        <InfoIcon id={`__prop_icon_${element.name}`} tooltip={element.description} />
      </div>
    );
  };

  const renderProperties = (properties?: OntologyProperty[]) => {
    if (!properties || properties.length < 1) {
      return null;
    }
    const hasSearchText = searchText != null && searchText.length > 0;
    const numResults = ontologyClasses.length;
    const expanded = hasSearchText || numResults < 3;
    return (
      <Stack.Item key="properties">
        <Collapse label="Properties" expanded={expanded}>
          <Indent>
            <List items={properties} onRenderCell={renderProperty} />
          </Indent>
        </Collapse>
      </Stack.Item>
    );
  };

  const renderRelatedClasses = (ontologyClass: OntologyClass) => {
    const relatedClasses = [...ontologyClass.superClasses, ...ontologyClass.subClasses];
    if (relatedClasses.length < 1) {
      return null;
    }
    const numResults = ontologyClasses.length;
    const expanded = numResults < 3;
    return (
      <Stack.Item key="relatedClasses">
        <Collapse label="See Also" expanded={expanded}>
          <Indent>
            <List items={relatedClasses} onRenderCell={renderOntologyElement} />
          </Indent>
        </Collapse>
      </Stack.Item>
    );
  };

  const renderOntologyClass = (ontologyClass?: OntologyClass) => {
    if (!ontologyClass) {
      return null;
    }
    return (
      <ClassBlock key={ontologyClass.name}>
        <Stack tokens={{ childrenGap: 5 }}>
          <Stack.Item key="metadata">
            {renderCopyButton(ontologyClass.id)}
            <Text variant="bold">{ontologyClass.name}</Text>
          </Stack.Item>
          <Stack.Item key="description">
            <Text variant="muted">{ontologyClass.description}</Text>
          </Stack.Item>
          {renderProperties(ontologyClass.properties)}
          {renderRelatedClasses(ontologyClass)}
        </Stack>
        <LightSeparator />
      </ClassBlock>
    );
  };

  const renderRecentItem = (item?: string, index?: number) => (
    <TruncatedButton
      key={index}
      onClick={() => {
        setSearchText(item ?? '');
        doSearch(item);
      }}
    >
      {item}
    </TruncatedButton>
  );

  const renderRecentItems = () => {
    if (recentItems.length === 0) {
      return null;
    }
    return (
      <Card elevation="smallest">
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item>
            <Text variant="semiBold">recent searches</Text>
          </Stack.Item>
          <Stack.Item>
            <DarkSeparator />
          </Stack.Item>
          <Stack.Item>
            <List items={recentItems} onRenderCell={renderRecentItem} />
          </Stack.Item>
        </Stack>
      </Card>
    );
  };

  const emptyMessage = () => {
    let message: string;
    if (searchText) {
      message = `No results found for "${searchText}"`;
    } else {
      message = 'Search for a class, property, or role in the ontology.';
    }

    return <EmptyState id="__EmptyResults" description={message} />;
  };

  const renderResults = () => {
    if (!ontologyClasses || ontologyClasses.length < 1) {
      return emptyMessage();
    }
    return <List items={ontologyClasses} onRenderCell={renderOntologyClass} style={{ width: '100%' }} />;
  };

  return (
    <LayoutDashboard id="PageOntologyPage" menuOptionSelected={ROUTE_ONTOLOGY_BROWSER.API_ID}>
      <PageHeader id="__OntologyBrowserHeader">
        <Container>
          <Row>
            <Column lg="12" direction="row">
              <PageTitle id="__Page_Title" title="Ontology Explorer" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__Ontology_Body">
        <Container id="__Ontology_Page_Container">
          <Row>
            <Column lg="6">
              <FormLabel id="__Search_Lbl" label="Search" />
              <ThemedSearchBox
                placeholder="Search"
                value={searchText}
                onChange={(event, text) => setSearchText(text ?? '')}
                onSearch={(text) => doSearch(text)}
                width="100%"
                styles={{ root: { width: '100%' } }}
                onClear={() => reset()}
              />
            </Column>
            <Column lg="6">
              <Spacing margin={{ top: 'double' }}>
                <ButtonAction onClick={() => reset()}>reset</ButtonAction>
              </Spacing>
            </Column>
          </Row>
          <Row>
            <Column lg="9">{renderResults()}</Column>
            <Column lg="3">{renderRecentItems()}</Column>
          </Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};

export { OntologyPage };
