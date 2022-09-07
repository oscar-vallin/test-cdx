const handle = (err) => {
  if (err === 'SESSION_EXPIRED') {
    // Toast + redirect to login
  }

  // Generic Toast
};

const useErrorHandler = () => ({
  handle,
});

export default useErrorHandler;
