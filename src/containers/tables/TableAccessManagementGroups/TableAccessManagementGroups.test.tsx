import { TableAccessManagementGroups } from './TableAccessManagementGroups';
import { shallowWithTheme } from '../../../utils/testUtils';
import { shallow } from 'enzyme';

const defaultProps = {
  id: 'TableAccessManagementGroupsId',
};

describe('Badge Testing Unit...', () => {
  const tree = shallowWithTheme(<TableAccessManagementGroups {...defaultProps}></TableAccessManagementGroups>);

  it('Should be defined', () => {
    expect(TableAccessManagementGroups).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should find table with Id TableAccessManagementGroupsId', () => {
    const wrapper = shallow(<TableAccessManagementGroups {...defaultProps}></TableAccessManagementGroups>);
    wrapper.find('Table[id="TableAccessManagementGroupsId"]');
    expect(wrapper).toMatchSnapshot();
  });
});
