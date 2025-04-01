import { useQuery } from '@tanstack/react-query';
import {
  VehiclesService,
  VehicleYearsData,
  VehicleMakesData,
  VehicleModelsData,
  VehicleTypesData
} from '../services/vehiclesService';

export const useVehicleYears = () => {
  return useQuery<VehicleYearsData, Error>({
    queryKey: ['vehicle', 'years'],
    queryFn: () => VehiclesService.getVehicleYears(),
    refetchOnWindowFocus: false,
  });
};

export const useVehicleMakes = () => { 
  return useQuery<VehicleMakesData, Error>({
    queryKey: ['vehicle', 'makes',],
    queryFn: () => VehiclesService.getVehicleMakes(), 
    refetchOnWindowFocus: false,
  });
};

export const useVehicleModels = () => {
  return useQuery<VehicleModelsData, Error>({
    queryKey: ['vehicle', 'models',],
    queryFn: () => VehiclesService.getVehicleModels(),
    refetchOnWindowFocus: false,
  });
};

export const useVehicleTypes = () => {
  return useQuery<VehicleTypesData, Error>({
    queryKey: ['vehicle', 'types'],
    queryFn: () => VehiclesService.getVehicleTypes(),
    refetchOnWindowFocus: false,
  });
}; 