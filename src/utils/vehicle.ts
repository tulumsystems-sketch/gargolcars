import type {
  Currency,
  Vehicle,
  VehicleCategory,
  VehicleStatus,
} from '../types/vehicle';

const categoryLabels: Record<VehicleCategory, string> = {
  car: 'Auto',
  pickup: 'Pickup',
  motorcycle: 'Moto',
};

const statusLabels: Record<VehicleStatus, string> = {
  available: 'Disponible',
  reserved: 'Reservado',
  sold: 'Vendido',
};

export function formatVehiclePrice(
  price?: number,
  currency?: Currency,
): string {
  if (price === undefined || !Number.isFinite(price) || price < 0 || !currency) {
    return 'Consultar precio';
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage?: number): string | null {
  if (mileage === undefined || !Number.isFinite(mileage) || mileage < 0) {
    return null;
  }

  const formattedMileage = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(mileage);

  return `${formattedMileage} km`;
}

export function getCategoryLabel(category: VehicleCategory): string {
  return categoryLabels[category];
}

export function getStatusLabel(status: VehicleStatus): string {
  return statusLabels[status];
}

export function createVehicleWhatsAppMessage(
  vehicle: Pick<Vehicle, 'brand' | 'model'>,
): string {
  const vehicleName = `${vehicle.brand} ${vehicle.model}`.trim();

  return `Hola, vi el ${vehicleName} en la web de Gargol Cars. ¿Sigue disponible?`;
}
