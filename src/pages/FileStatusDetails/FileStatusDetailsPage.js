import React from 'react';
import { ROUTES, ROUTE_FILE_STATUS } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/badges/Badge';
import { Card } from '../../components/cards/Card';
import { Collapse } from '../../components/collapses/Collapse';
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Separator } from '../../components/separators/Separator';
import { StyledBox } from './FileStatusDetails.styles';
import { Tabs } from '../../components/tabs/Tabs';
import { Text } from '../../components/typography/Text';

import EnrollmentStatsTab from './EnrollmentStatsTab/EnrollmentStatsTab';
import VendorCountStatsTab from './VendorCountStatsTab/VendorCountStatsTab';
import QualityChecksTab from './QualityChecksTab/QualityChecksTab';
import WorkStepsTab from './WorkStepsTab/WorkStepsTab';

import { TableEnrollment } from '../../containers/tables/TableEnrollment';

const breadcrumbItems = [ROUTE_FILE_STATUS, { ID: 'work-packet-details', TITLE: 'Work Packet Details' }];

const _FileStatusDetailsPage = () => {
  return (
    <LayoutDashboard id="PageFileStatusDetails" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <PageHeader>
        <Breadcrumb items={breadcrumbItems} />
      </PageHeader>

      <StyledBox>
        <Row>
          <Column xl={3} xxl={2}>
            <Card elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <Row>
                  <Column>
                    <h3 style={{ fontWeight: 400, margin: '0 0 15px' }}>TRMND-Cigna-KNTU.csv </h3>

                    <Spacing margin={{ bottom: 'normal' }}>
                      <div style={{ display: 'flex' }}>
                        <Badge variant="success" label="Complete" pill /> &nbsp;
                        <Badge variant="info" label="Billing Units: 1735" pill />
                      </div>
                    </Spacing>

                    <div>
                      <Spacing margin={{ top: 'small', bottom: 'small' }}>
                        <Text variant="muted">Received at 10/11/20 7:13 AM</Text>
                      </Spacing>

                      <div>
                        <Text variant="bold">Vendor: &nbsp;</Text>
                        <Text>Cigna</Text>
                      </div>

                      <div>
                        <Text variant="bold">Plan Sponsor: &nbsp;</Text>
                        <Text>TRMND</Text>
                      </div>
                    </div>

                    <Collapse label="View details">
                      <div>
                        <Spacing margin={{ top: 'normal', bottom: 'small' }}>
                          <Text variant="muted">Delivered Vendor File Details</Text>
                        </Spacing>

                        <div>
                          <Text variant="bold">Filename: &nbsp;</Text> <br />
                          <Text breakWord="all">ATPC_DISHNETWORKCORPORATION_028577120201011.txt</Text>
                        </div>

                        <div>
                          <Text variant="bold">Delivered at: &nbsp;</Text>
                          <Text>10/11/2020 7:19:50 AM</Text>
                        </div>

                        <div>
                          <Text variant="bold">Size: &nbsp;</Text>
                          <Text>337934 bytes (without encryption)</Text>
                        </div>
                      </div>

                      <div>
                        <Spacing margin={{ top: 'normal' }}>
                          <Text variant="muted">FTP details</Text>
                        </Spacing>

                        <div>
                          <Text variant="bold">Protocol: &nbsp;</Text>
                          <Text>sftp</Text>
                        </div>

                        <div>
                          <Text variant="bold">User: &nbsp;</Text>
                          <Text>dishnet</Text>
                        </div>

                        <div>
                          <Text variant="bold">Host: &nbsp;</Text>
                          <Text>ftp.genseltran.com</Text>
                        </div>

                        <div>
                          <Text variant="bold">Folder: &nbsp;</Text>
                          <Text>/to_selman</Text>
                        </div>
                      </div>

                      <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                        <Separator />
                      </Spacing>

                      <Spacing margin={{ bottom: 'small' }}>
                        <Button variant="primary" block>
                          Re-transmit over FTP
                        </Button>
                      </Spacing>

                      <Button variant="danger" block>
                        Delete
                      </Button>
                    </Collapse>
                  </Column>
                </Row>
              </Spacing>
            </Card>

            <br />

            <Card elevation="smallest">
              <Spacing margin={{ bottom: 'small' }}>
                <Text variant="bold">Archives</Text>
              </Spacing>

              <Card elevation="smallest">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Filename.csv</Text>
                  <Badge variant="success" label="Client file" pill />
                </div>
              </Card>

              <Card elevation="smallest">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Filename.csv</Text>
                  <Badge variant="info" label="Vendor file" pill />
                </div>
              </Card>

              <Collapse label="View all files">
                <Spacing margin={{ top: 'normal' }}>
                  <Card elevation="smallest">
                    <Text>Filename.csv</Text>
                  </Card>
                </Spacing>

                <Spacing margin={{ top: 'normal' }}>
                  <Card elevation="smallest">
                    <Text>Filename.csv</Text>
                  </Card>
                </Spacing>

                <Spacing margin={{ top: 'normal' }}>
                  <Card elevation="smallest">
                    <Text>Filename.csv</Text>
                  </Card>
                </Spacing>

                <Spacing margin={{ top: 'normal' }}>
                  <Card elevation="smallest">
                    <Text>Filename.csv</Text>
                  </Card>
                </Spacing>
              </Collapse>
            </Card>
          </Column>
          <Column xl={9} xxl={10}>
            <Card elevation="smallest" spacing="none">
              <Row>
                <Column>
                  <Tabs
                    items={[
                      {
                        title: 'Enrollment Stats',
                        content: <TableEnrollment />,
                      },
                      {
                        title: 'Vendor Count Stats',
                        content: <VendorCountStatsTab />,
                      },
                      {
                        title: 'Work Steps',
                        content: <WorkStepsTab />,
                        badge: {
                          variant: 'severe',
                          label: '5',
                        },
                      },
                      {
                        title: 'Quality Checks',
                        content: <QualityChecksTab />,
                      },
                    ]}
                  />
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </StyledBox>
    </LayoutDashboard>
  );
};

const FileStatusDetailsPage = React.memo(_FileStatusDetailsPage);

export { FileStatusDetailsPage };
