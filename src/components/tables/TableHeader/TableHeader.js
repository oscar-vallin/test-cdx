import React from 'react';
import PropTypes from 'prop-types';
import { DetailsHeader } from 'office-ui-fabric-react/lib/DetailsList';
import { useHistory } from 'react-router-dom';

import { HeaderTable, StyledColumn, StyledRow, StyledMenuButton, StyledText, StyledLink } from './TableHeader.styles';

const TableHeader = ({ id = '__TableHeader', header = 'default', sortLabel, onSort, onOption, ...props }) => {
  const history = useHistory();

  console.log({ header });

  if ((!header || !header.type || header.type === 'default') && props) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton="Toggle selection" />;
  }

  if (header.type === 'dashboard') {
    return (
      <HeaderTable>
        <StyledColumn left paddingLeft={12}>
          <StyledLink onClick={() => history.push('/transmissions')}>{header.title}</StyledLink>
        </StyledColumn>
        {header.buttons && (
          <StyledColumn>
            <StyledRow>
              <StyledColumn>
                <StyledMenuButton
                  icon="sort"
                  onClick={() => {
                    onSort();
                  }}
                >
                  {sortLabel}
                </StyledMenuButton>
              </StyledColumn>
              <StyledColumn>
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
