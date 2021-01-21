import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { getTableStructure } from '../../../data/constants/TableConstants';

const TableDashboard = ({ id = '__TableDashboard', tableId = 'default', data, altData, loading }) => {
  const [specs, setSpecs] = React.useState(false);
  const [tableData, setTableData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const getNoData = () => {
    return [{ vendor: 'No Data', bus: '...' }];
  };

  const getTable = () => {
    if (data) {
      const retData = data.map((item) => {
        return { vendor: item.name, bus: `${item.count}/${item.total}` };
      });

      return retData;
    }

    return getNoData();
  };

  const getAltTable = () => {
    if (altData) {
      const retData = altData.map((item) => {
        return { vendor: item.name, specs: item.secondaryDescr, bus: `${item.count}/${item.total}` };
      });

      return retData;
    }

    return getNoData();
  };

  React.useEffect(() => {
    const val = specs ? getAltTable() : getTable();

    if (altData) {
      setTableData(val);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specs]);

  React.useEffect(() => {
    if (data) {
      const NewTableData = getTable();
      setTableData(NewTableData);
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onChangeOption = () => {
    setSpecs(!specs);
  };

  if (!isLoading && tableData) {
    return (
      <Table
        items={tableData}
        structure={getTableStructure(tableId)}
        loading={loading}
        onOption={() => onChangeOption()}
      />
    );
  }

  return <div>Loading...</div>;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
};

export { TableDashboard };
