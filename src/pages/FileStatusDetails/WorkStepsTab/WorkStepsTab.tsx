/* eslint-disable no-alert */
import { ReactElement, useState } from 'react';

import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Separator } from 'src/components/separators/Separator';
import { Timeline } from 'src/components/timelines/Timeline';
import { Maybe, WorkStepStatus } from 'src/data/services/graphql';

type WorkStepsTabProps = {
  workOrderId?: string;
  steps?: Maybe<WorkStepStatus>[];
};

const WorkStepsTab = ({ workOrderId, steps }: WorkStepsTabProps): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Spacing padding="normal">
      <Row>
        <Column xl={3}>
          <Timeline workOrderId={workOrderId} items={steps} activeIndex={activeIndex} onClick={setActiveIndex} />
        </Column>
      </Row>

      <Separator />

      <Spacing margin={{ top: 'normal' }}>
        <Button
          id="__WorkStepsTabId"
          split
          onClick={() => {
            alert('Click');
            return null;
          }}
          text="Re-process file"
          variant="primary"
          menuProps={{
            items: [{ key: '__Rename_Reprocess', text: 'Rename & re-process' }],
          }}
        />
      </Spacing>
    </Spacing>
  );
};

export default WorkStepsTab;
