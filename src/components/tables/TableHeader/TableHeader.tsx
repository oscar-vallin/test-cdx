import PropTypes from 'prop-types';
import { DetailsHeader, DetailsListLayoutMode } from '@fluentui/react';
import { useHistory } from 'react-router-dom';

import {
  HeaderTable,
  StyledColumn,
  StyledColumnTitle,
  StyledLink,
  StyledMenuButton,
  StyledRow,
} from './TableHeader.styles';

const TableHeader = ({ id, header, sortLabel, onSort, onOption, ...props }) => {
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

  if (header.type === 'dashboard') {
    return (
      <HeaderTable id={`${id}-HeaderTable_dashboard`}>
        <StyledColumnTitle center paddingLeft sm={6}>
          <StyledLink onClick={() => history.push(header.url)}>{header.title}</StyledLink>
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
