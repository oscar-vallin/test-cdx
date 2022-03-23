import CDXTimeline from './Timeline';
import { mountWithTheme } from 'src/utils/testUtils';
import { WorkPacketStatusDetails, WorkStatus } from 'src/data/services/graphql';

const workPacket: WorkPacketStatusDetails = {
  timestamp: '2020-11-08T05:17:32.000',
  workOrderId: 'textWorkOrder345',
  inboundFilename: 'ABC-inbound-file.zip.pgp',
  orgSid: '1',
  packetStatus: WorkStatus.Complete,
  vendorSid: '',
  workStepStatus: [
    {
      stepStatus: WorkStatus.Complete,
      stepName: 'TEST_DONE',
      stepType: 'TEST',
      nvp: [
        { name: 'khcm:version', value: '9.00.022.333.3' },
        { name: 'khcm:feed', value: 'Census' },
        { name: 'khcm:type', value: 'Third' },
      ],
    },
    {
      stepStatus: WorkStatus.NoRecords,
      stepName: 'TEST_PROGRESS',
      stepType: 'TEST_PROGRESS',
    },
    {
      stepStatus: WorkStatus.Error,
      stepName: 'Doing Stuff',
      stepType: 'STUFF',
    },
  ],
};

const defaultProps = {
  packet: workPacket,
  activeIndex: 0,
};

describe('Timeline Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = mountWithTheme(<CDXTimeline {...defaultProps} onClick={mockFn} />);

  it('Should be defined', () => {
    expect(CDXTimeline).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should match the step title', () => {
    const title = tree.find('.title').first().text();

    expect(title).toEqual('TEST_DONE');
  });

  it('Should match the Nvp description', () => {
    var description = tree.find('.item__content--active').childAt(1).text();

    expect(description).toEqual('khcm:version:9.00.022.333.3');

    description = tree.find('.item__content--active').childAt(2).text();
    expect(description).toEqual('khcm:feed:Census');
  });

  it('Should trigger the onClick callback', () => {
    tree.find('.item').first().simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('Should highlight the active step', () => {
    const isHighlighted = tree.find('.item__content').first().hasClass('item__content--active');

    expect(isHighlighted).toEqual(true);
  });
});
