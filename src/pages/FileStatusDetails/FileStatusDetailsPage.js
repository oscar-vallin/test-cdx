import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
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
import { Spinner } from '../../components/spinners/Spinner';
import { Separator } from '../../components/separators/Separator';
import { StyledBox } from './FileStatusDetails.styles';
import { Tabs } from '../../components/tabs/Tabs';
import { Text } from '../../components/typography/Text';

import QualityChecksTab from './QualityChecksTab/QualityChecksTab';
import WorkStepsTab from './WorkStepsTab/WorkStepsTab';
import EnrollmentStatsTab from './EnrollmentStatsTab/EnrollmentStatsTab';
import VendorCountStatsTab from './VendorCountStatsTab/VendorCountStatsTab';

import { useWorkPacketStatusDetailsQuery, useWorkPacketStatusesQuery } from '../../services/graphql';

import { TableEnrollment } from '../../containers/tables/TableEnrollment';
import { TableVendorCount } from '../../containers/tables/TableVendorCount';

const breadcrumbItems = [ROUTE_FILE_STATUS, { ID: 'work-packet-details', TITLE: 'Work Packet Details' }];

const getReadableDate = date => new Date(date)
  .toLocaleString()
  .replace(',', '');

const _FileStatusDetailsPage = () => {
  const { id } = useParams();
  const [packet, setPacket] = useState({}); 

  const { data: list, lWorkPacketDetails: lWorkPacketStatus } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: 123,
    }
  });

  const { data: query, loading: lWorkPacketDetails } = useWorkPacketStatusDetailsQuery({
    variables: {
      orgSid: 123,
      workOrderId: id
    },
  });

  useEffect(() => {
    if (list && query) {
      setPacket(list.workPacketStatuses.find(item => item.workOrderId === id));
    }

  }, [list, query]);

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
                  <Column centerV={(lWorkPacketDetails || lWorkPacketStatus)}>
                    {
                      (lWorkPacketDetails || lWorkPacketStatus)
                        ? <Spinner style={{ justifySelf: 'center' }} />
                        : (
                          <Fragment>
                            <h3
                              title={packet.inboundFilename}
                              style={{
                                fontWeight: 400,
                                margin: '0 0 15px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%'
                              }}
                            >
                              {packet.inboundFilename}
                            </h3>

                            <Spacing margin={{ bottom: 'normal' }}>
                              <div style={{ display: 'flex' }}>
                                {/* TODO: parse stepStatus and billing units */ }
                                <Badge variant="success" label="Complete" pill /> &nbsp;
                                <Badge variant="info" label="Billing Units: 1735" pill />
                              </div>
                            </Spacing>

                            <div>
                              <Spacing margin={{ top: 'small', bottom: 'small' }}>
                                <Text variant="muted">
                                  {getReadableDate(packet.timestamp)}
                                </Text>
                              </Spacing>

                              <div>
                                <Text variant="bold">Vendor: &nbsp;</Text>
                                <Text>{packet.vendorId}</Text>
                              </div>

                              <div>
                                <Text variant="bold">Plan Sponsor: &nbsp;</Text>
                                <Text>{packet.planSponsorId}</Text>
                              </div>
                            </div>

                            <Collapse label="View details">
                              <div>
                                <Spacing margin={{ top: 'normal', bottom: 'small' }}>
                                  <Text variant="muted">Delivered Vendor File Details</Text>
                                </Spacing>

                                <div>
                                  <Text variant="bold">Filename: &nbsp;</Text> <br />
                                  <Text breakWord="all">
                                    {query.workPacketStatusDetails.deliveredFile.filename}
                                  </Text>
                                </div>

                                <div>
                                  <Text variant="bold">Delivered at: &nbsp;</Text>
                                  <Text>{
                                    getReadableDate(query.workPacketStatusDetails.deliveredFile.timeDelivered)
                                  }</Text>
                                </div>

                                <div>
                                  <Text variant="bold">Size: &nbsp;</Text>
                                  <Text>{query.workPacketStatusDetails.deliveredFile.fileSizeInBytes} bytes (without encryption)</Text>
                                </div>
                              </div>

                              <div>
                                <Spacing margin={{ top: 'normal' }}>
                                  <Text variant="muted">FTP details</Text>
                                </Spacing>

                                <div>
                                  <Text variant="bold">Protocol: &nbsp;</Text>
                                  <Text>{query.workPacketStatusDetails.deliveredFile.ftp.protocol}</Text>
                                </div>

                                {query.workPacketStatusDetails.deliveredFile.ftp.port && (
                                  <div>
                                    <Text variant="bold">Port: &nbsp;</Text>
                                    <Text>{query.workPacketStatusDetails.deliveredFile.ftp.port}</Text>
                                  </div>
                                )}

                                <div>
                                  <Text variant="bold">User: &nbsp;</Text>
                                  <Text>{query.workPacketStatusDetails.deliveredFile.ftp.username}</Text>
                                </div>

                                <div>
                                  <Text variant="bold">Host: &nbsp;</Text>
                                  <Text>{query.workPacketStatusDetails.deliveredFile.ftp.host}</Text>
                                </div>

                                <div>
                                  <Text variant="bold">Folder: &nbsp;</Text>
                                  <Text>{query.workPacketStatusDetails.deliveredFile.ftp.folder}</Text>
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
                          </Fragment>
                        )
                    }
                  </Column>
                </Row>
              </Spacing>
            </Card>

            <br />

            <Card elevation="smallest">
              {
                (lWorkPacketDetails || lWorkPacketStatus)
                  ? <Spinner style={{ justifySelf: 'center' }} />
                  : (
                    <Fragment>
                      <Spacing margin={{ bottom: 'small' }}>
                        <Text variant="bold">Archives</Text>
                      </Spacing>

                      <Card elevation="smallest" onClick={() => window.open(packet.clientFileArchivePath)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text>{packet.inboundFilename}</Text>
                          <Badge variant="success" label="Client file" pill />
                        </div>
                      </Card>

                      <Card elevation="smallest" onClick={() => window.open(packet.vendorFileArchivePath)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text>??</Text>
                          <Badge variant="info" label="Vendor file" pill />
                        </div>
                      </Card>

                      {packet.supplementalFilesArchivePaths && (
                        <Collapse label="View all files">
                          <Spacing margin={{ top: 'normal' }}>
                            <Card elevation="smallest">
                              <Text>??</Text>
                            </Card>
                          </Spacing>

                          <Spacing margin={{ top: 'normal' }}>
                            <Card elevation="smallest">
                              <Text>??</Text>
                            </Card>
                          </Spacing>

                          <Spacing margin={{ top: 'normal' }}>
                            <Card elevation="smallest">
                              <Text>??</Text>
                            </Card>
                          </Spacing>

                          <Spacing margin={{ top: 'normal' }}>
                            <Card elevation="smallest">
                              <Text>??</Text>
                            </Card>
                          </Spacing>
                        </Collapse>
                      )}
                    </Fragment>
                  )
              }
            </Card>
          </Column>
          <Column xl={9} xxl={10}>
            <Card elevation="smallest" spacing={!(lWorkPacketDetails || lWorkPacketStatus) && 'none'}>
              {
                (lWorkPacketDetails || lWorkPacketStatus)
                  ? <Spinner style={{ justifySelf: 'center' }} />
                  : (
                      <Fragment>
                        <Row>
                          <Column>
                            <Tabs
                              items={[
                                {
                                  title: 'Enrollment Stats',
                                  content: <EnrollmentStatsTab />,
                                },
                                {
                                  title: 'Vendor Count Stats',
                                  content: <VendorCountStatsTab />,
                                },
                                {
                                  title: 'Work Steps',
                                  content: <WorkStepsTab />,
                                },
                                {
                                  title: 'Quality Checks',
                                  content: <QualityChecksTab />,
                                  badge: {
                                    variant: 'severe',
                                    label: '5',
                                  },
                                },
                              ]}
                            />
                          </Column>
                        </Row>
                      </Fragment>
                    )
              }
            </Card>
          </Column>
        </Row>
      </StyledBox>
    </LayoutDashboard>
  );
};

const FileStatusDetailsPage = React.memo(_FileStatusDetailsPage);

export { FileStatusDetailsPage };
