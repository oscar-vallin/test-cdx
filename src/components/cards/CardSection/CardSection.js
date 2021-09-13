import { PropTypes } from 'prop-types';
import { CardSection as UiFabricCardSection } from '@uifabric/react-cards';
import { Stylesheet } from './CardSection.styles';

// CardSection Fluent UI Requires Direct CardSection.
const CardSection = ({ id = '__CardSection', children, ...props }) => {
  return (
    <UiFabricCardSection id={id} style={Stylesheet.CardSection} {...props}>
      {children}
    </UiFabricCardSection>
  );
};

CardSection.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { CardSection };
