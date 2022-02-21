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
      stepStatus: 'DONE',
      stepName: 'TEST_DONE',
      stepType: 'TEST'
    },
    {
      stepStatus: 'PROGRESS',
      stepName: 'TEST_PROGRESS',
      stepType: 'TEST_PROGRESS'
    }
  ]
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

  it('Should match the step description', () => {
    const description = tree.find('.description').first().text();

    expect(description).toEqual('TEST');
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
