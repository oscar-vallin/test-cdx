import { mountWithTheme } from 'src/utils/testUtils';
import { ScheduleDay } from './ScheduleDay';
import { UseFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel';
import { SchedOccurStatusEnum, ScheduleOccurrence, WorkPacketCommandType } from 'src/data/services/graphql';

const mockShowPanel = jest.fn();
const detailsPanel: UseFileStatusDetailsPanel = {
  workOrderId: '2020-11-01-asdfsdfsdfsd2222',
  hash: '',
  closePanel: jest.fn(),
  fsOrgSid: '6',
  isPanelOpen: false,
  setHash: jest.fn(),
  showPanel: mockShowPanel,
};

const currentDate = new Date(2022, 4, 11);
const selectedDate = new Date(2022, 4, 1);

const items: ScheduleOccurrence[] = [
  {
    resource: 'K2UDEMO-EyeMed-TEST',
    scheduleId: null,
    orgSid: '6',
    timeScheduled: '2022-05-01T14:13:26-04:00',
    schedOccurStatus: SchedOccurStatusEnum.Errored,
    schedOccurStatusLabel: 'Errored',
    runOccurrences: [
      {
        workOrderId: '2022-05-01-141326918xxl101',
        timeRan: '2022-05-01T14:13:26-04:00',
        status: SchedOccurStatusEnum.ExchangeHeld,
        statusLabel: 'Held',
        commands: [
          {
            label: 'View',
            commandType: WorkPacketCommandType.ViewDetails,
          },
          {
            label: 'Download',
            commandType: WorkPacketCommandType.DownloadFile,
          },
        ],
      },
      {
        workOrderId: '2022-05-01-1605016567u1b01',
        timeRan: '2022-05-01T16:05:01-04:00',
        status: SchedOccurStatusEnum.Errored,
        statusLabel: 'Errored',
        commands: [
          {
            label: 'View',
            commandType: WorkPacketCommandType.ViewDetails,
          },
          {
            label: 'Download',
            commandType: WorkPacketCommandType.DownloadFile,
          },
        ],
      },
      {
        workOrderId: '2022-05-01-18265293f00b01',
        timeRan: '2022-05-01T18:26:52-04:00',
        status: SchedOccurStatusEnum.Errored,
        statusLabel: 'Errored',
        commands: [
          {
            label: 'View',
            commandType: WorkPacketCommandType.ViewDetails,
          },
          {
            label: 'Download',
            commandType: WorkPacketCommandType.DownloadFile,
          },
        ],
      },
    ],
  },
  {
    resource: 'K2UDEMO-EyeMed-UAT',
    scheduleId: null,
    orgSid: '6',
    timeScheduled: '2022-05-01T14:13:54-04:00',
    schedOccurStatus: SchedOccurStatusEnum.RanNotScheduled,
    schedOccurStatusLabel: 'Ran (not scheduled)',
    runOccurrences: [],
  },
];

describe('Schedule Day Container...', () => {
  it('Render Occurrences', () => {
    const wrapper = mountWithTheme(
      <ScheduleDay
        currentDate={currentDate}
        selectedDate={selectedDate}
        items={items}
        useFileStatusDetailsPanel={detailsPanel}
      />
    );
    expect(wrapper.find('div[id="__DayRow"]')).toHaveLength(1);
    // All hours should be rendered
    for (let i = 0; i < 24; i++) {
      expect(wrapper.find(`div[id="__DayBodyRow_${i}"]`)).toHaveLength(1);
    }

    // Occurrences should be rendered on the calendar
    expect(wrapper.find('div[id="__Occurrence_2022-05-01-141326918xxl101"]')).toHaveLength(1);
    expect(wrapper.find('div[id="__Occurrence_2022-05-01-18265293f00b01"]')).toHaveLength(1);

    // Clicking on an occurrence should open up the calendar
    wrapper.find('div[id="__Occurrence_2022-05-01-141326918xxl101"]').simulate('click');
    expect(mockShowPanel).toHaveBeenCalled();
  });

  it('Empty Day', () => {
    const wrapper = mountWithTheme(
      <ScheduleDay
        currentDate={currentDate}
        selectedDate={selectedDate}
        items={[]}
        useFileStatusDetailsPanel={detailsPanel}
      />
    );
    expect(wrapper.find('div[id="__DayRow"]')).toHaveLength(1);
    // All hours should be rendered
    for (let i = 0; i < 24; i++) {
      expect(wrapper.find(`div[id="__DayBodyRow_${i}"]`)).toHaveLength(1);
    }

    // No Occurrences should be rendered on the calendar
    expect(wrapper.find('div[id*="__Occurrence"]')).toHaveLength(0);
  });
});
