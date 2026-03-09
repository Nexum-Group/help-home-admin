import { Category } from './category';
import { Review } from './review';
import { ServiceRequest } from './service';
import { ServiceArea } from './service_area';
import { User } from './user';

export type Provider = {
  id: string;
  user: User;
  description: string;
  approval_status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  categories: Category[];
  rating_average: number;
  total_views: number;
  created_at: string;
  updated_at: string;
};

export type ProviderWithServiceRequestsCount = Provider & {
  service_requests_count: number;
};

export type ProviderDetail = ProviderWithServiceRequestsCount & {
  service_areas: ServiceArea[];
  reviews: Review[];
  services: ServiceRequest[];
};
