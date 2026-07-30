interface VisualVehicle {
  id: string;
  cover: string;
  gallery: string[];
  temporaryLabel: string;
}

// Fuente visual temporal: se conectará con vehicles.ts cuando el inventario esté confirmado.
export const visualVehicles: VisualVehicle[] = [
  {
    id: 'auto-1',
    cover: '/autos/auto1-1.jpg',
    gallery: [
      '/autos/auto1-2.jpg',
      '/autos/auto1-3.jpg',
      '/autos/auto1-4.jpg',
      '/autos/auto1-5.jpg',
      '/autos/auto1-6.jpg',
      '/autos/auto1-7.jpg',
      '/autos/auto1-8.jpg',
      '/autos/auto1-9.jpg',
    ],
    temporaryLabel: 'Vehículo 01',
  },
  {
    id: 'auto-2',
    cover: '/autos/auto2-1.jpg',
    gallery: [
      '/autos/auto2-2.jpg',
      '/autos/auto2-3.jpg',
      '/autos/auto2-4.jpg',
      '/autos/auto2-5.jpg',
      '/autos/auto2-6.jpg',
    ],
    temporaryLabel: 'Vehículo 02',
  },
  {
    id: 'auto-3',
    cover: '/autos/auto3-1.jpg',
    gallery: [
      '/autos/auto3-2.jpg',
      '/autos/auto3-3.jpg',
      '/autos/auto3-4.jpg',
      '/autos/auto3-5.jpg',
      '/autos/auto3-6.jpg',
    ],
    temporaryLabel: 'Vehículo 03',
  },
  {
    id: 'auto-4',
    cover: '/autos/auto4-1.jpg',
    gallery: ['/autos/auto4-2.jpg', '/autos/auto4-3.jpg'],
    temporaryLabel: 'Vehículo 04',
  },
  {
    id: 'auto-5',
    cover: '/autos/auto5-1.jpg',
    gallery: [
      '/autos/auto5-2.jpg',
      '/autos/auto5-3.jpg',
      '/autos/auto5-4.jpg',
    ],
    temporaryLabel: 'Vehículo 05',
  },
  {
    id: 'auto-6',
    cover: '/autos/auto6-1.jpg',
    gallery: [
      '/autos/auto6-2.jpg',
      '/autos/auto6-3.jpg',
      '/autos/auto6-4.jpg',
      '/autos/auto6-5.jpg',
    ],
    temporaryLabel: 'Vehículo 06',
  },
];
