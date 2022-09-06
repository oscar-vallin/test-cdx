import React, { useState, useEffect } from 'react';
import { PrimaryButton } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { PageBody } from 'src/components/layouts/Column';
import {
  useExternalUsersForOrgLazyQuery, CdxWebCommandType, UserItem, WebCommand,
} from 'src/data/services/graphql';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ROUTE_EXTERNAL_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { InputText } from 'src/components/inputs/InputText';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import AddExternalUserAccessPanel from './AddExternalUser/AddExternalUsersAccessPanel';
import UpdateExternalUsersPanel from './UpdateExternalUser/UpdateExternalUsersPanel';

const ExternalUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [apiCall, { data, loading, error }] = useQueryHandler(useExternalUsersForOrgLazyQuery);
  const [users, setUsers] = useState<UserItem[]>([]);

  const [isAddExternalUserAccessPanelOpen, setIsAddExternalUserAccessPanelOpen] = useState(false);
  const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
  const [selectedUserSid, setSelectedUserSid] = useState<string>();

  const tableFilters = useTableFilters('Name, Last Name, Email, etc.');
  const [assignCmd, setAssignCmd] = useState<WebCommand | null | undefined>();

  const handleError = ErrorHandler();
  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.externalUsersForOrg?.nodes);
      setAssignCmd(
        data.externalUsersForOrg?.listPageInfo?.pageCommands?.find(
          (cmd) => cmd.commandType === CdxWebCommandType.Assign,
        ),
      );
    }

    return () => {
      setUsers([]);
      setAssignCmd(undefined);
    };
  }, [data, loading]);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilters.searchText.delayedValue]);

  useEffect(() => {
    apiCall({
      variables: {
        orgSid,
        pageableInput: tableFilters.pagingParams,
        searchText: tableFilters.searchText.delayedValue,
      },
    });
  }, [tableFilters.pagingParams]);

  const handleGrantAccessToExternalUserSuccess = () => {
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  const renderBody = () => {
    if (!users.length) {
      return (
        <EmptyState title="No external users" description="There aren't any external users in this organization" />
      );
    }
    return (
      <UsersTable
        tableFilters={tableFilters}
        users={users}
        onClickUser={(userSid) => {
          setSelectedUserSid(userSid);
          setIsUpdatePanelOpen(true);
        }}
        searchAllOrgs
        tooltips={data?.externalUsersForOrg?.toolTips}
      />
    );
  };

  const renderAssignExternalUserButton = () => {
    if (assignCmd) {
      return (
        <PrimaryButton
          id="__Assign-ExternalUser"
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
      <PageBody>
        <Container>
          {tableFilters?.searchText && (
            <Spacing margin={{ bottom: 'normal' }}>
              <Column lg="6">
                <InputText
                  id="Active_Users_Input-Search"
                  autofocus
                  disabled={false}
                  {...tableFilters.searchText}
                  label="Search"
                />
              </Column>
            </Spacing>
          )}
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>
      {isAddExternalUserAccessPanelOpen && (
        <AddExternalUserAccessPanel
          isOpen={isAddExternalUserAccessPanelOpen}
          orgSid={orgSid}
          onDismiss={() => {
            setIsAddExternalUserAccessPanelOpen(false);
          }}
          onGrantAccessToExternalUser={handleGrantAccessToExternalUserSuccess}
        />
      )}
      {isUpdatePanelOpen && (
        <UpdateExternalUsersPanel
          isOpen={isUpdatePanelOpen}
          orgSid={orgSid}
          userAccountSid={selectedUserSid}
          onDismiss={() => setIsUpdatePanelOpen(false)}
          onUpdateUser={handleGrantAccessToExternalUserSuccess}
        />
      )}
    </LayoutDashboard>
  );
};

export { ExternalUsersPage };
