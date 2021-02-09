//
export const formatField = (value, columnId, text, sublabel, child) => {
  return {
    id: columnId,
    value,
    columnId,
    text,
    sublabel,
    child,
  };
};
