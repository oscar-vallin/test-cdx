/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { useParams, useLocation, useHistory } from 'react-router-dom';
import { TABLE_NAMES } from '../../data/constants/TableConstants';

import { ROUTES, ROUTE_FILE_STATUS } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { PageHeader } from '../../containers/headers/PageHeader';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { Button } from '../../components/buttons';
import { Badge } from '../../components/badges/Badge';
import { Card } from '../../components/cards';
import { Collapse } from '../../components/collapses/Collapse';
import { Row, Column } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Spinner } from '../../components/spinners/Spinner';
import { Separator } from '../../components/separators/Separator';
import { StyledBox } from './FileStatusDetails.styles';
import { Tabs } from '../../components/tabs/Tabs';
import { Text } from '../../components/typography';

import QualityChecksTab from './QualityChecksTab/QualityChecksTab';
import WorkStepsTab from './WorkStepsTab/WorkStepsTab';
import EnrollmentStatsTab from './EnrollmentStatsTab/EnrollmentStatsTab';
import VendorCountStatsTab from './VendorCountStatsTab/VendorCountStatsTab';

import { useRefresh } from '../../hooks/useRefresh';
import { useFsDetailsPacketStatus } from './hooks/useFsDetailsPacketStatus';
import { useFsPacketStatusDetails } from './hooks/useFsPacketStatusDetails';

const getReadableDate = (date) => new Date(date).toLocaleString().replace(',', '');

const _FileStatusDetailsPage = () => {
  const { id }: any = useParams();
  const [packet, setPacket]: any = useState({});
  const { hash, search } = useLocation();
  const filter = new URLSearchParams(search).get('filter');
  const realId = id.replace('*', '');
  const history: any = useHistory();

  const { fSPacketStatusQuery, apiData: list, loadingFs: lWorkPacketStatus }: any = useFsDetailsPacketStatus();
  const { enableRefresh, disableRefresh } = useRefresh(TABLE_NAMES.FILE_STATUS_DETAIL_ENROLLMENT, fSPacketStatusQuery);

  const {
    fSPacketStatusDetailQuery,
    apiData: query,
    loadingPacketDetail: lWorkPacketDetails,
  }: any = useFsPacketStatusDetails(realId);

  const breadcrumbItems = [
    {
      ...ROUTE_FILE_STATUS,
      URL: filter && filter !== 'undefined' ? `${ROUTE_FILE_STATUS.URL}?filter=${filter}` : ROUTE_FILE_STATUS.URL,
    },
    { ID: 'work-packet-details', TITLE: 'File Status Details' },
  ];

  const tabs = ['#enrollment', '#vendor', '#work', '#quality'];

  const selectedTab = tabs.indexOf(hash);

  useEffect(() => {
    history.replace({
      hash: hash || tabs[0],
      search: search || undefined,
    });
  }, []);

  useEffect(() => {
    if (list && query) {
      const _packet = list.workPacketStatuses.nodes.find((item) => item.workOrderId === realId);

      setPacket({
        ..._packet,
        supplementalFiles: (query.workPacketStatusDetails.workStepStatus || [])
          .map(({ stepFile }) => stepFile)
          .reduce((arr, item) => [...arr, ...item], []),
      });
    }
  }, [list, query]);

  useEffect(() => {
    const condition = packet.packetStatus === '0' || packet.packetStatus === '1' || packet.packetStatus === '4';
    enableRefresh(condition);
  }, []);

  useEffect(() => {
    fSPacketStatusQuery();

    return function unmount() {
      disableRefresh();
    };
  }, []);

  useEffect(() => {
    fSPacketStatusDetailQuery();
  }, [packet.step, packet.stepStatus, packet.packetStatus]);

  const changeUrlHash = (_hash) => {
    history.replace({
      _hash,
    });
  };

  return (
    <LayoutDashboard id="PageFileStatusDetails" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <PageHeader spacing="primary">
        <Breadcrumb items={breadcrumbItems} />
      </PageHeader>

      <StyledBox>
        <Row>
          <Column xl={3} xxl={2}>
            <Card elevation="smallest">
              <Spacing padding={{ left: 'small' }}>
                <Row>
                  <Column centerV={lWorkPacketDetails || lWorkPacketStatus}>
                    {lWorkPacketDetails || lWorkPacketStatus ? (
                      <Spinner style={{ justifySelf: 'center' }} />
                    ) : (
                      <>
                        <h3
                          title={packet.inboundFilename}
                          style={{
                            fontWeight: 400,
                            margin: '0 0 15px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                          }}
                        >
                          {packet.inboundFilename}
                        </h3>

                        <Spacing margin={{ bottom: 'normal' }}>
                          <div style={{ display: 'flex' }}>
                            {/* TODO: parse stepStatus and billing units */}
                            <Badge variant="success" label="Complete" pill /> &nbsp;
                            <Badge variant="info" label="Billing Units: 1735" pill />
                          </div>
                        </Spacing>

                        <div>
                          <Spacing margin={{ top: 'small', bottom: 'small' }}>
                            <Text variant="muted">{getReadableDate(packet.timestamp)}</Text>
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
                              <Text breakWord="all">{query.workPacketStatusDetails.deliveredFile?.filename}</Text>
                            </div>

                            <div>
                              <Text variant="bold">Delivered at: &nbsp;</Text>
                              <Text>{getReadableDate(query.workPacketStatusDetails.deliveredFile?.timeDelivered)}</Text>
                            </div>

                            <div>
                              <Text variant="bold">Size: &nbsp;</Text>
                              <Text>
                                {query.workPacketStatusDetails.deliveredFile?.fileSizeInBytes} bytes (without
                                encryption)
                              </Text>
                            </div>
                          </div>

                          <div>
                            <Spacing margin={{ top: 'normal' }}>
                              <Text variant="muted">FTP details</Text>
                            </Spacing>

                            <div>
                              <Text variant="bold">Protocol: &nbsp;</Text>
                              <Text>{query.workPacketStatusDetails.deliveredFile?.ftp.protocol}</Text>
                            </div>

                            {query.workPacketStatusDetails.deliveredFile?.ftp.port && (
                              <div>
                                <Text variant="bold">Port: &nbsp;</Text>
                                <Text>{query.workPacketStatusDetails.deliveredFile?.ftp.port}</Text>
                              </div>
                            )}

                            <div>
                              <Text variant="bold">User: &nbsp;</Text>
                              <Text>{query.workPacketStatusDetails.deliveredFile?.ftp.username}</Text>
                            </div>

                            <div>
                              <Text variant="bold">Host: &nbsp;</Text>
                              <Text>{query.workPacketStatusDetails.deliveredFile?.ftp.host}</Text>
                            </div>

                            <div>
                              <Text variant="bold">Folder: &nbsp;</Text>
                              <Text>{query.workPacketStatusDetails.deliveredFile?.ftp.folder}</Text>
                            </div>
                          </div>

                          <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                            <Separator />
                          </Spacing>

                          <Spacing margin={{ bottom: 'small' }}>
                            <Button id="__FileStatusDetailsPageId" variant="primary" block onClick={() => null}>
                              Re-transmit over FTP
                            </Button>
                          </Spacing>

                          <Button id="__FileStatusDetailsPageId" variant="danger" block onClick={() => null}>
                            Delete
                          </Button>
                        </Collapse>
                      </>
                    )}
                  </Column>
                </Row>
              </Spacing>
            </Card>

            <br />

            <Card elevation="smallest">
              {lWorkPacketDetails || lWorkPacketStatus ? (
                <Spinner style={{ justifySelf: 'center' }} />
              ) : (
                <>
                  <Spacing margin={{ bottom: 'small' }}>
                    <Text variant="bold">Archives</Text>
                  </Spacing>

                  <Card elevation="smallest" onClick={() => window.open(packet.clientFileArchivePath)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{packet.clientFileArchivePath?.split('/').pop()}</Text>
                      <Badge variant="success" label="Client file" pill />
                    </div>
                  </Card>

                  <Card elevation="smallest" onClick={() => window.open(packet.vendorFileArchivePath)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{packet.vendorFileArchivePath?.split('/').pop()}</Text>
                      <Badge variant="info" label="Vendor file" pill />
                    </div>
                  </Card>

                  {(packet.supplementalFiles || []).length > 0 && (
                    <Collapse label="View all files">
                      {packet.supplementalFiles.map(({ value }, index) => (
                        <Spacing key={index} margin={{ top: 'normal' }}>
                          <Card elevation="smallest" onClick={() => window.open(value)}>
                            <Text>{value.split('/').pop()}</Text>
                          </Card>
                        </Spacing>
                      ))}
                    </Collapse>
                  )}
                </>
              )}
            </Card>
          </Column>
          <Column xl={9} xxl={10}>
            <Card elevation="smallest" spacing={!lWorkPacketDetails && !lWorkPacketStatus ? 'none' : 'normal'}>
              {lWorkPacketDetails || lWorkPacketStatus ? (
                <Spinner style={{ justifySelf: 'center' }} />
              ) : (
                <>
                  <Row>
                    <Column>
                      <Tabs
                        items={[
                          {
                            title: 'Enrollment Stats',
                            content: <EnrollmentStatsTab items={query.workPacketStatusDetails.enrollmentStats} />,
                            hash: '#enrollment',
                          },
                          {
                            title: 'Vendor Count Stats',
                            content: <VendorCountStatsTab items={query.workPacketStatusDetails.outboundRecordCounts} />,
                            hash: '#vendor',
                          },
                          {
                            title: 'Work Steps',
                            content: <WorkStepsTab steps={query.workPacketStatusDetails.workStepStatus} />,
                            hash: '#work',
                          },
                          {
                            title: 'Quality Checks',
                            content: (
                              <QualityChecksTab
                                items={query.workPacketStatusDetails.qualityChecks?.sequenceCreationEvent || []}
                              />
                            ),
                            badge: {
                              variant: 'severe',
                              label: query.workPacketStatusDetails.qualityChecks?.sequenceCreationEvent.length || '0',
                            },
                            hash: '#quality',
                          },
                        ]}
                        selectedKey={selectedTab < 0 ? '0' : selectedTab.toString()}
                        onClickTab={(_hash) => changeUrlHash(_hash)}
                      />
                    </Column>
                  </Row>
                </>
              )}
            </Card>
          </Column>
        </Row>
      </StyledBox>
    </LayoutDashboard>
  );
};

const FileStatusDetailsPage = React.memo(_FileStatusDetailsPage);

export { FileStatusDetailsPage };
