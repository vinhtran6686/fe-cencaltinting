// Types for VehicleRules feature

export interface VehicleRule {
  id: string;
  // Thêm các trường chi tiết khi có thông tin
}

export interface VehicleRulesState {
  vehicleRules: VehicleRule[];
  selectedVehicleRuleId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// MARK: Vị trí để cập nhật thêm types khi có thông tin chi tiết về VehicleRules 