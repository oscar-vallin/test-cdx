import React from 'react';

import { Badge } from '../../../components/badges/Badge';
import { Button } from '../../../components/buttons/Button';
import { Card } from '../../../components/cards/Card';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { Separator } from '../../../components/separators/Separator';
import { Text } from '../../../components/typography/Text';
import { Timeline } from '../../../components/timelines/Timeline';

const STEPS = [
  { 
    active: true,
    status: 'DONE',
    content: {title: 'K2U WFR Report Processing', description: 'Completed at 10/11/20 6:00 AM'},
  },
  { 
    status: 'DONE',
    content: {title: 'Enrollment Stats', description: 'Completed at 10/11/20 6:40 AM'},
  },
  { 
    status: 'DONE',
    content: {title: 'Semantic Map', description: 'Completed at 10/11/20 7:23 AM'},
  },
  { 
    status: 'PROGRESS',
    content: {title: 'Flat File', description: 'Expected at 10/11/20 8:00 AM'},
  }
]

const WorkStepsTab = () => {
  return (
    <Spacing padding="normal">
      <Row>
        <Column xl={3}>
          <Timeline items={STEPS}/>
        </Column>

        <Column xl={9}>
          <Card elevation="smallest">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="bold">K2U WFR Report Processing</Text>
            
              <Badge variant="success" label="Complete" pill />
            </div>

            <Separator />

            <div>
              <Text variant="bold">khcm:feed: &nbsp;</Text>
              <Text>Enrollment</Text>
            </div>
    
            <div>
              <Text variant="bold">Started at: &nbsp;</Text>
              <Text>10/11/20 5:40 AM</Text>
            </div>
    
            <div>
              <Text variant="bold">Completed at: &nbsp;</Text>
              <Text>10/11/20 6:00 AM</Text>
            </div>

            <Separator />

            <div>
              <Button>Redo</Button>
            </div>
          </Card>
        </Column>
      </Row>

      <Separator />

      <Spacing margin={{ top: "normal" }}>
        <Button
          split
          onClick={() => alert('Click')}
          text="Re-process file"
          variant="primary"
          menuProps={{
            items: [{ text: 'Rename & re-process'}]
          }}
        />
      </Spacing>
    </Spacing>
  )
}

export default WorkStepsTab;