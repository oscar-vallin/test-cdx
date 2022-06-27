import { mountWithTheme } from 'src/utils/testUtils';
import { ROUTE_ACTIVE_USERS } from 'src/data/constants/RouteConstants';
import { mockUseActiveDomainStore } from 'src/utils/mockActiveDomainStore';
import { LeftNav } from './LeftNav';

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 8,
  }),
}));
const mockPush = jest.fn();
jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));
jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: mockUseActiveDomainStore,
}));

describe('Left Navigation menu', () => {
  it('Rendering the menu', () => {
    const wrapper = mountWithTheme(<LeftNav isOpen={true} menuOptionSelected={ROUTE_ACTIVE_USERS.API_ID} />);

    // Expect the Mobile Navigation to render
    expect(wrapper.find('button[id="__NavTo_DASHBOARD"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_FILE_STATUS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_ARCHIVES"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_SCHEDULE"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_TRANSMISSIONS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__NavTo_ERRORS"]')).toHaveLength(1);

    // Top Level Menus should be rendered
    expect(wrapper.find('button[id="__Nav_Users"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_Access_Management"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_Tools"]')).toHaveLength(1);

    // User Menu should be expanded
    expect(wrapper.find('button[id="__Nav_ACTIVE_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_EXTERNAL_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_DELETED_USERS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_USER_AUDIT_LOGS"]')).toHaveLength(1);

    // Click on one of the top nav items
    wrapper.find('button[id="__NavTo_DASHBOARD"]').simulate('click');
    expect(mockPush).toHaveBeenCalled();

    // Click a menu option
    wrapper.find('button[id="__Nav_EXTERNAL_USERS"]').simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(2);

    // Collapse the Users menu
    wrapper.find('button[id="__Nav_Users"]').simulate('click');
    expect(wrapper.find('button[id="__Nav_ACTIVE_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_EXTERNAL_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_DELETED_USERS"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__Nav_USER_AUDIT_LOGS"]')).toHaveLength(0);

    // Expand the Access Management menu
    wrapper.find('button[id="__Nav_Access_Management"]').simulate('click');
    expect(wrapper.find('button[id="__Nav_AM_GROUPS"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_AM_POLICIES"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__Nav_AM_SPECIALIZATION"]')).toHaveLength(1);
  });
});
