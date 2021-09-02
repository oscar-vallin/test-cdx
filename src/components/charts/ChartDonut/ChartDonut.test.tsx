import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { mount, render, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ChartDonut as Component } from './index.js';

const defaultProps = {
  id: '__ChartDonut',
  label: 'label',
  size: 50,
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ],
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
