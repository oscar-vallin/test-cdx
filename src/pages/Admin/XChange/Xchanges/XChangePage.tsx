import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { 
  IColumn, 
  DetailsList, 
  Text, 
  Spinner, 
  SpinnerSize,
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
  TooltipHost,
  Stack
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_LIST } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useXchangeProfileLazyQuery } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { Link } from 'react-router-dom';

const XChangePage = () => {
    const { orgSid } = useOrgSid();

    const [xchangeProfile, { data: dataXchange, loading: loadingXchange, error: errorXchange } ] = useQueryHandler(useXchangeProfileLazyQuery);

    const [vendors, setVendors] = useState([]);
  const fetchData = () => {
    xchangeProfile({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [useOrgSid]);

  useEffect(() => {
    if (!loadingXchange && dataXchange) {
      setVendors(dataXchange.xchangeProfile.xchanges);
    }
  }, [dataXchange, loadingXchange]);

  useEffect(() => {
    console.log(vendors)
  },[vendors])

  const onRenderItemColum = (node, itemIndex, column?: IColumn) => {
    console.log(node)
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        {/* <Link>
          here
        </Link> */}
        {column?.key === 'vendorIds' && (
          <TooltipHost id="index" content="Has Xchange specific Alerts">
            <IconButton iconProps={{ iconName: 'Ringer' }} aria-describedby="index" />
          </TooltipHost>
        )}
      </Stack>
    )
  };

  // const onRenderSpecificAlert = (vendors: any) => (
  //   <TooltipHost
  //     id="index"
  //     content="Has Xchange specific Alerts"
  //   >
  //     <IconButton 
  //       iconProps={{iconName: 'Ringer'}}
  //       aria-describedby="index"
  //     />
  //   </TooltipHost>
  // )

  const onRenderAction = () => (
    <IconButton
      iconProps={{ iconName: 'Trash' }}
      title="View Org Details"
    />
  );

  const columns: IColumn[] = [
    {
      name: 'Vendor',
      key: 'vendorIds',
      fieldName: 'vendorIds',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 600,
      flexGrow: 1,
    },
    {
      name: 'Spec',
      key: 'specIds',
      fieldName: 'specIds',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Core Filename',
      key: 'coreFilename',
      fieldName: 'coreFilename',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction
    },
  ];

  const renderBody = () => {
    if (loadingXchange) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    }

    if (!vendors.length) {
      return <Text>Empty</Text>;
    }

    return (
      <DetailsList
        items={vendors}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColum}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    );
  };

  return (
    <LayoutDashboard id='PageXChangePage' menuOptionSelected={ROUTE_XCHANGE_LIST.API_ID}>
      <PageHeader id="__ActiveUsersHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Xchange Profile" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Container>
          <Row>{renderBody()}</Row>
      </Container>
    </LayoutDashboard>
  );
};

export { XChangePage };
