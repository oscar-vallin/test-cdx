import React from 'react';
import { StyleConstants } from 'src/data/constants/StyleConstants';

import {
  LoadingFrame,
  LoadingHeader,
  AppHeaderContainer,
} from 'src/pages/Loading/LoadingPage.styles';

const _LoadingPage = () => {
  return (
    <LoadingFrame id='__LoadingFrame' direction={ StyleConstants.DIRECTION_COLUMN } top={true}>
      <AppHeaderContainer>
        <LoadingHeader/>
      </AppHeaderContainer>
    </LoadingFrame>
  );
}

const LoadingPage = React.memo(_LoadingPage)

export { LoadingPage }