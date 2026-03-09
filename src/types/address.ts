export type City = {
  id: string;
  name: string;
  state: string;
  cep: string;
  country: string;
};

export type Neighborhood = {
  id: string;
  name: string;
  city: City;
};

export type Address = {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: Neighborhood;
};
