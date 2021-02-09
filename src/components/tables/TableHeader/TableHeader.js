import React from 'react';
import PropTypes from 'prop-types';
import { DetailsHeader } from 'office-ui-fabric-react/lib/DetailsList';
import { useHistory } from 'react-router-dom';

import {
  HeaderTable,
  StyledColumn,
  StyledRow,
  StyledMenuButton,
  StyledLink,
  StyledColumnTitle,
} from './TableHeader.styles';

const TableHeader = ({ id = '__TableHeader', header = 'default', sortLabel, onSort, onOption, ...props }) => {
  const history = useHistory();

  if ((!header || !header.type || header.type === 'default') && props) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton="Toggle selection" />;
  }

  if (header.type === 'dashboard') {
    return (
      <HeaderTable id="HeaderTable_dashboard">
        <StyledColumnTitle left center paddingLeft={12} sm={6}>
          <StyledLink onClick={() => history.push('/transmissions')}>{header.title}</StyledLink>
        </StyledColumnTitle>
        {header.buttons && (
          <StyledColumn sm={6}>
            <StyledRow noBorder>
              <StyledColumn sm={6}>
                <StyledMenuButton
                  icon="sort"
                  onClick={() => {
                    onSort();
                  }}
                >
                  {sortLabel}
                </StyledMenuButton>
              </StyledColumn>
              <StyledColumn sm={6}>
                <StyledMenuButton
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
