import _ from 'lodash';

/**
 * @description Takes an object or array and transforms its keys or values to snake_case
 * https://gist.github.com/daino3/3da80fe2a3c8f9411214044a7f5611b3
 */
export const toSnakeCase = (object: {}): any => {
  let snakeCaseObject = _.cloneDeep(object);

  if (_.isArray(snakeCaseObject)) {
    return _.map(snakeCaseObject, toSnakeCase);
  }
  snakeCaseObject = _.mapKeys(snakeCaseObject, (value, key) =>
    _.snakeCase(key),
  );

  // Recursively apply throughout object
  return _.mapValues(snakeCaseObject, (value) => {
    if (_.isPlainObject(value)) {
      return toSnakeCase(value);
    } else if (_.isArray(value)) {
      return _.map(value, toSnakeCase);
    }
    return value;
  });
};

export default toSnakeCase;
