// Types for Appointment feature

// Appointment model
export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  clientId: string;
  clientName?: string; // Optional, có thể được join từ clients
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  services: string[]; // IDs của các dịch vụ
  vehicleInfo?: {
    make?: string;
    model?: string;
    year?: number;
    color?: string;
  };
  // Thêm các trường khác khi cần thiết
}

// State for appointment feature
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
