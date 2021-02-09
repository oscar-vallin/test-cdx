import React from 'react';
import PropTypes from 'prop-types';

import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { TableBox } from './TableDashboard.styles';
import { useTable } from './TableDashboard.service';

import { Table } from '../../../components/tables/Table';
// import { Table } from '../../../components/tables/_Table';
import { getTableStructure } from '../../../data/constants/TableConstants';

const TableDashboard = ({
  id = '__TableDashboard',
  tableId = TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR,
  data,
  altData,
  loading,
}) => {
  const { tableProps } = useTable(data, tableId);
  const [specs, setSpecs] = React.useState(false);
  const [tableData, setTableData] = React.useState();

  React.useEffect(() => {
    //
  }, []);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specs]);

  React.useEffect(() => {
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
        <Table id={`${id}`} onOption={() => console.log('Table click')} {...tableProps} />
      </TableBox>

      // <Table
      //   items={tableData}
      //   structure={getTableStructure(tableId)}
      //   loading={loading}
      //   onOption={() => onChangeOption()}
      // />
    );
  }

  return <div>Loading...</div>;
};

TableDashboard.propTypes = {
  id: PropTypes.string,
};

export { TableDashboard };
