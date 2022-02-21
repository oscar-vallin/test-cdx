import { shallow } from 'enzyme';
import SectionAccount from './SectionAccount';
import { GqOperationResponse } from 'src/data/services/graphql';

const infoAccess = {
  exchangeReaderAll: false,
  exchangeAdminVendor: false,
  userAdminAllOrgs: false,
  userAdminSubOrgs: false,
  setExchangeReaderAll: false,
  setExchangeAdminVendor: false,
  setUserAdminAllOrgs: false,
  setUserAdminSubOrgs: false,
};

const defaultProps = {
  form: {
    organization: {
      value: '',
      label: 'Organization',
      required: true,
      visible: true,
    },
    response: GqOperationResponse.Success,
  },
  data: { infoAccess },
  onNext: jest.fn(),
  saveOptions: jest.fn(),
};

describe('Unit Test Section Account', () => {
  const tree = shallow(<SectionAccount {...defaultProps} />);

  it('Should be defined', () => {
    expect(SectionAccount).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(SectionAccount).toMatchSnapshot();
  });
});
