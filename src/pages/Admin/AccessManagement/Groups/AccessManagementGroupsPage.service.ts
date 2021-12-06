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
  };

  return { deleteAccessPolicyGroup, deleteData, deleteLoading, deleteError, setPolicyGroupSid };
};

// *
// * Get Groups by Sid
export const getGroupBySid = (groups, sid: string) => {
  return groups.find(({ sid: groupSid }) => groupSid === sid);
};
