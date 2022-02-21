import PropTypes from 'prop-types';
import { DetailsHeader, DetailsListLayoutMode } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { getDates } from 'src/helpers/tableHelpers.service';

import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  HeaderTable,
  StyledColumn,
  StyledColumnTitle,
  StyledLink,
  StyledMenuButton,
  StyledRow,
} from './TableHeader.styles';
import { yyyyMMdd } from 'src/utils/CDXUtils';

const TableHeader = ({ id, header, sortLabel, onSort, onOption, date, ...props }) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  if ((!header || !header.type || header.type === 'default') && props) {
    return (
      <DetailsHeader
        layoutMode={DetailsListLayoutMode.justified}
        {...props}
        ariaLabelForToggleAllGroupsButton="Toggle selection"
      />
    );
  }

  const startFormatted = yyyyMMdd(getDates(date).startDate);
  const endFormatted = yyyyMMdd(getDates(date).endDate);

  if (header.type === 'dashboard') {
    return (
      <HeaderTable id={`${id}-HeaderTable_dashboard`}>
        <StyledColumnTitle center paddingLeft sm={6}>
          <StyledLink
            onClick={() =>
              history.push(`/transmissions?startDate=${startFormatted}&endDate=${endFormatted}&orgSid=${orgSid}`)
            }
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
