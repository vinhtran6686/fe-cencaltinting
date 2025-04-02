import { useQuery } from '@tanstack/react-query';
import {
  VehiclesService,
  VehicleYearsData,
  VehicleMakesData,
  VehicleModelsData,
  VehicleTypesData
} from '../services/vehiclesService';

export const useVehicleYears = () => {
  const { data: yearsData, isLoading: isLoadingYears, refetch: refetchYears } = useQuery<VehicleYearsData, Error>({
    queryKey: ['vehicle', 'years'],
    queryFn: () => VehiclesService.getVehicleYears(),
    refetchOnWindowFocus: false,
  });
  return {
    data: yearsData?.data,
    isLoading: isLoadingYears,
    refetch: refetchYears,
  }
};

export const useVehicleMakes = () => {
  const { data: makesData, isLoading: isLoadingMakes, refetch: refetchMakes } = useQuery<VehicleMakesData, Error>({
    queryKey: ['vehicle', 'makes',],
    queryFn: () => VehiclesService.getVehicleMakes(),
    refetchOnWindowFocus: false,
  });
  return {
    data: makesData?.data,
    isLoading: isLoadingMakes,
    refetch: refetchMakes,
  }
};

export const useVehicleModels = () => {
  const { data: modelsData, isLoading: isLoadingModels, refetch: refetchModels } = useQuery<VehicleModelsData, Error>({
    queryKey: ['vehicle', 'models',],
    queryFn: () => VehiclesService.getVehicleModels(),
    refetchOnWindowFocus: false,
  });
  return {
    data: modelsData?.data,
    isLoading: isLoadingModels,
    refetch: refetchModels,
  }
};

export const useVehicleTypes = () => {
  const { data: typesData, isLoading: isLoadingTypes, refetch: refetchTypes } = useQuery<VehicleTypesData, Error>({
    queryKey: ['vehicle', 'types'],
    queryFn: () => VehiclesService.getVehicleTypes(),
    refetchOnWindowFocus: false,
  });
  return {
    data: typesData?.data,
    isLoading: isLoadingTypes,
    refetch: refetchTypes,
  }
}; 