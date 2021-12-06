import PropTypes from 'prop-types';
import { DetailsHeader } from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { getDates } from '../../../helpers/tableHelpers.service';

import {
  HeaderTable,
  StyledColumn,
  StyledRow,
  StyledMenuButton,
  StyledLink,
  StyledColumnTitle,
} from './TableHeader.styles';

const TableHeader = ({ id, header = {}, sortLabel, onSort, onOption, date, ...props }) => {
  const history = useHistory();
  if ((!header || !header.type || header.type === 'default') && props) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton="Toggle selection" />;
  }

  const formatDatesURL = 'yyyy-MM-dd';
  const startFormatted = format(getDates(date).startDate, formatDatesURL);
  const endFormatted = format(getDates(date).endDate, formatDatesURL);

  if (header.type === 'dashboard') {
    return (
      <HeaderTable id={`${id}-HeaderTable_dashboard`}>
        <StyledColumnTitle left center paddingLeft={12} sm={6}>
          <StyledLink
            onClick={() => history.push(`/transmissions?startDate=${startFormatted}&endDate=${endFormatted}`)}
          >
            {header.title}
          </StyledLink>
        </StyledColumnTitle>
        {header.buttons && (
          <StyledColumn sm={6}>
            <StyledRow noBorder>
              <StyledColumn sm={6}>
                <StyledMenuButton
                  id="__SortButton"
                  onClick={() => {
                    onSort();
                  }}
                >
                  {sortLabel}
                </StyledMenuButton>
              </StyledColumn>
              <StyledColumn sm={6}>
                <StyledMenuButton
                  id="__EyeButton"
                  icon="eye"
                  onClick={() => {
                    onOption();
                  }}
                >
                  {header.buttons[1]}
                </StyledMenuButton>
              </StyledColumn>
            </StyledRow>
          </StyledColumn>
        )}
      </HeaderTable>
    );
  }
  return null;
};

TableHeader.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

export { TableHeader };
