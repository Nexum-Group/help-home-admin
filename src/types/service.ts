import { Category } from './category';
import { Provider } from './provider';
import { ServiceStatus } from './services-status';
import { User } from './user';

export type ServiceRequest = {
  id: string;
  client: User;
  provider: Provider;
  category: Category;
  service_name: string;
  description: string;
  status: ServiceStatus;
  service_price: number;
  platform_fee: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  scheduled_date: string;
  created_at: string;
  updated_at: string;
};
