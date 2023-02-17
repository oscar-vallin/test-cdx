import { mountWithTheme } from 'src/utils/testUtils';
import { QualifierBadge } from 'src/components/badges/Qualifier/QualifierBadge';


describe('Qualifier Badge', () => {
  it('Prod Badge', () => {
    const wrapper = mountWithTheme(
      <QualifierBadge filenameQualifier="PW-ADP-PROD" coreFilename="PW-ADP"/>
    );
    expect(wrapper.find('div').prop('color')).toEqual('blue');
    expect(wrapper.find('div').text()).toEqual('PROD')
  });

  it('Test Badge', () => {
    const wrapper = mountWithTheme(
      <QualifierBadge filenameQualifier="PW-ADP-TEST-OE" coreFilename="PW-ADP"/>
    );
    expect(wrapper.find('div').prop('color')).toEqual('orange');
    expect(wrapper.find('div').text()).toEqual('TEST-OE')
  });

  it('Empty Qualifier', () => {
    const wrapper = mountWithTheme(
      <QualifierBadge filenameQualifier="" coreFilename="PW-ADP"/>
    );
    expect(wrapper.find('div').prop('color')).toEqual('blue');
    expect(wrapper.find('div').text()).toEqual('ALL')
  });

  it('All Environments Qualifier', () => {
    const wrapper = mountWithTheme(
      <QualifierBadge filenameQualifier="PW-ADP-${Env}" coreFilename="PW-ADP"/>
    );
    expect(wrapper.find('div').prop('color')).toEqual('blue');
    expect(wrapper.find('div').text()).toEqual('ALL')
  });

  it('Absolute position', () => {
    const wrapper = mountWithTheme(
      <QualifierBadge
        filenameQualifier="TEST"
        absolute
      />
    );
    expect(wrapper.find('div').prop('color')).toEqual('orange');
    expect(wrapper.find('div').text()).toEqual('TEST')
  });
});
