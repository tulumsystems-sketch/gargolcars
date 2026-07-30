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
  })
    .format(price)
    .replace(/\s/g, '');
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

export function getVehicleDisplayName(
  vehicle: Pick<Vehicle, 'brand' | 'model' | 'version' | 'year'>,
): string {
  return [
    vehicle.brand,
    vehicle.model,
    vehicle.version,
    vehicle.year?.toString(),
  ]
    .filter((value): value is string => Boolean(value))
    .join(' ');
}

export function createVehicleWhatsAppMessage(
  vehicle: Pick<
    Vehicle,
    'brand' | 'model' | 'version' | 'year' | 'status' | 'category'
  >,
): string {
  const vehicleName = getVehicleDisplayName(vehicle);

  if (vehicle.status === 'sold') {
    return `Hola, vi la ${vehicleName} vendida en la web de Gargol Cars. ¿Tienen una unidad similar?`;
  }

  const article = vehicle.category === 'motorcycle' ? 'la' : 'el';

  return `Hola, vi ${article} ${vehicleName} en la web de Gargol Cars. ¿Sigue disponible?`;
}

export function createWhatsAppUrl(
  phoneNumber: string,
  message: string,
): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
