import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from './appointmentTypes';
import { RootState } from '../../../store';
import appointmentsService from '../services';

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      return await appointmentsService.getAll();
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
      return await appointmentsService.getById(appointmentId);
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
      return await appointmentsService.create(appointment);
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
      return await appointmentsService.update(id, changes);
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
      await appointmentsService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// MARK: Vị trí để cập nhật thêm thunks khi có thông tin chi tiết về Appointments 