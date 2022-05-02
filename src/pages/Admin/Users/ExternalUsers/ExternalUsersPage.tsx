import React, { useState, useEffect } from 'react';
import { Dialog, DialogType, DialogFooter, SpinnerSize, PrimaryButton, DefaultButton, Spinner } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { useExternalUsersForOrgLazyQuery, SortDirection, CdxWebCommandType} from 'src/data/services/graphql';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { StyledColumn } from './ExternalUsersPage.styles';
import { ROUTE_EXTERNAL_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { InputText } from 'src/components/inputs/InputText';
import AddExternalUserAccessPanel  from './AddExternalUser/AddExternalUsersAccessPanel';
import { useUpdateExternalUsersService } from './UpdateExternalUser/UpdateExternalUsersService.service';
import UpdateExternalUsersPanel from './UpdateExternalUser/UpdateExternalUsersPanel';

const ExternalUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [ apiCall, { data, loading, error }] = useQueryHandler(useExternalUsersForOrgLazyQuery);
  const [ isAddExternalUserAccessPanelOpen, setIsAddExternalUserAccessPanelOpen] = useState(false);
  const useUpdateExternalUsers = useUpdateExternalUsersService(orgSid);

  const tableFilters = useTableFilters('Name, Last Name, Email, etc.');
  const assignCmd = data?.externalUsersForOrg?.listPageInfo?.pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.Assign);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ tableFilters.searchText.delayedValue ]);

  useEffect(() => {
    apiCall({
      variables: { 
        orgSid,
        pageableInput: tableFilters.pagingParams,
        searchText: tableFilters.searchText.delayedValue
      }
    });
  }, [tableFilters.pagingParams]);

  const handleGrantAccessToExternalUserSuccess = ()=>{
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  }

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading external users" />
        </Spacing>
      );
    }
    if (!data?.externalUsersForOrg?.nodes?.length) {
      return (
        <EmptyState title="No external users" description="There aren't any external users in this organization" />
      );
    }
    return <UsersTable             
              tableFilters={tableFilters}
              users={data?.externalUsersForOrg?.nodes} 
              onClickUser={useUpdateExternalUsers.showPanel}
              searchAllOrgs
              tooltips={data?.externalUsersForOrg?.toolTips}
           />;
  };

  const renderAssignExternalUserButton = () => {
    if (assignCmd) {
      return (
        <PrimaryButton
          id="__Assing-ExternalUser"
          iconProps={{ iconName: 'AddFriend' }}
          ariaLabel={assignCmd.label ?? undefined}
          onClick={() => {
            setIsAddExternalUserAccessPanelOpen(true);
          }}
        >
          {assignCmd.label}
        </PrimaryButton>
      );
    }
    return null;
  };

  return (
    <LayoutDashboard id="PageExternalUsers" menuOptionSelected={ROUTE_EXTERNAL_USERS.API_ID}>      
      <PageHeader id="__ExternalUsersHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="External Users" />
            </Column>
            <Column lg="6" right>
              <span>{renderAssignExternalUserButton()}</span>
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <Container>
          {tableFilters?.searchText && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Column lg="6">
                <InputText
                  id={`Active_Users_Input-Search`}
                  autofocus
                  disabled={false}
                  {...tableFilters.searchText}
                  label="Search"
                />
              </Column>
            </Spacing>
          )}
        <Row>
          <StyledColumn>{renderBody()}</StyledColumn>
        </Row>
      </Container>
        <AddExternalUserAccessPanel
          isOpen={isAddExternalUserAccessPanelOpen}
          orgSid={orgSid}
          onDismiss={()=>{setIsAddExternalUserAccessPanelOpen(false)}}
          onGrantAccessToExternalUser={handleGrantAccessToExternalUserSuccess}
        />
        <UpdateExternalUsersPanel
          useUpdateExternalUsers={useUpdateExternalUsers}
          onUpdateUser={() => {
            handleGrantAccessToExternalUserSuccess()
          }}
        />
    </LayoutDashboard>
  );
};

export { ExternalUsersPage };
