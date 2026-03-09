import { Neighborhood } from './address';
import { Provider } from './provider';

export type ServiceArea = {
  id: string;
  provider: Provider;
  neighborhood: Neighborhood;
  created_at: string;
  updated_at: string;
};
