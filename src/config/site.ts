const pendingValue = {
  value: '',
  status: 'pending',
} as const;

export const siteConfig = {
  name: 'Gargol Cars',
  description: 'Sitio web de Gargol Cars en preparación.',
  url: '',
  contact: {
    instagram: pendingValue,
    whatsapp: pendingValue,
    address: pendingValue,
    businessHours: pendingValue,
  },
} as const;
