import PropTypes from 'prop-types';
import { DetailsHeader, DetailsListLayoutMode } from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { getDates } from 'src/helpers/tableHelpers.service';

import {
  HeaderTable,
  StyledColumn,
  StyledColumnTitle,
  StyledLink,
  StyledMenuButton,
  StyledRow,
} from './TableHeader.styles';
import { useOrgSid } from "src/hooks/useOrgSid";

const TableHeader = ({ id, header, sortLabel, onSort, onOption, date, ...props }) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  if ((!header || !header.type || header.type === 'default') && props) {
    return <DetailsHeader layoutMode={DetailsListLayoutMode.justified} {...props} ariaLabelForToggleAllGroupsButton="Toggle selection" />;
  }

  const formatDatesURL = 'yyyy-MM-dd';
  const startFormatted = format(getDates(date).startDate, formatDatesURL);
  const endFormatted = format(getDates(date).endDate, formatDatesURL);

  if (header.type === 'dashboard') {
    return (
      <HeaderTable id={`${id}-HeaderTable_dashboard`}>
        <StyledColumnTitle center paddingLeft={true} sm={6}>
          <StyledLink
            onClick={() => history.push(`/transmissions?startDate=${startFormatted}&endDate=${endFormatted}&orgSid=${orgSid}`)}
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
                  icon="sort"
                  onClick={() => {
                    onSort();
                    return null;
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
                    return null;
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
