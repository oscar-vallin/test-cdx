import React, { useState, useEffect } from 'react';
import { useAmPolicyFacetsForServiceQuery } from '../../../data/services/graphql';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });

const CDXFacetCombobox = ({ service = '', value = '', orgSid = 1, onChange = () => {} }) => {
  const [facets, setFacets] = useState([]);
  const [selectedKey, setSelectedKey] = useState(value);
  const { data, loading } = useAmPolicyFacetsForServiceQuery({
    variables: { orgSid, cdxService: service },
  });
  
  useEffect(() => {
    setFacets(data && !loading
      ? data.amPolicyFacetsForService
      : []
    );
  }, [service, data, loading]);

  return (
    <ComboBox
      autoComplete="off"
      selectedKey={selectedKey}
      options={facets.map(parseToComboBoxOption)}
      onChange={(event, item) => {
        setSelectedKey(item.key);

        onChange(event, item);
      }}
      style={{ width: '100%' }}
    />
  );
}

export default CDXFacetCombobox;