import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'src/components/tables';
import { TableBox } from './TableDashboard.styles';
import { useTable } from './TableDashboard.service';

type TableDashboardType = {
  id: string;
  data: any;
  altData: any;
  date: string;
  loading: boolean;
  title: string;
  titleRedirectPage: string;
  sortButtons?: string[];
  fromDate?: Date;
  toDate?: Date;
  emptyMessage: string;
};

const TableDashboard = ({
  id,
  data,
  altData,
  date,
  loading,
  title,
  titleRedirectPage = 'file-status',
  sortButtons,
  fromDate = new Date(),
  toDate = new Date(),
  emptyMessage,
}: TableDashboardType) => {
  const { tableProps, specs, setSpecs } = useTable(data, loading, date, altData);

  const [, setTableData] = useState();

  const getNoData = () => {
    return [{ vendor: 'No data', bus: '...' }];
  };

  const getTable = () => {
    if (data) {
      return data.map((item) => {
        return { vendor: item.name, bus: `${item.count}/${item.total}` };
      });
    }

    return getNoData();
  };

  const getAltTable = () => {
    if (altData) {
      return altData.map((item) => {
        return { vendor: item.name, specs: item.secondaryDescr, bus: `${item.count}/${item.total}` };
      });
    }

    return getNoData();
  };

  useEffect(() => {
    const val = specs ? getAltTable() : getTable();

    if (specs)
      if (altData) {
        setTableData(val);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specs]);

  useEffect(() => {
    if (data) {
      const NewTableData = getTable();
      setTableData(NewTableData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onChangeOption = () => {
    setSpecs(!specs);
  };
  if (tableProps) {
    return (
      <TableBox id={`${id}`}>
        <Table
          id={`${id}`}
          titleRedirectPage={titleRedirectPage}
          date={date}
          fromDate={fromDate}
          toDate={toDate}
          onOption={onChangeOption}
          title={title}
          emptyMessage={emptyMessage}
          sortButtons={sortButtons}
          {...tableProps}
        />
      </TableBox>
    );
  }

  return <div>Loading...</div>;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
};

export { TableDashboard };
export default TableDashboard;
