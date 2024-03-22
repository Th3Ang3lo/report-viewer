export class Enviroment {
  public static get(key: string) {
    const env = process?.env?.[key];

    if (!env) {
      throw new Error(`Enviroment variable "${key}" not exists.`);
    }

    return env;
  }

  public static getPostgresURL() {
    return Enviroment.get(EnviromentVariables.POSTGRES_URL);
  }
}

export enum EnviromentVariables {
  POSTGRES_URL = 'POSTGRES_URL',
}
