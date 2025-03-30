import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from './appointmentTypes';
import { RootState } from '../../../store';
import appointmentsService from '../services';

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

export const fetchAppointmentById = createAsyncThunk<
  Appointment,
  string,
  { state: RootState, rejectValue: string }
>(
  'appointments/fetchAppointmentById',
  async (appointmentId, { getState, rejectWithValue }) => {
    try {
      const existingAppointment = getState().appointments.appointments.find(
        (app: Appointment) => app.id === appointmentId
      );

      if (existingAppointment) {
        return existingAppointment;
      }

      return await appointmentsService.getById(appointmentId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

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
