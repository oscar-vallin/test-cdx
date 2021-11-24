import Component from './WorkPacketTable';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';
import { WorkPacketColumns } from './WorkPacketColumns';
import { SortDirection } from 'src/data/services/graphql';

const defaultProps = {
  id: '',
  cols: [
    WorkPacketColumns.TIMESTAMP,
    WorkPacketColumns.VENDOR,
    WorkPacketColumns.PLAN_SPONSOR,
    WorkPacketColumns.CLIENT_FILE,
    WorkPacketColumns.VENDOR_FILE,
  ],
  lazyQuery: null,
  getItems: [] as any,
  searchTextPlaceholder: 'Extract Name, Status, Vendor, etc.',
  defaultSort: [
    {
      property: 'timestamp',
      direction: SortDirection.Desc,
      nullHandling: null,
      ignoreCase: true,
    },
  ],
  onItemsListChange: () => {},
};

describe('Work Packet Table Container Testing Unit...', () => {
  const mountedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });
});
