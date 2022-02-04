/* eslint-disable no-alert */
import { ReactElement, useState } from 'react';

import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Timeline } from 'src/components/timelines/Timeline';
import { WorkPacketStatusDetails } from 'src/data/services/graphql';

type WorkStepsTabProps = {
  packet?: WorkPacketStatusDetails;
};

const WorkStepsTab = ({ packet }: WorkStepsTabProps): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Spacing padding="normal">
      <Row>
        <Column xl={3}>
          <Timeline packet={packet} activeIndex={activeIndex} onClick={setActiveIndex} />
        </Column>
      </Row>
    </Spacing>
  );
};

export default WorkStepsTab;
