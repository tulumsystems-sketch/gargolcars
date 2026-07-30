const pendingValue = {
  value: '',
  status: 'pending',
} as const;

export const siteConfig = {
  name: 'Gargol Cars',
  title: 'Gargol Cars | Autos, pickups y motos en San Juan',
  description:
    'Encontrá autos, pickups y motos en Gargol Cars. Consultá unidades disponibles, financiación y permutas en San Juan.',
  url: '',
  isDemo: true,
  locale: 'es_AR',
  themeColor: '#08090a',
  socialImage: '/images/hero/auto-derecha.jpg',
  contact: {
    instagram: {
      value: 'https://www.instagram.com/gargolcars/',
      status: 'confirmed',
    },
    whatsapp: {
      value: '0264 452-5422',
      internationalNumber: '+54 9 264 452-5422',
      linkNumber: '5492644525422',
      href: 'https://wa.me/5492644525422',
      status: 'confirmed',
    },
    address: {
      value: 'Gral. Juan Gregorio Las Heras 801, J5402 San Juan',
      streetAddress: 'Gral. Juan Gregorio Las Heras 801',
      postalCode: 'J5402',
      locality: 'San Juan',
      region: 'San Juan',
      country: 'AR',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Gral.+Juan+Gregorio+Las+Heras+801+San+Juan',
      status: 'confirmed',
    },
    businessHours: {
      value: [
        {
          days: 'Lunes a sábado',
          hours: '9:00–14:00 y 17:00–21:00',
        },
        {
          days: 'Domingo',
          hours: 'Cerrado',
        },
      ],
      openingHours: [
        {
          days: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:00',
          closes: '14:00',
        },
        {
          days: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '17:00',
          closes: '21:00',
        },
      ],
      status: 'confirmed',
    },
  },
  pending: {
    websiteUrl: pendingValue,
  },
} as const;
