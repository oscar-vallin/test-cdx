/* eslint-disable no-alert */
import { ReactElement, useState } from 'react';
import { MessageBar } from 'office-ui-fabric-react';

import { Button } from '../../../components/buttons';
import { Card } from '../../../components/cards';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { Text } from '../../../components/typography';
import { Timeline } from '../../../components/timelines/Timeline';

const parseSteps = (steps) => {
  return steps.map((step) => ({
    ...step,
    status: step.stepStatus,
    content: {
      title: step.stepName,
      description: step.stepType || '',
    },
  }));
};

const defaultProps = {
  steps: '',
};

type WorkStepsTabProps = {
  steps?: any;
} & typeof defaultProps;

const WorkStepsTab = ({ steps }: WorkStepsTabProps): ReactElement => {
  const items = parseSteps(steps);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Spacing padding="normal">
      <Row>
        <Column xl={3}>
          <Timeline items={items} activeIndex={activeIndex} onClick={setActiveIndex} />
        </Column>

        <Column xl={9}>
          <Card elevation="smallest">
            {items[activeIndex].nvp.length === 0 ? (
              <MessageBar>There are no details for this step</MessageBar>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text variant="bold">{items[activeIndex].content.title}</Text>

                  {/* TODO: Status */}
                  {/* <Badge variant="success" label="Complete" pill /> */}
                </div>

                <Separator />

                {items[activeIndex].nvp.map((item) => (
                  <div>
                    <Text variant="bold">{item.name}: &nbsp;</Text>
                    <Text>{item.value}</Text>
                  </div>
                ))}

                <Separator />

                <div>
                  <Button id="__WorkStepsTabId" variant="" onClick={() => null}>
                    Redo
                  </Button>
                </div>
              </>
            )}
          </Card>
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
            items: [{ text: 'Rename & re-process' }],
          }}
        />
      </Spacing>
    </Spacing>
  );
};

WorkStepsTab.defaultProps = defaultProps;

export default WorkStepsTab;
