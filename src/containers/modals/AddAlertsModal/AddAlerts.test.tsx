import { mountWithTheme } from 'src/utils/testUtils';
import { AddAlertsModal } from './AddAlertsModal';

const defaultProps = {
  refreshPage: (data: boolean) => {},
};

const processingAlerts = [
  {info: null, name: 'All Xchanges for ADENA', sid: '2' },
];
const schedules = [
  {info: 'Expected to run in the Test...', name: 'ADENA-Cigna-Elig', sid: '17' },
];

jest.mock('src/data/services/graphql', () => ({
  useFindAvailableAlertsLazyQuery: () => [
    jest.fn(async () => {}),
    {
      data: {
        findAvailableAlerts: {
          processingAlerts,
          schedules,
        },
      },
    },
  ],
  useSubscribeToAlertMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        response: "SUCCESS",
      }
    }
  ]
}));

describe('Add person to be notified dialog', () => {
  it('alerts who have been granted access to this organization', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
        <AddAlertsModal isOpen={onOpen} {...defaultProps}/>
    );
    
    //checkbox
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(2);
    expect(wrapper.find('input[type="checkbox"]').at(0).props().checked).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').at(1).props().checked).toBeFalsy();

    expect(wrapper.find("i[data-icon-name='ChevronDown']")).toHaveLength(2);
    wrapper.find("i[data-icon-name='ChevronDown']").at(0).simulate('click');
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
    wrapper.find("i[data-icon-name='ChevronDown']").simulate('click');
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(0);

     // Render buttons
     expect(wrapper.find('button[id="__AddAlerts_add_button"]')).toHaveLength(1);
     expect(wrapper.find('button[id="__AddAlerts_cancel_button"]')).toHaveLength(1);

    wrapper.find('button[id="__AddAlerts_add_button"]').simulate('click');
    // Close the dialog
    wrapper.find('button[id="__AddAlerts_cancel_button"]').simulate('click');
    expect(wrapper.find('Dialog').at(0).props().hidden);
  }) 
})
