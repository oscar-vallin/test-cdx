import { shallow } from 'enzyme';
import SectionAccount from './SectionAccount';

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

const defaultProps = { form: '', data: { infoAccess }, onNext: () => null };

describe('Unit Test Section Account', () => {
  const tree = shallow(<SectionAccount {...defaultProps} />);

  it('Should be defined', () => {
    expect(SectionAccount).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(SectionAccount).toMatchSnapshot();
  });
});
