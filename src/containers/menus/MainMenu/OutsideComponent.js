import { useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyledBox } from './MainMenu.styles';

const useOutsideComponent = (ref, collapseClick, hide) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && hide === true) {
        collapseClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, hide]);
};

export const OutsideComponent = ({ id, hide, collapseClick, children }) => {
  const wrapperRef = useRef(null);
  useOutsideComponent(wrapperRef, collapseClick, hide);

  return (
    <div id={id} ref={wrapperRef} style={{ width: '100%' }}>
      {children}
    </div>
  );
};

OutsideComponent.propTypes = {
  id: PropTypes.string.isRequired,
  collapseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
