export const homeContent = {
  hero: {
    eyebrow: 'Gargol Cars',
    title: 'Encontrá tu próximo vehículo',
    description: 'Conocé los vehículos publicados por Gargol Cars.',
    primaryCTA: 'Ver vehículos',
    secondaryCTA: 'Contactar',
  },
  categories: [
    { key: 'car', label: 'Autos' },
    { key: 'pickup', label: 'Pickups' },
    { key: 'motorcycle', label: 'Motos' },
  ],
  benefits: [
    {
      title: '[Pendiente de validación] Beneficio 1',
      text: '[Pendiente de validación] Texto temporal para definir el beneficio.',
    },
    {
      title: '[Pendiente de validación] Beneficio 2',
      text: '[Pendiente de validación] Texto temporal para definir el beneficio.',
    },
    {
      title: '[Pendiente de validación] Beneficio 3',
      text: '[Pendiente de validación] Texto temporal para definir el beneficio.',
    },
  ],
  financingAndTradeIn: {
    title: 'Financiación y permuta',
    description:
      '[Pendiente de validación] Confirmar disponibilidad, modalidades y condiciones antes de publicar.',
    cta: 'Consultar opciones',
  },
  about: {
    title: 'Nosotros',
    text: '[Pendiente de validación] Historia y propuesta de Gargol Cars por confirmar.',
  },
  purchaseProcess: {
    title: 'Proceso de compra',
    steps: [
      {
        title: 'Explorá',
        text: 'Revisá la información disponible de los vehículos publicados.',
      },
      {
        title: 'Consultá',
        text: 'Contactanos por el vehículo que te interesa.',
      },
      {
        title: 'Coordiná',
        text: '[Pendiente de validación] Confirmar cómo continúa el proceso.',
      },
    ],
  },
  vehicleRequest: {
    title: 'Solicitud de vehículo',
    description:
      '[Pendiente de validación] Confirmar el alcance del servicio de búsqueda antes de publicar.',
    cta: 'Realizar una consulta',
  },
  contact: {
    title: 'Contacto',
    description: 'Escribinos para consultar por los vehículos publicados.',
  },
} as const;
