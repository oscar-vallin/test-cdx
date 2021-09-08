import React, { useState, useEffect } from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { useAmPolicyVerbForFacetLazyQuery } from '../../../data/services/graphql';

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });

const CDXVerbCombobox = ({
  service = '',
  facet = '',
  value = '',
  orgSid = 1,
  onChange = () => {
    return {};
  },
}) => {
  const [verbs, setVerbs] = useState([]);
  const [selectedKey, setSelectedKey] = useState(value);
  const [apiAmPolicyVerbForFacetQuery, { data, loading }] = useAmPolicyVerbForFacetLazyQuery();

  useEffect(() => {
    if (service && facet) {
      apiAmPolicyVerbForFacetQuery({
        variables: { orgSid, cdxService: service, cdxFacet: facet },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, facet]);

  useEffect(() => {
    setVerbs(data && !loading ? data.amPolicyVerbForFacet : []);
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
};

export default CDXVerbCombobox;
