import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from './appointmentTypes';
import { RootState } from '../../store';

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Could not fetch appointments');
      const data = await response.json();
      return data as Appointment[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Fetch a single appointment by ID
export const fetchAppointmentById = createAsyncThunk<
  Appointment,
  string,
  { state: RootState, rejectValue: string }
>(
  'appointments/fetchAppointmentById',
  async (appointmentId, { getState, rejectWithValue }) => {
    try {
      // Check if we already have this appointment in state
      const existingAppointment = getState().appointments.appointments.find(
        (app: Appointment) => app.id === appointmentId
      );

      // If we have it and it's not needed to refresh, return it
      if (existingAppointment) {
        return existingAppointment;
      }

      // Otherwise fetch from API
      const response = await fetch(`/api/appointments/${appointmentId}`);
      if (!response.ok) throw new Error(`Could not fetch appointment ${appointmentId}`);
      const data = await response.json();
      return data as Appointment;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Add a new appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointment: Omit<Appointment, 'id'>, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) throw new Error('Could not add appointment');
      const data = await response.json();
      return data as Appointment;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Update an existing appointment
export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, changes }: { id: string; changes: Partial<Appointment> }, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });
      if (!response.ok) throw new Error(`Could not update appointment ${id}`);
      const data = await response.json();
      return data as Appointment;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Delete an appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Could not delete appointment ${id}`);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// MARK: Vị trí để cập nhật thêm thunks khi có thông tin chi tiết về Appointments 