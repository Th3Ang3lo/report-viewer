export class ObjectMapperHelper {
  public static transform<T = any>(
    data: Record<string, any>,
    format: Record<string, string>,
  ): T {
    const newObject = {};

    for (const newKey of Object.keys(format)) {
      newObject[newKey] = data[format[newKey]];
    }

    return newObject as T;
  }
}
