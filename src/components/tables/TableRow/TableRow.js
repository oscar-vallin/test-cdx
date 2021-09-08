import PropTypes from 'prop-types';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { StyledTableRow } from './TableRow.styles';

const theme = getTheme();

const TableRow = ({ id = '__TableRow', ...props }) => {
  const customStyles = {};
  if (props) {
    if (props.itemIndex % 2 === 0) {
      // Every other row renders with a different background color
      customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
    }

    return <StyledTableRow id={id} {...props} styles={customStyles} />;
  }
  return null;
};

TableRow.propTypes = {
  id: PropTypes.string,
};

export { TableRow };
