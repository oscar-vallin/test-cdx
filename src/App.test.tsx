import { shallow } from 'enzyme';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'easy-peasy';
import ApplicationStore, { DEFAULT_APPLICATION_STATE } from '../src/store/ApplicationStore/ApplicationStore';

// const defaultProps = { id: 'ImageId', name: 'Image', src: '', alt: 'Alt Img' };

describe('App unit test', () => {
  const store = createStore(ApplicationStore);
  const tree = shallow(
    <Router>
      <App />
    </Router>
  );

  it('Should be defined', () => {
    expect(App).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(App).toMatchSnapshot();
  });

  it('Should update the isOffline flag', async () => {
    store.getActions().setIsOffline(false);
    store.getActions().setIsOffline(true);
    expect(store.getState().status.isOffline).toEqual(true);
  });
});
