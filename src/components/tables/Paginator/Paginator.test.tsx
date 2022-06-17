import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Paginator } from './index';

describe('Paginator Use Cases', () => {
  it('Should be defined', () => {
    expect(Paginator).toBeDefined();
  });

  it('Matches Snapshot', () => {
    const wrapper = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 0,
          pageSize: 100,
          totalPages: 4,
          totalElements: 322,
        }}
        onPageChange={() => null}
      />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Previous Button Click', () => {
    let pageChosen = 0;

    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 1,
          pageSize: 100,
          totalPages: 4,
          totalElements: 322,
        }}
        onPageChange={(pageNumber: number) => {
          pageChosen = pageNumber;
        }}
      />
    );
    paginator.find('CustomizedIconButton[title="Previous Page"]').simulate('click');

    expect(pageChosen).toBe(0);
  });

  it('Next Button Click', () => {
    let pageChosen = 0;

    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 1,
          pageSize: 100,
          totalPages: 4,
          totalElements: 322,
        }}
        onPageChange={(pageNumber: number) => {
          pageChosen = pageNumber;
        }}
      />
    );
    paginator.find('CustomizedIconButton[title="Next Page"]').simulate('click');

    expect(pageChosen).toBe(2);
  });

  it('Disabled Previous Button', () => {
    let pageChosen = 0;

    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 0,
          pageSize: 100,
          totalPages: 4,
          totalElements: 322,
        }}
        onPageChange={(pageNumber: number) => {
          pageChosen = pageNumber;
        }}
      />
    );
    const button = paginator.find('CustomizedIconButton[title="Previous Page"]');
    expect(button.getElements()[0].props.disabled).toBe(true);
  });

  it('Disabled Next Button', () => {
    let pageChosen = 0;

    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 3,
          pageSize: 100,
          totalPages: 4,
          totalElements: 322,
        }}
        onPageChange={(pageNumber: number) => {
          pageChosen = pageNumber;
        }}
      />
    );
    const button = paginator.find('CustomizedIconButton[title="Next Page"]');
    expect(button.getElements()[0].props.disabled).toBe(true);
  });

  it('No Paginator Rendered', () => {
    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 0,
          pageSize: 100,
          totalPages: 1,
          totalElements: 15,
        }}
        onPageChange={() => null}
      />
    );

    expect(paginator.text()).toBe('');
  });

  it('101 Items should render a paginator', () => {
    const paginator = shallow(
      <Paginator
        pagingInfo={{
          pageNumber: 0,
          pageSize: 100,
          totalPages: 2,
          totalElements: 101,
        }}
        onPageChange={() => null}
      />
    );

    const button = paginator.find('CustomizedIconButton[title="Next Page"]');
    expect(button).toHaveLength(1);
  });
});
