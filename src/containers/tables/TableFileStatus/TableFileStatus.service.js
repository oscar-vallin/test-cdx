import { useState, useEffect } from 'react';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
// import { STATUSES } from '../../../data/constants/'

const STATUSES = {
  0: 'Queued',
  1: 'Processing',
  2: 'Complete',
  3: 'Error',
  4: 'Submitted',
  5: 'Warning',
  6: 'Hold',
  7: 'Canceled',
  a: 'Quality Check Failed',
  b: 'No Records',
  c: 'Tech migration Check Failed',
  default: '',
};

const STEP_RECEIVE = 0;
const STEP_TRANSFORM = 1;
const STEP_TRANSMIT = 2;

const STEP_COLOR_GREEN = '#219653';
const STEP_COLOR_YELLOW = '#F2C94C';
const STEP_COLOR_NONE = 'transparent';
const STEP_COLOR_BLUE = '#2F80ED';
const STEP_COLOR_PURPLE = '#A333C8';
const STEP_COLOR_CYAN = '#56CCF2';
const STEP_COLOR_RED = '#EB5757';

const STEP_STATUS_DEFAULT = [
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_BLUE, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_CYAN, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_CYAN],
  },
];

const STEP_STATUS = [
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_RECEIVE,
    stepStatus: STATUSES[0],
    archiveOnly: false,
    colors: [STEP_COLOR_BLUE, STEP_COLOR_NONE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[1],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_PURPLE, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[6],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_YELLOW, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSFORM,
    stepStatus: STATUSES[3],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_RED, STEP_COLOR_NONE],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[2],
    archiveOnly: false,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_GREEN],
  },
  {
    step: STEP_TRANSMIT,
    stepStatus: STATUSES[2],
    archiveOnly: true,
    colors: [STEP_COLOR_GREEN, STEP_COLOR_GREEN, STEP_COLOR_BLUE],
  },
];

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS);

  const { data, loading, error } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  // * Component Did Mount
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const doEffect = () => {
      const _items = buildItems(data);
      setItems(_items);
      return _items;
    };

    console.log('Data Changes: ', data);

    if (data) {
      doEffect();
    }
  }, [data]);

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const { workPacketStatuses } = _data;

      const getFileProgress = (argStep, argStepStatus) => {
        return (
          STEP_STATUS.find((step, stepStatus) => step === argStep && stepStatus === argStepStatus) ??
          STEP_STATUS_DEFAULT.find((step) => step === argStep) ??
          STEP_STATUS_DEFAULT[0]
        );
      };

      return workPacketStatuses.map(({ timestamp, vendorId, planSponsorId, inboundFilename, step, stepStatus }) => {
        return {
          datetime: timestamp,
          vendor: vendorId,
          planSponsor: planSponsorId,
          extractName: inboundFilename,
          overall: STATUSES[stepStatus] ?? STATUSES.default,
          progress: `${step},${stepStatus}`,
        };
      });
    }
  };

  // * Loading Data
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return {
    tableProps: {
      items,
      structure,
      loading: _loading,
    },
    error,
  };
};
