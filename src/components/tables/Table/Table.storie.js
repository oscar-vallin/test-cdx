import React from 'react';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/react/types-6-0';

import { Table } from './Table.js';
import { TABLE_NAMES, getTableStructure } from '../../../data/constants/TableConstants';

const testTableData = [
  { col1: 'Record 1', col2: '10' },
  { col1: 'Record 2', col2: '20' },
  { col1: 'Record 3', col2: '30' },
];

export default {
  title: 'Table',
  component: Table,
};

const Story = (args) => (
  <Table
    items={testTableData}
    structure={getTableStructure(TABLE_NAMES.TEST)}
    loading={false}
    onOption={() => console.log('Click')}
  />
);

export const Dashboard = Story.bind({});

Dashboard.args = {
  items: testTableData,
  structure: getTableStructure(TABLE_NAMES.TEST),
  loading: false,
  onOption: () => console.log('Click on Option'),
};
