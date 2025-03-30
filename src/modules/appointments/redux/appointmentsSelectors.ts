import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Appointment } from './appointmentTypes';

export const selectAllAppointments = (state: RootState) => state.appointments.appointments;
export const selectAppointmentStatus = (state: RootState) => state.appointments.status;
export const selectAppointmentError = (state: RootState) => state.appointments.error;
export const selectSelectedAppointmentId = (state: RootState) => state.appointments.selectedAppointmentId;
export const selectFilters = (state: RootState) => state.appointments.filters;

export const selectSelectedAppointment = createSelector(
  [selectAllAppointments, selectSelectedAppointmentId],
  (appointments, selectedId) => {
    if (!selectedId) return null;
    return appointments.find((app: Appointment) => app.id === selectedId) || null;
  }
);

export const selectFilteredAppointments = createSelector(
  [selectAllAppointments, selectFilters],
  (appointments, filters) => {
    return appointments.filter((appointment: Appointment) => {
      let match = true;
      
      if (filters.status && appointment.status !== filters.status) {
        match = false;
      }
      
      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);
        const appointmentDate = new Date(appointment.date);
        if (appointmentDate < fromDate) match = false;
      }
      
      if (filters.toDate) {
        const toDate = new Date(filters.toDate);
        const appointmentDate = new Date(appointment.date);
        if (appointmentDate > toDate) match = false;
      }
      
      return match;
    });
  }
);

export const selectAppointmentsByStatus = createSelector(
  [selectAllAppointments, (_, status: string) => status],
  (appointments, status) => {
    return appointments.filter((app: Appointment) => app.status === status);
  }
);

export const selectAppointmentsByDate = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const byDate: Record<string, Appointment[]> = {};
    appointments.forEach((app: Appointment) => {
      if (!byDate[app.date]) byDate[app.date] = [];
      byDate[app.date].push(app);
    });
    return byDate;
  }
);
