import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentState, Appointment } from './appointmentTypes';
import { 
  fetchAppointments, 
  fetchAppointmentById, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment 
} from './appointmentsThunks';

const initialState: AppointmentState = {
  appointments: [],
  selectedAppointmentId: null,
  status: 'idle',
  error: null,
  filters: {
    status: null,
    fromDate: null,
    toDate: null
  }
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    selectAppointment: (state, action: PayloadAction<string | null>) => {
      state.selectedAppointmentId = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: string | null }>) => {
      const { key, value } = action.payload;
      if (key in state.filters) {
        (state.filters as any)[key] = value;
      }
    },
    clearFilters: (state) => {
      state.filters = {
        status: null,
        fromDate: null,
        toDate: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchAppointmentById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.status = 'succeeded';
        const existingIndex = state.appointments.findIndex((a: Appointment) => a.id === action.payload.id);
        if (existingIndex >= 0) {
          state.appointments[existingIndex] = action.payload;
        } else {
          state.appointments.push(action.payload);
        }
        state.selectedAppointmentId = action.payload.id;
        state.error = null;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.status = 'succeeded';
        state.appointments.push(action.payload);
        state.error = null;
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.status = 'succeeded';
        const existingIndex = state.appointments.findIndex((a: Appointment) => a.id === action.payload.id);
        if (existingIndex >= 0) {
          state.appointments[existingIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.appointments = state.appointments.filter((a: Appointment) => a.id !== action.payload);
        if (state.selectedAppointmentId === action.payload) {
          state.selectedAppointmentId = null;
        }
        state.error = null;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { selectAppointment, setFilter, clearFilters } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
