import React from 'react';
import { Layout } from '../Layout';
import { Container } from './LayoutLogin.styles';
import { SEO } from '../../data/Constants';

export const LayoutLogin = ({ children = <></>, id = '' }) => {
  return (
    <Layout id={`LoginLayout__${id}`} metaTitle={SEO.TITLE_LOGIN}>
      <Container>{children}</Container>
    </Layout>
  );
};
