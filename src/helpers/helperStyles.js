const classesFluent = {
  sm: "ms-sm",
  md: "ms-md",
  lg: "ms-lg",
  pushSm: "ms-smPush",
  pushMd: "ms-smPush",
  pushLg: "ms-smPush",
  pullSm: "ms-smPush",
  pullMd: "ms-smPush",
  pullLg: "ms-smPush",
  hiddenAt: "ms-hidden",
};

export const getClassNames = (initialClasses, props) => {
  const classes = [initialClasses];

  if (props.sm) classes.push(`${classesFluent.sm}${props.sm}`);
  if (props.md) classes.push(`${classesFluent.md}${props.md}`);
  if (props.lg) classes.push(`${classesFluent.lg}${props.lg}`);

  if (props.pushSm) classes.push(`${classesFluent.pushSm}${props.pushSm}`);
  if (props.pushMd) classes.push(`${classesFluent.pushMd}${props.pushMd}`);
  if (props.pushLg) classes.push(`${classesFluent.pushLg}${props.pushLg}`);

  if (props.pullSm) classes.push(`${classesFluent.pullSm}${props.pullSm}`);
  if (props.pullMd) classes.push(`${classesFluent.pullMd}${props.pullMd}`);
  if (props.pullLg) classes.push(`${classesFluent.pullLg}${props.pullLg}`);

  if (props.hiddenAt) classes.push(`${classesFluent.hidden}${props.hiddenAt}`);

  if (
    !props.sm &&
    !props.md &&
    !props.lg &&
    !props.pushSm &&
    !props.pushMd &&
    !props.pushLg &&
    !props.pullSm &&
    !props.pullMd &&
    !props.pullLg
  ) {
    classes.push(`${classesFluent.sm}12`);
    classes.push(`${classesFluent.pushSm}12`);
    classes.push(`${classesFluent.pullSm}12`);
  }

  if (props.className) {
    // Previous Classes
    return classes.length > 1 ? `${classes.join(" ")} ${props.className}` : `${props.className} ${classes[0]}`;
  }

  return classes.length > 1 ? classes.join(" ") : classes[0];
};
