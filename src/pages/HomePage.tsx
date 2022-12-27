import React, { useEffect } from 'react';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';

const HomePage = () => {
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  useEffect(() => {
    ActiveDomain.setCurrentOrg(ActiveDomainStore.domainOrg.origin.orgSid);
  }, [])

  return (
    <LayoutLogin id="HomePage">
      <div>Going Home...</div>
    </LayoutLogin>
  );
};

export { HomePage };
