import { useEffect, useState } from 'react';


export const useWatchCSRFToken = () => {
  const [csrfTokenRetrieved, setCSRFTokenRetrieved] = useState(false);

  // Wait for the CSRF Token to be retrieved and set first
  useEffect(() => {
    const csrfTokenNode = document.getElementById('__csrf_token');
    let observer: MutationObserver;
    if (csrfTokenNode) {
      const tokenValue = csrfTokenNode.getAttribute('content');
      if (tokenValue) {
        setCSRFTokenRetrieved(true);
      } else {
        observer = new MutationObserver(() => {
          const csrfToken = csrfTokenNode.getAttribute('content');
          if (csrfToken) {
            setCSRFTokenRetrieved(true);
          }
        });
        observer.observe(csrfTokenNode, { attributes: true });
      }
    } else {
      observer = new MutationObserver(() => {
        const csrfToken = document.getElementById('__csrf_token')?.getAttribute('content');
        if (csrfToken) {
          setCSRFTokenRetrieved(true);
        }
      })
      observer.observe(document.head, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return { csrfTokenRetrieved };
}