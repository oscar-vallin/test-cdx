import React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from './Layout.styles';
import { SEO } from '../../data/Constants';

export const Layout = ({ children = <></>, id = '', metaTitle = '', metaDescription = '' }) => {
  return (
    <Container id={`Layout__${id}`}>
      <Helmet>
        {metaTitle && <title>{`${SEO.PREFIX_TITLE} | ${metaTitle}`}</title>}
        {metaDescription && <meta name="description" content={metaDescription ?? SEO.DESCRIPTION} />}
      </Helmet>
      {children}
    </Container>
  );
};
