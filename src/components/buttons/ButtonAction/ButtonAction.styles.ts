import styled from 'styled-components';
import { ActionButton } from '@fluentui/react';
import { IIconProps } from 'office-ui-fabric-react/lib-commonjs/Icon';
import { IconType } from 'recharts/types/component/DefaultLegendContent';
import { IImageProps } from 'office-ui-fabric-react/lib-commonjs/Image';

export const StyledButtonAction = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.themePrimary};
`;
