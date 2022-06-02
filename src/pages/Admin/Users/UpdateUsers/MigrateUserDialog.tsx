import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Dialog, DialogFooter, DialogType, ITag, Stack } from '@fluentui/react';
import { GqOperationResponse, UserAccountForm, useUserAccountFormLazyQuery } from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { Button } from 'src/components/buttons';
import { FormLabel } from 'src/components/labels/FormLabel';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { Text } from 'src/components/typography/Text';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { userOrgsQuickSearch } from 'src/hooks/useQuickSearch';
import { UseUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers/useUpdateUserPanel';
import { getSelectedAccessGroupSids } from 'src/pages/Admin/Users/UserAccountFormUtil';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { OptionRow, PaddedIcon } from 'src/components/inputs/CheckboxList/CheckboxList.styles';
import { useNotification } from 'src/hooks/useNotification';

type MigrateUserDialogType = {
  useUpdateUserPanel: UseUpdateUserPanel;
  userName: string;
  onMigrateUser: () => void;
  onCancel: () => void;
};

export const MigrateUserDialog = ({ useUpdateUserPanel, userName, onMigrateUser, onCancel }: MigrateUserDialogType) => {
  const [selectedOrgs, setSelectedOrgs] = useState<ITag[]>();
  const [selectedGroupSids, setSelectedGroupSids] = useState<string[]>(
    getSelectedAccessGroupSids(useUpdateUserPanel.userAccountForm)
  );
  const [
    callUserAccountForm,
    { data: dataUserAccountForm, loading: userAccountFormLoading, error: userAccountFormError },
  ] = useUserAccountFormLazyQuery();
  const [otherOrgForm, setOtherOrgForm] = useState<UserAccountForm | null>();
  const client = useApolloClient();
  const handleError = ErrorHandler();
  const Toast = useNotification();

  const migrateUser = () => {
    const selectedOrg = selectedOrgs && selectedOrgs.length > 0 ? selectedOrgs[0] : null;
    if (selectedOrg) {
      const orgSid = selectedOrg.key.toString();

      useUpdateUserPanel.callMigrateUser(orgSid, selectedGroupSids).then((data) => {
        if (data?.migrateUser?.response === GqOperationResponse.Success) {
          Toast.success({ text: `${userName} has been migrated to ${selectedOrg.name}` });
          onMigrateUser();
        }
      });
    }
  };

  useEffect(() => {
    handleError(userAccountFormError);
  }, [userAccountFormError]);

  useEffect(() => {
    if (selectedOrgs && selectedOrgs.length > 0) {
      const orgSid = selectedOrgs[0].key.toString();
      callUserAccountForm({
        variables: {
          orgSid,
        },
      });
    } else {
      setOtherOrgForm(undefined);
    }
  }, [callUserAccountForm, selectedOrgs]);

  useEffect(() => {
    if (dataUserAccountForm && !userAccountFormLoading) {
      const { userAccountForm } = dataUserAccountForm;
      // Prepopulate the values of the access groups with the access groups the user currently has
      if (userAccountForm?.accessPolicyGroups) {
        userAccountForm.accessPolicyGroups.value = selectedGroupSids.map((id) => {
          return { name: id, value: id };
        });
        userAccountForm.accessPolicyGroups.label = 'New Access Groups';
      }
      setOtherOrgForm(userAccountForm);
    }
  }, [dataUserAccountForm, userAccountFormLoading]);

  const renderExistingGroups = () => {
    const groupValues = useUpdateUserPanel.userAccountForm.accessPolicyGroups?.value;
    if (groupValues && groupValues.length > 0) {
      return groupValues.map((itm, index) => (
        <OptionRow key={`existing-group-${index}`}>
          <Text>
            <PaddedIcon iconName="Completed" />
            {itm.name}
          </Text>
        </OptionRow>
      ));
    }

    return <Text variant="muted">&lt;none&gt;</Text>;
  };

  const renderExistingGrants = () => {
    const { accessGrantOrgNames } = useUpdateUserPanel.userAccountForm;
    if (accessGrantOrgNames && accessGrantOrgNames.length > 0) {
      return accessGrantOrgNames.map((orgName, index) => <Text key={`orgName=${index}`}>{orgName}</Text>);
    }

    return <Text variant="muted">&lt;none&gt;</Text>;
  };

  return (
    <Dialog
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Migrate user',
      }}
      minWidth="500px"
      modalProps={{
        isBlocking: true,
      }}
      hidden={false}
      onDismiss={onCancel}
    >
      <Column lg="12">
        <FormLabel id="__OrgSearch_lbl" label={`Migrate ${userName} to:`} />
        <TagPicker
          id="__OrgSearch_Input"
          debounce={500}
          itemLimit={1}
          doSearch={(searchText) => userOrgsQuickSearch(client, handleError, searchText)}
          value={selectedOrgs}
          onChange={setSelectedOrgs}
        />
      </Column>
      {otherOrgForm && (
        <>
          <FormRow>
            <Column lg="12">
              <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="baseline" wrap style={{ width: '100%' }}>
                <Stack.Item grow={3}>
                  <FormLabel id="__ExistingGroups_lbl" label="Existing Access Groups" />
                  {renderExistingGroups()}
                </Stack.Item>
                <Stack.Item grow={3}>
                  <FormLabel id="__ExistingGrants_lbl" label="Granted Access to" />
                  {renderExistingGrants()}
                </Stack.Item>
              </Stack>
            </Column>
          </FormRow>
          <AccessManagementWizardBody form={otherOrgForm} saveOptions={setSelectedGroupSids} />
        </>
      )}
      <DialogFooter>
        <Button
          variant="primary"
          text={useUpdateUserPanel.migrateUserCmd?.label}
          disabled={selectedOrgs?.length !== 1}
          onClick={migrateUser}
        />
        <Button variant="secondary" text="Cancel" onClick={onCancel} />
      </DialogFooter>
    </Dialog>
  );
};
