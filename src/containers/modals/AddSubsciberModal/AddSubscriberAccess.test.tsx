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
        userQuickSearch: [
          {
            email: 'testone@tes.org',
            person: {
              firstNm: 'test',
              lastNm: 'one',
              sid: '8',
            },
            sid: '8',
          },
        ],
        loading: false,
      },
    },
  ],
  useCreateUserMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        createUser: {},
      },
    },
  ],
}));

describe('Add new subscriber', () => {
  it('user who have been granted access to this organization', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <AddSubscriberModal
          currentSubscribers={[{ name: 'test', email: 'test@test.org', sid: '8' }]}
          isOpen={onOpen}
          {...defaultProps}
        />
      </StoreProvider>
    );
    expect(wrapper.find('button[id="__AddSubscriber_add_button"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__AddSubscriber_cancel_button"]')).toHaveLength(1);
    wrapper.find('button[id="__AddSubscriber_add_button"]').simulate('click');

    expect(wrapper.find('input[id="Subscriber_Input-Search"]')).toHaveLength(1);
    wrapper.find('input[id="Subscriber_Input-Search"]').simulate('change', { target: { value: 'testone@test.org' } });
    expect(wrapper.find('span[id="__QuickSearch__Users"]')).toHaveLength(1);
    wrapper.find('span[id="__QuickSearch__Users"]').simulate('click');

    //Add user and close dialog
    wrapper.find('button[id="__AddSubscriber_add_button"]').simulate('click');
    expect(onOpen).toHaveBeenCalled();

    // Close the dialog
    wrapper.find('button[id="__AddSubscriber_cancel_button"]').simulate('click');
    expect(onOpen).toHaveBeenCalled();
  });
});
