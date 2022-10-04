import { mockUseActiveDomainStore } from 'src/utils/mockActiveDomainStore';
import { mountWithTheme } from 'src/utils/testUtils';
import { OrgBreadcrumbs } from './OrgBreadcrumbs';

jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: mockUseActiveDomainStore,
}));
jest.mock('src/use-cases/ActiveDomain',() => ({
  useActiveDomainUseCase: () => ({
    setCurrentOrg: jest.fn(),
  }),
}));
jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 8,
  }),
}));

describe('Organization Breadcrumbs', () => {
  it('Breadcrumbs render three levels deep', () => {
    const wrapper = mountWithTheme(<OrgBreadcrumbs />);

    expect(wrapper.find('div[id="__OrgBreadcrumbs"]')).toHaveLength(1);
    expect(wrapper.find('button.ms-Breadcrumb-itemLink')).toHaveLength(2);
    wrapper.find('button.ms-Breadcrumb-itemLink').at(0).simulate('click');
    expect(wrapper.find('span.ms-Breadcrumb-item')).toHaveLength(1);
    expect(wrapper.find('span.ms-Breadcrumb-item').text()).toEqual('Farm Hop');
  });
});
