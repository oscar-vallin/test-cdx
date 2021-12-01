import { useState } from 'react';
import { useDeleteAccessPolicyGroupMutation } from 'src/data/services/graphql';

export const useAccessManagementGroupsPageService = () => {
  const [policyGroupSid, setPolicyGroupSid] = useState('');

  const [deleteAccessPolicyGroupMutation, { data: deleteData, loading: deleteLoading, error: deleteError }] =
    useDeleteAccessPolicyGroupMutation({
      variables: {
        policyGroupSid,
      },
    });

  const deleteAccessPolicyGroup = async (groupId: string) => {
    setPolicyGroupSid(groupId);

    await deleteAccessPolicyGroupMutation({
      variables: {
        policyGroupSid: groupId,
      },
    });

    console.log(
      '🚀 ~ file: AccessManagementGroupsPage.service.ts ~ line 8 ~ useAccessManagementGroupsPageService ~ deleteData',
      deleteData
    );
  };

  return { deleteAccessPolicyGroup, deleteData, deleteLoading, deleteError, setPolicyGroupSid };
};
