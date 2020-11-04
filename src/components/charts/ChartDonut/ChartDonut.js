import React from 'react';
import PropTypes from 'prop-types';

import { PieChart, Pie, Cell, Label } from 'recharts';

const COLORS = ['#0088FE', '#D0D0D0', '#FFBB28', '#FF8042'];

const ChartDonut = ({ id = '__ChartDonut', label, size = 50 }) => {
  const _data = [
    { name: 'Group A', value: 25 },
    { name: 'Group B', value: 75 },
  ];

  return (
    <PieChart width={size + size * 1.1} height={size + size * 1.1}>
      <Pie data={_data} cx={size} cy={size} innerRadius={size / 2} outerRadius={size} fill="#D0D0D0" paddingAngle={0}>
        <Label value={label} position="center" className="label" fontSize={`${16}px`} />;
        {_data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

ChartDonut.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
};

export { ChartDonut };
