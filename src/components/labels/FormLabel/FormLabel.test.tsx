import { shallow } from 'enzyme';
import { renderWithTheme } from 'src/utils/testUtils';
import { FormLabel, UIFormLabel } from './FormLabel';
import { UiField } from 'src/data/services/graphql';

const defaultProps = { label: 'Label Text' };

describe('Label Testing...', () => {
  const tree = shallow(<FormLabel {...defaultProps} />);

  it('Should be defined', () => {
    expect(FormLabel).toBeDefined();
  });

  it('Should renders children', () => {
    expect(tree.contains('Label Text')).toEqual(true);
    expect(tree.contains('FontIcon')).toEqual(false);
  });

  it('Should render info icon', () => {
    const wrapper = shallow(<FormLabel label="Foo" info="A common test word" />);
    expect(wrapper.contains('Foo')).toEqual(true);
    expect(wrapper.find('InfoIcon')).toHaveLength(1);
    expect(wrapper.find('InfoIcon').get(0).props.tooltip).toEqual('A common test word');
  });

  it('Should render error icon', () => {
    const wrapper = shallow(<FormLabel label="Foo" errorMessage="This is a required field" />);
    expect(wrapper.contains('Foo')).toEqual(true);
    expect(wrapper.find('ErrorIcon')).toHaveLength(1);
    expect(wrapper.find('ErrorIcon').get(0).props.errorMessage).toEqual('This is a required field');
  });

  it('Should render the Required styles', () => {
    const wrapped = renderWithTheme(<FormLabel {...defaultProps} id="withRequiredField" required />);
    expect(wrapped.find('Required')).toBeDefined();
  });

  it('UIFormLabel should call FormLabel', () => {
    const field: UiField = {
      label: 'Disposition',
      info: 'Shiny or not',
      required: true,
      visible: true,
      errMsg: 'You need to be more positive',
    };
    const wrapper = shallow(<UIFormLabel id="foo" uiField={field} />);
    expect(wrapper.find('FormLabel')).toHaveLength(1);
    expect(wrapper.find('FormLabel').get(0).props.label).toEqual('Disposition');
    expect(wrapper.find('FormLabel').get(0).props.info).toEqual('Shiny or not');
    expect(wrapper.find('FormLabel').get(0).props.required).toEqual(true);
    expect(wrapper.find('FormLabel').get(0).props.errorMessage).toEqual('You need to be more positive');
  });
});
