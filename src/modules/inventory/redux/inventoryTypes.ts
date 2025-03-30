export interface InventoryItem {
  id: string; 
}

export interface InventoryState {
  items: InventoryItem[];
  selectedItemId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} 
