import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import {} from './TableDashboard.styles';

const TableDashboard = ({ id = '__TableDashboard', title, onTitle, sort, details, data, columns }) => {
  const _items = data.map((dataRow, i = 0) => {
    return { ...dataRow, key: i++ };
  });

  // color: "green"
  // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
  // height: 179
  // key: "item-0 Lorem ipsum dolor sit"
  // location: "Portland"
  // name: "Lorem ipsum dolor sit amet,"
  // shape: "triangle"
  // thumbnail: "//placehold.it/179x179"
  // width: 179

  return <Table id={id} items={data} />;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  levels: PropTypes.number,
};

export { TableDashboard };
