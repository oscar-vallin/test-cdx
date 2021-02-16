import React from 'react';

import { Button } from '../../../components/buttons/Button';
import { Card } from '../../../components/cards/Card';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { MessageBar } from '../../../components/notifications/MessageBar';
import { Separator } from '../../../components/separators/Separator';
import { TableQualityChecks } from '../../../containers/tables/TableQualityChecks';

const QualityChecksTab = () => {
  return (
    <Spacing padding="normal">
      <Spacing margin={{ bottom: 'normal' }}>
        <Row>
          <Column>
            <MessageBar type="error" content="The error count (3) is greater than the configured ceiling of  0." />
          </Column>
        </Row>
      </Spacing>

      <Row>
        <Column xl={3}>
          <Card elevation="smallest">
            <div>Chart</div>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Button variant="light" block>
              Download errors
            </Button>
          </Card>
        </Column>

        <Column xl={9}>
          <Card elevation="smallest">
            {/* <TableQualityChecks /> */}
            Table

            <Separator />

            <div>
              <Button variant="primary">Continue processing</Button> &nbsp;
              <Button
                split
                text="Cancel processing"
                onClick={() => alert('Click')}
                menuProps={{
                  items: [{ text: 'Error out', key: 'ErrorOut' }],
                }}
              >
                Cancel processing
              </Button>
            </div>
          </Card>
        </Column>
      </Row>
    </Spacing>
  );
};

export default QualityChecksTab;
