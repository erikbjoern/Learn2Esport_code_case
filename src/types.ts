export type Country = {
  capital: string | null;
  code: string;
  continent: {
    code: string;
  };
  currency: string | null;
  languages: {
    name: string; }[] | 
    { name: {
      name: string[];
    };
  };
  name: string;
  native: string;
}