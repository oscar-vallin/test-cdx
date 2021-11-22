import { shallow } from 'enzyme';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { defaultProps, CardDashboard as Component } from './CardDashboard';

const testProps = {
  id: '__Transmissions__Billing_Units',
  title: 'Transmissions',
  subtitle: 'Billing Units.',
  value: 50,
  total: 100,
  color: '#219653',
  noDataLabel: 'No Transmissions',
  loading: false,
};

describe('CardBoard Container - Testing Unit...', () => {
  const mockFn = jest.fn();
  const testComponent = shallowWithTheme(<Component {...testProps} id={testProps.id} />);
  const defaultComponent = shallowWithTheme(<Component {...defaultProps} id={defaultProps.id} />);
  const mountedComponent = mountWithTheme(<Component />);

  it('Should be defined', () => {
    expect(testComponent).toBeDefined();
    expect(defaultComponent).toBeDefined();
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(testComponent.children()).toMatchSnapshot();
    expect(defaultComponent.children()).toMatchSnapshot();
    expect(mountedComponent.children()).toMatchSnapshot();
  });

  it('Test Props Component, Should have a props', () => {
    expect(testComponent.children().props().id).toEqual(testProps.id);
    expect(testComponent.children().props().color).toEqual(testProps.color);
    expect(testComponent.children().props().loading).toBeFalsy();
    expect(testComponent.children().props().noDataLabel).toEqual(testProps.noDataLabel);
    expect(testComponent.children().props().title).toEqual(testProps.title);
    expect(testComponent.children().props().subtitle).toEqual(testProps.subtitle);
    expect(testComponent.children().props().value).toEqual(testProps.value);
    expect(testComponent.children().props().total).toEqual(testProps.total);
  });

  it('Default Props Component, Should have a props', () => {
    expect(defaultComponent.children().props().id).toEqual(defaultProps.id);
    expect(defaultComponent.children().props().color).toEqual(defaultProps.color);
    expect(defaultComponent.children().props().loading).toBeFalsy();
    expect(defaultComponent.children().props().noDataLabel).toEqual(defaultProps.noDataLabel);
    expect(defaultComponent.children().props().title).toEqual(defaultProps.title);
    expect(defaultComponent.children().props().subtitle).toEqual(defaultProps.subtitle);
    expect(defaultComponent.children().props().value).toEqual(defaultProps.value);
    expect(defaultComponent.children().props().total).toEqual(defaultProps.total);
  });

  it('No Props Component, Should have a props', () => {
    expect(mountedComponent.children().props().id).toEqual(defaultProps.id);
    expect(mountedComponent.children().props().color).toEqual(defaultProps.color);
    expect(mountedComponent.children().props().loading).toBeFalsy();
    expect(mountedComponent.children().props().noDataLabel).toEqual(defaultProps.noDataLabel);
    expect(mountedComponent.children().props().title).toEqual(defaultProps.title);
    expect(mountedComponent.children().props().subtitle).toEqual(defaultProps.subtitle);
    expect(mountedComponent.children().props().value).toEqual(defaultProps.value);
    expect(mountedComponent.children().props().total).toEqual(defaultProps.total);
  });
});
