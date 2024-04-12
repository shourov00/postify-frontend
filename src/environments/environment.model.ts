export interface ENVIRONMENT {
  production: boolean;
  apiUrl: string;
  elementsPerPage: number;
  theme: Theme;
}

export enum Theme {
  dark,
  light
}
