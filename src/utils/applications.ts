export interface Application {
  name: string;
  displayName: string;
  baseUrl: string;
  backendUrl?: string;
}

export class Applications {
  public static readonly GTOMY_NET: Application = {
    name: 'gtomy-net',
    baseUrl: 'https://gtomy.net',
    displayName: 'GTomy.net',
  };
  public static readonly IKKI_AI: Application = {
    name: 'ikki-ai',
    baseUrl: 'https://ikki-ai.net',
    displayName: 'Ikki AI',
    backendUrl: 'https://services.ikki-ai.net',
  };
  public static readonly CRYPTOVO: Application = {
    name: 'cryptovo',
    baseUrl: 'https://cryptovo.net',
    displayName: 'Cryptovo',
    backendUrl: 'https://services.cryptovo.net',
  };

  public static getByName(name: string): Application | undefined {
    switch (name) {
      case Applications.GTOMY_NET.name:
        return Applications.GTOMY_NET;
      case Applications.IKKI_AI.name:
        return Applications.IKKI_AI;
      case Applications.CRYPTOVO.name:
        return Applications.CRYPTOVO;
      default:
        return undefined;
    }
  }
}
