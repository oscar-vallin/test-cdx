import { useState, useEffect } from 'react';
import {
  AccessPolicyGroupForm,
  Maybe,
  UiOption,
  useAccessPolicyGroupFormLazyQuery,
  useCreateAccessPolicyGroupMutation,
  useFindAccessPolicyGroupLazyQuery,
  useUpdateAccessPolicyGroupMutation,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { ITag } from '@fluentui/react';

export type AccessGroupState = {
  sid?: string;
  orgSid?: string;
  name: string;
  description: string;
  tmpl: boolean;
  tmplUseAsIs: boolean;
  applicableOrgTypes: string[];
  includeAllSubOrgs: boolean;
  policySids: string[];
  specializationSids: string[];
  includeOrgSids: ITag[];
  excludeOrgSids: ITag[];
};

export const formInitialState: AccessGroupState = {
  name: '',
  description: '',
  tmpl: false,
  tmplUseAsIs: false,
  applicableOrgTypes: [],
  includeAllSubOrgs: false,
  policySids: [],
  specializationSids: [],
  includeOrgSids: [],
  excludeOrgSids: [],
};

export const useCreateGroupPanel = (isOpen, orgSid, selectedGroupId, templateId) => {
  // Data sets.
  const [policies, setPolicies] = useState<UiOption[]>([]);
  const [specializations, setSpecializations] = useState<UiOption[]>([]);
  // Hooks to Fetches.
  const [apiUseAccessPolicyGroupForm, {
    data: accessPolicyGroupFormData,
    loading: loadingForm,
  }] = useQueryHandler(
    useAccessPolicyGroupFormLazyQuery,
  );
  const [apiCreateAccessPolicyGroup, {
    data: createAccessPolicyGroupData,
    loading: creatingGroup,
  }] = useQueryHandler(
    useCreateAccessPolicyGroupMutation,
  );
  const [apiFindAccessPolicyGroup, {
    data: findAccessPolicyGroupData,
    loading: loadingGroup,
  }] = useQueryHandler(
    useFindAccessPolicyGroupLazyQuery,
  );
  const [apiUpdateAccessPolicyGroup, { data: updateAccessPolicyGroupData }] = useQueryHandler(
    useUpdateAccessPolicyGroupMutation,
  );

  // State for Form Definition.
  const [
    accessPolicyData,
    setAccessPolicyData,
  ] = useState<AccessGroupState>({ ...formInitialState });
  const [accessPolicyForm, setAccessPolicyForm] = useState<AccessPolicyGroupForm | null>();
  // Constants
  //   const orgSidVariables = {variables: {orgSid}};

  const [loading, setLoading] = useState(true);

  // Functions
  // * Fetch All Data
  const removeEmptyOptions = (uiOptions: Maybe<UiOption>[]): UiOption[] => {
    const cleaned: UiOption[] = [];
    uiOptions.forEach((uiOption) => {
      if (uiOption) {
        cleaned.push(uiOption);
      }
    });
    return cleaned;
  };

  const uiOptionToITag = (nvps?: Maybe<UiOption>[] | null): ITag[] => {
    const tags: ITag[] = [];
    if (nvps) {
      nvps.forEach((nvp) => {
        if (nvp) {
          tags.push({
            key: nvp.value,
            name: nvp.label,
          });
        }
      });
    }
    return tags;
  };

  const updateFromForm = (form: AccessPolicyGroupForm) => {
    setAccessPolicyForm(form);
    if (form) {
      const { options } = form;
      const data: AccessGroupState = {
        sid: form.sid ?? undefined,
        orgSid: form.organization?.value ?? undefined,
        name: form.name?.value ?? '',
        description: form.description?.value ?? '',
        tmpl: form.tmpl?.value ?? false,
        tmplUseAsIs: form.tmplUseAsIs?.value ?? false,
        applicableOrgTypes: form.applicableOrgTypes?.value?.map((itm) => itm?.value ?? '') ?? [],
        includeAllSubOrgs: form.includeAllSubOrgs?.value ?? false,
        policySids: form.policies?.value?.map((itm) => itm?.value ?? '') ?? [],
        specializationSids: form.specializations?.value?.map((itm) => itm?.value ?? '') ?? [],
        includeOrgSids: uiOptionToITag(form.includeOrgSids?.value),
        excludeOrgSids: uiOptionToITag(form.excludeOrgSids?.value),
      };
      setAccessPolicyData(data);
      // console.log('Setting PolicySids')
      // console.log(data.policySids);
      const policyField = form.policies;
      const policyOptions = options?.find((value) => value?.key === policyField?.options)?.values;
      if (policyOptions) {
        setPolicies(removeEmptyOptions(policyOptions));
      }
      const specializationField = form.specializations;
      const specializationOptions = options
        ?.find((value) => value?.key === specializationField?.options)?.values;
      if (specializationOptions) {
        setSpecializations(removeEmptyOptions(specializationOptions));
      }
    }
  };

  //
  // * Effects
  // * Component Mounted.
  useEffect(() => {
    setLoading(loadingGroup || loadingForm);
  }, [loadingGroup, loadingForm]);

  // * If there is a selected group, fetch the data for that group.
  useEffect(() => {
    if (isOpen) {
      if (selectedGroupId) {
        apiFindAccessPolicyGroup({ variables: { policyGroupSid: selectedGroupId } });
      } else if (templateId) {
        apiUseAccessPolicyGroupForm({ variables: { orgSid, templateGroupSid: templateId } });
      } else {
        apiUseAccessPolicyGroupForm({ variables: { orgSid } });
      }
    }
  }, [isOpen, selectedGroupId, templateId]);

  useEffect(() => {
    if (accessPolicyGroupFormData) {
      updateFromForm(accessPolicyGroupFormData.accessPolicyGroupForm);
    }
  }, [accessPolicyGroupFormData]);

  // * When Policy Group is fetched, set the data.
  useEffect(() => {
    if (findAccessPolicyGroupData) {
      updateFromForm(findAccessPolicyGroupData.findAccessPolicyGroup);
    }
  }, [findAccessPolicyGroupData]);

  useEffect(() => {
    if (createAccessPolicyGroupData) {
      updateFromForm(createAccessPolicyGroupData.createAccessPolicyGroup);
    }
  }, [createAccessPolicyGroupData]);

  useEffect(() => {
    if (updateAccessPolicyGroupData) {
      updateFromForm(updateAccessPolicyGroupData.updateAccessPolicyGroup);
    }
  }, [updateAccessPolicyGroupData]);

  const getTextFromItem = (item) => item.name;

  const clearAccessPolicyForm = () => {
    setAccessPolicyForm(null);
    setAccessPolicyData({ ...formInitialState });
  };

  const addToAccessPolicyData = (_data) => setAccessPolicyData({ ...accessPolicyData, ..._data });

  const createPolicyGroup = async (variables) => {
    await apiCreateAccessPolicyGroup({
      variables,
    });
  };

  const updatePolicyGroup = async (variables) => {
    await apiUpdateAccessPolicyGroup({
      variables,
    });
  };

  return {
    getTextFromItem,
    clearAccessPolicyForm,
    addToAccessPolicyData,
    accessPolicyGroupFormData,
    loading,
    policies,
    specializations,
    accessPolicyData,
    accessPolicyForm,
    setAccessPolicyForm,
    createPolicyGroup,
    updatePolicyGroup,
    creatingGroup,
    createAccessPolicyGroupData,
    updateAccessPolicyGroupData,
  };
};
