import React, { useState, useEffect } from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { useAmPolicyFacetsForServiceLazyQuery } from '../../../data/services/graphql';

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });

const CDXFacetCombobox = ({
  service = '',
  value = '',
  orgSid = 1,
  onChange = () => {
    return {};
  },
}) => {
  const [facets, setFacets] = useState([]);
  const [selectedKey, setSelectedKey] = useState(value);
  const [apiAmPolicyFacetsForServiceQuery, { data, loading }] = useAmPolicyFacetsForServiceLazyQuery();

  useEffect(() => {
    apiAmPolicyFacetsForServiceQuery({
      variables: { orgSid, cdxService: service },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    setFacets(data && !loading ? data.amPolicyFacetsForService : []);
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
};

export default CDXFacetCombobox;
