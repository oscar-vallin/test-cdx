import PropTypes from 'prop-types';

import { PieChart, Pie, Cell, Label } from 'recharts';

const COLORS = ['#0088FE', '#D0D0D0', '#FFAAAA', '#AADD00', '#EEAA00', '#DDCCFF', '#00AAAA'];

const ChartDonut = ({ id = '__ChartDonut', label, size = 50, data }) => {
  const _data = data;

  return (
    <PieChart id={id} width={size + size * 1.1} height={size + size * 1.1}>
      <Pie
        dataKey="value"
        nameKey="name"
        data={_data}
        cx={size}
        cy={size}
        innerRadius={size / 2}
        outerRadius={size}
        fill="#D0D0D0"
        paddingAngle={0}
      >
        <Label value={label} position="center" className="label" fontSize="1rem" />;
        {_data.map((entry, index) => (
          <Cell key={index} fill={data[index % data.length].color ?? COLORS[index % COLORS.length]} />
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
