const handle = (err) => {
  if (err === 'SESSION_EXPIRED') {
    // Toast + redirect to login

    return;
  }

  // Generic Toast
};

const useErrorHandler = () => {
  return {
    handle,
  };
};

export default useErrorHandler;
