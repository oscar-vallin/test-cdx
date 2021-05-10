import React, { useState, useEffect } from 'react';
import { useAmPolicyVerbForFacetQuery } from '../../../data/services/graphql';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });

const CDXVerbCombobox = ({ service = '', facet = '', value = '', orgSid = 1, onChange = () => {} }) => {
  const [verbs, setVerbs] = useState([]);
  const [selectedKey, setSelectedKey] = useState(value);
  const { data, loading } = useAmPolicyVerbForFacetQuery({
    variables: { orgSid, cdxService: service, cdxFacet: facet },
  });
  
  useEffect(() => {
    setVerbs(data && !loading
      ? data.amPolicyVerbForFacet
      : []
    );
  }, [service, facet, data, loading]);

  return (
    <ComboBox
      autoComplete="off"
      selectedKey={selectedKey}
      options={verbs.map(parseToComboBoxOption)}
      onChange={(event, item) => {
        setSelectedKey(item.key);

        onChange(event, item);
      }}
      style={{ width: '100%' }}
    />
  );
}

export default CDXVerbCombobox;