import { Provider } from './provider';
import { ServiceRequest } from './service';
import { User } from './user';

export type Review = {
  id: string;
  provider: Provider;
  service_request: ServiceRequest;
  client: User;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
};
