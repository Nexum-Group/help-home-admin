export type CategoryByVolume = {
  category_name: string;
  services: number;
  volume_value: number;
  total_by_percentage: number;
};

export type NewsRegistereds = {
  period: string;
  clients_count: number;
  providers_count: number;
};

export type Report = {
  total_volume_value: number;
  platform_fee_value: number;
  total_services_perfomed: number;
  category_by_volume: CategoryByVolume[];
  news_registereds: NewsRegistereds[];
};
