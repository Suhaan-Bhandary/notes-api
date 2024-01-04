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

      WINDOW_SIZE_NON_AUTH_MIN: number;
      LIMIT_NON_AUTH: number;
      WINDOW_SIZE_AUTH_MIN: number;
      LIMIT_AUTH: number;
    }
  }
}

// To make this file a module
export {};
