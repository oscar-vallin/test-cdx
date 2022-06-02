import { ReactElement, useState } from 'react';
import chroma from 'chroma-js';
import { PieChart, Pie, Cell, Label, Legend, Sector } from 'recharts';
import { Text } from 'src/components/typography';
import { Link } from '@fluentui/react';
import { theme } from 'src/styles/themes/theme';

export type ChartDataType = {
  key?: string;
  name: string;
  value: number;
  color?: string;
};

type ChartDonutProps = {
  id: string;
  label?: string;
  size?: number;
  data?: ChartDataType[];
  totalRecords?: number;
  onClickSlice?: (key: string) => void;
};

const COLORS = ['#0088FE', '#D0D0D0', '#FFAAAA', '#AADD00', '#EEAA00', '#DDCCFF', '#00AAAA'];

const ChartDonut = ({ id, label, size = 50, data, totalRecords, onClickSlice }: ChartDonutProps): ReactElement => {
  const total = totalRecords ?? data?.reduce((sum, current) => sum + current.value, 0);
  const totalDigits = total?.toString().length ?? 0;
  // Fix these font sizes since they are inside of the donut chart
  // they should not adjust when font size changes in the UI
  const totalFontSize = totalDigits < 6 ? '1.5em' : '1.25em';

  const [activeIndex, setActiveIndex] = useState<number>();

  const onMouseOver = (slice, index) => {
    setActiveIndex(index);
  };

  const onMouseLeave = () => {
    setActiveIndex(undefined);
  };

  const onClick = (slice) => {
    if (onClickSlice) {
      onClickSlice(slice?.key);
    }
  };

  const renderLegendText = (value: string, entry: any, index: number) => {
    return (
      <Link
        onMouseOver={() => onMouseOver(entry, index)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick(entry.payload)}
      >
        <Text size="small" variant={index === activeIndex ? 'bold' : 'normal'}>
          {value} ({entry.payload.value}/{total})
        </Text>
      </Link>
    );
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={chroma(fill).darken().saturate(2).hex()}
      />
    );
  };

  return (
    <PieChart id={id} width={size + size * 5.0} height={size + size * 1.2}>
      <Pie
        dataKey="value"
        nameKey="name"
        data={data}
        cx={size}
        cy={size}
        innerRadius={size / 2}
        outerRadius={size}
        fill="#D0D0D0"
        paddingAngle={0}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <Label value={label} position="center" className="label" fontSize="1rem" />
        {data?.map((entry, index) => (
          <Cell key={index} fill={data[index % data?.length]?.color ?? COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x={size}
        y={size}
        dx={5}
        dy={11}
        textAnchor="middle"
        fill={theme.colors.black}
        style={{ fontSize: totalFontSize }}
      >
        {total}
      </text>
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          position: 'absolute',
          left: `${size * 2.4}px`,
        }}
        formatter={renderLegendText}
      />
    </PieChart>
  );
};

export { ChartDonut };
