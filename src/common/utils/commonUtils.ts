// eslint-disable-next-line @typescript-eslint/ban-types
export function pick(fields: string[], source: Object) {
  const pickObj = {};
  Object.keys(source).forEach((field) => {
    if (fields.includes(field)) {
      pickObj[field] = source[field];
    }
  });
  return pickObj;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmptyObject(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}
