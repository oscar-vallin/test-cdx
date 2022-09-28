import { mount } from 'enzyme';
import { SubscriberOptionProps } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { SubscribersList } from './SubscribersList';
import { mountWithTheme } from 'src/utils/testUtils';


const items: SubscriberOptionProps[] = [
    { name: 'One', email: 'one@tes.com', sid: '1' }, 
    { name: 'Two', email: 'two@tes.com', sid: '1' }, 
    { name: 'Three', email: 'three@tes.com', sid: '1' }, 
];

describe('Subscriber List component', () => {
    it('Susbcriber List', () => {
        const list = mount(<SubscribersList totalSubscribers={jest.fn()} currentSubscribers={items} title={true}/>);
        expect(list.find('button[id="Subscriber_0"]')).toHaveLength(2);
        list.find('button[id="Subscriber_0"]').at(0).simulate('click');
        list.find('button[id="Subscriber_0"]').at(1).simulate('click');
        expect(list.find("i[data-icon-name='Trash']")).toHaveLength(3);
        expect(list.find("button[id='Remove_Subscriber_0']")).toHaveLength(1);
        list.find('button[id="Remove_Subscriber_0"]').simulate('click');
    });

    it('Subscriber List empty', () => {
        const list = mountWithTheme(<SubscribersList  totalSubscribers={jest.fn()} currentSubscribers={[]} title={false}/>);
        expect(list.find('button')).toHaveLength(0)
        expect(list.find("i[data-icon-name='Info']")).toHaveLength(0);
    });
});