import React from 'react';
import { Layout } from '../Layout';
import { Container } from './LayoutHome.styles';
import { SEO } from '../../data/Constants';

export const LayoutHome = ({ children = <></>, id = '' }) => {
  return (
    <Layout id={`HomeLayout__${id}`} metaTitle={SEO.TITLE_LOGIN}>
      <Container>{children}</Container>
    </Layout>
  );
};
