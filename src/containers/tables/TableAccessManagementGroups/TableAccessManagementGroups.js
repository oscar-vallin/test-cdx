import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

const TableAccessManagementGroups = ({ id, ...props }) => {
  return <Table id={`${id}`} onOption={() => null} {...props} />;
};

TableAccessManagementGroups.propTypes = {
  id: PropTypes.string,
};

export { TableAccessManagementGroups };
