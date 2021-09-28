import { shallow } from 'enzyme';
import { ButtonText } from './index';

describe('ButtonText', () => {
  it('Test styled ButtonText component', () => {
    const wrapper = shallow(
      <ButtonText>
        <div className="children" />
      </ButtonText>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
