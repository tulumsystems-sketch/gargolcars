export type VehicleCategory = 'car' | 'pickup' | 'motorcycle';

export type VehicleStatus = 'available' | 'reserved' | 'sold';

export type Currency = 'ARS' | 'USD';

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  year?: number;
  mileage?: number;
  price?: number;
  currency?: Currency;
  priceIsTemporary?: boolean;
  category: VehicleCategory;
  transmission?: string;
  fuel?: string;
  image: string;
  imageAlt: string;
  gallery?: string[];
  status: VehicleStatus;
  featured: boolean;
  description?: string;
}
