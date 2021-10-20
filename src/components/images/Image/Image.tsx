import PropTypes from 'prop-types';
import { StyledImage } from './Image.styles';

import imgLogo from '../../../assets/images/known2u-logo.png';

const images = {
  logo: imgLogo,
};

const Image = ({ id, name, src, alt }) => {
  const _src = images[name] ?? src;

  return <StyledImage id={id} src={_src} alt={alt} />;
};

Image.propTypes = {
  id: PropTypes.string,
};

export { Image };
