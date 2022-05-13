import Component from './TableActivity';
import { shallowWithTheme } from 'src/utils/testUtils';
import { OrganizationLink } from 'src/data/services/graphql';

const items: OrganizationLink[] = [
  {
    id: '1',
    name: 'Client 1',
    activityTime: '2019-01-01T00:00:00.000Z',
    orgId: '1',
  },
];

const defaultProps = {
  id: '',
  tableName: 'Test Table',
  items: items,
  loading: false,
  onClick: (orgSid: string) => {},
};

describe('Table Activity Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });
});
