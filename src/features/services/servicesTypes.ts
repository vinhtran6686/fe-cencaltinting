export interface Service {
  id: string;
}

export interface ServicesState {
  services: Service[];
  selectedServiceId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}