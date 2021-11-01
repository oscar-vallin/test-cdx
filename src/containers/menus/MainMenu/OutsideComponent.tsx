import { ReactElement, useRef, useEffect } from 'react';

const defaultProps = {
  id: '',
  hide: false,
  children: '',
};

type OutsideComponentProps = {
  id?: string;
  hide?: boolean;
  collapseClick?: any;
  children?: any;
} & typeof defaultProps;

const useOutsideComponent = (ref: { current: any }, collapseClick: any, hide: boolean) => {
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

export const OutsideComponent = ({ id, hide, collapseClick, children }: OutsideComponentProps): ReactElement => {
  const wrapperRef = useRef<any>({ current: '' });
  useOutsideComponent(wrapperRef, collapseClick, hide);

  return (
    <div id={id} ref={wrapperRef} style={{ width: '100%' }}>
      {children}
    </div>
  );
};

OutsideComponent.defaultProps = defaultProps;
