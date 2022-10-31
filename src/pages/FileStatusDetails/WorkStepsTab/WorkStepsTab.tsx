/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';

import { Row, Column } from 'src/components/layouts';
import { Timeline } from 'src/components/timelines/Timeline';
import {
  GqOperationResponse,
  useWorkPacketRerunStepMutation,
  WorkPacketStatusDetails,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useNotification } from 'src/hooks/useNotification';
import { TabBody } from '../FileStatusDetails.styles';

type WorkStepsTabProps = {
  packet?: WorkPacketStatusDetails;
};

const WorkStepsTab = ({ packet }: WorkStepsTabProps): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [apiCallRerun, { data: rerunData, error: rerunError }] = useWorkPacketRerunStepMutation();
  const Toast = useNotification();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(rerunError);
  }, [rerunError]);

  useEffect(() => {
    switch (rerunData?.workPacketRerunStep?.response) {
      case GqOperationResponse.Success:
        Toast.success({ text: 'Re-running step has been requested' });
        break;
      case GqOperationResponse.PartialSuccess:
        Toast.warning({ text: rerunData?.workPacketRerunStep?.errMsg });
        break;
      case GqOperationResponse.Fail:
        Toast.error({ text: rerunData?.workPacketRerunStep?.errMsg });
        break;
      default:
        break;
    }
  }, [rerunData]);

  const onRedo = (stepName?: string | null) => {
    if (packet?.workOrderId && stepName) {
      apiCallRerun({
        variables: {
          stepName,
          workOrderId: packet?.workOrderId,
        },
      }).then();
    }
  };

  return (
    <TabBody>
      <Row>
        <Column xl={3}>
          <Timeline packet={packet} activeIndex={activeIndex} onClick={setActiveIndex} onRedo={onRedo} />
        </Column>
      </Row>
    </TabBody>
  );
};

export default WorkStepsTab;
