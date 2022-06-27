import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import {
  Environment,
  ErrorSeverity,
  WorkPacketCommandType,
  WorkPacketStatus,
  WorkStatus,
  WorkStep,
  WpProcessError,
  WpTransmission,
} from 'src/data/services/graphql';
import { mountWithTheme } from 'src/utils/testUtils';
import { useWorkPacketColumns, WorkPacketColumn } from './WorkPacketColumns';

const happyWorkPacket: WorkPacketStatus = {
  workOrderId: '2022-06-23-11111workHappy',
  archiveOnly: false,
  clientFileArchivePath: '/test/test/file.xml.zip',
  detailsPath: '/test/test/test.json',
  environment: Environment.Prod,
  feedType: '1000Byte',
  hasErrors: false,
  inboundDataSize: 28828,
  inboundDataType: 'xml',
  inboundFilename: 'ABC-DEF-PROD.xml.zip',
  orgId: 'ABC',
  orgSid: '9',
  packetStatus: WorkStatus.Complete,
  populationCount: 300,
  recordHighlightCount: 10,
  recordHighlightType: ErrorSeverity.Info,
  reprocessedBy: null,
  reprocessedOn: null,
  restartReason: null,
  step: WorkStep.TransmitFile,
  stepStatus: WorkStatus.Complete,
  supplementalFilesArchivePaths: [],
  timestamp: '2022-06-23T10:55:55-04:00',
  vendorFileArchivePath: '/prod/out/transmitted.pgp',
  vendorFilename: 'transmitted.pgp',
  vendorId: 'DEF',
  vendorSid: '11',
  version: '2.0.0',
  commands: [
    {
      commandType: WorkPacketCommandType.ViewDetails,
      label: 'View',
    },
    {
      commandType: WorkPacketCommandType.DownloadFile,
      label: 'Download',
    },
  ],
};

const errorWorkPacket: WorkPacketStatus = {
  ...happyWorkPacket,
  packetStatus: WorkStatus.Error,
  step: WorkStep.TransformExtract,
  stepStatus: WorkStatus.Error,
  recordHighlightType: ErrorSeverity.Error,
};

const listOnlyWorkPacket: WorkPacketStatus = {
  ...happyWorkPacket,
  commands: [],
};

const reprocessedWorkPacket: WorkPacketStatus = {
  ...happyWorkPacket,
  reprocessedOn: '2022-06-24T13:22:02-04:00',
  reprocessedBy: '2022-06-24-111reprocessed',
};

const happyVendorTransmission: WpTransmission = {
  workOrderId: '2022-06-23-11111workHappy',
  deliveredOn: '2022-06-23T10:55:55-04:00',
  environment: Environment.Prod,
  extractType: 'Enrollment',
  extractVersion: '1.2.0',
  id: '222',
  implementation: 'ABC-DEF-1000Byte.xml',
  inboundFilename: 'ABC-DEF-PROD.xml.zip',
  orgSid: '9',
  outboundFilename: 'transmitted.pgp',
  outboundFilesize: 55622,
  planSponsorId: 'ABC',
  specId: '1000Byte',
  totalRecords: 322,
  vendorId: 'DEF',
  vendorSid: '11',
  commands: [
    {
      commandType: WorkPacketCommandType.ViewDetails,
      label: 'View',
    },
    {
      commandType: WorkPacketCommandType.DownloadFile,
      label: 'Download',
    },
  ],
};

const listOnlyVendorTransmission: WpTransmission = {
  ...happyVendorTransmission,
  commands: [],
};

const happyProcessError: WpProcessError = {
  workOrderId: '2022-06-23-11111workHappy',
  clientFileArchivePath: '/test/test/file.xml.zip',
  environment: Environment.Prod,
  id: '222',
  inboundFilename: 'ABC-DEF-PROD.xml.zip',
  msg: 'Quality Check failure',
  orgSid: '9',
  planSponsorId: 'ABC',
  startTime: '2022-06-23T10:55:55-04:00',
  stepName: 'QC_CHECK',
  vendorId: 'DEF',
  vendorSid: '11',
  commands: [
    {
      commandType: WorkPacketCommandType.ViewDetails,
      label: 'View',
    },
    {
      commandType: WorkPacketCommandType.DownloadFile,
      label: 'Download',
    },
  ],
};

const listOnlyProcessError: WpProcessError = {
  ...happyProcessError,
  commands: [],
};

describe('Work Packet Columns Testing', () => {
  const renderColumn = (
    workPacket: WorkPacketStatus | WpTransmission | WpProcessError,
    workPacketColumn: WorkPacketColumn,
    openDetails: () => (fsOrgSid?: string | null, workOrderId?: string, tab?: string) => void
  ) => {
    const { initialColumns } = useWorkPacketColumns([workPacketColumn], openDetails);

    const columns = initialColumns();
    expect(columns).toHaveLength(1);
    const col = columns[0];
    expect(col.onRender).toBeDefined();
    if (col.onRender) {
      const cell = col.onRender(workPacket, 0, col);
      return mountWithTheme(<Router>{cell}</Router>);
    }
    return shallow(workPacket[col.key]);
  };

  it('Clickable Received On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyWorkPacket, WorkPacketColumn.TIMESTAMP, openDetails);
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('06/23/2022');
    link.simulate('click');
    expect(openDetails).toHaveBeenCalled();

    const highlightBubble = cell.find('HighlightCounter');
    expect(highlightBubble).toHaveLength(1);
    expect(highlightBubble.props().type).toEqual('INFO');
    expect(highlightBubble.text()).toEqual('10');
  });

  it('Read Only Received On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(listOnlyWorkPacket, WorkPacketColumn.TIMESTAMP, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('06/23/2022');

    const highlightBubble = cell.find('HighlightCounter');
    expect(highlightBubble).toHaveLength(1);
    expect(highlightBubble.props().type).toEqual('INFO');
    expect(highlightBubble.text()).toEqual('10');
  });

  it('Errored Received On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(errorWorkPacket, WorkPacketColumn.TIMESTAMP, openDetails);

    const highlightBubble = cell.find('HighlightCounter');
    expect(highlightBubble).toHaveLength(1);
    expect(highlightBubble.props().type).toEqual('ERROR');
    expect(highlightBubble.text()).toEqual('10');
  });

  it('Reprocessed Received On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(reprocessedWorkPacket, WorkPacketColumn.TIMESTAMP, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('06/23/2022');
  });

  it('Clickable Delivered On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyVendorTransmission, WorkPacketColumn.DATETIME, openDetails);
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('06/23/2022');
    link.simulate('click');
    expect(openDetails).toHaveBeenCalled();
  });

  it('Read Only Delivered On Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(listOnlyVendorTransmission, WorkPacketColumn.DATETIME, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('06/23/2022');
  });

  it('Clickable Start Time Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyProcessError, WorkPacketColumn.START_TIME, openDetails);
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('06/23/2022');
    link.simulate('click');
    expect(openDetails).toHaveBeenCalled();
  });

  it('Read Only Start Time Column', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(listOnlyProcessError, WorkPacketColumn.START_TIME, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('06/23/2022');
  });

  it('Complete Packet Status', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyWorkPacket, WorkPacketColumn.PACKET_STATUS, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('Complete');
  });

  it('Error Packet Status', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(errorWorkPacket, WorkPacketColumn.PACKET_STATUS, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('Error');
  });

  it('Reprocessed Packet Status', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(reprocessedWorkPacket, WorkPacketColumn.PACKET_STATUS, openDetails);
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('Reprocessed on');
    link.simulate('click');
    expect(openDetails).toHaveBeenCalled();

    expect(cell.find('Text')).toHaveLength(1);
    expect(cell.find('Text').text()).toContain('06/24/2022');
  });

  it('Work Step', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyProcessError, WorkPacketColumn.STEP, openDetails);
    expect(cell.find('StyledLinkBase')).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('QC_CHECK');
  });

  it('Complete Progress', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(happyWorkPacket, WorkPacketColumn.PROGRESS, openDetails);
    expect(cell.find('FileProgress')).toHaveLength(1);
    expect(cell.find('FileProgressBar')).toHaveLength(1);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('Complete');
  });

  it('Error Progress', () => {
    const openDetails = jest.fn();
    const cell = renderColumn(errorWorkPacket, WorkPacketColumn.PROGRESS, openDetails);
    expect(cell.find('FileProgress')).toHaveLength(1);
    expect(cell.find('FileProgressBar')).toHaveLength(1);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('Error');
  });

  it('Clickable Client File', () => {
    const cell = renderColumn(happyWorkPacket, WorkPacketColumn.CLIENT_FILE, jest.fn());
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('ABC-DEF-PROD.xml.zip');
    expect(link.props().href).toContain('/archive/download?workOrderID=2022-06-23-11111workHappy');
  });

  it('List Only Client File', () => {
    const cell = renderColumn(listOnlyWorkPacket, WorkPacketColumn.CLIENT_FILE, jest.fn());
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('ABC-DEF-PROD.xml.zip');
  });

  it('Clickable Vendor File', () => {
    const cell = renderColumn(happyWorkPacket, WorkPacketColumn.VENDOR_FILE, jest.fn());
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(1);
    expect(link.text()).toContain('transmitted.pgp');
    expect(link.props().href).toContain('/archive/download?workOrderID=2022-06-23-11111workHappy');
  });

  it('List Only Vendor File', () => {
    const cell = renderColumn(listOnlyWorkPacket, WorkPacketColumn.VENDOR_FILE, jest.fn());
    const link = cell.find('StyledLinkBase');
    expect(link).toHaveLength(0);
    expect(cell.find('span')).toHaveLength(1);
    expect(cell.find('span').text()).toContain('transmitted.pgp');
  });
});
