import { PanelType } from '@fluentui/react';
import { useEffect } from 'react';
import { useXchangeJobGroupFormLazyQuery } from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ThemedPanel } from 'src/layouts/Panels/Panels.styles';

type JobGroupPorps = {
  isPanelOpen: boolean;
  closePanel: (data: boolean) => void;
};

const JobGroupsPanel = ({ isPanelOpen, closePanel }: JobGroupPorps) => {
  const { orgSid } = useOrgSid();
  const [
    jobGroupForm, { data: jobGroupFormData, loading: isLoadingForm },
  ] = useXchangeJobGroupFormLazyQuery();
  const fetchdata = () => {
    jobGroupForm({
      variables: {
        orgSid,
      },
    });
  }

  useEffect(() => {
    if (isPanelOpen) {
      fetchdata();
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isLoadingForm && jobGroupFormData) {
        console.log(jobGroupFormData)
    }
  }, [jobGroupFormData, isLoadingForm]);

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      headerText="Job Groups"
      isOpen={isPanelOpen}
      onDismiss={() => {
        closePanel(false);
      }}
    >
      job groups
    </ThemedPanel>
  )
};

export { JobGroupsPanel };
