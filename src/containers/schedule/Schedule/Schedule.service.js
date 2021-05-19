import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useScheduleOccurrencesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
// import { useInputValue } from '../../../hooks/useInputValue';

//
export const useScheduleItems = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { data, loading, error } = useScheduleOccurrencesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: {
        rangeStart: argDateRange.rangeStart,
        rangeEnd: argDateRange.rangeEnd,
      },
    },
  });

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      authLogout(error.message);
      history.push('/');
    }
  }, [error]);

  useEffect(() => {
    const doEffect = () => {
      const _items = data.scheduleOccurrences.nodes.map((item) => {
        return {
          datetime: item.timeScheduled,
          label: item.resource,
          status: item.schedOccurStatus,
        };
      });

      setItems(_items);
    };

    if (data) {
      return doEffect();
    }
  }, [data]);

  // * Loading Data
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return {
    items,
    error,
  };
};

const useInput = (placeholder) => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e);
  };

  return {
    value,
    onChange,
    placeholder,
  };
};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');

  return {
    startDate,
    endDate,
  };
};
