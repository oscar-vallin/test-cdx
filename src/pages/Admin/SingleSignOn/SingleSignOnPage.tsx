import React, { CSSProperties, useEffect, useState } from 'react';
import { useIdentityProvidersForOrgLazyQuery, IdentityProvider } from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ThemeStore } from 'src/store/ThemeStore';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ROUTE_SSO_CONFIG } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn, SelectionMode,
  Spinner,
  SpinnerSize,
  TooltipHost,
} from '@fluentui/react';
import { People20Filled } from '@fluentui/react-icons';
import { EmptyState } from 'src/containers/states';
import { ButtonLink } from 'src/components/buttons';

export const SingleSignOnPage = () => {
  const { orgSid } = useOrgSid();
  const [nodes, setNodes] = useState<IdentityProvider[] | null>();
  const [
    identityProvidersForOrg,
    {
      data: identityProvidersdata,
      loading: isLoadingIdentityProviders,
      error: identityProvidersdataError,
    },
  ] = useIdentityProvidersForOrgLazyQuery();

  const fetchData = () => {
    identityProvidersForOrg({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  useEffect(() => {
    if (!isLoadingIdentityProviders && identityProvidersdata) {
      setNodes(identityProvidersdata?.identityProvidersForOrg?.nodes);
    }
  }, [identityProvidersdata, isLoadingIdentityProviders, identityProvidersdataError]);

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Id',
      key: 'idpId',
      fieldName: 'idpId',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'members',
      fieldName: 'members',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
  ];

  const onRenderItemColumn = (item?: IdentityProvider, index?: number, column?: IColumn) => {
    let tooltip: string;
    let style: CSSProperties;
    let columnVal: string | undefined;
    if (column?.key === 'name') {
      columnVal = item?.name ?? '';
    } else if (column?.key === 'idpId') {
      columnVal = item?.name ?? '';
    }

    if (column?.key === 'members') {
      if (item?.members === 0) {
        tooltip = '0 Users are assigned to this IdP';
        style = {
          color: ThemeStore.userTheme.colors.neutralTertiary,
        };
      } else {
        if (item?.members === 1) {
          tooltip = '1 Users are assigned to this IdP';
        } else {
          tooltip = `${item?.members} Users are assigned to this IdP`;
        }
        style = {
          color: ThemeStore.userTheme.colors.themePrimary,
          cursor: 'pointer',
        };
      }
      return (
        <TooltipHost content={tooltip}>
          <People20Filled
            style={style}
          />
          <span style={{ position: 'relative', bottom: '4px' }}>&nbsp;( {item?.members} )</span>
        </TooltipHost>
      )
    }

    return (
      <>
        {column?.key === 'name' && (
        <>
        &nbsp;
          <ButtonLink>
            {columnVal}
          </ButtonLink>
        </>
        )}
        {column?.key === 'idpId' && (
        <Text>{columnVal}</Text>
        )}
      </>
    );
  };

  const renderBody = () => {
    if (isLoadingIdentityProviders) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Convention List" />
        </Spacing>
      );
    }

    if (!nodes?.length) {
      return (
        <EmptyState
          title="No identity Providers found"
          description="There are no configured Identity Providers for this Organization"
        />
      )
    }

    return (
      <DetailsList
        items={nodes ?? []}
        columns={columns}
        onRenderItemColumn={onRenderItemColumn}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
      />
    );
  }

  return (
    <LayoutDashboard id="SingleSignOne" menuOptionSelected={ROUTE_SSO_CONFIG.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Single_Config" title="Single Sign On" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            {renderBody()}
          </Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};
