/* https://developer.microsoft.com/en-us/fluentui#/styles/web/layout */

const classesFluent = {
  sm: 'ms-sm',
  md: 'ms-md',
  lg: 'ms-lg',
  xl: 'ms-xl',
  xxl: 'ms-xxl',
  xxxl: 'ms-xxxl',
  pushSm: 'ms-smPush',
  pushMd: 'ms-mdPush',
  pushLg: 'ms-lgPush',
  pushXl: 'ms-xlPush',
  pushXxl: 'ms-xxlPush',
  pushXxxl: 'ms-xxxlPush',
  pullSm: 'ms-smPull',
  pullMd: 'ms-smPull',
  pullLg: 'ms-smPull',
  pullXl: 'ms-xlPull',
  pullXxl: 'ms-xxlPull',
  pullXxxl: 'ms-xxxlPull',
  hiddenAt: 'ms-hidden',
};

export const getClassNames = (initialClasses, props) => {
  const classes = [initialClasses];

  if (props.sm) classes.push(`${classesFluent.sm}${props.sm}`);
  if (props.md) classes.push(`${classesFluent.md}${props.md}`);
  if (props.lg) classes.push(`${classesFluent.lg}${props.lg}`);

  if (props.xl) classes.push(`${classesFluent.xl}${props.xl}`);
  if (props.xxl) classes.push(`${classesFluent.xxl}${props.xxl}`);
  if (props.xxxl) classes.push(`${classesFluent.xxxl}${props.xxxl}`);

  if (props.pushSm) classes.push(`${classesFluent.pushSm}${props.pushSm}`);
  if (props.pushMd) classes.push(`${classesFluent.pushMd}${props.pushMd}`);
  if (props.pushLg) classes.push(`${classesFluent.pushLg}${props.pushLg}`);

  if (props.pushXl) classes.push(`${classesFluent.pushXl}${props.pushXl}`);
  if (props.pushXxl) classes.push(`${classesFluent.pushXxl}${props.pushXxl}`);
  if (props.pushXxxl) classes.push(`${classesFluent.pushXxxl}${props.pushXxxl}`);

  if (props.pullSm) classes.push(`${classesFluent.pullSm}${props.pullSm}`);
  if (props.pullMd) classes.push(`${classesFluent.pullMd}${props.pullMd}`);
  if (props.pullLg) classes.push(`${classesFluent.pullLg}${props.pullLg}`);

  if (props.pullXl) classes.push(`${classesFluent.pullXl}${props.pullXl}`);
  if (props.pullXxl) classes.push(`${classesFluent.pullXxl}${props.pullXxl}`);
  if (props.pullXxxl) classes.push(`${classesFluent.pullXxxl}${props.pullXxxl}`);

  if (props.hiddenAt) classes.push(`${classesFluent.hidden}${props.hiddenAt}`);

  if (!props.sm && !props.noStyle) {
    classes.push(`${classesFluent.sm}12`);
    // classes.push(`${classesFluent.pushSm}12`);
    // classes.push(`${classesFluent.pullSm}12`);
  }

  if (props.className) {
    // Previous Classes
    return classes.length > 1 ? `${classes.join(' ')} ${props.className}` : `${props.className} ${classes[0]}`;
  }

  return classes.length > 1 ? classes.join(' ') : classes[0];
};
