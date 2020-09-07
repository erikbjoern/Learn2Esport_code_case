export type Country = {
  capital: string;
  code: string;
  continent: {
    code: string;
  };
  currency: string;
  languages: {
    name: {
      name: string[];
    };
  };
  name: string;
  native: string;
}