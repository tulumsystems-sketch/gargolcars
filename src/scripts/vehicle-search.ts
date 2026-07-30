const normalizeSearchValue = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es');

const formatBudget = (value: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, '');

const refreshScrollTrigger = (): void => {
  const scrollTrigger = (
    window as Window & {
      ScrollTrigger?: {
        refresh: () => void;
      };
    }
  ).ScrollTrigger;

  if (scrollTrigger?.refresh) {
    window.requestAnimationFrame(() => scrollTrigger.refresh());
  }
};

export function initVehicleSearch(): void {
  const form = document.querySelector<HTMLFormElement>('[data-vehicle-search]');

  if (!form || form.dataset.searchInitialized === 'true') {
    return;
  }

  const brandSelect =
    form.querySelector<HTMLSelectElement>('[data-vehicle-brand]');
  const modelSelect =
    form.querySelector<HTMLSelectElement>('[data-vehicle-model]');
  const budgetInput =
    form.querySelector<HTMLInputElement>('[data-vehicle-budget]');
  const budgetOutput =
    form.querySelector<HTMLOutputElement>('[data-vehicle-budget-output]');
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>('[data-vehicle-card]'),
  );
  const resultCount = document.querySelector<HTMLElement>(
    '[data-vehicle-result-count]',
  );
  const clearButton = document.querySelector<HTMLButtonElement>(
    '[data-clear-vehicle-filters]',
  );
  const emptyState = document.querySelector<HTMLElement>(
    '[data-vehicle-empty-state]',
  );
  const resultsSection = document.querySelector<HTMLElement>('#vehiculos');

  if (
    !brandSelect ||
    !modelSelect ||
    !budgetInput ||
    !budgetOutput ||
    !resultCount ||
    !clearButton ||
    !emptyState
  ) {
    return;
  }

  form.dataset.searchInitialized = 'true';

  const budgetMaximum = Number(budgetInput.max);

  const updateBudgetOutput = (): void => {
    const currentBudget = Number(budgetInput.value);
    const formattedBudget = formatBudget(currentBudget);
    const progress =
      budgetMaximum > Number(budgetInput.min)
        ? ((currentBudget - Number(budgetInput.min)) /
            (budgetMaximum - Number(budgetInput.min))) *
          100
        : 100;

    budgetOutput.value = formattedBudget;
    budgetOutput.textContent = formattedBudget;
    budgetInput.setAttribute(
      'aria-valuetext',
      `Presupuesto orientativo hasta ${formattedBudget}`,
    );
    budgetInput.style.setProperty('--budget-progress', `${progress}%`);
  };

  const getModelsForBrand = (brand: string): string[] => {
    const normalizedBrand = normalizeSearchValue(brand);

    return [
      ...new Set(
        cards
          .filter(
            (card) =>
              !normalizedBrand ||
              normalizeSearchValue(card.dataset.brand ?? '') ===
                normalizedBrand,
          )
          .map((card) => card.dataset.model)
          .filter((model): model is string => Boolean(model)),
      ),
    ].sort((firstModel, secondModel) =>
      firstModel.localeCompare(secondModel, 'es', { numeric: true }),
    );
  };

  const updateModelOptions = (): void => {
    const selectedModel = modelSelect.value;
    const validModels = getModelsForBrand(brandSelect.value);

    modelSelect.replaceChildren();
    modelSelect.add(new Option('Todos los modelos', ''));

    validModels.forEach((model) => modelSelect.add(new Option(model, model)));

    modelSelect.value = validModels.includes(selectedModel)
      ? selectedModel
      : '';
  };

  const applyFilters = (shouldScroll: boolean): void => {
    const selectedBrand = normalizeSearchValue(brandSelect.value);
    const selectedModel = normalizeSearchValue(modelSelect.value);
    const selectedBudget = Number(budgetInput.value);
    let availableMatches = 0;

    cards.forEach((card) => {
      const isSold = card.dataset.status === 'sold';
      const cardPrice = Number(card.dataset.price);
      const matchesBrand =
        !selectedBrand ||
        normalizeSearchValue(card.dataset.brand ?? '') === selectedBrand;
      const matchesModel =
        !selectedModel ||
        normalizeSearchValue(card.dataset.model ?? '') === selectedModel;
      const matchesBudget =
        !Number.isFinite(cardPrice) ||
        !Number.isFinite(selectedBudget) ||
        cardPrice <= selectedBudget;
      const isMatch = !isSold && matchesBrand && matchesModel && matchesBudget;
      const shouldRemainVisible = isSold || isMatch;

      card.hidden = !shouldRemainVisible;
      card.setAttribute('aria-hidden', String(!shouldRemainVisible));

      if (isMatch) {
        availableMatches += 1;
      }
    });

    resultCount.textContent =
      availableMatches === 1
        ? '1 vehículo disponible'
        : `${availableMatches} vehículos disponibles`;
    emptyState.hidden = availableMatches !== 0;

    const filtersAreActive =
      Boolean(brandSelect.value) ||
      Boolean(modelSelect.value) ||
      Number(budgetInput.value) < budgetMaximum;
    clearButton.hidden = !filtersAreActive;

    refreshScrollTrigger();

    if (shouldScroll && resultsSection) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      resultsSection.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  brandSelect.addEventListener('change', () => {
    updateModelOptions();
    applyFilters(false);
  });
  modelSelect.addEventListener('change', () => applyFilters(false));
  budgetInput.addEventListener('input', updateBudgetOutput);
  budgetInput.addEventListener('change', () => applyFilters(false));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters(true);
  });
  clearButton.addEventListener('click', () => {
    brandSelect.value = '';
    updateModelOptions();
    modelSelect.value = '';
    budgetInput.value = budgetInput.max;
    updateBudgetOutput();
    applyFilters(true);
  });

  updateModelOptions();
  updateBudgetOutput();
}
