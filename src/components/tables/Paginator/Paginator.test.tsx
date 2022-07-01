import { shallow } from 'enzyme';
import { Paginator } from './index';

describe('Paginator Use Cases', () => {
  it('Previous Button Click', () => {
    let pageChosen = 0;

    const paginator = shallow(
      <Paginator
        id="__Pager"
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
        id="__Pager"
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
        id="__Pager"
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
        id="__Pager"
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
        id="__Pager"
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
        id="__Pager"
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

  it ('Default values', () => {
    const paginator = shallow(
      <Paginator
        id="__Pager"
        pagingInfo={{}}
        onPageChange={() => null}
      />
    );

    expect(paginator.html()).toBeNull();
  });
});
