import React, { useEffect, useState } from 'react';
import { IconButton, List, SearchBox, Stack } from '@fluentui/react';
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
} from 'src/data/services/graphql';
import { PageBody } from 'src/components/layouts/Column';
import { Text } from 'src/components/typography/Text';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Collapse } from 'src/components/collapses/Collapse';
import { useNotification } from 'src/hooks/useNotification';
import { LightSeparator } from 'src/components/separators/Separator';
import { ButtonAction } from 'src/components/buttons';
import { EmptyState } from 'src/containers/states';
import { ClassBlock, Indent } from './OntologyPage.styles';

const OntologyPage = () => {
  const [ontologyClasses, setOntologyClasses] = useState<OntologyClass[]>([]);

  const [callSearchOntology, { data: dataSearchOntology, loading: loadingSearchOntology, error: errorSearchOntology }] =
    useSearchOntologyLazyQuery();
  const [
    callFindOntologyById,
    { data: dataFindOntologyById, loading: loadingFindOntologyById, error: errorFindOntologyById }] =
    useFindOntologyClassLazyQuery();
  const [searchText, setSearchText] = useState<string>();

  const handleError = ErrorHandler();
  const Toast = useNotification();

  useEffect(() => {
    handleError(errorSearchOntology);
  }, [errorSearchOntology, handleError]);
  useEffect(() => {
    handleError(errorFindOntologyById);
  }, [errorFindOntologyById, handleError]);

  useEffect(() => {
    if (dataSearchOntology && !loadingSearchOntology) {
      setOntologyClasses(dataSearchOntology.searchOntology);
    }
  }, [dataSearchOntology, loadingSearchOntology]);
  useEffect(() => {
    if (dataFindOntologyById && !loadingFindOntologyById) {
      const _ontologyClasses: OntologyClass[] = [];
      if (dataFindOntologyById.findOntologyClass) {
        _ontologyClasses.push(dataFindOntologyById.findOntologyClass)
      }
      setOntologyClasses(_ontologyClasses)
    }
  }, [dataFindOntologyById, loadingFindOntologyById]);

  const doSearch = (text: string) => {
    setSearchText(text);
    callSearchOntology({
      variables: {
        searchText: text
      }
    });
  };
  const doFind = (id: string) => {
    callFindOntologyById({
      variables: {
        id
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator
      .clipboard
      .writeText(text)
      .then(() => {
        Toast.info({text: "ID Copied to clipboard", duration: 2000} )
      });
  };

  const renderCopyButton = (id: string) => {
    const buttonId = id.split('/').pop()?.replace('#', '_');
    return (
      <IconButton id={`__CopyButton_${buttonId}`}
                  key={ buttonId }
                  iconProps={{ iconName: 'Copy' }}
                  title="Copy Id to Clipboard"
                  onClick={() => { copyToClipboard(id) }}
      />
    );
  };

  const renderProperty = (property?: OntologyProperty) => {
    if (!property) {
      return null;
    }
    return (
      <div key={property.id}>
        <Text>{property.name}</Text>
        <InfoIcon id={`__prop_icon_${property.name}`} tooltip={property.description} />
        { renderCopyButton(property.id) }
      </div>
    );
  };

  const renderOntologyElement = (element?: OntologyElement) => {
    if (!element) {
      return null;
    }
    return (
      <div key={element.id}>
        <ButtonAction onClick={() => doFind(element.id)}>{element.name}</ButtonAction>
        <InfoIcon id={`__prop_icon_${element.name}`} tooltip={element.description} />
        { renderCopyButton(element.id) }
      </div>
    );
  };

  const renderProperties = (properties?: OntologyProperty[]) => {
    if (!properties || properties.length < 1) {
      return null;
    }
    return (
      <Stack.Item key="properties">
        <Collapse label="Properties" expanded={true}>
          <Indent>
            <List items={ properties } onRenderCell={ renderProperty } />
          </Indent>
        </Collapse>
      </Stack.Item>
    );
  };

  const renderSuperclasses = (elements?: OntologyElement[]) => {
    if (!elements || elements.length < 1) {
      return null;
    }
    return (
      <Stack.Item key="superclasses">
        <Collapse label="Subclass of">
          <Indent>
            <List items={elements} onRenderCell={renderOntologyElement} />
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
        <Stack tokens={{ childrenGap: 5 }} >
          <Stack.Item key="metadata">
            <Text variant="bold">{ontologyClass.name}</Text>
            {renderCopyButton(ontologyClass.id)}
          </Stack.Item>
          <Stack.Item key="description">
            <Text variant="muted">{ontologyClass.description}</Text>
          </Stack.Item>
          {renderProperties(ontologyClass.properties)}
          {renderSuperclasses(ontologyClass.superClasses)}
        </Stack>
        <LightSeparator/>
      </ClassBlock>
    );
  };

  const emptyMessage = () => {
    let message: string;
    if (searchText) {
      message = `No results found for "${searchText}"`;
    } else {
      message = 'Search for a class, property, or role in the ontology.'
    }

    return <EmptyState id='__EmptyResults' description={message}/>
  };

  const renderResults = () => {
    if (!ontologyClasses || ontologyClasses.length < 1) {
      return emptyMessage();
    }
    return <List items={ontologyClasses} onRenderCell={renderOntologyClass} />
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
          <Stack tokens={{ childrenGap: 10 }} styles={{ root: {width: "100%" }}}>
            <Stack.Item key="searchbar">
              <Column lg="6">
                <FormLabel id="__Search_Lbl" label="Search" />
                <SearchBox placeholder="Search"
                           onSearch={(text) => doSearch(text)} width={"100%"}
                           styles={{ root: { width: "100%" }}}
                           onClear={() => setOntologyClasses([])}
                />
              </Column>
            </Stack.Item>
            <Stack.Item key="classes">
              <Column lg="12">{renderResults()}</Column>
            </Stack.Item>
          </Stack>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};

export { OntologyPage };
