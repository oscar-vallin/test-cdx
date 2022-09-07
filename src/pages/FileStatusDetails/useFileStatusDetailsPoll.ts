import { useWorkPacketStatusPollQuery, WorkStatus } from 'src/data/services/graphql';
import { useEffect, useState } from 'react';
import { ErrorHandler } from 'src/utils/ErrorHandler';

const POLL_INTERVAL = 20000;

const POLLING_STATUSES: WorkStatus[] = [WorkStatus.Submitted, WorkStatus.Queued, WorkStatus.Processing];

type PollResult = {
  dataUpdated: boolean;
  stopPolling: () => void;
};

export const useFileStatusDetailsPoll = (
  orgSid?: string,
  workOrderId?: string,
  workStatus?: WorkStatus,
): PollResult => {
  const [dataUpdated, setDataUpdated] = useState(false);
  const handleError = ErrorHandler();
  const [lastUpdatedPoll, setLastUpdatedPoll] = useState<Date>(new Date());
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (!orgSid || !workOrderId || !workStatus) {
      setSkip(true);
    } else if (!POLLING_STATUSES.includes(workStatus)) {
      // Only poll when in specific statuses
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, [orgSid, workOrderId, workStatus]);
  //

  const pollWPStatus = useWorkPacketStatusPollQuery({
    variables: {
      orgSid: orgSid ?? '',
      workOrderId: workOrderId ?? '',
      lastUpdated: lastUpdatedPoll,
    },
    skip,
    pollInterval: POLL_INTERVAL,
  });

  // useEffect(() => {
  //   if (!orgSid || !workOrderId || !workStatus) {
  //     pollWPStatus.stopPolling();
  //   } else if (!POLLING_STATUSES.includes(workStatus)) {
  //     // Only poll when in specific statuses
  //     pollWPStatus.stopPolling();
  //   }
  // }, [orgSid, workOrderId, workStatus]);

  const stopPolling = () => {
    pollWPStatus.stopPolling();
  };

  useEffect(() => {
    handleError(pollWPStatus.error);
  }, [handleError, pollWPStatus.error]);

  useEffect(() => {
    if (
      !pollWPStatus.loading
      && pollWPStatus.data?.workPacketStatusPoll
      && pollWPStatus.data.workPacketStatusPoll > 0
    ) {
      setDataUpdated(true);
      setLastUpdatedPoll(new Date());
    } else {
      setDataUpdated(false);
    }
  }, [pollWPStatus.loading, pollWPStatus.data]);

  return {
    dataUpdated,
    stopPolling,
  };
};
