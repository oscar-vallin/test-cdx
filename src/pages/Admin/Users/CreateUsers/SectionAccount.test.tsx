import SectionAccount from './SectionAccount';

describe('Unit Test Section Account', () => {

  it('Should be defined', () => {
    expect(SectionAccount).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(SectionAccount).toMatchSnapshot();
  });
});
