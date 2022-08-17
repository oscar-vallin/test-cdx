import { AddSubscriberModal } from './AddSubscriberModal';
import { mountWithTheme } from '../../../utils/testUtils';
import store from 'src/store';
import { StoreProvider } from 'easy-peasy';
import { SubscriberOptionProps } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';

const defaultProps = {
    orgSid: '',
    addSubscribers: (data: SubscriberOptionProps[]) => {},
  };
  
jest.mock('src/data/services/graphql', () => ({
  useUserQuickSearchLazyQuery: () => [
    jest.fn(async () => {}),
    {
      data: {
        userQuickSearch: [],
      },
    },
  ],
  useCreateUserMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        createUser: {}
      }
    }
  ],
}));

describe('Add new subscriber', () => {
    it('create new subsciber', () => {
      const onOpen = jest.fn();
      const wrapper = mountWithTheme(
          <StoreProvider store={store}>
            <AddSubscriberModal currentSubscribers={[{name: 'test', email: 'test@test.org', sid: '8'}]} isOpen={onOpen} {...defaultProps} />
          </StoreProvider>
        );
      expect(wrapper.find('button[id="__AddSubscriber_add_button"]')).toHaveLength(1);
      expect(wrapper.find('button[id="__AddSubscriber_cancel_button"]')).toHaveLength(1); 
      wrapper.find('button[id="__AddSubscriber_add_button"]').simulate('click');

      expect(wrapper.find('input[id="Subscriber_Input-Search"]')).toHaveLength(1);
      wrapper.find('input[id="Subscriber_Input-Search"]').simulate('change', { target: { value: 'testone@test.org' } });

      expect(wrapper.find('button[id="__Add_NewAccount"]')).toHaveLength(1);
      wrapper.find('button[id="__Add_NewAccount"]').simulate('click');

      // Added new User and close panel
      wrapper.find('input[id="firstNmSubscriber"]').simulate('change', { target: { value: 'test' } });
      wrapper.find('input[id="lastNmSubscriber"]').simulate('change', { target: { value: 'one' } });
      wrapper.find('input[id="emailSubscriber"]').simulate('change', { target: { value: 'testone@test.org' } });
      wrapper.find('button[id="__AddSubscriber_add_button"]').simulate('click');
      expect(onOpen).toHaveBeenCalled();

      // Close the dialog
      wrapper.find('button[id="__AddSubscriber_cancel_button"]').simulate('click');
      expect(onOpen).toHaveBeenCalled();
        
    });
});