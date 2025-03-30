export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  clientId: string;
  clientName?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  services: string[];
  vehicleInfo?: {
    make?: string;
    model?: string;
    year?: number;
    color?: string;
  };
}

export interface AppointmentState {
  appointments: Appointment[];
  selectedAppointmentId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    status: string | null;
    fromDate: string | null;
    toDate: string | null;
  };
}
