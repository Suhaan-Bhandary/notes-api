// Override the default interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;

      DATABASE: string;
      TEST_DATABASE: string;
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: number;

      SECRET_KEY: string;
    }
  }
}

// To make this file a module
export {};
