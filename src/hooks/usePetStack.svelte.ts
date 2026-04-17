import { getRandomPetProfile } from '../services/petProvider';
import type { PetProfile } from '../types/pet';

export function usePetStack(initialFilters: { type?: string; location?: string } = {}) {
  let stack = $state<PetProfile[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  let filters = { ...initialFilters };
  let generation = 0;
  let fillInFlight: Promise<void> | null = null;

  function fillStack() {
    if (fillInFlight) return fillInFlight;

    const gen = generation;
    const promise = (async () => {
      while (generation === gen && stack.length < 3) {
        let pet: PetProfile | null = null;
        try {
          pet = await getRandomPetProfile(filters);
        } catch (err) {
          if (generation !== gen) return;

          if (err instanceof Error && err.message === 'No pets match the selected filters') {
            return;
          }

          error = 'No se pudieron cargar mascotas. Intenta de nuevo.';
          return;
        }
        if (generation !== gen) return;
        if (!pet) {
          error = 'No se pudieron cargar mascotas. Intenta de nuevo.';
          return;
        }
        if (error) error = null;
        stack.push(pet);
      }
    })();

    fillInFlight = promise;

    promise.finally(() => {
      if (fillInFlight === promise) fillInFlight = null;
      if (generation === gen) loading = false;
    });

    return promise;
  }

  function init() {
    generation += 1;
    stack = [];
    loading = true;
    error = null;
    fillInFlight = null;
    void fillStack();
  }

  function next() {
    if (stack.length > 0) {
      stack.shift();
      void fillStack();
    }
  }

  function updateFilters(newFilters: { type?: string; location?: string }) {
    filters = { ...newFilters };
    init();
  }

  return {
    get current() {
      return stack[0] || null;
    },
    get upcoming() {
      return stack.slice(1);
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    init,
    next,
    updateFilters
  };
}
