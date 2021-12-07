import { useState, useEffect } from 'react';
import {
  ActiveEnum,
  useAccessPoliciesForOrgLazyQuery,
  useAccessPolicyGroupFormLazyQuery,
  useAccessSpecializationsForOrgLazyQuery,
  useCreateAccessPolicyGroupMutation,
  useDirectOrganizationsLazyQuery,
  useFindAccessPolicyGroupLazyQuery,
  useUpdateAccessPolicyGroupMutation,
} from 'src/data/services/graphql';

export const formInitialState = {
  name: '',
  tmpl: false,
  tmplUseAsIs: false,
  includeAllSubOrgs: false,
  policySids: [],
  specializationSids: [],
  includeOrgSids: [],
  excludeOrgSids: [],
};

export const useCreateGroupPanel = (isOpen, initialOrgSid, selectedGroupId) => {
  const [orgSid, setOrgSid] = useState(initialOrgSid);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);
  // Data sets.
  const [policies, setPolicies] = useState<any>([]);
  const [specializations, setSpecializations] = useState<any>([]);
  const [organizations, setOrganizations] = useState<any>([]);
  // Hooks to Fetches.
  const [apiUseAccessPolicyForm, { data, loading: loadingPolicies }] = useAccessPolicyGroupFormLazyQuery();
  const [apiAccessPoliciesForOrg, { data: policiesData }] = useAccessPoliciesForOrgLazyQuery();
  const [apiAccessSpecializationsForOrg, { data: specializationsData }] = useAccessSpecializationsForOrgLazyQuery();
  const [apiDirectOrganizations, { data: orgsData }] = useDirectOrganizationsLazyQuery();
  const [apiCreateAccessPolicyGroup, { data: createdPolicyGroup, loading: creatingGroup }] =
    useCreateAccessPolicyGroupMutation();
  const [apiFindAccessPolicyGroup, { data: policyGroup }] = useFindAccessPolicyGroupLazyQuery();
  const [apiUpdateAccessPolicyGroup, { data: updatedPolicyGroup }] = useUpdateAccessPolicyGroupMutation();
  // State for Form Definition.
  const [accessPolicyForm, setAccessPolicyForm] = useState<any>({ ...formInitialState });
  const [accessPolicyFormRaw, setAcessPolicyFormRaw] = useState<any>({});
  // Constants
  //   const orgSidVariables = {variables: {orgSid}};

  // Functions
  // * Fetch All Data
  const fetchAllData = async () => {
    if (!orgSid) return;

    await apiUseAccessPolicyForm({ variables: { orgSid } });
    await apiAccessPoliciesForOrg({ variables: { orgSid } });
    await apiAccessSpecializationsForOrg({ variables: { orgSid } });
    await apiDirectOrganizations({
      variables: {
        orgSid,
        orgFilter: { activeFilter: ActiveEnum.Active },
      },
    });
  };

  useEffect(() => {
    if (isOpen !== isFormOpen) setIsFormOpen(isOpen);

    if (orgSid !== initialOrgSid) setOrgSid(initialOrgSid);
  }, [isOpen, initialOrgSid]);

  useEffect(() => {
    if (isFormOpen && orgSid) {
      fetchAllData();
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

      setAcessPolicyFormRaw(findAccessPolicyGroup);
      setAccessPolicyForm({
        ...accessPolicyForm,
        policyGroupSid: findAccessPolicyGroup?.sid,
        name: findAccessPolicyGroup?.name?.value,
        tmpl: findAccessPolicyGroup?.tmpl?.value,
        tmplUseAsIs: findAccessPolicyGroup?.tmplUseAsIs?.value,
        includeAllSubOrgs: findAccessPolicyGroup?.includeAllSubOrgs?.value,
        policySids: findAccessPolicyGroup?.policies?.value,
        specializationSids: findAccessPolicyGroup?.specializations?.value,
        includeOrgSids: findAccessPolicyGroup?.includeOrgSids?.value,
        excludeOrgSids: findAccessPolicyGroup?.excludeOrgSids?.value,
      });
    }
  }, [policyGroup]);

  // * If there iss a selected group, fetch the data for that group.
  useEffect(() => {
    if (isFormOpen && selectedGroupId) {
      apiFindAccessPolicyGroup({ variables: { policyGroupSid: selectedGroupId } });
    }
  }, [selectedGroupId, isFormOpen]);

  //

  useEffect(() => {
    if (isFormOpen && data && orgSid) {
      setAcessPolicyFormRaw(data.accessPolicyGroupForm);
    }
  }, [data, isFormOpen]);

  useEffect(() => {
    if (isFormOpen && policiesData) {
      setPolicies(policiesData?.accessPoliciesForOrg?.nodes);
    }
  }, [isFormOpen, policiesData]);

  useEffect(() => {
    if (isFormOpen && specializationsData && orgSid) {
      setSpecializations(specializationsData?.accessSpecializationsForOrg?.nodes);
    }
  }, [isFormOpen, specializationsData]);

  useEffect(() => {
    if (isFormOpen && orgsData && orgSid) {
      setOrganizations(orgsData?.directOrganizations?.nodes);
    }
  }, [isFormOpen, orgsData]);

  useEffect(() => {
    if (createdPolicyGroup) {
      //   onCreateGroupPolicy(createdPolicyGroup.createAccessPolicyGroup);
      //   onDismiss();
      setIsFormOpen(false);
    }
  }, [createdPolicyGroup]);

  useEffect(() => {
    if (updatedPolicyGroup) {
      //   onUpdateGroupPolicy(updatedPolicyGroup.updateAccessPolicyGroup);
      //   onDismiss();
    }
  }, [updatedPolicyGroup]);

  //
  const listContainsTagList = (tag, tagList) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const getFormData = () => {
    apiUseAccessPolicyForm();
  };

  const organizationTags = organizations.map((item: any) => ({ key: item.sid, name: item.name }));

  const filterSuggestedTags = (filterText, tagList) => {
    return filterText
      ? organizationTags.filter(
          (tag) => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList)
        )
      : [];
  };

  const getTextFromItem = (item) => item.name;

  const onIncludedOrgsSelected = (item): any => {
    setAccessPolicyForm({
      ...accessPolicyForm,
      includeOrgSids: item.map((org) => org.key),
    });
  };

  const onExcludedOrgsSelected = (item): any => {
    setAccessPolicyForm({
      ...accessPolicyForm,
      excludeOrgSids: item.map((org) => org.key),
    });
  };

  const clearAccessPolicyForm = () => setAccessPolicyForm({ ...formInitialState });

  const addToAccessPolicyForm = (_data) => setAccessPolicyForm({ ...accessPolicyForm, ..._data });

  const createPolicyGroup = async (variables) => {
    apiCreateAccessPolicyGroup({
      variables,
    });
  };

  const updatePolicyGroup = async (variables) => {
    apiUpdateAccessPolicyGroup({
      variables,
    });
  };

  return {
    isFormOpen,
    getFormData,
    organizationTags,
    filterSuggestedTags,
    getTextFromItem,
    onIncludedOrgsSelected,
    onExcludedOrgsSelected,
    clearAccessPolicyForm,
    addToAccessPolicyForm,
    data,
    loadingPolicies,
    policies,
    specializations,
    organizations,
    accessPolicyForm,
    accessPolicyFormRaw,
    createPolicyGroup,
    updatePolicyGroup,
    creatingGroup,
    createdPolicyGroup,
  };
};
