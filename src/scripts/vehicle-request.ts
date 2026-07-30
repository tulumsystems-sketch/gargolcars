import { siteConfig } from '../config/site';
import { createWhatsAppUrl } from '../utils/vehicle';

const vehicleTypeLabels: Record<string, string> = {
  car: 'un auto',
  pickup: 'una pickup',
  motorcycle: 'una moto',
};

const tradeInMessages: Record<string, string> = {
  yes: 'Tengo otro vehículo para entregar.',
  no: 'No entrego otro vehículo.',
  unsure: 'La entrega de otro vehículo está a definir.',
};

export function initVehicleRequest(): void {
  const form = document.querySelector<HTMLFormElement>('[data-vehicle-request]');

  if (!form || form.dataset.requestInitialized === 'true') {
    return;
  }

  const nameInput = form.elements.namedItem('name') as HTMLInputElement | null;
  const typeSelect = form.elements.namedItem(
    'vehicleType',
  ) as HTMLSelectElement | null;
  const brandOrModelInput = form.elements.namedItem(
    'brandOrModel',
  ) as HTMLInputElement | null;
  const budgetInput = form.elements.namedItem(
    'estimatedBudget',
  ) as HTMLInputElement | null;
  const tradeInSelect = form.elements.namedItem(
    'hasTradeIn',
  ) as HTMLSelectElement | null;
  const status = form.querySelector<HTMLElement>(
    '[data-vehicle-request-status]',
  );

  if (
    !nameInput ||
    !typeSelect ||
    !brandOrModelInput ||
    !budgetInput ||
    !tradeInSelect ||
    !status
  ) {
    return;
  }

  form.dataset.requestInitialized = 'true';

  const showValidationError = (
    field: HTMLInputElement | HTMLSelectElement,
    message: string,
  ): void => {
    field.setAttribute('aria-invalid', 'true');
    status.textContent = message;
    status.dataset.state = 'error';
    field.focus();
  };

  const clearValidationState = (): void => {
    nameInput.removeAttribute('aria-invalid');
    typeSelect.removeAttribute('aria-invalid');
    status.textContent =
      'Al continuar, se abrirá WhatsApp con los datos ingresados. No almacenamos esta información.';
    delete status.dataset.state;
  };

  nameInput.addEventListener('input', clearValidationState);
  typeSelect.addEventListener('change', clearValidationState);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const vehicleType = vehicleTypeLabels[typeSelect.value];
    const brandOrModel = brandOrModelInput.value.trim();
    const budget = budgetInput.value.trim();
    const tradeInMessage = tradeInMessages[tradeInSelect.value];

    if (!name) {
      showValidationError(nameInput, 'Ingresá tu nombre para continuar.');
      return;
    }

    if (!vehicleType) {
      showValidationError(
        typeSelect,
        'Seleccioná el tipo de vehículo que estás buscando.',
      );
      return;
    }

    clearValidationState();

    const messageParts = [
      `Hola, soy ${name}.`,
      `Estoy buscando ${vehicleType}${brandOrModel ? `, preferentemente ${brandOrModel}` : ''}.`,
      budget ? `Mi presupuesto aproximado es ${budget}.` : '',
      tradeInMessage ?? '',
      'Vi la web de Gargol Cars y quisiera recibir asesoramiento.',
    ].filter(Boolean);
    const whatsappUrl = createWhatsAppUrl(
      siteConfig.contact.whatsapp.linkNumber,
      messageParts.join(' '),
    );

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
