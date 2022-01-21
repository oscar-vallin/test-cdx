import { useState, useEffect } from 'react';
import {
  AccessPolicyGroupForm,
  Maybe,
  NvpStr,
  Organization,
  OrgType,
  UiOption,
  useAccessPolicyGroupFormLazyQuery,
  useCreateAccessPolicyGroupMutation,
  useFindAccessPolicyGroupLazyQuery, useOrganizationQuickSearchLazyQuery,
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
  applicableOrgTypes: OrgType[];
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

export const useCreateGroupPanel = (isOpen, initialOrgSid, selectedGroupId, templateId) => {
  const [orgSid, setOrgSid] = useState(initialOrgSid);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);
  // Data sets.
  const [policies, setPolicies] = useState<UiOption[]>([]);
  const [specializations, setSpecializations] = useState<UiOption[]>([]);
  // Hooks to Fetches.
  const [apiUseAccessPolicyForm, { data, loading: loadingPolicies }] = useQueryHandler(useAccessPolicyGroupFormLazyQuery);
  const [apiCreateAccessPolicyGroup, { data: createdPolicyGroup, loading: creatingGroup }] =
    useQueryHandler(useCreateAccessPolicyGroupMutation);
  const [apiFindAccessPolicyGroup, { data: policyGroup }] = useQueryHandler(useFindAccessPolicyGroupLazyQuery);
  const [apiUpdateAccessPolicyGroup, { data: updatedPolicyGroup }] = useQueryHandler(useUpdateAccessPolicyGroupMutation);
  const [apiOrgQuickSearch, { data: orgs }] = useQueryHandler(useOrganizationQuickSearchLazyQuery);

  // State for Form Definition.
  const [accessPolicyData, setAccessPolicyData] = useState<AccessGroupState>({ ...formInitialState });
  const [accessPolicyForm, setAccessPolicyForm] = useState<AccessPolicyGroupForm | null>();
  // Constants
  //   const orgSidVariables = {variables: {orgSid}};

  // Functions
  // * Fetch All Data
  const fetchAllData = async () => {
    if (!orgSid) return;

    await apiUseAccessPolicyForm({ variables: { orgSid, templateGroupSid: templateId } });
  };

  const removeEmptyOptions = (uiOptions: Maybe<UiOption>[]): UiOption[] => {
    const cleaned: UiOption[] = [];
    uiOptions.forEach((uiOption) => {
      if (uiOption) {
        cleaned.push(uiOption);
      }
    });
    return cleaned;
  }

  const nvpStrToITag = (nvps?: NvpStr[]): ITag[] => {
    return nvps ? nvps.map((value) => ({key: value.value, name: value.name})) : [];
  };

  useEffect(() => {
    if (isOpen !== isFormOpen) setIsFormOpen(isOpen);

    if (orgSid !== initialOrgSid) setOrgSid(initialOrgSid);
  }, [isOpen, initialOrgSid]);

  useEffect(() => {
    if (isFormOpen && orgSid) {
      fetchAllData().then();
    }
  }, [isFormOpen, orgSid]);

  //
  // * Effects
  // * Component Mounted.
  useEffect(() => {}, []);

  // * When Policy Group is fetched, set the data.
  useEffect(() => {
    if (policyGroup) {
      const { findAccessPolicyGroup } = policyGroup;

      setAccessPolicyForm(findAccessPolicyGroup);
      setAccessPolicyData({
        ...accessPolicyData,
        sid: findAccessPolicyGroup?.sid,
        name: findAccessPolicyGroup?.name?.value,
        tmpl: findAccessPolicyGroup?.tmpl?.value,
        tmplUseAsIs: findAccessPolicyGroup?.tmplUseAsIs?.value,
        includeAllSubOrgs: findAccessPolicyGroup?.includeAllSubOrgs?.value,
        policySids: findAccessPolicyGroup?.policies?.value || [],
        specializationSids: findAccessPolicyGroup?.specializations?.value || [],
        includeOrgSids: findAccessPolicyGroup?.includeOrgSids?.value || [],
        excludeOrgSids: findAccessPolicyGroup?.excludeOrgSids?.value || [],
      });
    }
  }, [policyGroup]);

  // * If there iss a selected group, fetch the data for that group.
  useEffect(() => {
    if (isFormOpen && selectedGroupId) {
      apiFindAccessPolicyGroup({ variables: { policyGroupSid: selectedGroupId } });
      return;
    }

    if (isFormOpen && templateId) {
      apiUseAccessPolicyForm({ variables: { orgSid, templateGroupSid: templateId } });
    }
  }, [selectedGroupId, isFormOpen, templateId]);

  //

  useEffect(() => {
    if (isFormOpen && data && orgSid) {
      setAccessPolicyForm(data.accessPolicyGroupForm);

      const form = data.accessPolicyGroupForm;
      if (form) {
        const options = form.options;
        const policyField = form.policies;
        const policyOptions = options?.find((value) => value?.key === policyField?.options)?.values;
        if (policyOptions) {
          setPolicies(removeEmptyOptions(policyOptions));
        }
        const specializationField = form.specializations
        const specializationOptions = options?.find((value) => value?.key === specializationField?.options)?.values;
        if (specializationOptions) {
          setSpecializations(removeEmptyOptions(specializationOptions));
        }
      }

      if (templateId) {
        setAccessPolicyData({
          ...accessPolicyData,
          tmpl: data.accessPolicyGroupForm?.tmpl?.value,
          tmplUseAsIs: data.accessPolicyGroupForm?.tmplUseAsIs?.value,
          includeAllSubOrgs: data.accessPolicyGroupForm?.includeAllSubOrgs?.value,
          policySids: data.accessPolicyGroupForm?.policies?.value?.map((nvp) => (nvp.value)),
          specializationSids: data.accessPolicyGroupForm?.specializations?.value?.map((nvp) => (nvp.value)),
          includeOrgSids: nvpStrToITag(data.accessPolicyGroupForm?.includeOrgSids?.value),
          excludeOrgSids: nvpStrToITag(data.accessPolicyGroupForm?.excludeOrgSids?.value),
        });
      }
    }
  }, [data, isFormOpen]);


  useEffect(() => {
    if (createdPolicyGroup) {
      setIsFormOpen(false);
    }
  }, [createdPolicyGroup]);

  useEffect(() => {
    if (updatedPolicyGroup) {
      setIsFormOpen(false);
    }
  }, [updatedPolicyGroup]);

  const organizationTags = (): ITag[] => {
    if (orgs) {
      return orgs.organizationQuickSearch.map((item: Organization) => ({ key: item.sid, name: item.name }));
    }
    return [];
  };

  const getTextFromItem = (item) => item.name;

  const orgQuickSearch = (searchText: string) => {
    apiOrgQuickSearch({
      variables: {
        orgOwnerSid: orgSid,
        searchText: searchText,
      },
    });
  };

  const clearAccessPolicyForm = () => setAccessPolicyData({ ...formInitialState });

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
    isFormOpen,
    orgQuickSearch,
    organizationTags,
    getTextFromItem,
    clearAccessPolicyForm,
    addToAccessPolicyData,
    data,
    loadingPolicies,
    policies,
    specializations,
    accessPolicyData,
    accessPolicyForm,
    createPolicyGroup,
    updatePolicyGroup,
    creatingGroup,
    createdPolicyGroup,
    updatedPolicyGroup,
  };
};
