import { useState } from 'react';

export type UseFileStatusDetailsPanel = {
  isPanelOpen: boolean;
  showPanel: (workOrderId: string, hash: string, fsOrgSid: string) => void;
  closePanel: () => void;
  workOrderId: string;
  hash: string;
  fsOrgSid: string;
};

export const useFileStatusDetailsPanel = (): UseFileStatusDetailsPanel => {
  const [workOrderId, setWorkOrderId] = useState('');
  const [hash, setHash] = useState('');
  const [fsOrgSid, setFsOrgSid] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const showPanel = (workOrderId, fsOrgSid, hash) => {
    setWorkOrderId(workOrderId);
    setFsOrgSid(fsOrgSid);
    setHash(hash);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };
  // * Return the state of the form.
  return {
    isPanelOpen: panelOpen,
    showPanel,
    closePanel,
    workOrderId,
    hash,
    fsOrgSid,
  };
};
