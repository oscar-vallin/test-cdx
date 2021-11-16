import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

const TableAccessManagementPolicies = ({ id = 'TableAccessManagementPolicies', ...props }) => {
  return <Table id={`${id}`} onOption={() => null} {...props} />;
};

TableAccessManagementPolicies.propTypes = {
  id: PropTypes.string,
};

export { TableAccessManagementPolicies };
