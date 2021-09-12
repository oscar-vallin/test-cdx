import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  id: PropTypes.string,
  collapseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
