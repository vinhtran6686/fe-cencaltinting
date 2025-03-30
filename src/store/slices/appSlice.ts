import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    read: boolean;
  }>;
}

const initialState: AppState = {
  sidebarCollapsed: false,
  theme: 'light',
  loading: false,
  notifications: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addNotification: (state, action: PayloadAction<{
      id: string;
      message: string;
      type: 'success' | 'error' | 'info' | 'warning';
    }>) => {
      state.notifications.push({
        ...action.payload,
        read: false
      });
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const { 
  toggleSidebar, 
  setTheme, 
  setLoading,
  addNotification,
  markNotificationAsRead,
  clearNotifications
} = appSlice.actions;

export default appSlice.reducer; 