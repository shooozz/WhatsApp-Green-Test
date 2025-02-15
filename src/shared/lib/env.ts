class EnvService {
  public readonly VITE_GREEN_API_URL: string;

  constructor() {
    this.VITE_GREEN_API_URL = import.meta.env.VITE_GREEN_API_URL;
    this.validateEnvVars();
  }

  private validateEnvVars() {
    if (!this.VITE_GREEN_API_URL) {
      throw new Error('VITE_GREEN_API_URL is not defined in .env file');
    }
  }
}

export const envService = new EnvService();
