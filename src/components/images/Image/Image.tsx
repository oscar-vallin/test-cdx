import { ReactElement } from 'react';
import { StyledImage } from './Image.styles';

import imgLogo from '../../../assets/images/known2u-logo.png';

const defaultProps = {
  id: '',
  name: '',
  src: '',
  alt: '',
};

type ImageProps = {
  id?: string;
  name?: string;
  src?: string;
  alt?: string;
} & typeof defaultProps;

const images = {
  logo: imgLogo,
};

const Image = ({ id, name, src, alt }: ImageProps): ReactElement => {
  const _src = images[name] ?? src;

  return <StyledImage id={id} src={_src} alt={alt} />;
};

Image.defaultProps = defaultProps;

export { Image };
